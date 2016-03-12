angular.module('portalApp')

.controller('offCampusEatingLocationsCtrl', ['$scope','$http', '$q', 'offCampusEatingLocationsFactory', '$sce',function($scope, $http, $q,
        offCampusEatingLocationsFactory,$sce) {

        // Widget Configuration
        $scope.portalHelpers.config = {
            // make 'widgetMenu.html' the template for the top right menu
            "widgetMenu": "widgetMenu.html"
        };

        // Import variables and functions from service
        $scope.loading = offCampusEatingLocationsFactory.loading;
        $scope.item = {
            value: ''
        };
        $scope.insertValue = offCampusEatingLocationsFactory.insertValue;
        $scope.dbData = offCampusEatingLocationsFactory.dbData;
        offCampusEatingLocationsFactory.init($scope);

    	var test=$sce.trustAsResourceUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2895.4146072148083!2d-80.53988384863868!3d43.47281717902555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf401323dd441%3A0xc2bc480b90231754!2sWaterloo+Star!5e0!3m2!1sen!2sca!4v1457803922857");
        var waterlooStar=$sce.trustAsResourceUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2895.4146072148083!2d-80.53988384863868!3d43.47281717902555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf401323dd441%3A0xc2bc480b90231754!2sWaterloo+Star!5e0!3m2!1sen!2sca!4v1457803922857");
        var sogo=$sce.trustAsResourceUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d92664.78523735823!2d-80.59420960287662!3d43.46530398904281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf4013bc9bc25%3A0x3e0668302d13b35f!2sSogo!5e0!3m2!1sen!2sca!4v1457815152390");
        var kenzo=$sce.trustAsResourceUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2895.4039616083387!2d-80.53756514863863!3d43.4730393790255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf407ca1e311d%3A0x237a7a97779ab8cb!2sKenzo+Ramen!5e0!3m2!1sen!2sca!4v1457807372264");
        var williams=$sce.trustAsResourceUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11581.615914727157!2d-80.5441580433868!3d43.4730390226613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf401323dd441%3A0x93dc4effd98a9bc8!2sWilliams+Fresh+Cafe!5e0!3m2!1sen!2sca!4v1457815484064");
        var nuri=$sce.trustAsResourceUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2895.4668380877815!2d-80.54099904863871!3d43.47172697902547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf4013bc9bc25%3A0x525618b4173fd8a8!2sNuri+Village!5e0!3m2!1sen!2sca!4v1457815604044");
        var sushi=$sce.trustAsResourceUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2895.4057438641235!2d-80.53777054863868!3d43.47300217902547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf40700b6ad09%3A0x554506f3899fde6a!2sMr+Sushi!5e0!3m2!1sen!2sca!4v1457815751202");
        // Model for the search and list example
        $scope.model = [{
            title: "Waterloo Star",
            address: "170 University Avenue West, Waterloo, ON, Canada",
            style: "Eastern",
            ratings: '5',
            mapurl: waterlooStar
        }, {
            title: "Sogo",
            address: "170 University Avenue West, Waterloo, ON, Canada",
            style: "Eastern",
            ratings: '5',
            mapurl: sogo
        }, {
            title: "Kenzo",
            address: "170 University Avenue West, Waterloo, ON, Canada",
            style: "Eastern",
            ratings: '5',
            mapurl: kenzo
        }, {
            title: "Williams",
            address: "170 University Avenue West, Waterloo, ON, Canada",
            style: "Eastern",
            ratings: '5',
            mapurl: williams
        }, {
            title: "Nuri Village",
            address: "170 University Avenue West, Waterloo, ON, Canada",
            style: "Eastern",
            ratings: '5',
            mapurl: nuri
        }, {
            title: "Mr. Sushi",
            address: "170 University Avenue West, Waterloo, ON, Canada",
            style: "Eastern",
            ratings: '5',
            mapurl: sushi
        }];

        // initialize the service
        offCampusEatingLocationsFactory.init($scope);

        // watch for changes in the loading variable
        $scope.$watch('loading.value', function() {
            // if loading
            if ($scope.loading.value) {
                // show loading screen in the first column, and don't append it to browser history
                $scope.portalHelpers.showView('loading.html', 1, false);
                // show loading animation in place of menu button
                $scope.portalHelpers.toggleLoading(true);
            } else {
                $scope.portalHelpers.showView('main.html', 1);
                $scope.portalHelpers.toggleLoading(false);
            }
        });

        // Create table, invoked by a button press from database test example
        $scope.createTable = function() {
            $scope.portalHelpers.invokeServerFunction('createTable').then(function(
                result) {
                $scope.dbData.value = [];
            });
        }

        // Handle form submit in the database test example
        $scope.insertData = function(item) {
            var d = new Date();
            if ($scope.insertValue.value.length > 50)
                alert('value should be less than 50 characters');
            else {
                $scope.portalHelpers.invokeServerFunction('insert', {
                    value: $scope.insertValue.value,
                    restaurant: item.value.title,
                    date: d.toDateString(),
                    rating: 5
                }).then(function(result) {
                    $scope.dbData.value = result;
                });
                $scope.insertValue.value = "";
            }
        };

        // Handle click on an item in the list and search example
        $scope.showDetails = function(item) {
            
            // Set which item to show in the details view
            $scope.item.value = item;
            // Show details view in the second column
            $scope.portalHelpers.showView('details.html', 2);
            $scope.portalHelpers.invokeServerFunction('getData', {
                restaurant : item.title
            }).then(function(result) {
                $scope.dbData.value = result;
                sourceLoaded();
            });
        };

        // Handle "previous item" click from the details page
        $scope.prevItem = function() {
            // get previous items in the list
            var prevItem = $scope.portalHelpers.getPrevListItem();
            // refresh details view with the new item
            $scope.showDetails(prevItem);
        }

        $scope.nextItem = function() {
            var nextItem = $scope.portalHelpers.getNextListItem();
            $scope.showDetails(nextItem);
        }

    }])
    // Factory maintains the state of the widget
    .factory('offCampusEatingLocationsFactory', ['$http', '$rootScope', '$filter', '$q', function($http, $rootScope,
        $filter, $q) {
        var initialized = {
            value: false
        };

        // Your variable declarations
        var loading = {
            value: true
        };

        var insertValue = {
            value: null
        };

        var dbData = {
            value: null
        };

        var sourcesLoaded = 0;

        var init = function($scope) {
            if (initialized.value)
                return;
            initialized.value = true;

            // Place your init code here:
            $scope.portalHelpers.invokeServerFunction('getData').then(function(result) {
                dbData.value = result;
                sourceLoaded();
            });
        }

        function sourceLoaded() {
            sourcesLoaded++;
            if (sourcesLoaded > 0)
                loading.value = false;
        }

        return {
            init: init,
            loading: loading,
            insertValue: insertValue,
            dbData: dbData
        };

    }]);