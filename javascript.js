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
        location: "UW plaza"
        mapurl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2895.4146072148083!2d-80.53988384863868!3d43.47281717902555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf401323dd441%3A0xc2bc480b90231754!2sWaterloo+Star!5e0!3m2!1sen!2sca!4v1457803922857"
    }, {
        title: "Sogo",
        details: "Sogo details",
        foodType: "Eastern",
        location: "UW plaza"
        mapurl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5790.787837246627!2d-80.536543!3d43.473249!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x3e0668302d13b35f!2sSogo!5e0!3m2!1sen!2sca!4v1457806628929"
    }, {
        title: "Kenzo",
        details: "Kenzo details",
        foodType: "Eastern",
        location: "UW plaza"
    }, {
        title: "Williams",
        details: "Williams details",
        foodType: "Eastern",
        location: "UW plaza"
    }, {
        title: "Nuri Village",
        details: "Nuri Village details",
        foodType: "Eastern",
        location: "UW plaza"
    }, {
        title: "Mr. Sushi",
        details: "Mr. Sushi details",
        foodType: "Eastern",
        location: "UW plaza"
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
            }).then(function (result) {
                $scope.dbData.value = result;
            });
            $scope.insertValue.value = "";
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