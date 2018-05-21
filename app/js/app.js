var app = angular.module("CryptoAPI", []);
app.controller("mainController", function ($scope, $http) {

    $scope.cards =
        [
            {
                currency: "BTC",
                amount: 10000,
                move:"up",
                isActive: true,
                isCreated: true
            },
            {
                currency: "",
                amount: 0,
                move:"up",
                isActive: false,
                isCreated: false
            }
        ]
    
    $scope.emptyCard =   {
        currency: "",
        amount: 0,
        move:"up",
        isActive: false,
        isCreated: false
    }

    $scope.addCard = function(){
        var newCard = Object.assign({}, $scope.emptyCard);
        $scope.cards.push(newCard);
    }

    $scope.removeCard = function(card){
        $scope.cards.splice(card,1);
    }

    $http.get("https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=100").then(function (data) {
        $scope.cryptoData = data.data.Data;
        console.log(data);
        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: $scope.cryptoData.map(function (a) {
                    var date = new Date(a.time * 100);
                    return date.toString().split("+");
                }),
                datasets: [{
                    label: '# of Votes',
                    data: $scope.cryptoData.map(a => a.close),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 24
                        }
                    }]
                }
            }
        });
    });


    $http.get("https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&limit=100").then(function (data) {
        $scope.cryptoData2 = data.data.Data;
        console.log(data);
        var ctx2 = document.getElementById("myChart2").getContext('2d');
        var myChart = new Chart(ctx2, {
            type: 'line',
            data: {
                labels: $scope.cryptoData2.map(function (a) {
                    var date = new Date(a.time * 100);
                    return date.toString().split("+");
                }),
                datasets: [{
                    label: '# of Votes',
                    data: $scope.cryptoData2.map(a => a.close),
                    backgroundColor: [
                        'rgba(99, 255, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(99,255,132,1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 24
                        }
                    }]
                }
            }
        });
    });
});