let subscriptions = {
    'loginUser': [],
    'logoutUser': [],
};

export default {
    events: {
        loginUser: 'loginUser',
        logoutUser: 'logoutUser',
    },
    subscribe: (eventName, fn) => 
        subscriptions[eventName].push(fn),
    trigger: (eventName, data) => 
        subscriptions[eventName].forEach(fn => fn(data))
};