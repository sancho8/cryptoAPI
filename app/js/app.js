var app = angular.module("CryptoAPI", []);
app.controller("mainController", function ($scope, $http, $interval, $timeout) {

    this.checkTriggersFunc = checkTriggers;
    this.updateDataFunc = updateData;

    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    function setCookie(name, value, options) {
        options = options || {};

        var expires = options.expires;

        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);

        var updatedCookie = name + "=" + value;

        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }

        document.cookie = updatedCookie;
    }

    $scope.cards = getCookie("cardsArray") ? JSON.parse(getCookie("cardsArray")) : null;
    //$scope.cards.push($scope.emptyCard);
    if (!$scope.cards) {
        $scope.cards = [
            {
                currency: "BTC",
                amount: 10000,
                move: true,
                isActive: true,
                isCreated: true
            },
            {
                currency: "",
                amount: 0,
                move: true,
                isActive: false,
                isCreated: false
            }
        ]
    }
    $scope.emptyCard = {
        currency: "",
        amount: 0,
        move: true,
        isActive: false,
        isCreated: false
    }

    $scope.updateCards = function () {
        setCookie('cardsArray', JSON.stringify($scope.cards));
    }

    $scope.addCard = function (card) {
        debugger;
        card.isCreated = true;
        $scope.cards[$scope.cards.length-1] = card;
        var newCard = Object.assign({}, $scope.emptyCard);
        $scope.cards.push(newCard);
        setCookie('cardsArray', JSON.stringify($scope.cards));
    }

    $scope.removeCard = function (card) {
        $scope.cards.splice(card, 1);
        setCookie('cardsArray', JSON.stringify($scope.cards));
    }

    function updateData() {

        $http.get("https://min-api.cryptocompare.com/data/histominute?fsym=BTC&tsym=USD&limit=100").then(function (data) {
            $scope.cryptoData = data.data.Data;
            console.log(data);
            var ctx = document.getElementById("myChart").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: $scope.cryptoData.map(function (a) {
                        var date = new Date(a.time * 1000);
                        return date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
                    }),
                    datasets: [{
                        label: '$',
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


        $http.get("https://min-api.cryptocompare.com/data/histominute?fsym=ETH&tsym=USD&limit=100").then(function (data) {
            $scope.cryptoData2 = data.data.Data;
            console.log(data);
            var ctx2 = document.getElementById("myChart2").getContext('2d');
            var myChart = new Chart(ctx2, {
                type: 'line',
                data: {
                    labels: $scope.cryptoData2.map(function (a) {
                        var date = new Date(a.time * 1000);
                        return date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
                    }),
                    datasets: [{
                        label: '$',
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
                        text: 'Ethereum',
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

        $http.get("https://min-api.cryptocompare.com/data/histominute?fsym=LTC&tsym=USD&limit=100").then(function (data) {
            $scope.cryptoData3 = data.data.Data;
            console.log(data);
            var ctx3 = document.getElementById("myChart3").getContext('2d');
            var myChart = new Chart(ctx3, {
                type: 'line',
                data: {
                    labels: $scope.cryptoData3.map(function (a) {
                        var date = new Date(a.time * 1000);
                        return date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
                    }),
                    datasets: [{
                        label: '$',
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
        return this;
    }

    function checkTriggers(){
        var report = "";
        if(!$scope.cards ){return;}
        $scope.cards.forEach(element => {
            debugger;
            if(element.isActive){
                var compareValue = 0;
                switch(element.currency){
                    case "BTC": compareValue = $scope.cryptoData[$scope.cryptoData.length - 1].close; break;
                    case "ETH": compareValue = $scope.cryptoData2[$scope.cryptoData2.length - 1].close; break;
                    case "LTC": compareValue =  $scope.cryptoData3[$scope.cryptoData3.length - 1].close; break;
                    default: return;
                }
                if(element.amount > compareValue && element.move){
                    report += element.currency + " had been triggered for value " + compareValue + "$ \r\n"; 
                }
                if(element.amount < compareValue && !element.move){
                    report += element.currency + " had been triggered for value " + compareValue + "$ \r\n"; 
                }
                element.isActive = false;
            }
        });
        if(report != ""){
            sendEmail(report);
        }
        $scope.updateCards();
    }

    function sendEmail(report){

        var templateParams = {
            message: report
        };
         
        emailjs.send('gmail', 'cryptoapimail', templateParams)
            .then(function(response) {
               console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
               console.log('FAILED...', error);
            });
    }

    this.updateDataFunc();
    $timeout(checkTriggers, 3000);  
    $interval(updateData, 60000);
    $interval(checkTriggers, 60000);
});