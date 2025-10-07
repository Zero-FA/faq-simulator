##### Performance Optimization Tips & Lag

For day traders, every millisecond counts. Ensuring your computer runs at peak performance can make the difference between a profitable trade and a missed opportunity. Here are some helpful tips.
What are the ideal computer specifications for day trading?
To handle the demands of trading platforms, live data feeds, and charting tools, aim for the following specs:
Processor: Multi-core CPUs (e.g., Intel i7/i9 or AMD Ryzen 7/9) with a high clock speed (3.5 GHz or higher is preferred).
RAM: At least 16GB; 32GB or more is preferable for multitasking.
Storage: SSD (Solid State Drive) for faster data access and system performance.
Graphics Card: A dedicated GPU, such as an NVIDIA GTX/RTX series, or AMD RX series, is recommended for smooth chart rendering.
Network: High-speed internet with low latency (fiber-optic is ideal). Consider using a wired Ethernet connection instead of Wi-Fi.
How can I optimize NinjaTrader 8 (NT8) for a better performance?
NinjaTrader 8 users can take the following steps to improve performance:
Limit Historical Data: Load only the data you need for your analysis to reduce memory usage.
Use Efficient Chart Settings: Avoid complex chart styles or excessive indicators that consume resources.
Disable Unused Workspaces: Close unused workspaces to free up system memory.
Restart Regularly: Restart NT8 and your computer daily to clear memory and temporary files.
More general Ninjatrader Performance Tips can be found here: NT8 Performance Optimization Guide.
Measuring and Reducing Lag in NinjaTrader (NT8)
Lag can significantly impact your trading performance. Regularly measuring and addressing lag ensures your data flows smoothly.
Using the NT8 Lag Analyzer
For Rithmic/Tradovate account users, the NT8 Lag Analyzer tool is invaluable in identifying internet lag issues.
Download the Tool: Obtain the NT8 Lag Analyzer from the provided link.
Import the Add-On:
Open NinjaTrader.
Navigate to Tools > Import > NinjaScript Add-On.
Browse and select the downloaded zip folder without extracting it.
Configure Market Analyzer:
Go to New > Market Analyzer.
Right-click on a blank space and select Columns.
Double-click the NeuroStreet folder and choose NS_DataLagTimer.
Click OK to apply.
Add Instruments: Click on an empty space within the Market Analyzer and add the instruments you wish to monitor for lag.
Fixing Lagging Data in NinjaTrader (NT8)
If you notice data lag, follow these steps to mitigate the issue:
Reset the Database:
Go to Tools > Database > Reset Database in NinjaTrader.
Re-establish Rithmic/Tradovate Connection:
Delete your existing connection to Rithmic/Tradovate and add it back.
Consider using IQFeed for Futures data, which offers faster and more stable connections, albeit at a cost.
Clear Cache:
Shut down NinjaTrader.
Navigate to Documents > NinjaTrader 8 > db and delete the cache folder.
Restart NinjaTrader and test the connection.
Open in Safe Mode:
Hold the Ctrl key while launching NinjaTrader to open it in Safe Mode.
Verify the mode under the Help section.
Close and reopen NinjaTrader normally.
Disable Tick Refresh on Charts:
Open your workspace.
Disconnect and remove tick refresh from all charts.
Re-save your workspace, reconnect to data, and reload.
Make sure you have the following settings in your RTrader:
How can I reduce lag caused by time synchronization issues?
Accurate time synchronization is crucial for aligning trades with market events. Use a reliable time-sync program to ensure your PC’s clock matches the official market time:
Recommended Tools:
Atomic Clock by WorldTimeServer.com
Time Sync by Vovsoft
Time-Sync by MajorGeeks
Disclaimer: We are not liable for any issues that may arise from downloading or installing third-party time synchronization tools. Use them at your own risk.
Configure these tools to sync your system clock with an accurate time server, such as NTP (Network Time Protocol).
What maintenance tasks should I perform to keep my computer running smoothly?
Regular maintenance ensures your computer operates at peak efficiency:
Update: Keep your operating system, drivers, and trading software up-to-date.
Uninstall: Remove unnecessary programs and applications to free up resources.
Back-Up: Regularly back up critical files to a secure location.
Run Scans: Perform antivirus scans to protect against malware.
Organize: Tidy up your workspace and organize cables to improve accessibility and airflow.
Optimize Browser: Clear browser cache and disable unnecessary extensions if you use web-based platforms.
Defragment: For HDD users, defragment regularly; SSD users should avoid defragmentation but ensure TRIM is enabled.
How can I optimize my internet connection for trading?
A fast and stable internet connection is critical for day trading. Follow these tips:
Use Ethernet: Connect directly to your router with an Ethernet cable to minimize latency.
Test Speed: Run regular speed tests and aim for a download speed of 50 Mbps or higher. You can do so here.
Ping Test: Check latency to ensure it’s below 20ms for trading servers. You can do so here.
What other general tips can help reduce trading lag?
Disable Background Programs: Close unnecessary applications and browser tabs during trading hours.
Upgrade Your Hardware: As mentioned before, consider upgrading components like your RAM or CPU if your system struggles.
Cooling: Proper ventilation is key; it prevents overheating and performance issues.
Power Settings: Set your PC to “High Performance” mode in power settings.
By following these guidelines, you can ensure your computer is optimized for day trading, giving you the best chance to stay competitive in the fast-paced world of financial markets.

