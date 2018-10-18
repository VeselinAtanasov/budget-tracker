import React ,{Component} from 'react';
import { Link } from 'react-router-dom';

export default class User extends Component{
    constructor(props){
        super(props);
        this.state={
            user:''
        };
        this.removeElement = this.removeElement.bind(this);
        this.makeUserAdmin = this.makeUserAdmin.bind(this);
        this.removeFromAdmin = this.removeFromAdmin.bind(this);

    }


    removeElement(){
        let id = this.props['_id'];
        this.props.removeElement(id);
    }
    makeUserAdmin(){
        let id = this.props['_id'];
        this.props.makeUserAdmin(id);
    }
    removeFromAdmin(){
        let id = this.props['_id'];
        this.props.removeFromAdmin(id);
    }

    render(){
        
        return(
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">User Details:</h5>
                        <button onClick={this.removeElement} type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>
                            UserID: <strong> {this.props['_id']} </strong>
                        </p>
                        <p>
                            UserName: <strong> {this.props['username']} </strong>
                        </p>
                        <p>
                            UserEmail: <strong> {this.props['email']}</strong>
                        </p>
                        <p>
                            Is Admin: <strong>{this.props['_kmd']['roles'] && this.props['_kmd']['roles'].length!==0 ? "YES" : "NO"} </strong>
                        </p>
                    </div>
                    <div className="modal-footer">
                        <Link to={`/admin/editUser/${this.props['_id']}`}  className="badge badge-warning">Edit User / Change Password</Link>
                        <span className="badge badge-success" onClick={this.makeUserAdmin} >Make this user an Admin</span>
                        <span className="badge badge-danger" onClick={this.removeFromAdmin} >Remove Admin role for the user</span>                        
                    </div>
                </div>
            </div>
           
        );
    }
}
