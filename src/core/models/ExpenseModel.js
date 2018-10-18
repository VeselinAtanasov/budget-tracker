export default {
    initialState: {
        trackerId:'',
        foodExpense: 0,
        billsExpense: 0,
        medicineExpense: 0,
        transportExpense: 0,
        clothingExpense: 0,
        funExpense: 0,
        otherExpense: 0,
    },
    validate: function validateExpenseModel(payload) {
        const priceRegex = /^(\+?(0|[1-9]\d*))(\.(0|[0-9]\d*))?$/;
        let errors = {};
        let isFormValid = true;
        let message = '';

        if (!payload ||  !priceRegex.test((payload.foodExpense).toString())) {
            isFormValid = false;
            errors.food = 'Please provide positive number for food category';
        }

        if (!payload || !priceRegex.test((payload.billsExpense).toString())) {
            isFormValid = false;
            errors.food = 'Please provide positive number for bills category';
        }

        if (!payload || !priceRegex.test((payload.medicineExpense).toString())) {
            isFormValid = false;
            errors.food = 'Please provide positive number for medicine category';
        }

        if (!payload ||  !priceRegex.test((payload.transportExpense).toString())) {
            isFormValid = false;
            errors.food = 'Please provide positive number for transport category';
        }

        if (!payload ||  !priceRegex.test((payload.clothingExpense).toString())) {
            isFormValid = false;
            errors.food = 'Please provide positive number for clothing category';
        }

        if (!payload ||  !priceRegex.test((payload.funExpense).toString())) {
            isFormValid = false;
            errors.food = 'Please provide positive number for fun category';
        }

        if (!payload ||  !priceRegex.test((payload.otherExpense).toString())) {
            isFormValid = false;
            errors.food = 'Please provide positive number for others category';
        }

        return {
            success: isFormValid,
            message: message,
            errors: errors
        };
    },
    getDataForRequest: function (state) {
        return {
            trackerId:state['id'],
            foodExpense: state['foodExpense'],
            billsExpense: state['billsExpense'],
            medicineExpense: state['medicineExpense'],
            transportExpense: state['transportExpense'],
            clothingExpense: state['clothingExpense'],
            funExpense: state['funExpense'],
            otherExpense: state['otherExpense'],
        };
    }
};