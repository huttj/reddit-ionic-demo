angular.module('reddit-demo')

.factory('DataSvc', function($http, $ionicPopup) {
  const baseUrl = 'https://www.reddit.com/r/';

  return {
    list: function (subreddit, after) {
      let url = `${baseUrl}${subreddit}.json`;
      if (after) {
        url += `?after=${after}`;
      }
      return $http.get(url)
        .then(getData)
        .catch(toss);
    }
  };

  function getData(res) {
    return res.data;
  }

  function toss(err) {
    $ionicPopup.alert(err.message);
  }

});
