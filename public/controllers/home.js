wikiApp.controller("homeController", function($scope, $http) {
  // Controller for home view

  $scope.searchTerm = "";
  
  $scope.search = (searchTerm) => {
    $http.get(`/api/wiki/search/${searchTerm}`).then(result => {
      $scope.searchResults = result.data;
      console.log(result);
    }).catch(err => {
      console.log(err)
    })
    
  }
  // event handler for the search button
  // $http.get() to your search endpoint
  // the result will be an array of objects, assign this to a scope var
  // $scope.searchResults = ...
});     