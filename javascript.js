angular.module('portalApp')

.controller('offCampusEatingLocationsCtrl', ['$scope', '$http', '$q', 'offCampusEatingLocationsFactory', function ($scope, $http, $q,
offCampusEatingLocationsFactory) {

    // Widget Configuration
    $scope.portalHelpers.config = {
        // make 'widgetMenu.html' the template for the top right menu
        "widgetMenu": "widgetMenu.html"
    };

    // Import variables and functions from service
    $scope.loading = offCampusEatingLocationsFactory.loading;
    $scope.item = {value:''};
    $scope.insertValue = offCampusEatingLocationsFactory.insertValue;
    $scope.dbData = offCampusEatingLocationsFactory.dbData;
    offCampusEatingLocationsFactory.init($scope);

    // Model for the search and list example
    $scope.model = [{
        title: "Waterloo Star",
        details: "Waterloo Star details",
        foodType: "Eastern",
        ratings: '5'
    }, {
        title: "Sogo",
        details: "Sogo details",
        foodType: "Eastern",
        ratings: '5'
    }, {
        title: "Kenzo",
        details: "Kenzo details",
        foodType: "Eastern",
        ratings: '5' 
    }, {
        title: "Williams",
        details: "Williams details",
        foodType: "Eastern",
        ratings: '5'
    }, {
        title: "Nuri Village",
        details: "Nuri Village details",
        foodType: "Eastern",
        ratings: '5'
    }, {
        title: "Mr. Sushi",
        details: "Mr. Sushi details",
        foodType: "Eastern",
        ratings: '5'
    }];

    // initialize the service
    offCampusEatingLocationsFactory.init($scope);

    // watch for changes in the loading variable
    $scope.$watch('loading.value', function () {
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
    $scope.createTable = function () {
        $scope.portalHelpers.invokeServerFunction('createTable').then(function (
            result) {
            $scope.dbData.value = [];
        });
    }

    // Handle form submit in the database test example
    $scope.insertData = function () {
        if ($scope.insertValue.value.length > 50)
            alert('value should be less than 50 characters');
        else {
            $scope.portalHelpers.invokeServerFunction('insert', {
                value: $scope.insertValue.value
                //restaurant: $scope.insertValue.restaurant
            }).then(function (result) {
                $scope.dbData.value = result;
            });
            $scope.insertValue.value = "";
            //$scope.insertValue.restaurant = "";
        }
    };
    
    // Handle click on an item in the list and search example
    $scope.showDetails = function (item) {
        //
        // Set which item to show in the details view
        $scope.item.value = item;
        // Show details view in the second column
        $scope.portalHelpers.showView('details.html', 2);
    };

    // Handle "previous item" click from the details page
    $scope.prevItem = function () {
        // get previous items in the list
        var prevItem = $scope.portalHelpers.getPrevListItem();
        // refresh details view with the new item
        $scope.showDetails(prevItem);
    }

    $scope.nextItem = function () {
        var nextItem = $scope.portalHelpers.getNextListItem();
        $scope.showDetails(nextItem);
    }

}])
    // Factory maintains the state of the widget
    .factory('offCampusEatingLocationsFactory', ['$http', '$rootScope', '$filter', '$q', function ($http, $rootScope,
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

        var init = function ($scope) {
            if (initialized.value)
                return;
            initialized.value = true;
            
            // Place your init code here:
              $scope.portalHelpers.invokeServerFunction('getData').then(function (result) {
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