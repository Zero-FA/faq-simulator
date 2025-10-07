##### EVALUATION RULES

Trailing Drawdown and Rules
Understanding the Trailing Threshold and Evaluation Rules (Master Course)
Introduction
This guide covers how the trailing threshold works with trading evaluation and funded accounts, including specific details for RITHMIC and TRADOVATE accounts. We’ll explain trailing drawdowns, max drawdowns, and evaluation rules and provide tips for monitoring your account effectively.
Key Concepts
Starting Balance: Your account starts with an initial balance, and each plan has a specified maximum number of contracts you can trade.
No Daily Max Drawdown: There is no daily maximum drawdown limit.
Max Loss Drawdown: Each plan has a varying max loss drawdown. For example, a $50k plan starts at $47,500, which is $2,500 below the initial $50k balance.
Trailing Drawdown Example
To better understand how the trailing threshold works, let’s go through a practical example:
Starting Balance: $50,000
Allowed Drawdown: $2,500, meaning your threshold begins at $47,500.
First Trade: You make $500 and close the trade. Now, your balance is $50,500, and your threshold will update to $48,000 (the remaining $2,500 below your new balance).
Second Trade: During the next trade, your balance peaks at $50,875, but you only close the trade at $50,100. Your threshold will be $48,375, trailing $2,500 behind the highest balance reached ($50,875) even though you closed at a lower amount.
This example highlights that the trailing threshold is based on the highest live value during trades, not on closed trade values. It’s crucial to remember this to avoid unintentionally exceeding the maximum drawdown.
Drawdown Types: FULL vs. STATIC Accounts
FULL Accounts:
In paid/funded accounts, the max drawdown stops trailing once the liquidation threshold is the initial balance plus $100 (e.g., $50,100 on a 50k plan).
The trailing threshold stops moving once your unrealized balance exceeds the plan’s start balance by the drawdown amount plus $100.
The example below illustrates a trailing drawdown level at 25 points using 5 contracts on NQ, which would be around the $2500 trailing drawdown for the $50,000 account.
FINAL TDD.gif
STATIC Accounts:
The drawdown level remains unchanged. For instance, a 100k static account has a set drawdown at $99,375.
The example below illustrates a fixed drawdown level at roughly 10.5 points using 3 contracts on NQ, which would be around the $625 static drawdown for the $100,000 account.
Trailing Max Drawdown by Plan and Contract Size
Plan Account Size Max Loss/Trailing Threshold
25K Full Size 4 Minis - 1500
50K Full Size 10 Minis - 2500
75K Full Size 12 Minis - 2750
100K Full Size 14 Minis - 3000
150K Full Size 17 Minis - 5000
250K Full Size 27 Minis - 6500
300K Full Size 35 Minis - 7500
100K Static 2 Minis - 625
Special Rules for RITHMIC and TRADOVATE Accounts For Trailing Drawdown
RITHMIC Accounts: During the evaluation, the drawdown stops trailing when the threshold balance reaches your profit target (not the account balance). For instance, a 50K account stops trailing when the threshold reaches $53,000.
TRADOVATE Accounts: The trailing drawdown continues to trail in evaluations and does not stop.
Monitoring Your Account and Avoiding Liquidation
Max Drawdown Monitoring: Always check your trailing max drawdown in your RTrader or Tradovate dashboard. The auto-liquidation threshold reflects this value.
Drawdown Failure: Dropping below the drawdown threshold fails the evaluation.
Rithmic and Tradovate Access: For RITHMIC accounts, download RTrader Pro from the member area. Both RTrader and Tradovate platforms allow you to monitor and control your account.
Evaluation Account Rules
Account Balance: Your balance must close at or above the profit goal without hitting the max drawdown. Ensure a clear understanding of the Trailing Threshold Drawdown to prevent accidental liquidation.
Minimum Trading Days: Complete a minimum of seven trading days (non-consecutive) for a valid evaluation (subject to any active promotions for 1-day-pass).
Professional Conduct: Follow the code of conduct and maintain professionalism. Sharing your username or password is prohibited.
Account Monitoring: Keep RTrader/Tradovate open to monitor your balance and max drawdown, and as a backup for closing trades if needed. Stay aware of the trailing threshold.
Trailing Threshold Awareness: Track the trailing threshold carefully, as it moves with the highest profit point achieved in active trades and can impact your evaluation outcome if not managed
Evaluation Account General Guidelines
Trade Close-Out Timing:
All trades must be closed, and all pending orders canceled by 4:59 PM ET. Holding trades through the close is not permitted.
APEX has a safeguard to automatically close open positions and cancel pending orders attached to a position at 4:59 PM ET. This safeguard is a final resort and should not be relied upon. Therefore, you must manually cancel orders not attached to a position. If they remain open, they may liquidate your account.
Markets requiring an earlier close are unaffected by this rule and must still be closed manually by the trader.
Holiday Trading:
Holidays and Half-Day Closures: You can trade on holidays if the market is open; however, half-day holidays do not count as trading days. This trading day is combined with the next trading day.
Important Note: During early holiday closures, trades must be closed at the market’s designated earlier time.
Automatic Close-Out Safeguard:
The 4:59 PM rule is a fail-safe, not a primary trade-close tool. It’s your responsibility to close all trades before 4:59 PM ET.
Leaving trades open may result in gaps that affect your threshold, potentially causing account failure. Relying solely on the auto-close feature is risky.
Maintaining the Profit Goal:
If you reach the profit goal before completing the minimum trading days, ensure your balance stays above the goal until the minimum trading requirement is met.
Account Status & Renewal:
Failed Account Reset: Accounts that fail and aren’t reset within eight days will be disabled if there are no active subscriptions. Reset the account or open a new one to continue.
Negative Balance on Renewal: A negative initial balance upon renewal doesn’t mean a failed evaluation; only a negative drawdown will constitute a failure. Accounts in a Failed or Blown state will receive a reset upon renewal.
Reminder: Please review the specific rules of Apex Trader Funding rather than assuming similarities with other companies. These evaluation guidelines are designed to help you meet the standards Apex sets for successful account funding.
Consistency and Planning for Success
Trading Consistency: Randomly changing trade sizes or going “all in” undermines long-term success. Following a consistent trading plan helps you grow your account steadily.
Consistency Rules: These apply mainly to PA and Funded accounts, where steady, structured trading is required.
Important: The trailing threshold provides a safety margin, but understanding its dynamics and monitoring it in real time is crucial to avoid unintended account liquidation.
Common Helpdesk Questions
These comprehensive answers are related to frequently asked questions, which will help you navigate our platform effectively. Please read carefully to fully understand our policies and procedures.
Platform Conversion
Can I convert from Rithmic to Tradovate or vice versa?
No, the account setups for Rithmic and Tradovate are different, and each platform has its own fees. If you wish to switch platforms, you must sign up for a new plan specific to that platform.
How important is it that I sign up for the right plan?
It is paramount that you choose the correct plan on our website or dashboard. If you select the wrong plan or platform, there will be no refunds, with no exceptions. We incur charges for every new account setup and cannot issue refunds for user mistakes. Please read all options carefully before you click to pay for your account! 
Evaluation Trading Accounts
Can I take the evaluation trading in SIM, or do I have to trade with live money?
All evaluations are conducted using simulation (SIM) accounts. You will log in with your Rithmic and/or Tradovate username and password, then select your evaluation account(s) for trading.
During the evaluation period, can I trade my evaluations, PAs, and my own account simultaneously?
Yes, if you have your own NinjaTrader license key, you can trade your evaluations, Performance Accounts (PAs), and your personal account at the same time.
Trading Frequency During Evaluation
Do I have to trade every day during my evaluation time?
No, you are not required to trade every day. You can take days off as needed. Trades can be spread out over time, as long as you have a minimum of seven traded days to qualify. There are no set time restrictions for eligibility.
Recurring Payments: Payments are made every 30 days for as long as you need the evaluation account.
Resets: You can reset the account as many times as necessary. Remember, you must have traded a minimum of seven days to qualify, regardless of how long it takes (unless there is an active promotion, including 1-day pass).
Maximum Position Size on Regular Contracts and Micros
What is the max position size on regular contracts and micros?
Max Position Size: The maximum position size is limited by the number of contracts specified in your chosen plan. This applies to all instruments and positions. For example, if your maximum is 10 contracts, you could trade 7 contracts on ES and 3 contracts on GC simultaneously, totaling 10 contracts. Orders exceeding this limit will be rejected.
Micros: You can trade micro contracts up to the maximum contract size listed for your plan. Available micro futures include:
Micro Futures Symbol Exchange
Micro E-Mini S&P 500 MES CME
Micro E-Mini Dow Jones MYM CME
Micro E-Mini Nasdaq-100 MNQ CME
Micro E-Mini Russell 2000 M2K CME
E-Micro Gold MGC CME
E-Micro AUD/USD M6A CME
E-Micro EUR/USD M6E CME
E-Micro USD/JPY M6J CME
Micro Crude Oil MCL NYMEX
Starting Your Evaluation
How many profitable weeks should I have before I’m ready for an evaluation?
You can start now! There is no requirement to have a certain number of profitable weeks before beginning an evaluation. In fact, our program offers an economical way to learn to trade and risk management without risking your own capital.
Learning Opportunity: Use the evaluation to develop your trading skills and strategies.
Risk Management: Avoid risking personal funds needed for essential expenses like retirement or education.
Leverage: For a small monthly fee, you can leverage substantial capital with the potential to receive payouts.
Age Requirement
What is the age requirement for having an evaluation and a funded account?
You must be 18 years old or older to participate in our evaluations and funded accounts. Breaching this rule will result in a permanent ban on using Apex services in the future.
Trading Days and Holidays
Do Sundays and holidays count as trading days?
Sundays: Trading on Sundays counts as part of Monday’s trading day. A trading day is defined as 6:00 PM ET one day until 4:59 PM ET the next day.
Holidays: You can trade on holidays if the market is open. However, half-day holidays do not count as a trading day.
Account Types: Static vs. Full
What is the difference between Static and Full Accounts?
Static Accounts: These accounts have a fixed trailing threshold that does not adjust with your account balance.
Full Accounts: These accounts have a trailing threshold that adjusts with your account balance and allows for larger contract sizes and stop-loss limits.
Account Activation Timing
Can I sign up today and start 10 days later?
Yes, you can sign up today and begin trading at a later date. However, please note that your monthly billing cycle starts on the day you sign up.
Trading Style
Do I continue trading the way I am now, or do I have to trade another way?
You can continue trading in your current style. However, to comply with our end-of-day policies, you must ensure that all your trades are closed by 4:59 PM ET each day.
Evaluation Time Frame
Do I have to complete the evaluation in a certain number of days?
You need to log seven trading days as part of the criteria to pass the evaluation, but there is no maximum time limit. You can take as long as you need to qualify.
NinjaTrader License Key
Do I have to use my own NinjaTrader license key?
No, you don’t have to use your own key. We provide you with a NinjaTrader license key if needed.
Profit Target Trading Days (Outside of 1-day-pass promotions)
Seven trading days are the minimum required days for the profit target. What is the maximum?
There is no maximum. You can take as long as you need to qualify. To pass the evaluation, you must:
Trade at least seven separate trading days
Meet the profit goal
Follow all trading rules
Demonstrate consistent trading ability
Professional Status and Data Fees
What is the difference between “non-professional” and “professional”?
Non-Professional: Most traders are non-professional, and your data fees are included in your plan.
Professional: Selecting ‘Professional’ incurs extra fees. For CME professional data, fees are $115 or more per calendar month per exchange, in addition to other fees. Only select ‘Professional’ when setting up Rithmic if you are truly a professional trader.
Important: Choosing ‘Professional’ unnecessarily will result in significant additional costs.
Margin Calls
Who gets the margin call if it happens?
You do not receive margin calls. Apex Trader Funding handles all margin requirements internally.
Profit Goals and Commissions
Is the profit goal net of commissions after all in costs (profits and losses)?
Yes, the profit goal is net of commissions and all associated costs. You can view your real-time profit and loss (PnL) and account balances in RTrader or the Tradovate web app.
Account Violations and Resets
What happens if I violate a trading rule?
If you receive an error message indicating a rule violation (e.g., surpassing the maximum drawdown), your account may be disabled.
Evaluation Accounts: You will need to reset your account or start a new evaluation. Resets allow you to start over with the full balance and trailing threshold.
Performance Accounts (PAs): Resets are not available. Violations in a PA account may lead to account closure.
Trading Multiple Accounts
Why would I want to trade multiple evaluation accounts?
Trading multiple accounts can diversify your strategies and increase potential profits. For a detailed explanation, please refer to our video here:
Data Fees Responsibility
Am I responsible for data fees?
Level 1 Data: Level 1 data (L1) is included in your fee; there are no additional charges.
Depth of Market (DOM):
Rithmic: If you purchase DOM through Rithmic, it will expire on the last day of the month and will not auto-renew. You must manually purchase it again if needed, regardless of the purchase date.
Tradovate: If you purchase additional data feeds through Tradovate, you will need to cancel those feeds directly through Tradovate if you no longer wish to be billed.
Eval Charts Tutorial and Troubleshooting
Our Evaluation and PA Charts provide a clear visual overview of your trading performance and account status. On the left-hand side, the ‘Eval Charts’ or ‘PA Charts’ section in the sidebar is where you access these detailed graphs and tables. 
At the top, you’ll see a cumulative Profit and Loss (PnL) chart, which shows how your account’s profits or losses have changed over time, measured in trading days.
Directly underneath, each row of the table displays key account metrics updated nightly at midnight ET. These include your most recent trade date, account type, total PnL, and the number of trading days completed. You can also see critical thresholds such as the trailing stop (maximum allowed drawdown), current account balance, target profit levels, and an easy-to-read progress bar that visually indicates how close you are to reaching the goals or potential breaches. 
Finally, the status and state columns inform you if the account is active, inactive, passed, or blown, ensuring you always know exactly where you stand in your evaluation or PA journey.

