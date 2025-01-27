//const { response } = require("express");

wikiApp.controller("displayController", function($scope, $http, $routeParams, $sce) {
  // Controller for display view
  var urlName = $routeParams.urlName // this will be the urlName for your page

    $http.get(`/api/wiki/${urlName}`).then(result => {
      console.log(urlName)
      console.log(result);

      $scope.title = result.data.title;
      $scope.html = result.data.html;
      $scope.category = result.data.category;
      $scope.author = result.data.author;
      $scope.pageViews = result.data.pageViews;
      $scope.published = result.data.createdDate;
      $scope.urlName = result.data.urlName;

    }).catch(err => {
      console.error("Error fetching data", err)
    })


  // Notes:
  // Make an GET ajax call to endpoint and pass in the urlName
  // The result will contain the html that should get assigned to $scope.html
  // $scope.title = response.data.title
  // $scope.html = response.data.html
  // ..

});
