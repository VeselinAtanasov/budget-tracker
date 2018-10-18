import validator from 'validator';

export default {
    initialState: {
        username: '',
        password: '',
        repeatPassword:'',
        email:''
    },
    validate: function validateRegisterForm(payload) {
        let errors = {};
        let isFormValid = true;
        let message = '';
    
        if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
            isFormValid = false;
            errors.email = 'Please provide a correct email address.';
        }
    
        if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 3) {
            isFormValid = false;
            errors.password = 'Password must have at least 3 characters.';
        }
    
        if (!payload || payload.password !== payload.repeatPassword) {
            isFormValid = false;
            errors.passwordsDontMatch = 'Passwords do not match!';
        }
    
        if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
            isFormValid = false;
            errors.name = 'Please provide your name.';
        }
    
        if (!isFormValid) {
            message = 'Form Validation Failed!';
        }
    
        return {
            success: isFormValid,
            message: message,
            errors: errors
        };
    },
    getDataForRequest: function(state){
        return {
            username: state.username,
            password: state.password? state.password : '',
            email: state.email,
        };
    }
};