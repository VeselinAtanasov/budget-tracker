import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import RegisterForm from './components/forms/RegisterForm';
import LoginForm from './components/forms/LoginForm';
import Logout from './components/forms/Logout';
import MoneyTracker from './components/mtracker/MoneyTracker';
import CreateTrackerForm from './components/forms/CreateTrackerForm';
import Home from './components/common/Home';
import CreateExpenseForm from './components/forms/CreateExpenseForm';
import WalletForm from './components/forms/WalletForm';
import TrackerDetails from './components/mtracker/TrackerDetails';
import TrackerReport from './components/mtracker/TrackerReport';
import NotFound from './components/common/NotFound';
import AdminPanel from './components/admin/AdminPanel';
import AuthService from './core/services/AuthService';
import UsersList from './components/admin/UsersList';
import TrackersList from './components/admin/TrackersList';
import TrackerService from './core/services/TrackerService';
import ExpenseService from './core/services/ExpenseService';


const AppRouter = () => (
    <div>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path='/home' component={Home} />
            <Route path='/register' component={RegisterForm} />
            <Route path='/login' component={LoginForm} />
            <Route path='/logout' component={Logout} />

            <Route path='/mtracker'  render={(props) => !AuthService.isLoggedIn() ? <Redirect to="/" /> : <MoneyTracker {...props} />}  />
            <Route path='/createTracker' render={(props) => !AuthService.isLoggedIn() ? <Redirect to="/" /> : <CreateTrackerForm {...props}/>}  />
            <Route path='/addExpense/:id' render={(props) =>  !AuthService.isLoggedIn() ? <Redirect to="/" /> : <CreateExpenseForm forUpdate="true" {...props} />} />
            <Route path='/fillWallet/:id' render={(props) =>  !AuthService.isLoggedIn() ? <Redirect to="/" /> : <WalletForm forUpdate="true" {...props} />} />
            <Route path='/trackDetails/:id' render={(props) => !AuthService.isLoggedIn() ? <Redirect to="/" /> : <TrackerDetails {...props} />}  />
            <Route path='/report/:id' render={(props) => !AuthService.isLoggedIn() ? <Redirect to="/" /> : <TrackerReport {...props} />}  />

            <Route exact path="/admin"
                render={(props) => !AuthService.isAdmin() ? <Redirect to="/" /> 
                    : <AdminPanel  {...props} />}
            />
            <Route path="/admin/allUsers" 
                render={(props) => !AuthService.isAdmin() ? <Redirect to="/" /> 
                    : <UsersList  {...props} />} 
            />
            <Route path="/admin/allTrackers" 
                render={(props) => !AuthService.isAdmin() ? <Redirect to="/" /> 
                    : <TrackersList   {...props}/>} 
            />
            <Route path="/admin/register" 
                render={(props) => !AuthService.isAdmin() ? <Redirect to="/" /> 
                    : <RegisterForm  admin={AuthService.adminRegister} {...props}/>} 
            />
            <Route path="/admin/editUser/:id"
                render={(props) => !AuthService.isAdmin() ? <Redirect to="/" /> 
                    : <RegisterForm  admin={AuthService.adminEdit} edit={true} {...props}
                    />} />
            <Route path="/admin/changeWallet/:id" 
                render={(props) => !AuthService.isAdmin() ? <Redirect to="/" /> 
                    : <WalletForm  admin={TrackerService.adminUpdate} {...props}/>} 
            />
            <Route path="/admin/changeExpense/:id" 
                render={(props) => !AuthService.isAdmin() ? <Redirect to="/" /> 
                    : <CreateExpenseForm  admin={ExpenseService.adminUpdate} {...props}/>} 
            />
            <Route path="/admin/editTracker/:id" 
                render={(props) => !AuthService.isAdmin() ? <Redirect to="/" /> 
                    : <CreateTrackerForm  admin={TrackerService.updateTracker} edit={true} {...props}/>} 
            />
            <Route component={NotFound} />  }
        </Switch>
    </div>
);

export default AppRouter;