##### What are the Consistency Rules for PA and Funded Accounts?

What are the Consistency Rules for PA and Funded Accounts?
THIS PAGE HAS UPDATED DETAILED INFORMATION ON RECENT CLARIFICATIONS OF RULES
PA and Live Funded Accounts
At Apex Trader Funding, we believe that responsible, disciplined trading is the key to long-term success. Our consistency rules for PA and Live accounts are designed to help you build a sustainable and successful trading career. These rules are not just about limitations; they are about creating a strong foundation for you to grow and thrive as a trader.
Violating these rules can result in denied payouts and even account closure, so it's essential to understand and follow them carefully. Let’s break down what Apex expects from its traders and how you can maintain compliance.
A Long-Term Relationship with Apex
When you trade with Apex, we see it as a partnership. We want to fund consistent, reliable traders who are committed to growing their accounts over time. Apex is more than just a funding provider—we’re here to support your journey and help you develop a strategy that works for you.
We value traders who treat trading as a profession, not a gamble. By adhering to our consistency rules, you’re showing that you’re ready for a long-term relationship—one where you can grow your account and increase your profitability in a sustainable way.
Evaluation Accounts vs. PA/Live Accounts
For more information on Evaluation Accounts, please see the EVALUATION RULES PAGE
Evaluation Accounts: There are no consistency rules during this phase, which is focused on meeting profit goals and overcoming the Trailing Drawdown.
PA and Live Accounts: Have specific consistency rules. Violating these rules could result in denied payouts or account closure.
By successfully navigating the evaluation phase, you set yourself up for the next stage, where you can move towards a funded account with a more structured trading approach.
Are Performance Accounts (PA) Live?
Performance Accounts (PAs) begin as simulated (SIM) accounts, but they use live market data to replicate real trading conditions. While these accounts are initially simulated, traders are paid just as they would be with a live account.
Starting with a SIM account offers advantages for both traders and the company. Trading can be unpredictable, and many traders may struggle to maintain their accounts in the early stages. Using SIM accounts initially provides a safety net, reducing the risk for both parties while still ensuring a realistic trading experience.
Transitioning to Live Accounts
When a trader demonstrates consistent performance in their SIM account, the trades are mirrored in a live account through an Application Programming Interface (API). This allows traders to continue refining their strategies while their success is evaluated in real-time market conditions.
Once long-term consistency is confirmed, the trader will be contacted regarding a transition to a live account. At this stage, the trader is directly engaging with live markets, and their account is no longer simulated. This process is directly communicated to the traders considered for Live Accounts. 
The Help Desk has no further information regarding hypothetical questions about Live Accounts. You will be contacted when considered. Do not submit tickets regarding this.
Key Terms:
SIM (Simulated): A practice account that replicates live market data but does not involve actual money or live trades.
API (Application Programming Interface): A tool that connects systems, enabling trades from a SIM account to be mirrored in a live account.
By taking this step-by-step approach, Performance Accounts (PAs) strike a balance between providing traders an opportunity to prove themselves and ensuring responsible risk management.
Trailing Drawdown Rule
In a Performance Account, the trailing drawdown starts at the liquidation threshold, which is determined by your plan's max drawdown amount. As your account balance increases, the trailing drawdown follows your peak unrealized balance until it reaches a fixed point, which is called the Safety Net (initial balance + drawdown limit + $100). The trailing drawdown stops moving when your peak unrealized account balance reaches the Safety Net. For a reminder on how the Trailing Drawdown Threshold works, click here.
Example; 
A $50,000 account has a safety net of $52,600, which is the $2500 drawdown plus $100.
A $150,000 account has a safety net of $155,100, which is the $5000 drawdown plus $100.
If you have $6000 profit for both accounts, the drawdown threshold will still be fixed at the starting balance plus $100.
Contract Scaling Rule
To promote disciplined growth, the Contract Scaling rule outlines how traders manage contract sizes during the growth phase of the account.
Initial Limit: Traders are restricted to trading half of their maximum allowed contracts until they reach the trailing threshold stop.
Threshold Reached: Once the account's End-of-Day (EOD) balance exceeds the trailing threshold (the initial balance + trailing drawdown + $100), traders can then use their full contract limit starting with the next full trading session.
For 100K Static Accounts: Full contracts can be traded after reaching the safety net amount of $2,600.
For example, on a $50,000 Performance Account (PA) with a maximum of 10 contracts, traders can initially trade up to 5 contracts. When the account EOD balance reaches $52,600 ($50,000 initial balance + $2,500 trailing drawdown + $100 buffer), the trailing stop no longer applies, and traders can trade the full 10 contracts.
Once the trailing threshold is reached, traders can continue using the full contract limit even if the account balance drops below the threshold.
Single Violation Penalty: If more than half of the maximum allowed contracts are accidentally traded, traders are expected to close out the excessive contracts immediately. Failure to do so may result in the payout request being denied and the account being reset to the EOD balance from the previous trading day, which is the day before the first scaling rule violation occurred.
The trader would then need to complete 8 additional compliant trading days before becoming eligible to request another payout.
Consistent Violation Penalty: Blatant or repeated violations of the scaling rule will result in account closure and forfeiture of all balances.
30% Negative P&L Rule - Maximum Adverse Excursion (MAE)
The 30% Negative Profit and Loss (P&L) Rule limits the loss a trader can incur on any single trade, providing a structured approach to risk management. Under this rule, the live, unrealized, open negative P&L cannot exceed 30% of the account's profit balance at the start of the day on a per-trade basis.
This is not a daily loss limit, but a control to prevent excessive loss on any individual trade. At any point, your open negative P&L should not surpass 30% of your start-of-day profit. Regularly monitor your trades and exposure to stay compliant with the rules.
Limit on Losses: Open trades should not exceed a 30% negative drawdown from the account’s profit balance.
Example: For a $50,000 account, if the profit balance is $4,000, a trader should not allow a drawdown exceeding $1,200.
New/Low Profit Accounts: For accounts that are new or have low profits, the 30% rule is based on the trailing threshold (e.g., 30% of $2,500 on a $50,000 account would be $750).
Adjustment Based on Growth: If the end-of-day (EOD) profit balance doubles the safety net, traders may use a 50% drawdown limit instead of 30% starting with the next full trading session.
Example:
For a $50,000 account, if you accumulate $2,600 in profit and pass the safety net, your risk is calculated based on 30% of that $2,600. If your profits rise to $5,200, your drawdown allowance can increase to $2,600 (50% of $5,200).
At Apex Trader Funding, responsible trading is at the core of our practices, and managing drawdowns is a crucial part of that. Here’s what you need to know:
Continuous Monitoring: We encourage you to regularly monitor your trades and adjust your positions as needed to stay within these limits. If your drawdown approaches 30%, consider closing or adjusting your trades to avoid breaching the limit. Quick adjustments can help prevent any compliance issues.
Temporary Exceedances: If your drawdown momentarily exceeds 30% but you act quickly to manage the situation, there won’t be an automatic penalty. However, repeated or significant breaches could lead to warnings or account restrictions.
Adhering to these guidelines can ensure that your trading strategy remains robust and sustainable. These terms should be strictly followed to ensure consistent compliance with Apex's 30% negative P&L rule.
Static Accounts
The 30% Negative P&L rule for Static Accounts is designed to help manage risk by ensuring that losses are kept within safe limits. The rule applies in two stages: one when the account balance is below the safety net, and another when it exceeds the safety net.
Below the Safety Net ($2,600): When the account balance is below the $2,600 safety net, the maximum loss per trade is $187.50. This is 30% of the fixed $625 drawdown that applies to accounts at this stage. Essentially, until the balance surpasses the safety net, the rule restricts your loss on any single trade to $187.50.
Above the Safety Net ($2,600): Once the account balance exceeds $2,600, the 30% Negative P&L rule is recalculated based on the current profit balance in the account. For example, if your account reaches $103,000, which includes a $3,000 profit, the maximum allowable loss per trade is $900 (30% of the $3,000 profit).
30% Consistency Rule - Windfall
The 30% Consistency Rule ensures that no single trading day accounts for more than 30% of the total profit balance at the time of a payout request. This rule promotes consistent trading practices and discourages high-risk, erratic trading styles.
Key Details to Note:
Profit Restrictions: If a single trading day generates more than 30% of the profit balance accumulated since the last approved payout, or since the start of trading if no payouts have been made
Reset After Payout: Once a payout is approved, the 30% rule resets and applies only to profits earned after the most recent payout. It does not look back at previous trading periods.
Exceptions: The rule applies until the sixth payout or until the account is transferred to a Live Prop Trading Account. At that point, the 30% rule is no longer in effect.
Easy Calculation Method:
Formula: Highest Profit Day ÷ 0.3 = Minimum Total Profit Required
Example:
On a $50k account, if your highest profit day since your last approved payout (or since you started trading, if this is your first payout request) was $1,500:
Calculation: $1,500 ÷ 0.3 = $5,000
In this situation, to request a payout, you would have to have at least $5,000 in total profit (current balance minus starting balance). If your current total profit is below this minimum, you’ll need to continue trading until you meet this requirement before requesting a payout.
Risk Management, Stop Losses, Profit Targets, Trailing
Apex Trader Funding provides traders with an opportunity to demonstrate disciplined risk management and effective trading strategies. Proper risk management is not just encouraged but is mandatory for all accounts, ensuring that trading is conducted responsibly and without speculative or reckless behavior.
5:1 Risk-Reward Ratio Rule
The 5:1 Risk-Reward Ratio Rule is a risk management guideline that ensures your trades are balanced with a responsible amount of risk relative to the potential profit. For every trade you make, your stop loss should not exceed five times the amount of your profit target.
For example:
If your profit target is 10 ticks, your maximum stop loss should be 50 ticks (5 times your profit target).
If you set a stop loss beyond 50 ticks, such as 100 ticks, this would violate the rule.
Following the 5:1 rule helps you manage risk by ensuring that you are not taking excessive losses relative to your target profits. This helps protect your account balance and encourages more disciplined trading over time. It also promotes a strategy where your potential rewards are always greater than the risks you are taking on each trade. By following the 5:1 Risk-Reward Ratio, you maintain a disciplined trading approach that supports long-term success and helps you manage risk effectively.
Stop Losses and Risk Management
Stop Losses Are Required: Trading without a stop loss or relying solely on the Trailing Threshold to manage risk is strictly prohibited. Every trade must have a pre-defined risk level, either through manual stop-loss orders or a mental plan that adheres to your strategy. Letting an account "blow out" by hitting the Trailing Threshold is not acceptable.
Risk-to-Reward Ratios: Apex enforces a maximum risk-to-reward ratio of 5:1. For instance, if your profit target is 10 ticks, your stop loss should not exceed 50 ticks. Similarly, if your goal is to make $100 in profit, the stop loss should not risk more than $500. This ensures responsible trading and prevents excessive risk on trades.
Prohibited Practices: Strategies that involve “all-in” trades with maximum contract sizes, particularly at the start of a PA account, to quickly overcome the trailing drawdown are prohibited. These windfall or gambling approaches violate Apex’s standards and may result in forfeiture of accounts or payouts.
Proper Use of Stop Losses and Profit Targets 
Planned Exits for Both Losses and Profits: Before initiating any trade, traders must have a clear plan for managing both risk and profit targets. Stop losses, profit targets, and trailing stops should align with the strategy's historical performance and back-tested data.
Trailing Stops for Profit Protection: As the market moves in your favor, trailing stops should be used to secure gains while allowing profits to run during trends. However, stops should not be moved backward to increase risk and potentially violate the drawdown rules. Adjusting stops forward to protect profits is a key aspect of effective risk management.
ATM Strategies for Automation: Apex encourages the use of ATM (Advanced Trade Management) strategies, which automate stop-loss and profit-target levels. These can be adjusted during trades to protect profits while adapting to market conditions.
Mental Stops Are Permitted: Traders familiar with their strategy may use mental stops instead of placing hard stop-loss orders. However, mental stops must still be honored. For traders on Probation, hard stop-loss levels are mandatory.
Trending and Long-Term Strategies: In trending or longer-term strategies where specific profit targets may not be clear, the initial stop loss becomes especially important. It defines the maximum risk, allowing the trade to be managed responsibly, even in volatile conditions.
Payout Evaluation Requirements
During the eight-day evaluation period, traders must demonstrate consistency by achieving a profit of at least $50 on five different trading days. Strategies such as "flipping" trades—closing and re-entering positions to adjust to market conditions—are allowed as long as they align with a structured plan and meet the $50 minimum profit requirement on eligible days.
Consistency and Discipline
Apex requires traders to demonstrate consistent and disciplined trading. Risk management strategies should avoid speculative windfall approaches, such as:
Entering large contract positions at the start of a PA account in an attempt to quickly overcome the trailing drawdown.
Using the Trailing Threshold limit to manage risk without applying proper stop-loss strategies.
Traders are expected to maintain consistent trade management practices, adhering to their system's guidelines for stop losses, profit targets, and risk-to-reward ratios.
Risk management is the cornerstone of successful trading. Every trade must include a defined risk level, a clear exit strategy for both profit and loss, and adherence to the 5:1 maximum risk-to-reward ratio. Reckless trading practices—such as speculative “all-in” trades, adjusting stops to increase risk, or relying solely on the Trailing Threshold to manage risk—are prohibited. By implementing a systematic and disciplined approach, traders can achieve consistent results while protecting their accounts and advancing toward Live Prop Trading Accounts.
Max Contracts Rule
The Max Contracts Rule ensures traders adhere to the defined contract limits for their account and discourages any attempts to abuse or circumvent these limits.
Key Guidelines:
Traders must not exceed the maximum contract limit set for their account at any time.
Attempts to bypass the limit through combined instruments or micro contracts are prohibited.
Examples of Violations:
Trading the maximum contracts on multiple instruments simultaneously (e.g., 10 contracts on ES and 10 on YM for a 10-contract limit account).
Exceeding the maximum contract limit directly (e.g., trading 20 contracts on a 10-contract limit account).
Using micro contracts in a way that circumvents the maximum contract rule (e.g., excessively trading micro contracts to replicate full contract exposure).
Violations or attempts to abuse the max contracts rule will result in the termination of the account without a refund or payout. Traders are expected to respect these limits to maintain account compliance and avoid penalties.
By adhering to the Max Contracts Rule, traders can ensure they remain in good standing while fostering disciplined trading practices.
Contract Size Consistency Rule
Maintaining a consistent approach to contract sizes is essential for demonstrating disciplined and professional trading behavior. While the rules allow flexibility for strategic adjustments, erratic or manipulative changes in contract sizes are strictly prohibited.
Key Guidelines:
Consistent Strategy: Traders must use contract sizes that reflect a consistent trading approach. Adjustments based on market conditions, such as reducing size during high volatility or increasing size as the account balance grows, are acceptable as long as they align with a systematic strategy.
Example: Starting with 2 contracts and scaling up as profits increase is consistent. Conversely, trading 10 contracts one day and dropping to 2 contracts the next solely to secure a payout is not.
Scaling with Growth: As the account balance grows and the cushion increases, contract sizes should scale proportionally. This reflects disciplined account management and responsible risk-taking.
Example: A growing balance justifies a steady increase in contract sizes. Reducing contract sizes despite growth out of fear of losing profit before a withdrawal is considered a lack of discipline and an invalid strategy.
Responsible Adjustments for Losses: If the account balance decreases due to losses, it is reasonable and responsible to reduce contract sizes to manage risk. Similarly, after a withdrawal reduces the account balance, trading smaller sizes is prudent until growth resumes.
Prohibited Practices:
It is not allowed to use large contract sizes early in a PA Account to chase lucky trades or recover losses, followed by a sudden reduction in size.
Cycling through multiple PA Accounts by starting with substantial sizes, losing the balance, and resetting accounts to repeat this behavior is considered manipulative and is grounds for account termination.
Making drastic, inconsistent changes in contract size solely to manipulate payouts or the evaluation process will result in forfeiture of payouts and, potentially, probation status.
Expectations for Payout Eligibility:
Traders must maintain consistent trading behavior throughout the account's lifecycle, from inception to payout. This includes using the same contracts, sizes, and targets unless modifications are made logically due to account growth or loss.
To demonstrate profit stability, traders may be required to trade consistently for eight days with uniform contract sizes before becoming eligible for a payout request.
By adhering to these guidelines, traders can ensure their trading approach reflects professionalism and discipline. Apex is committed to funding responsible traders, not those engaging in high-risk, erratic, or manipulative practices. Consistency is key to maintaining account compliance and securing payouts.
Dollar Cost Averaging (DCA) Rule
Dollar Cost Averaging (DCA) involves entering additional trades in the same direction as the original order, even if the market moves against the trader’s position. As the market moves contrary to the trade, the trader continues to add more entries in the same direction.
Key Guidelines:
Permitted Use: DCA is allowed under this agreement with no restrictions on contract size for additional entries.
No Entry Restrictions: There are no specific rules for determining entry points, timeframes, or distances from the original order.
Risk Management: Traders must maintain responsible risk-to-reward ratios when using DCA.
Compliance with Consistency Rules: DCA is acceptable as long as it does not violate other consistency rules, such as the 30% profit in a day rule or the 30% negative P&L rule.
Responsible Application: Traders are expected to apply DCA consistently and responsibly to adhere to these rules and avoid potential issues.
By following these guidelines, traders can effectively utilize DCA while adhering to the account’s rules and risk management framework.
Adding to Trades
Traders may add to their trades as the market moves in their favor, following a defined trading strategy or system rules. For example, if a trader enters a long position and the market moves positively, they may add additional long contracts to capitalize on the trend.
Key Guidelines:
Strategic Entries: Traders are permitted to scale into winning trades in PA Accounts, using larger contract sizes if supported by their strategy.
Directional Bias: All additions must align with a clear directional bias and follow a consistent, defined strategy. Random or reckless entries in hopes of a market turnaround are not allowed.
Acceptable Scaling: Adding contracts to a profitable trade as part of a structured approach is acceptable and encouraged for disciplined trading.
Prohibited Practices: Entering large contract sizes at the outset without a clear strategy or placing trades purely in anticipation of a market reversal is prohibited.
By adhering to these guidelines, traders can effectively scale into profitable trades while maintaining consistency and professionalism in their trading approach.
Safety Net Requirement Rule
Applies to First Three Payouts Only: The safety net requirement must be observed for the first three approved payouts. As of the fourth payout, the safety net requirement is no longer applicable.
Safety Net Definition: The safety net is defined as the amount equivalent to the drawdown based on the account size plus an additional $100.
Applies to All Accounts: This rule applies to both new and existing accounts, ensuring consistency for traders as they progress.
Minimum Payout: If you have reached the safety net threshold, you can request a payout of at least $500, even if it exceeds the safety net amount.
Payouts Above Minimum: 
To request a payout over $500, the balance must exceed the safety net threshold by an amount equal to the additional amount requested.
Example:
For a $50,000 account, the drawdown is $2,500, so the safety net is calculated as $2,500 + $100 = $2,600. 
A trader with this account reaches a balance of $52,600. The trader can request the minimum payout of $500, leaving the balance at $52,100. This is acceptable, even though it encroaches on the safety net by the $500 allowed.
To request a higher amount, for example, $1,200, the balance must exceed the safety net by the additional amount requested above the minimum of $500. In this case, the additional amount is $700, meaning the account balance must be at least $53,300. Requesting the $1,200 would leave the account balance at $52,100, which is still acceptable since it encroaches on the safety net by no more than the $500 allowed.
Flipping Trades Rule
Flipping is Allowed at Apex Trader Funding, but it must be done strategically and within the guidelines. Flipping refers to opening and closing trades quickly within the same day. While this is allowed, it must meet certain criteria to count toward your trading goals. Here's what you need to know about the Flipping Trades Rule.
Conditions for Flipping:
Minimum Profit Requirement:
To count towards your trading day, you must achieve a minimum profit of $50 per day from the flipped trades. This ensures that flipping is done with a goal of steady profitability, rather than just making quick trades for the sake of meeting minimum activity.
Consistent Performance:
You must flip trades for at least 5 trading days to meet the eligibility criteria for consistent trading performance. This means that on each of those days, you need to hit the $50 profit target.
Example of Flipping Trades:
Day 1: A trader opens and closes several quick trades throughout the day, earning a $60 profit. Since this exceeds the $50 minimum, this day counts toward the 5-day trading goal.
Day 2 to Day 5: The same trader repeats the process over the next four days, earning a profit of at least $50 each day. This results in meeting the 5-day trading consistency requirement.
One-Direction Rule (Directionally biased trading)
Single Direction Rule: Traders are only allowed to hold a position in one direction at any time—either long (buy) or short (sell). Traders are also prohibited from using a non-directionally biased strategy where they have open orders for both sides of the market
No Hedging: Holding both long and short positions simultaneously on the same or correlated instrument is strictly prohibited. This rule ensures that trades are based on strategic analysis rather than speculative attempts to hedge both sides during a news-driven breakout.
News Trading Rule
Apex Trader Funding allows traders to engage in news trading during significant market events, where rapid price movements can present profitable opportunities. 
Automation in Trading
At Apex Trader Funding, the use of automation is strictly prohibited on PA and Live accounts. This includes any form of AI (Artificial Intelligence), Autobots, algorithms, fully automated trading systems, and high-frequency trading (HFTs). These types of systems that trade without active human intervention are not allowed.
Any type of hands-off, set-and-forget, or set-and-walk-away trading, including systems that run continuously 24 hours a day, is strictly prohibited. Using these types of automation will result in the immediate closure of your PA or Live account and the forfeiture of all funds and balances.
Semi-automated software can be used, but it must be actively monitored by the trader at all times. This means the trader must be present and actively managing the trades, making adjustments based on market conditions, news events, and other factors. The software should assist in executing trades based on predefined rules, but the trader must remain in control, overseeing every aspect of the trading process.
It’s also advised to turn off or pause the semi-automated software when market conditions aren’t ideal, or when a trade setup isn’t clear. The purpose of this software is to assist with the speed and accuracy of placing trades—not to act as a fully automated system that trades on its own.
By following these guidelines, you ensure that you remain in full control of your trades, using automation responsibly to enhance your trading process without replacing the trader's judgment.
Please note that the results from the use of any trade copiers or external programs are the sole responsibility of the trader listed on the account. Apex Trader Funding reserves the right to take action should there be any rule violations resulting from the use of these programs. 
Hedging and Correlated Instruments Rule
Traders shall not trade one direction on minis and another direction on micros at the same time. Traders shall not spread trade indices, i.e., long ES, and short YM. All Apex accounts must be traded directionally only and never be both long and short concurrently in the same account or in other accounts in any correlated markets. This includes all indices, metals, grains, currencies, or any correlating instrument, no matter the size, i.e., micro, mini, etc. For example, the trader cannot be short NQ and Long ES under any circumstance.
Copy or Trading Services Operations or Participation
Performance Accounts (PA) and Live Prop Accounts must be traded exclusively by the individual listed on the account. Under no circumstances can these accounts be managed or influenced by any other party, person, system, automated trading bot, copy trading service, or trade mirroring software.
Failure to comply with this rule constitutes an immediate breach of contract and will result in the closure of all associated user accounts. Traders are required to maintain sole responsibility for all trading activity within their accounts to ensure compliance with Apex’s standards.
Defined System with Set Rules
At Apex Trader Funding, having a defined trading strategy with clear rules is essential for success. Traders are required to establish a system that includes set guidelines for entries, stops, targets, and trailing stops, and must follow these rules consistently and with discipline. This approach is designed to foster steady, sustainable trading, not speculative or erratic behavior.
What is a Defined System?
Traders must have a systematic approach to their trading that can be explained and tracked. The system should include:
Set Rules for every trade (entry points, stop losses, profit targets, and trailing stops).
A normal day-to-day system that can be consistently applied across multiple trading sessions.
Clear, trackable performance that can be explained if requested, ensuring transparency.
This systematic approach is critical for ensuring that the trader’s decisions are based on strategy, not emotion or random actions.
What Apex Doesn’t Want
Apex is not looking for traders who gamble with their accounts or aim for "lottery-style lucky windfalls." Traders who blow through multiple accounts in pursuit of big, unpredictable profits do not demonstrate the consistency and discipline Apex values. Think of it this way: If you were funding a trader, would you feel comfortable with someone who consistently takes reckless risks without a structured approach?
Review Process for Compliance
Apex reserves the right to request a detailed explanation of your trading system, including:
Marked-up charts of trades you’ve executed, as evidence of consistent rule adherence.
A live Zoom session to observe and confirm that you’re following your strategy during actual trading sessions.
Recordings of your trading sessions to review your system’s consistency, including explanations of your entries and exits.
Documentation showing the tools, indicators, platforms, and contract sizes used during your trading sessions.
Apex will use these materials to assess whether your trading strategy is consistent and aligned with the rules you’ve set. This process ensures that you’re adhering to a defined system and not relying on random or speculative actions.
Directional Bias and Consistency
Apex only approves directional trading strategies, where there is a clear bias for the trade. This means you should always have a predetermined direction and bias based on your system and not execute trades without this clarity. Traders are not allowed to place:
Bracket orders in both directions without a clear directional bias (e.g., long limit order and short limit order placed in anticipation of a breakout).
Trading strategies that involve chasing market movements or seeking windfall profits without a systematic approach.
This type of non-systematic trading, where trades are placed without a clear direction or rationale, is often a sign of a trader who does not have a defined strategy and is instead speculating on market moves. Apex does not tolerate this behavior.
Consequences of Non-Compliance
Any funds earned during periods of non-compliance or from trades that do not align with the approved system will be deducted from the account. This is in line with the PA Consistency guidelines outlined in the FAQ section and the video series on the Apex Trader Funding website.
Prohibited Activities
To maintain integrity and ensure funding is provided only to disciplined and consistent traders, Apex Trader Funding strictly prohibits the following activities in Performance Accounts (PA):
Trading With Risk Management: All trades must have either pending or mental stop losses and a well-defined risk management strategy. Trading without these measures is strictly prohibited.
High-Risk Strategies: Strategies that involve small profit targets while risking disproportionately large amounts are not allowed. For example, setting a five-tick profit target with a 150-tick stop loss demonstrates unacceptable risk management.
Using the Trailing Threshold as a Stop Loss: Traders are prohibited from using the account's full threshold as a stop-loss mechanism to absorb large losses, leading to account liquidation.
Stockpiling Evaluation Accounts: Purchasing multiple discounted evaluation accounts to cycle through and intentionally "blow up" accounts in pursuit of windfall profits is not permitted.
Unsustainable Strategies: Any trading, risk management, or implementation that fails to demonstrate consistent growth and sustainability is prohibited. This includes schemes or behaviors that do not align with responsible trading practices.
Deviating from Professional Standards: Traders must employ strategies and risk management techniques consistent with those they would use in a personally funded account at a registered broker. Apex does not fund traders who deviate from this standard.
Manipulation of the simulated trading environment: Apex Trader Funding strictly prohibits manipulation or exploitation of the simulation environment in any way including High Frequency Trading (HFT) or any other exploitative strategies.
Unauthorized Users: Allowing any individual other than the registered owner to access or perform account verification is strictly prohibited. Apex reserves the right to request additional information — including audits and verification procedures — from the account owner to ensure that only the authorized user is trading or accessing the account and to enforce compliance with the contract.
Account and Resource Sharing: Sharing MAC addresses, computers, IPs, credit cards, or trade copying with other traders is strictly forbidden. Violations will result in account closure, forfeiture of funds, and potential additional verification or audits to ensure compliance.
Multiple Account Creation: Creating multiple user accounts is prohibited and is a bannable offense. For more information, please see the following article: Apex Trader Funding Accounts.
Traders engaging in these prohibited activities will forfeit their accounts and all associated balances. Apex reserves the right to audit accounts further if there is a suspicion of non-compliance to guarantee adherence to the trader agreement.
By adhering to these guidelines, traders can maintain their accounts in good standing and demonstrate the consistent, disciplined approach Apex seeks to fund.
Account Probation Status
If your account is placed on probation, it signifies that specific compliance guidelines need your attention. For more information, please refer to the details provided in the notification email. Understanding the compliance rules and the required next steps is essential to restore your account to good standing.
Consequences of Non-Compliance
If the account does not meet the requirements during the probation period, further action may be taken, including denial of payouts, profit removal, and/or account closure.
Remember: Probation is a chance to improve and prove that you can maintain a consistent, responsible trading strategy. By maintaining a consistent, disciplined approach to your trading during probation, you can restore your account to good standing and continue working towards a successful partnership with Apex Trader Funding.
Summary of Core Trading Rules
Use a Genuine Trading Strategy: Traders must employ a consistent, real-world trading strategy that aligns with live market conditions.
DCA (Dollar-Cost Averaging) is Allowed: DCA is permitted as long as it does not violate any other consistency rules (i.e. 30% profit in a day, 30% negative P&L, etc.).  DCA needs to be applied consistently and responsibly to satisfy the rules.
Flipping Trades is Allowed: Opening and closing trades quickly to count as a trading day is permitted, as long as the $50 minimum profit for 5 days is satisfied.
News Trading is Allowed (with Restrictions):
Trading based on news events is permitted; however, traders cannot take opposing positions (e.g., long and short) on the same news event.
News trading is permitted as long as it does not violate any other consistency rules (i.e. 30% profit in a day, 30% negative P&L, etc.). 
News trading needs to be applied consistently and responsibly to satisfy the rules.
Trade Half Contracts Until Trailing Stop is Achieved: Traders are limited to trading half of the available contracts until they meet the trailing stop threshold, encouraging careful risk management.
Maintain a 5:1 Risk-Reward Ratio on Trades: Ensure a maximum 5:1 risk-to-reward ratio on all trades. For instance, if targeting a profit of 10 ticks, the stop loss should not exceed 50 ticks.
Observe the 30% Negative P&L Limit (Adjustable to 50%):
Maintain a 30% drawdown limit based on the account’s profit balance. As the account grows, this limit may be adjusted to 50%, providing more flexibility as the account becomes more established.
Example: A trader starts with a 30% drawdown limit, which can be raised to 50% once their account balance meets specified growth conditions.
Practical Example: A trader adhering to a defined, consistent strategy, observing the half-contract limit until the trailing stop is cleared, maintaining a 5:1 risk-reward ratio, and ensuring no drawdown exceeds 30% (or 50% if eligible) would be considered fully compliant under Apex rules.

