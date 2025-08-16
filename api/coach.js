export const config = { runtime: 'nodejs' };

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Auth-Token");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "Missing OPENAI_API_KEY" });
    }

    // Parse body
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body || "{}");
      } catch (e) {
        return res.status(400).json({ error: "Bad JSON", detail: String(e) });
      }
    }

    const {
      channel = "#platform-setup",
      history = [],
      faqMd = "",
      usedIndexes = [],
      usedQuestions = [],
      coveredTopics = [] // embeddings for topics already covered
    } = body || {};

    if (!faqMd) return res.status(400).json({ error: "Missing faqMd" });

    // Split into chunks
    const chunks = chunkText(faqMd, 2800);

    // Embed all chunks (only needed if first call or FAQ changes)
    const chunkEmbeddings = await getEmbeddings(chunks);

    let usedIdx = Array.isArray(usedIndexes) ? [...usedIndexes] : [];
    let usedQ = Array.isArray(usedQuestions) ? [...usedQuestions] : [];
    let coveredVecs = Array.isArray(coveredTopics) ? [...coveredTopics] : [];

    // Function to pick a chunk that is unused AND not semantically similar to covered topics
    const pickChunk = () => {
      let available = chunks
        .map((c, i) => i)
        .filter(i => !usedIdx.includes(i) && !isTopicCovered(chunkEmbeddings[i], coveredVecs));

      if (available.length === 0) {
        // Reset if we've exhausted options
        usedIdx = [];
        available = chunks.map((_, i) => i)
          .filter(i => !isTopicCovered(chunkEmbeddings[i], coveredVecs));
      }

      if (available.length === 0) {
        // As a last resort, pick any unused index
        available = chunks.map((_, i) => i);
      }

      return available[Math.floor(Math.random() * available.length)];
    };

    let question = "";
    let tries = 0;
    let selectedIndex = null;

    while (tries < 7) {
      tries++;

      selectedIndex = pickChunk();
      const context = chunks[selectedIndex];

      const system = `
You are CoachBot for a futures prop firm training simulation.

You must create exactly ONE clear, concise, fact-based question that a trainee should be able to answer by reading the FAQ context provided.

Rules:
1. It MUST be in question form and end with a question mark (?).
2. It MUST be fully answerable from the provided FAQ context — do not make up or assume anything not in the context.
3. Do NOT include the answer, hints, clues, or “fill in the blank” formats.
4. Avoid yes/no questions; prefer "how / what / when / where / why" style.
5. Do NOT ask about the same topic, fact, or concept as any previous questions in this session — even if worded differently.
6. If the provided context relates to a topic already covered, select a completely different fact or topic from it.
7. Keep it concise — no more than one sentence.

Channel: ${channel}
`.trim();

      const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4.1", // switch to gpt-5 when available
          temperature: 0.4,
          messages: [
            { role: "system", content: system },
            { role: "user", content: `FAQ CONTEXT (Markdown):\n${context}` },
            ...(Array.isArray(history) ? history : [])
          ]
        }),
      });

      const data = await aiRes.json().catch(e => ({ parseError: String(e) }));
      if (!aiRes.ok) {
        return res.status(aiRes.status).json({ error: "OpenAI error", detail: data });
      }

      const candidate = data?.choices?.[0]?.message?.content?.trim?.() || "";
      if (!candidate.endsWith("?")) continue;

      // Exact match check
      if (usedQ.includes(candidate)) continue;

      // Semantic similarity check between questions
      const tooSimilarQ = await isTooSimilar(candidate, usedQ);
      if (tooSimilarQ) continue;

      // If passed, accept question
      question = candidate;
      break;
    }

    if (!question) {
      return res.status(500).json({ error: "Failed to generate a unique question" });
    }

    // Mark this chunk as used & topic as covered
    usedIdx.push(selectedIndex);
    usedQ.push(question);
    coveredVecs.push(chunkEmbeddings[selectedIndex]);

    return res.status(200).json({
      reply: { role: "assistant", content: question },
      usedIndexes: usedIdx,
      usedQuestions: usedQ,
      coveredTopics: coveredVecs
    });

  } catch (err) {
    return res.status(500).json({ error: "Unhandled Coach error", detail: String(err) });
  }
}

function chunkText(t, n = 2800) {
  const out = [];
  for (let i = 0; i < t.length; i += n) out.push(t.slice(i, i + n));
  return out;
}

async function getEmbeddings(texts) {
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: texts
    })
  });
  const data = await res.json();
  return data.data.map(e => e.embedding);
}

function isTopicCovered(vec, coveredVecs) {
  return coveredVecs.some(cv => cosineSimilarity(vec, cv) > 0.85);
}

async function isTooSimilar(candidate, prevQuestions) {
  if (!prevQuestions.length) return false;

  const allQuestions = [...prevQuestions, candidate];
  const embedRes = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: allQuestions
    })
  });

  const embedData = await embedRes.json();
  const vectors = embedData.data.map(e => e.embedding);
  const candVec = vectors[vectors.length - 1];

  return prevQuestions.some((_, i) => cosineSimilarity(candVec, vectors[i]) > 0.85);
}

function cosineSimilarity(a, b) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}
