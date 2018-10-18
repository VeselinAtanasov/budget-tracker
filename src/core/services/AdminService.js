
import requestor from '../services/requester';


export default {
    isAdmin: async function () {
        let currentUserID = sessionStorage.getItem('userId');
        if (!currentUserID) {
            return false;
        }
        let response = await requestor.get('user', `${currentUserID}/roles`, 'master');

        return response;
    },
    adminId: "6b78e236-1962-451a-9673-4f877a5df08f",
    fakeAdminId: "6b78e236-1962-451a-1254-4f877a5df08f",

    getAllUsers: {
        send: function () {
            return requestor.get('user', '', 'master');
        }
    },
    deleteUser: {
        send: function (id) {
            return requestor.remove('user', id, 'master');
        }
    },
    getRoleByUserId:{
        send: function (userId) {
            let url = userId+'/roles';
            return requestor.get('user',url,'master');
        }
    },
    assignRoleToUser:{
        send: function (userId,roleId) {
            let url = userId+'/roles/'+roleId;
            return requestor.update('user',url,'master');
        }
    },
    deleteRoleFromUser:{
        send: function (userId,roleId) {
            let url = userId+'/roles/'+roleId;
            return requestor.remove('user',url,'master');
        }
    }
};