##### Evaluation Subscription & Billing

Evaluation Subscription & Billing
30 Day Subscriptions
This article provides detailed information about the fees associated with your Evaluation Account, what happens if you fail the evaluation, and how to manage your account/subscription effectively.
Are There Any Other Fees Besides the Monthly Fees?
No, there are no additional fees besides the monthly Evaluation fee.
The monthly Evaluation fee includes everything you need to trade:
Evaluation Account with all tracking features
Level 1 Data feed access
NinjaTrader Platform License key
Optional Fee:
Reset Fee: If you fail the evaluation test, you can reset your account for an additional fee. This does not change your 30-day billing cycle; it is simply a fee that resets your balance alone.
Transition to a Performance Account (PA):
When you pass the evaluation, the fees for your Evaluation Account continue until you pay the PA activation fee to convert your evaluation into a performance account.
If you choose to continue with a Performance Account, the fees for the PA account will begin and your evaluation subscription is automatically canceled upon conversion to PA.
Does Failing an Evaluation Cancel My Account Automatically?
No, failing an evaluation does not automatically cancel your account.
Options After Failing:
Reset Your Account: You can opt to reset your Evaluation Account to start the evaluation process again with the original billing cycle.
Cancel Your Account: To cancel, you must log in to your Members’ Area and manually cancel your subscription.
Renewing Subscription: If your account is in a failed status as of the market close on the day before the renewal, we will reset the balance as part of the renewal fee.
Important:
Recurring Billing: If you do not cancel your account, billing will continue to recur every 30 days.
Resets
If you’ve reached the drawdown threshold (max loss) in your Evaluation account and can no longer trade—receiving an error message stating, “Trades Can only Be Placed By Administrator”—you may need to reset your account. This guide explains how to reset your evaluation account and the associated policies, and it provides step-by-step instructions.
Why Reset Your Account?
Resetting allows you to:
Start Fresh: Begin with a full balance and full trailing drawdown.
Zero Days Traded: Reset your accumulated trading days.
Continue Trading: Resume trading within your current subscription period without interruption.
How to Reset Your Account
Step-by-Step Instructions
Close All Positions (Important: Ensure all positions are closed before initiating a reset.)
Log In to the Members’ Area
Visit https://apextraderfunding.com/member.
Enter your credentials to access your account.
Purchase a Reset
Navigate to the account you wish to reset.
Click on the “Reset” button next to that account.
Costs (Unless there is an active promotion):
Rithmic Accounts: $80 per reset.
Tradovate Accounts: $100 per reset.
Confirm the Reset
Double-check: Make sure you’ve selected the correct account. This action is irreversible.
Proceed with the payment to complete the reset process.
Wait for Processing
Resets typically finish within 10 minutes, but may sometimes take longer.
Important Notes
Renewal Date Unchanged: Resets do not alter your account’s renewal or expiration date.
Irreversible Action: Once initiated, a reset cannot be undone.
Canceled Invoices: Resetting will not reinstate a previously canceled invoice.
Our Policy on Resets During Your Monthly Renewal
If your Evaluation account is in a failed status and you forget to cancel before the renewal date:
Automatic Charge: The subscription fee will be charged after midnight on the renewal date.
Automatic Reset: Your account will be reset automatically at no additional reset fee.
Trading Resumption: You can resume trading as your account will be active again.
Conditions for Free Reset on Renewal
Failed Status Required: The account must be in a failed status by the market close before renewal.
Subscription Renewal: The monthly fee must be charged; a free reset applies only upon renewal.
Automatic Process: The reset happens automatically after the fee is charged.
Manual Options:
Immediate Reset: You can manually reset before renewal by paying the reset fee.
New Account: Alternatively, cancel the current account and sign up for a new one to expedite funding.
Refund Policy
No Refunds on Resets: All reset fees are non-refundable.
Not Retroactive: The policy doesn’t apply to past resets.
Evaluation Accounts Only: This policy is exclusive to Evaluation accounts.
Single Reset per Renewal: If you fail the account after a reset, we won’t reset it for free again unless it renews in a failed status.
Additional Options and Tips
Unlimited Resets: You can reset your account as many times as needed without penalties.
Impact of Reset: Only your drawdown, initial balance, and trading days are affected; the renewal date stays the same.
Faster Funding: To avoid delays, consider resetting manually or signing up for a new account.
Purpose of This Policy
This policy assists traders who might forget they can cancel and sign up again using available discount promotions, preventing unnecessary charges for both renewal and reset fees.
Reminder
Close Positions Before Resetting: Always ensure all trades are closed.
Select the Correct Account: Verify you’re resetting the right account to avoid irreversible errors.
Processing Time: While usually quick, resets can sometimes take longer than 10 minutes. Please wait for the account to be created or submit a ticket for missing accounts. Resetting the same account twice cannot be reversed, and you will pay twice for a single reset balance.
Failed Renewals
At Apex, we strive to ensure a seamless experience for all our users. To support you in maintaining uninterrupted access to our services, we offer a 72-hour grace period for any failed renewal payments. This generous timeframe provides ample opportunity to update your payment details or manually renew your account, ensuring that your services continue without disruption.
What Happens During the 72-Hour Grace Period?
If a renewal payment does not go through, you will have three days to address the issue. During this period, you can:
Update Your Payment Information: Easily change your credit card details to ensure future payments are processed smoothly.
Manually Renew Your Account: Take control of your renewal process to avoid any service interruptions.
How to Manually Renew Your Account
To assist you in managing your account effectively, we have created a step-by-step guide below. Additionally, you can watch the accompanying video that demonstrates these steps visually.
Navigate to Your Apex Dashboard
Log in to your account and access the Apex Dashboard, your central hub for managing all account settings and information.
Click on Payment History
On the right-hand side of the dashboard, locate and click the Payment History tab. This section provides a detailed overview of all your past transactions and any failed payments.
Find the Invoice to Manually Renew
Browse through your payment history to identify the specific invoice that requires manual renewal. This is typically marked or flagged for your attention.
Click the Renew Manually Link
Once you've located the relevant invoice, click on the Renew Manually link. This action will prompt you to enter new payment details or confirm your existing information to complete the renewal process.
Important Note on Credit Card Information
When you manually renew your account using a different credit card, especially for accounts on CIM_2 (secure credit card processor 3), the new card information will become the default for all future renewals on that platform. To ensure accuracy and avoid any unintended charges, please remember to update your credit card information after performing a manual renewal if necessary.

