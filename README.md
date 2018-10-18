# BudgetTracker
 Budget Tracker  - link to the repo :  https://github.com/VeselinAtanasov/JavaScript-Web/tree/master/ReactJS/FINAL_EXAM/budget-tracker
## Idea
 Budget Tracker is an application, from which you can track all your incomes financial incomes and outcomes.
 The app allows to enter your monthly/daily incomes and expenses and based on some calculations to advise you how to reduce your expenses.
 There are build in reporting(based on chart reports and table representation) functionality which helps to improve user experience. 
## Design
The application is split into three parts
* Main area
    * Static Home page with basic information for the app.
    * User can find login/register option in order to access the application.
* User area
    * Once the user access the application with his/her credentials, is automatically redirected to user home page, where all user's account are accessible.There are options to check each account individually 
    * User can access his own "Money Tracker", from where the user is able to:
		* Check his account in details - it displays all current incomes and expenses in table view, allows export report in excel, gives advice how to reduce the overall expenses(based on the three main categories for which the user is spending most)
		* Add expense in the budget tracker - allow the user to add expense based on predefined categories.
		* Recharge his virtual wallet = allow the user to add incomes in the wallet based on category
		* Generate Reports - dynamically generates pie chart report per category - there are two options - report based on total money and another based on percentages, the page also provides statistics how much money the user has left in his wallet.
* Admin area
    * Admins have access to Admin Panel, from where all admins have access User Administration functionality and BudgetTracker Administration functionality.
    * In User Administration Panel each Admin can:
		* Generate new user in the app
		* Edit user information(username,email) and reset user's password
		* Make particular user also an admin;
		* Remove particular user from admin list
		* Delete user
    * In Budget Tracker Panel Panel each Admin can:
		* Delete user's Budget Tracker(remove all related data)
		* Edit particular Budget Tracker - changes picture url, Tracker name and/or description
		* Modify the amount of money in user's virtual wallet
		* Modify the amount of user's expenses per category 