##### Common User Mistakes With Solutions

Navigating the complexities of trading accounts involves understanding various processes, from evaluations and subscriptions to compliance statuses. Whether you’re managing your Apex account or utilizing platforms like NinjaTrader, it’s essential to stay informed to ensure seamless trading operations. This guide provides comprehensive insights into managing your trading account effectively.
Canceling a Passed Evaluation
Deciding to cancel a passed evaluation requires careful consideration. Once an evaluation is passed, canceling it means you cannot proceed with the PA (Professional Account) activation process. If you choose to cancel, refer to the Resetting Your Evaluation Account to understand the implications and steps involved.
Reviewing Trading Days and Profit & Loss (PnL)
To monitor your trading performance, it’s crucial to review your trading days and profit and loss (PnL) for PA accounts regularly. Access your PA charts through your account dashboard to ensure accurate tracking and analysis of your trading activities.
No More Evaluations Allowed
Receiving a notice that no more evaluations are allowed typically indicates that your account is under review by the relevant department. This status requires your attention to address any compliance issues or to provide the necessary documentation to continue trading.
Understanding Probation Status
If your account is placed on probation, it signifies that specific compliance guidelines need your attention. To navigate this status, review the details of your probation in your member dashboard: Trader Probation
Understanding the compliance rules and the required next steps is essential to restore your account to good standing.
Resetting a Canceled Account
In cases where your account has been canceled but remains within the subscription period, it remains tradable until the expiration date. To reset the account balance and parameters, you can perform a manual reset. Detailed instructions are available in the Resetting Your Evaluation Account article.
Manual Renewal of Subscription After Failed Rebill
A failed payment attempt can disrupt your subscription. To manually renew your subscription after a failed rebill, log into your dashboard, locate your invoice under Payment History, and select the “Renew Manually” option. This ensures your subscription remains active without interruption.
Avoid Trading Expired Contracts
Trading on expired contracts can result in breaches of account rules. To prevent this, utilize tools like the Batch Rollover feature in NinjaTrader, which helps keep your contracts updated automatically. For more information on rolling over contracts, refer to the How to Roll Over Futures Contracts guide.
Managing a Failed Rebill
When a rebill fails, your evaluation account subscription is automatically canceled. To reactivate your account, you must either create a new evaluation or update your payment method for future subscriptions. Ensuring your payment information is current can prevent such disruptions.
Dealing with Admin-Only Status
Accounts marked as “Admin-Only” indicate a failure to meet evaluation criteria. These accounts can be reset manually or automatically upon subscription renewal. To reset the account balance and trading parameters, follow the How to Reset an Account guide.
Updating Payment Methods
Preventing failed rebills starts with keeping your payment details up to date. Update your payment information through the dashboard under the “Update CC” section. Regularly verifying your billing information ensures smooth processing of your subscriptions.
Avoiding Subscription Overcharges
Accounts in a failed state remain active until they are canceled manually. To avoid overcharges, ensure that any unused accounts are canceled before the renewal date. For detailed instructions on canceling an account, refer to the Account Cancellation.
Handling Declined Payments
Declined payments can occur due to mismatched billing information or bank restrictions. To resolve this, ensure that your billing address matches your card details precisely. Verifying your payment information can help prevent declined transactions and maintain uninterrupted access to your trading account.
Effective management of your trading account involves staying proactive about evaluations, subscriptions, and compliance requirements. By understanding and utilizing the available resources and guides, you can maintain a smooth and profitable trading experience.
Once you have verified your information is correct, please follow the video below to settle the payment within 72 hours before the account expires and is no longer salvageable. 

##### Technical FAQs for Platform Common Error Messages