##### How Many Paid/Funded Accounts Am I Allowed to Have?

How Many Paid/Funded Accounts Am I Allowed to Have?
What is the limit on trading accounts that I can have between me, someone in my house, a company I own, on Tradovate, Rithmic, and WealthCharts?
The total limit is 20 active PA accounts across all people in the same house, companies, and connections, whether the accounts are with Rithmic, Tradovate, or WealthCharts.
For example, you have an LLC with 5 PA accounts, your personal Rithmic account has 3 PAs, your personal Tradovate account has 4 PAs, and your wife/husband/significant other can have up to 8 accounts. This totals 20 PA accounts in the same household. 
Copy trading across PA accounts under your personal name and business name is allowed. However, the hedging rule still applies; all PAs must trade in the same direction and not hedge against correlated assets.
You CANNOT exceed a total of 20 active PA accounts.
If you have more than 20 PA accounts, you will be ineligible for payout and may be subject to:
forfeiture of all funds
closure of all performance accounts
permanent ban from Apex Trader Funding
There are no limits to Evaluation accounts.

##### Evaluation Passed, Converting to a PA, PA Fees, and How to Activate

Evaluation Passed, Converting to a PA, PA Fees, and How to Activate
Account Status
Congratulations on reaching the funding stage! This guide will walk you through the process of transitioning from an Evaluation Account to a Simulated Funded (PA) Account seamlessly and efficiently.
No Initial Requirements
There are no credit checks, background checks, or asset requirements to obtain an Evaluation Account or a PA Account. The only prerequisite is passing the evaluation test, which demonstrates your trading proficiency.
Transitioning to a Simulated Funded Account
When you’re ready to move from an Evaluation Account to a Simulated Funded (PA) Account, the following steps will apply:
Standard Paperwork: You will complete the same paperwork required to open a regular broker account.
Background Checks: Standard background verification procedures will be conducted.
Identity Verification: We reserve the right to verify your identity at any time to ensure account security.
After Passing the Evaluation
Evaluation Passed, Profit Target Hit, and Seven Trading Days Completed—What’s Next?
Once you have successfully passed your evaluation by meeting the profit target and completing seven trading days, here’s what you need to do:
Do Nothing: After passing the evaluation, do not cancel or reset your passed Evaluation Account. Let the process proceed automatically.
Monitor Your Email: Within two business days after the seventh trading day, you will receive an email containing:
A contract link
A payment link for your PA Account
This information will also be on the signatures tab of your Member’s Area. Note: This tab only shows up after you pass your first evaluation.
Verify Your Status:
Go to your Eval Charts tab.
Ensure you have completed seven trading days and met the account balance requirements. Your passed evaluation will also show up on your signatures tab, as shown above.
Note that updates may only appear on the eighth day.
Stop Trading on Evaluation Account: Cease all trading activities on your Evaluation Account to maintain your “Passed” status. If your account balance falls below the profit target after seven days, the status will change to “Not Passed.”
Keep your subscription active. Only evaluations still on an active billing cycle can be converted to a PA. If you pass one day before your rebilling date and fully activate your PA account within 48 hours from the moment your evaluation account passes, we can refund the evaluation renewal fee. To request a refund, please send a help desk ticket.
(Please note: An evaluation must be passed prior to market close the day before the renewal billing date.)
Automated Process
The transition to a PA Account is automated. Once the system detects that you have completed seven days of trading and met the profit target, it initiates the process on the eighth day.
No Need for Help Desk Tickets: Submitting a help desk ticket is unnecessary and will not expedite the process. The Help Desk does not have additional information regarding automated transitions.
Delayed Emails: If you do not receive the contract or payment link emails by the tenth day, then you may submit a help desk ticket for assistance. Before submitting a ticket, please check your signatures tab on your Member’s Area for the passed evaluation contract/payment links.
Finalizing Your PA Account
Sign the Contract and Make Payment:
Use the links provided in the email or on your Member’s Area Dashboard to sign the contract and complete the payment for your PA Account.
Once you sign the contract, you cannot re-access it. It is your responsibility to download the contract before you submit your signature. These documents are system-generated, and we cannot send out a blank copy. You will be required to pass another evaluation to download the contract.
Once you pay, the system will automatically cancel your passed Evaluation Account. Do not manually cancel the Evaluation Account yourself.
Activation of PA Account:
After completing the payment, you will receive an email notification confirming that your PA Account is ready for trading. Note: This process can take up to 4 hours for accounts to be created. Please do not submit a ticket until after this period.
Log In: Use the same username and password as your Evaluation Account.
Seamless Transition: Your PA Account will function just like your Evaluation Account, with no need to adjust to any new systems or procedures.
Signatures Tab
Activating your PA accounts correctly is essential for smooth operations and avoiding errors. Here, we outline the recommended steps for sequential activation, explain the system's processing order, and provide clarity on payment options for Lifetime and Monthly fees. Follow the instructions carefully to ensure accurate fee assignments and avoid irreversible setup issues. Visual guides (GIFs) are included to help you through the payment process for both Lifetime and Monthly options.
PA Account Assignment and Activation Order
To ensure correct fee assignments, it is recommended to activate your evaluations in numerical order:
Activate Passed Evaluation Accounts Sequentially: Start with Evaluation 01, followed by 02, and so forth.
Prioritize Lifetime Fees Over Monthly Fees: Pay for Lifetime PA fees first before addressing Monthly PA payments.
System Processing Order:
Payments are processed from the lowest to the highest account number.
Once a payment is set up, it cannot be altered because fees are charged immediately.
Example: If you have accounts 01, 02, 03, and 04, and you attempt to pay for and activate accounts 03 and 04 simultaneously, the system will prioritize activating accounts 01 and 02 first because of their lower account numbers. This prioritization applies to both Monthly and Lifetime PA Fees.
Activation Limit: You can activate and pay for up to 20 PA accounts. Once these accounts are set up, changes or cancellations are not possible. 
Paying for a Lifetime PA Fee first:
Paying for monthly PA fees:
How can you pay for your PA?
Payment Deadlines and Refund Policy
After passing your Evaluation Account, you must sign your PA agreements and promptly pay your PA fee using the Signatures tab or your Apex Dashboard.
Refunds:
If you pass your Evaluation Account before 5 PM ET on the day before your rebilling date and fully activate your PA account within 48 hours, you are eligible for a refund of the evaluation renewal fee (NOT the original account fee). Submit a Help Desk ticket with your account number (e.g., APEX-12345-67) to request this refund.
Important: Evaluations must be passed before market close on the day preceding the renewal billing date.
If you pass on the same day as your rebilling date, refunds for rebilling charges are not available. Remember, if your renewal date is the 20th, any trades after 6 PM ET on the 19th are classified as the trading day for the 20th, and this will count as the first day of your new subscription cycle.
If the Evaluation Account passed more than 1 day before your rebilling date, you will not be eligible for refunds of the renewal fee if you have not converted to a PA before the fee is charged.
Late Payments:
If you exceed the 48-hour window to set up your PA account after passing your Evaluation Account, no refunds will be processed for any recurring charges incurred during this period.
It is your responsibility to complete the PA setup within the 48-hour timeframe. Failure to do so means your passed Evaluation Accounts must remain active by paying the monthly renewal fees until you can finalize the PA setup and sign the necessary agreements.
No Exceptions: Recurring charges are non-refundable under any circumstances.
Understanding PA Account Fees and Payment Options
At Apex, managing your Paid Performance (PA) accounts is streamlined, with clear fee structures and payment options designed to suit your trading needs. Whether you're a new trader or managing multiple accounts, it's essential to understand the lifetime and monthly fee options, activation procedures, and billing processes to make informed decisions. This guide provides a comprehensive overview of PA account fees, payment options, and essential procedures to ensure a smooth experience with Apex.
Lifetime and Monthly Fee Options
Apex offers options for PA accounts to be paid via a Lifetime Fee or a monthly subscription. Once you have completed the payment for one of these options, the decision cannot be changed. Refunds will not be issued to change your payment decision.
Key Points:
Immutable Payment Choice: Once a payment option (Monthly or Lifetime) is selected for an individual PA account, it cannot be altered. For instance, if you choose the Monthly option during account setup, upgrading to a Lifetime Fee later is not permitted.
No Exceptions: Apex strictly enforces this policy. Attempts to request changes or exceptions through the Help Desk will not be accommodated.
PA Account Activation and Payment Process
After successfully passing your Evaluation Account, you will receive emails with instructions on signing your Contract Documents for the PA Account and a link to complete the payment. Alternatively, you can access these documents through your Apextraderfunding.com Dashboard under the Signatures tab. Once the Pending signatures are completed, the payment link becomes available automatically.
Rithmic/WealthCharts PA Account Fees
When setting up a Rithmic/WealthCharts PA account, you have the option to choose between a Monthly Fee of $85 or a Lifetime Payment Fee. Below are the Lifetime Fee structures based on the activation account size:
25k PA Activation Account: $130 (Lifetime)
50k PA Activation Account: $140 (Lifetime)
100k PA Activation Account (Full and Static): $220 (Lifetime)
150k PA Activation Account: $260 (Lifetime)
250k PA Activation Account: $300 (Lifetime)
300k PA Activation Account: $340 (Lifetime)
Important: Once you select either the Monthly or Lifetime option during the checkout process, this decision is final for that specific account. Monthly payments cannot be changed to Lifetime.
Tradovate PA Account Fees
For Tradovate PA accounts, the payment options include a Monthly Fee of $105 or a Lifetime Payment Fee. The Lifetime Fees for Tradovate PA accounts are as follows:
25k PA Tradovate Activation Account: $150 (Lifetime)
50k PA Tradovate Activation Account: $160 (Lifetime)
100k PA Tradovate Activation Account: $240 (Lifetime)
150k PA Tradovate Activation Account: $280 (Lifetime)
250k PA Tradovate Activation Account: $320 (Lifetime)
300k PA Tradovate Activation Account: $360 (Lifetime)
Note: Similar to Rithmic PA accounts, you cannot change the payment option for a Tradovate PA account after selecting one.
Billing for Paid/Funded Accounts
Each paid or funded PA account is billed individually. For example, if you manage three paid/funded accounts, you will receive three separate bills corresponding to each account. This ensures clarity and precise tracking of your payments.
