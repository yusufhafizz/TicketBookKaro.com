// Define an AngularJS controller named "homepage" and inject dependencies
let counter = 1;
app.controller("homepage", function ($scope, $window, $http, DataService) {
  // Set the current page to "home"
  page = "home";
  $scope.counter = counter;

  if (user) {
    var welcomeBackElement = document.querySelector(".welcome-back");
    setTimeout(function () {
      welcomeBackElement.style.transform = "translate(-50%,0)";
    }, 50);
    // welcomeBackElement.style.transition = "400ms";
    setTimeout(function () {
      welcomeBackElement.style.transform = "translate(-50%,-100%)";
      $scope.counter--;
      counter--;
    }, 3000);
  }

  // Fetch movie data from an external JSON file
  $http
    .get("http://127.0.0.1:5001/api/movies/")
    .then((res) => {
      $scope.movies = res.data;

      // Generate a random number to select a subset of movies
      const randomDecimal = Math.random();
      const randomNumber = Math.floor(
        randomDecimal * ($scope.movies.length - 3)
      );

      // Create a new array with a random selection of movies
      $scope.newArr = $scope.movies.slice(randomNumber, randomNumber + 4);
    })
    .catch((err) => {
      alert("Could not fetch the data.");
    });

  // Function to handle location changes (navigation to other pages)
  $scope.locationChange = function (link, movie) {
    movPag = "/";
    // Set data to be shared between controllers using a service
    DataService.setData(movie);

    // Scroll to the top of the page
    window.scrollTo(0, 0);

    // Update the current page
    page = link.split("/")[1];

    // Redirect to the specified link
    $window.location.href = link;
  };

  // DOM elements and variables related to slideshow
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".arrow-left");
  const btnRight = document.querySelector(".arrow-right");
  const dots = document.querySelectorAll(".dots");
  const watchTrailerBtns = document.querySelectorAll(".watch-trailer");
  const overlay = document.querySelector(".overlay");
  const overlayBtn = document.querySelector(".close-video");
  const video = document.querySelector(".video-content");

  // Initialize the current slide index and timer duration
  let currSlide = 0;
  let timer = 2;

  // Add "dot-active" class to the first dot
  dots[currSlide].firstElementChild.classList.add("dot-active");

  // Position each slide horizontally
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * i}%)`;
  });

  // Function to transform the slides and update dot states
  const slideTransform = function (currSlide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - currSlide)}%)`;
    });
    dots[currSlide].firstElementChild.classList.add("dot-active");
  };

  // Set an interval to automatically switch slides
  let interval = setInterval(intervalTime, timer * 1000);

  // Event listener for the right arrow button
  btnRight.addEventListener("click", function () {
    dots[currSlide].firstElementChild.classList.remove("dot-active");
    currSlide++;

    if (currSlide == slides.length) {
      currSlide = 0;
    }
    slideTransform(currSlide);
    clearInterval(interval);
    interval = setInterval(intervalTime, timer * 1000);
  });

  // Event listener for the left arrow button
  btnLeft.addEventListener("click", function () {
    dots[currSlide].firstElementChild.classList.remove("dot-active");
    currSlide--;

    if (currSlide == -1) {
      currSlide = slides.length - 1;
    }
    slideTransform(currSlide);
    clearInterval(interval);
    interval = setInterval(intervalTime, timer * 1000);
  });

  // Function to handle the automatic slide transition
  function intervalTime() {
    dots[currSlide].firstElementChild.classList.remove("dot-active");
    currSlide++;

    if (currSlide == slides.length) {
      currSlide = 0;
    }
    slideTransform(currSlide);
  }

  // Add click event listeners to "Watch Trailer" buttons to show video overlay
  watchTrailerBtns.forEach((el) => {
    el.addEventListener("click", function () {
      overlay.classList.remove("hidden");
    });
  });

  // Click event listener for the video overlay to close it
  overlay.addEventListener("click", function () {
    overlay.classList.add("hidden");
    video.pause();
  });
});