Navigating trading platforms can sometimes present challenges. This guide compiles common error messages and their resolutions to help users troubleshoot effectively and get back to trading without unnecessary delays.
Error Messages and How to Fix Them
Errors are an inevitable part of trading platforms, but they’re often fixable with the right approach. We compiled a detailed article outlining various error messages and their fixes. Access the complete guide here: Error Messages and How to Fix Them.
Disabling OneDrive for NinjaTrader
OneDrive syncing can lead to data corruption in NinjaTrader, causing performance issues and potential data loss. To prevent this, it is recommended to disable OneDrive for NinjaTrader. Follow the steps in this guide to turn off OneDrive syncing effectively: Disabling OneDrive for NinjaTrader.
TradingView Connection Issues with Tradovate
If you’re facing connection issues between TradingView and Tradovate, ensure your accounts are correctly set up. A detailed connection guide is available to help you establish a stable link: TradingView Connection Guide Using Tradovate.
Accessing and Managing Rithmic Connections
Proper configuration of Rithmic is crucial to avoid connection issues. Follow the detailed step-by-step setup guide to ensure seamless integration:
Ensure correct login credentials.
Verify network settings.
Refer to the official guide for further details: Connection Guide for Rithmic.
Real-Time Data Not Available After Failing Evaluation Account (EA)
For traders using Rithmic, real-time data access is extended for 7 days post-EA failure. However, for Tradovate users, data access ends within 24 hours. To regain access:
Purchase a reset or a new evaluation account.
Follow the instructions outlined in this guide: Rithmic Troubleshooting (Lag + Error Messages).
Correcting Sim101 Account Errors
The Sim101 account in NinjaTrader is specifically for practice trading. If you encounter issues, such as incorrect settings or errors, reset the account:
Open NinjaTrader’s Control Center.
Navigate to the Accounts tab.
Adjust the parameters as needed.
For detailed steps, refer to the Sim101 Account Basics.
Troubleshooting Delayed Account Creation
During periods of high demand, the creation or resetting of accounts may experience delays. To stay informed:
Check your dashboard for updates or status notifications.
Refer to the help center for additional information: Help Center and Status Updates.
By following these solutions, you can minimize disruptions and maintain smooth trading operations. Always consult the linked guides for comprehensive, step-by-step instructions tailored to your specific issue.

##### Setting Up Two-Factor Authentication (2FA)

Setting Up Two-Factor Authentication (2FA) After Passing Your Evaluation
Effective June 30, 2025, all users who have passed an evaluation will be required to set up Two-Factor Authentication (2FA) on their Apex account.
What is Two-Factor Authentication (2FA)?
2FA is an extra security step that helps protect your Apex account. It requires you to use a unique code from your phone (or another device) every time you log in, in addition to your regular password.
Learn more about 2FA: What is 2FA?
Who is Required to Enable 2FA?
All users who have passed an evaluation, regardless of when it was passed, are now required to enable 2FA in order to continue using their account. This security measure is permanent and has been put in place to provide ongoing protection against unauthorized access. Once enabled, 2FA will remain active on your account indefinitely.
What to Expect After Passing Your Evaluation
Notification:
After you pass your evaluation and log in to your dashboard, you’ll see a notification requiring you to enable Two-Factor Authentication (2FA):
You won’t be able to take further action on your account until you complete the 2FA setup.
Setting Up 2FA:
You’ll be prompted to scan a QR code using an authenticator app on your phone (such as Google Authenticator, Authy, or Microsoft Authenticator).
Download an authenticator app of your choice from your app store if you don’t already have one.
Open the app.
Select the '+' symbol on the app.
Then select 'scan the QR code' option.
Scan the QR code on your Apex Member Dashboard (image above).
The app will generate a 6-digit code.
Enter this code into the setup screen on your dashboard.
Confirmation:
Once you enter the correct code, you will see a confirmation that 2FA has been successfully enabled on your account. 
What to Expect After 2FA Has Been Enabled
Once 2FA has been set up and enabled on your account, you will be required to enter a one-time code from your chosen authenticator app each time you log in.
On the initial login screen, enter your username or email, and your password, in the same way as you would have prior to enabling the 2FA, and click the Log In button:
With 2FA enabled, you will be required to complete an extra step to help confirm your identity and keep your account secure. When prompted to enter a One Time Password as shown below, open your chosen authenticator app and enter the unique one-time code associated with your Apex login, and click Confirm:
PLEASE NOTE: Your One-Time Password is the 6-digit numeric authenticator code. Your chosen authenticator app will generate a unique, one-time code each time you go to log in. 
Troubleshooting
If you get an error message stating there is an issue with second factor authentication, please double-check your authenticator app to verify you are entering the correct numeric code:
Common troubleshooting tips:
These codes are only valid for approximately 30 seconds at a time. Please ensure you are entering the correct code displayed at the time.
If you use the same authenticator app for multiple logins, please ensure you are using the code associated with your Apex login.
If you have a personal Apex user account, and a business Apex user account, you will be required to enable separate 2FA for each account. When logging in, ensure you are using the correct authenticator code for the intended Apex account (personal or business).
