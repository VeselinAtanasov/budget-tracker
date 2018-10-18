
import requestor from './requester';
import helperService from './HelperService';
import observer from '../../core/observer/observer';
import AdminService from './AdminService';

export default {
    register: {
        send: function(data){
            return requestor.post('user', '', 'basic', data);
        },
        success: function(res) {
            //  sessionStorage.setItem('authtoken', res._kmd.authtoken);
            //   sessionStorage.setItem('username', res['username']);
            //   helperService.notify('success',`Welcome, ${res.username}`);
            this.props.history.push('/login');
        },
        fail: function(err) {
            helperService.notify('error',err.responseJSON.description);
            this.props.history.push('/login');
        },
    },
    adminRegister: {
        send: function(data){
            return requestor.post('user', '', 'basic', data);
        },
        success: function(res) {

            helperService.notify('success',"Admin, you just register a new user");
            this.props.history.push('/admin/allUsers');
        },
        fail: function(err) {
            helperService.notify('error',err.responseJSON.description);

            this.props.history.push('/admin/allUsers');
        },
    },
    adminEdit: {
        send: function(data){
            const url = data['id'];
            delete data['id'];
            return requestor.update('user', url, 'master', data);
        },
        fill: function(id){
            return requestor.get('user',id, 'master');
        },
        success: function(res) {
            helperService.notify('success',"Admin, you just edited a user profile");
            this.props.history.push('/admin/allUsers');
        },
        fail: function(err) {
            helperService.notify('error',err.responseJSON.description);
            this.props.history.push('/admin/allUsers');
        },
    },
    login: {
        send: function(data){
            return requestor.post('user', 'login', 'basic', data);
        },
        success: function(data) {
            sessionStorage.setItem('authtoken', data._kmd.authtoken);
            sessionStorage.setItem('username', data['username']);
            sessionStorage.setItem('userId',data['_acl']['creator']);
            helperService.notify('success',`Welcome, ${data.username}`);
            // observer.trigger(observer.events.loginUser, res.username);  

            //Check if user is Admin:
            AdminService.isAdmin().then(res =>{
                sessionStorage.setItem('isAdmin',AdminService.fakeAdminId);
                if(res.length!==0){
                    if(res && res.length!==0 && res[0] && res[0].roleId && res[0].roleId === AdminService.adminId){
                        helperService.notify('success',`Hey, you are an Admin - you can modify site content!`);
                        sessionStorage.setItem('isAdmin',res[0].roleId);
                        observer.trigger(observer.events.loginUser, data.username);
                    }
                }else{
                    observer.trigger(observer.events.loginUser, data.username);
                }
            }).catch(err =>   {
                observer.trigger(observer.events.loginUser, data.username);
                sessionStorage.setItem('isAdmin',sessionStorage.setItem('isAdmin',AdminService.fakeAdminId));
            });


            this.props.history.push('/');
        },
        fail: function(err) {
            helperService.notify('error',err.responseJSON.description);
            //this.props.history.push('/register');
        },
    },
    logout:{
        send: function(){
            let req = requestor.post('user', '_logout', 'kinvey');
            return  req;
        },
        success: function(res) {
            const username = sessionStorage.getItem('username');
            helperService.notify('success',`Goodbye, ${username}`);  
            sessionStorage.clear();
            observer.trigger(observer.events.logoutUser);
            sessionStorage.clear();
        },
        fail: function(err) {
            helperService.notify('error',err.responseJSON.description);
        },
    },
    getUserProfileById: {
        send: function (id) { 
            return requestor.get('user',id, 'master');
        }
    },
    isAdmin : function(){
        return AdminService.adminId === sessionStorage.getItem('isAdmin');
    },
    isLoggedIn : function(){
        return sessionStorage.getItem('authtoken');
    },
    getUserName : function(){
        return sessionStorage.getItem('username');
    },
    getUserData : function(){
        return sessionStorage;
    }
};

