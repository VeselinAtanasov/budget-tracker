import $ from 'jquery';

const kinveyBaseUrl = "https://baas.kinvey.com/";
const kinveyAppKey = "kid_rkl2qgw87";
const kinveyAppSecret = "b8efaaa893f64aafb3ebb61bd9201e47";
const masterSecret = 'ff957910600644de92abc862eda3b7bc';

// Creates the authentication header
function makeAuth(type) {
    if(type==='basic'){
        return 'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret);
    }else if(type === 'master'){
        return `Basic ${btoa(`${kinveyAppKey}:${masterSecret}`)}`;
    }else{
        return  'Kinvey ' + sessionStorage.getItem('authtoken');
    }
}

// Creates request object to kinvey
function makeRequest(method, module, endpoint, auth, query) {
    let url = kinveyBaseUrl + module + '/' + kinveyAppKey + '/' + endpoint;
    if (query) {
        url += '?query=' + JSON.stringify(query);
    }

    return {
        method,
        url: url,
        'Content-Type':'application/json',
        headers: {
            'Authorization': makeAuth(auth),
        }
    };
}

// Function to return GET promise
function get (module, endpoint, auth, query) {
    return $.ajax(makeRequest('GET', module, endpoint, auth, query));
}

// Function to return POST promise
function post (module, endpoint, auth, data) {
    let req = makeRequest('POST', module, endpoint, auth);
    req.data = data;
    return $.ajax(req);
}

// Function to return PUT promise
function update (module, endpoint, auth, data) {
    let req = makeRequest('PUT', module, endpoint, auth);
    req.data = data;
    return $.ajax(req);
}

// Function to return DELETE promise
function remove (module, endpoint, auth) {
    return $.ajax(makeRequest('DELETE', module, endpoint, auth));
}

export default {
    get,
    post,
    update,
    remove
};