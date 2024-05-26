app.controller(
  "movies",
  function ($scope, $http, $rootScope, $filter, DataService) {
    page = ""; // Initialize page variable
    $scope.fullSizeArr = []; // Initialize an array for storing all movies
    $scope.selectedTab = "home"; // Initialize the selected tab
    $scope.selectedGenre = ""; // Initialize the selected genre
    $scope.selectedOption = ""; // Initialize the selected option

    // Function to show a specific option
    $scope.showOption = function (option) {
      $scope.selectedOption = option;
    };

    // Function to select a tab
    $scope.selectTab = function (tab) {
      $scope.selectedTab = tab;
      $scope.selectedOption = ""; // Reset selected option when changing tabs
    };

    // Load movie data from JSON file
    $http
      .get("http://127.0.0.1:5001/api/movies/")
      .then((res) => {
        $scope.movies = res.data;
        $scope.fullSizeArr = $scope.movies.slice();
        $scope.numMovies = $scope.fullSizeArr.slice(0, 12);
      })
      .catch((err) => {
        alert("Could not fetch the data.");
      });

    // Function to get a specific page of movies
    $scope.getNumOfMovies = function (page) {
      $scope.numMovies = $scope.fullSizeArr.slice((page - 1) * 12, page * 12);
    };

    $scope.selectedSortOption = ""; // Default sorting option
    $scope.sortOrder = false; // Default sorting order (ascending)

    // Function to toggle the sorting order
    $scope.toggleSortOrder = function () {
      $scope.sortOrder = !$scope.sortOrder;
    };

    $scope.selectedGenre = "AllMovies"; // Default selected genre

    // Function to filter movies by genre
    $scope.filterByGenre = function (genre) {
      $scope.selectedGenre = genre;
    };

    // Function to generate an array of pagination buttons
    $scope.pagButtonsNumber = function () {
      let arr = [];
      for (let i = 0; i < $scope.fullSizeArr.length / 12; i++) {
        arr[i] = i + 1;
      }
      return arr;
    };

    // Function to filter movies based on genre
    $scope.filterArr = function (genre) {
      $scope.selectedGenre = genre;

      if (genre === "AllMovies") {
        $scope.fullSizeArr = $scope.movies.slice();
        $scope.getNumOfMovies(1);
        document.getElementById("sortSelect").selectedIndex = 0;
        return;
      }
      let newArr = $scope.movies.filter(
        (el) => el.genre === $scope.selectedGenre
      );
      $scope.fullSizeArr = newArr.slice();
      $scope.getNumOfMovies(1);
      document.getElementById("sortSelect").selectedIndex = 0;
    };

    // Function to sort movies by Name or Rating
    $scope.sortBy = function (param) {
      if (param === "Name") {
        $scope.fullSizeArr.sort((a, b) => {
          const nameA = a.movieName.toUpperCase(); // Convert names to uppercase for case-insensitive sorting
          const nameB = b.movieName.toUpperCase();

          if (nameA < nameB) {
            return -1;
          } else if (nameA > nameB) {
            return 1;
          } else {
            return 0; // Names are equal
          }
        });
        $scope.getNumOfMovies(1);
      } else if (param === "Rating") {
        $scope.fullSizeArr.sort((a, b) => b.rating - a.rating);
        $scope.getNumOfMovies(1);
      }
    };

    // Watch for changes in the search text and filter movies accordingly
    $scope.$watch("$root.searchText", function () {
      if ($rootScope.searchText !== "") {
        $scope.filterArr($scope.selectedGenre);
        document.getElementById("sortSelect").selectedIndex = 0;
        let newArr = $filter("filter")($scope.fullSizeArr, function (item) {
          var movieName = item.movieName.toLowerCase();
          var search = $rootScope.searchText.toLowerCase();
          if (movieName.includes(search)) {
            return item;
          }
        });
        $scope.fullSizeArr = newArr.slice();
        $scope.getNumOfMovies(1);
      } else {
        $scope.filterArr($scope.selectedGenre);
      }
    });

    // Function to set movie data for the next view
    $scope.getMovie = function (movie) {
      DataService.setData(movie);
    };
  }
);
