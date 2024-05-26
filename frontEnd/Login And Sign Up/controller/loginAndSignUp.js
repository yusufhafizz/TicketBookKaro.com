// Define an AngularJS controller named "login&signup" and inject dependencies
app.controller("login&signup", function ($scope, $window, $rootScope, $http) {
  // Initialize scope variables
  $scope.showError = false; // Flag to control error message visibility
  $scope.errorMsg = ""; // Error message text
  $scope.login_signup = "Login"; // Initial mode is "Login"
  $scope.showError2 = false;

  // Function to toggle between "Login" and "Signup" modes
  $scope.toggleLoginSignup = function () {
    if ($scope.login_signup === "Login") {
      $scope.login_signup = "Signup";
      // Adjust the position of the login/signup container
      document.querySelector(".loginSignupDeciderContainer").style = "top: 90%";
    } else {
      $scope.login_signup = "Login";
      // Adjust the position of the login/signup container
      document.querySelector(".loginSignupDeciderContainer").style = "top: 80%";
    }
  };

  // Function to authenticate user or register new user
  $scope.getUser = function () {
    if ($scope.login_signup === "Login") {
      // Handle login action
      // $scope.user = $rootScope.users.find((el) => {
      //   if (
      //     el.username === $scope.username &&
      //     el.password === $scope.password
      //   ) {
      //     return el;
      //   }
      // });

      $http({
        method: "POST",
        url: "http://127.0.0.1:5001/api/users/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: { username: $scope.username, password: $scope.password },
      })
        .then((res) => {
          $scope.user = res.data;
          if ($scope.user) {
            // Successful login
            user = $scope.user;
            page = nextPage; // Set the target page
            $window.location.href = `#/${page}`; // Redirect to the target page
            $rootScope.loggedIn = true;
          } else {
            // Failed login attempt
            $scope.showError = true;
            $scope.errorMsg = "*Invalid Username or Password*";
          }
        })
        .catch((err) => {
          $scope.showError = true;
          $scope.errorMsg = "*Invalid Username or Password*";
        });
    } else if ($scope.login_signup === "Signup") {
      // Handle signup action
      const dob = $scope.birthday;
      const yyyy = dob.getFullYear();
      let mm = dob.getMonth() + 1; // Months start at 0!
      let dd = dob.getDate();

      if (dd < 10) dd = "0" + dd;
      if (mm < 10) mm = "0" + mm;

      let birthday = dd + "/" + mm + "/" + yyyy;

      // Create a new user object
      let newUser = {
        username: `${$scope.NewUsername}`,
        email: `${$scope.email}`,
        name: `${$scope.name}`,
        password: `${$scope.NewPassword}`,
        dob: `${birthday}`,
      };
      $http({
        method: "POST",
        url: "http://127.0.0.1:5001/api/users/signup",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          username: `${$scope.NewUsername}`,
          email: `${$scope.email}`,
          name: `${$scope.name}`,
          password: `${$scope.NewPassword}`,
          dob: `${birthday}`,
        },
      })
        .then((res) => {
          $scope.user = res.data;
          if (
            $scope.user != "Error creating user" &&
            $scope.user != "User already exists" &&
            $scope.user != undefined
          ) {
            console.log($scope.user);
            user = $scope.user;

            // Add the new user to the list of users in the root scope

            page = nextPage; // Set the target page
            $window.location.href = `#/${page}`; // Redirect to the target page
            $rootScope.loggedIn = true;
          }
        })
        .catch((err) => {
          $scope.showError2 = true;
          $scope.errorMsg2 = "Email already exists use another.";
        });
    }
  };
});
