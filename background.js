const BASE_URL = 'https://www.whitecashback.in/';
const STORE_LIST = 'extension-service/storeDetails';
const STORE_DETAILS = 'users/storeDetails';
const CASH_BACK_URL = 'https://www.whitecashback.in/extension-service/goTostore?id=';
const IMAGE_URL = 'https://res.cloudinary.com/whitecashback/image/upload/logo/';
const $ = window.jQuery;

localStorage.setItem('logged_in_user', '1');

let user_id = localStorage.getItem('logged_in_user');

chrome.browserAction.setPopup({
    popup : 'popup.html'
});

let user_data = {
    earned_cashback: "250.00",
    pending_cashback: "100.00"
};

$.ajax({
    url: BASE_URL + STORE_LIST,
    type: 'GET',
    dataType: 'JSON',
    success: function (response) {
        let storesToSave = [];
        let stores = response.storeDetails;
        $.each(stores,function (a, b) {
            let data = {};
            data['retailer_id']=b.id;
            data['retailer_image']=IMAGE_URL + b.image;
            data['retailer_title']=b.title;
            data['retailer_url']=b.website;
            data['retailer_cashback']=b.cashback;
            data['retailer_old_cashback']=b.oldCashback;
            data['retailer_cashback_url']=CASH_BACK_URL + b.id;
            storesToSave.push(data);
        });
        localStorage.setItem('all_stores', JSON.stringify(storesToSave));
    }
});

function getRandomArrayElements(arr, count) {
    let shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

function findStoreFromhost(host){
    // TODO: CODE TO FIND STORE FROM STORES ARRAY
}

chrome.runtime.onMessage.addListener( function(request,sender,sendResponse){
    if (request.action === 'GetStores') {
        let stores = [];
        try{
            stores = JSON.parse(localStorage.getItem('all_stores'));
        }catch (e) {
            stores = []
        }
        if (stores.length > 0) {
            let elm = getRandomArrayElements(stores,10);
            sendResponse({
                status: 1,
                stores: elm
            })
        }else{
            sendResponse({
                status: 1,
                stores: []
            })
        }
    }else if (request.action === 'GetUserData') {
        sendResponse({
            status: 1,
            user_data: user_data
        })
    }else if (request.action === 'GetHostDeals') {
        let storeData = [];
        let store = findStoreFromhost(request.host);
        // TODO: GET STORE DATA
    }
});