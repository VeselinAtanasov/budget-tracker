import validator from 'validator';

export default {
    initialState: {
        trackerName: '',
        trackerDescription: '',
        trackerUrl: '',
        walletIncomes: 0,
        walletOthers: 0
    },
    validate: function validateTrackerForm(payload) {
        let errors = {};
        let isFormValid = true;
        let message = '';

        if (!payload || typeof payload.trackerName !== 'string' || payload.trackerName.trim().length === 0) {
            isFormValid = false;
            errors.trackerName = 'Please provide correct tracker name.';
        }

        if (!payload || !validator.isURL(payload.trackerUrl)) {
            isFormValid = false;
            errors.trackerUrl = 'Please provide correct image url.';;
        }

        if (!payload || typeof payload.trackerDescription !== 'string' || payload.trackerDescription.trim().length === 0) {
            isFormValid = false;
            errors.trackerDescription = 'Please provide tracker description';
        }

        return {
            success: isFormValid,
            message: message,
            errors: errors
        };
    },
    getDataForRequest: function (state) {
        return {
            trackerName: state.trackerName,
            trackerDescription: state.trackerDescription,
            trackerUrl: state.trackerUrl,
            walletIncomes: state.walletIncomes,
            walletOthers: state.walletOthers
        };
    }
};