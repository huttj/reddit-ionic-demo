angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope, DataSvc) {
  let after;
  $scope.form = {
    subreddit: 'pics'
  };
  $scope.items = [];

  $scope.load = function(subreddit) {
    DataSvc.list(subreddit)
      .then(res => $scope.items = res.data.children.filter(canDisplay))
      .then(items => $scope.items = items);
  };

  function canDisplay(item) {
    return !item.data.over_18 && !item.data.thumbnail.match(/self|nsfw/);
  }

  $scope.loadMore = function(subreddit) {
    DataSvc.list(subreddit, after)
      .then(res => {
        $scope.items = $scope.items.concat(res.data.children.filter(canDisplay));
        after = res.data.after;
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
  };

  $scope.$on('$stateChangeSuccess', function() {
    $scope.load($scope.form.subreddit);
  });

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
