angular.module('reddit-demo')

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

})

.controller('BrowseCtrl', function($scope, $ionicModal, DataSvc) {
  let after;
  $scope.form = {
    subreddit: 'pics'
  };
  $scope.items = [];

  $scope.load = function(subreddit) {
    DataSvc.list(subreddit)
      .then(res => {
        after = res.data.after;
        return $scope.items = res.data.children.filter(canDisplay)
      })
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

  //$scope.$on('$stateChangeSuccess', function() {
  //  $scope.load($scope.form.subreddit);
  //});

  $ionicModal.fromTemplateUrl('templates/fullview.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(modal => $scope.fullviewModal = modal);

  $scope.showFullview = function(item) {
    let url = item.data.url;

    if (url.match(/\/[^.]+$/)) {
      url += '.jpg';
    }

    $scope.fullview = url;
    $scope.fullviewModal.show();
  };

  $scope.toggleFit = function() {
    $scope.fit = !$scope.fit;
  }

});
