App.controller('PageController', PageController);

function PageController($scope){
    $scope.stores=[];
    $scope.user_data={
        earned_cashback: "0.00",
        pending_cashback: "0.00"
    };
    $scope.bgurl= function(value){
        return {"background-image": "url("+value+")"};
    };
    chrome.runtime.sendMessage({action: "GetStores"}, function (response) {
        if (response.status!==undefined && response.status === 1) {
            $scope.stores = response.stores;
        }
    });
    chrome.runtime.sendMessage({action: "GetUserData"}, function (response) {
        if (response.status !== undefined && response.status===1){
            $scope.user_data = response.user_data;
        }
    })
}