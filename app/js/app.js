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
                    var date = new Date(a.time * 1000);
                    return date.getDate() + "."+ date.getMonth() + "." + date.getFullYear();
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
                responsive: false,
                title: {
                    display: true,
                    text: 'Bitcoin',
                    fontSize: 20
                },
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 10
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
                    var date = new Date(a.time * 1000);
                    return date.getDate() + "."+ date.getMonth() + "." + date.getFullYear();
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
                responsive: false,
                title: {
                    display: true,
                    text: 'Enthereum',
                    fontSize: 20
                },
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 10
                        }
                    }]
                }
            }
        });
    });

    $http.get("https://min-api.cryptocompare.com/data/histoday?fsym=LTC&tsym=USD&limit=100").then(function (data) {
        $scope.cryptoData3 = data.data.Data;
        console.log(data);
        var ctx3 = document.getElementById("myChart3").getContext('2d');
        var myChart = new Chart(ctx3, {
            type: 'line',
            data: {
                labels: $scope.cryptoData3.map(function (a) {
                    var date = new Date(a.time * 1000);
                    return date.getDate() + "."+ date.getMonth() + "." + date.getFullYear();
                }),
                datasets: [{
                    label: '# of Votes',
                    data: $scope.cryptoData3.map(a => a.close),
                    backgroundColor: [
                        'rgba(132, 99, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(132,99,255,1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: false,
                title: {
                    display: true,
                    text: 'Litecoin',
                    fontSize: 20
                },
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false
                        }
                    }],
                    xAxes: [{
                      
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 10
                        }
                    }]
                }
            }
        });
        
    });
});