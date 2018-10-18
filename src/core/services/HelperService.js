
import toastr from 'toastr';

toastr.options.newestOnTop = false;
toastr.options.closeButton = true;

function calculateRemainingAmount(tracker, expenses) {

    let incomes = Number(tracker['walletIncomes']) + Number(tracker['walletOthers']);
    let outcomes = Number(expenses['foodExpense']) +
        Number(expenses['billsExpense']) +
        Number(expenses['medicineExpense']) +
        Number(expenses['transportExpense']) +
        Number(expenses['clothingExpense']) +
        Number(expenses['funExpense']) +
        Number(expenses['otherExpense']);

    return incomes - outcomes;

}
function getUsefulTips(tracker, expenses){
    let byPercentage = reportByCategoryPercentage(tracker, expenses);

    let highest =  Object.keys(byPercentage).sort((a,b) => byPercentage[b]-byPercentage[a]);
    let tips =[];
    let top3 =highest.slice(0,3);
    if(top3.indexOf("Medicine")!== -1){
        tips.push("You spend a lot of money for Medicine. Hope you are well!. Please take care of yourself!");
    }
    if(top3.indexOf("Fun")!== -1){
        tips.push("You spend a lot of money for Fun. Probably you should reduce the parties:)");
    }
    if(top3.indexOf("Transport")!== -1){
        tips.push("You spend a lot of money for Transport. Try to walk more!");
    }
    if(top3.indexOf("Food")!== -1){
        tips.push("You spend a lot of money for Food. You can reduce the expensive meals :)");
    }
    if(top3.indexOf("Bills")!== -1){
        tips.push("You spend a lot of money for Bills. We know it is hard, but try to save money from your bills");
    }
    if(top3.indexOf("Clothing")!== -1){
        tips.push("You spend a lot of money for Clothing. Probably it is a good idea to reduce the shopping");
    }
    if(top3.indexOf("Other")!== -1){
        tips.push("You spend a lot of money for Other things. Hope you are not cheating, while tracking your expenses:)");
    }
    return tips;

}

function reportByCategory(tracker, expenses) {
    return{
        'Food': Number(expenses['foodExpense']),
        'Bills': Number(expenses['billsExpense']),
        'Medicine': Number(expenses['medicineExpense']),
        'Transport': Number(expenses['transportExpense']),
        'Clothing': Number(expenses['clothingExpense']),
        'Fun': Number(expenses['funExpense']),
        'Other': Number(expenses['otherExpense']),
    };
}
function reportByCategoryPercentage(tracker, expenses) {

    let overallOutcomes = getOverallExpenses(expenses);

    return {
        'Food': Number(((Number(expenses['foodExpense'])/Number(overallOutcomes))*100).toFixed(2)),
        'Bills': Number(((Number(expenses['billsExpense'])/Number(overallOutcomes))*100).toFixed(2)),
        'Medicine': Number(((Number(expenses['medicineExpense'])/Number(overallOutcomes))*100).toFixed(2)),
        'Transport': Number(((Number(expenses['transportExpense'])/Number(overallOutcomes))*100).toFixed(2)),
        'Clothing':Number(((Number(expenses['clothingExpense'])/Number(overallOutcomes))*100).toFixed(2)),
        'Fun': Number(((Number(expenses['funExpense'])/Number(overallOutcomes))*100).toFixed(2)),
        'Other': Number(((Number(expenses['otherExpense'])/Number(overallOutcomes))*100).toFixed(2)),
    };
}

function getOverallExpenses(expenses){

    let overall= (Number(expenses['foodExpense']) +
    Number(expenses['billsExpense']) +
    Number(expenses['medicineExpense']) +
    Number(expenses['transportExpense']) +
    Number(expenses['clothingExpense']) +
    Number(expenses['funExpense']) +
    Number(expenses['otherExpense']));

    return overall;
}

function getAllIncomes(tracker) {
    return {
        walletIncomes: tracker['walletIncomes'],
        walletOthers: tracker['walletOthers']
    };
}
function getColors(arr){
    if(arr.length-1===6){
        return [ '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#beff4f',
            '#ff814f',
            '#814fff',];
    }
}

function notify(type, message, errors) {
    if (type === 'success') {
        toastr.success(message);
    }

    if (type === 'error') {
        toastr.error(message);

        if (errors) {
            for (let err in errors) {
                toastr.error(errors[err]);
            }
        }
    }
}

export default {
    reportByCategoryPercentage,
    reportByCategory,
    getOverallExpenses,
    getAllIncomes,
    notify,
    calculateRemainingAmount,
    getColors,
    getUsefulTips
};