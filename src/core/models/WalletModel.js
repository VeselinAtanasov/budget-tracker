
export default {
    initialState: {
        walletIncomes: 0,
        walletOthers: 0
    },
    validate: function validateTrackerForm(payload) {
        const priceRegex = /^(\+?(0|[1-9]\d*))(\.(0|[0-9]\d*))?$/;
        let errors = {};
        let isFormValid = true;
        let message = '';

        if (!payload ||  !priceRegex.test((payload.walletIncomes).toString())) {
            isFormValid = false;
            errors.food = 'Please provide positive number for incomes';
        }
        if (!payload ||  !priceRegex.test((payload.walletOthers).toString())) {
            isFormValid = false;
            errors.food = 'Please provide positive number for other incomes';
        }

        return {
            success: isFormValid,
            message: message,
            errors: errors
        };
    },
    getDataForRequest: function (state) {
        return {
            walletIncomes: state.walletIncomes,
            walletOthers: state.walletOthers
        };
    }
};