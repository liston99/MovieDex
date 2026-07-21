const bannerImage = document.getElementById("bannerImage");
const bannerTitle = document.getElementById("bannerTitle");
const bannerDescription = document.getElementById("bannerDescription");
const cardSection = document.getElementById("cardSection");

const nowPlayingBtn = document.getElementById("nowPlayingBtn");
const popularBtn = document.getElementById("popularBtn");
const topRatedBtn = document.getElementById("topRatedBtn");
const upcomingBtn = document.getElementById("upcomingBtn");
const search = document.getElementById("search");
const userInput = document.getElementById("userInput");

const signinBtn = document.getElementById("signinBtn");
const signupBtn = document.getElementById("signupBtn");
const logoutBtn = document.getElementById("logoutBtn");

const trailerBtn = document.querySelector(".watch-trailer-btn");

search.addEventListener('click',()=>{
    window.location.href = `./search-results.html?query=${userInput.value.trim()}`;
    userInput.value = "";
})


let fetchedMovies = [];

async function fetchBanner() {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`,
  );

  const data = await response.json();

  fetchedMovies = data.results;

  loadBanner();
}

async function loadBanner() {
  // const maxWidth = window.innerWidth <= 600 ? 300 : 150;
  const randomMovie =
    fetchedMovies[Math.floor(Math.random() * fetchedMovies.length)];


  bannerImage.src = `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`;

  bannerTitle.textContent = randomMovie.original_title;

  bannerDescription.textContent = randomMovie.overview.slice(0, 150) + "...";

  const videoResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${randomMovie.id}/videos?api_key=${API_KEY}`,
  );

  const videoData = await videoResponse.json();

  loadTrailer(videoData.results);
}

function loadTrailer(videos) {
  const trailer = videos.find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  );

  if (trailer) {
    trailerBtn.disabled = false;
    trailerBtn.textContent = "Watch Trailer";

    trailerBtn.onclick = () => {
      window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank");
    };
  } else {
    trailerBtn.disabled = true;
    trailerBtn.textContent = "Trailer Not Available";
  }
}



let fetchedNowPlaying = [];
let fetchedPopularMovies = [];
let fetchedTopRatedMovies = [];
let fetchedUpcomingMovies = [];

async function fetchMovies() {
  const nowPlayingRes = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`,
  );

  const nowPlayingData = await nowPlayingRes.json();

  const popularRes = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
  );

  const popularData = await popularRes.json();

  const topRatedRes = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`,
  );

  const topRatedData = await topRatedRes.json();

  const upcomingRes = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`,
  );

  const upcomingData = await upcomingRes.json();

 


  fetchedNowPlaying = nowPlayingData.results;

  fetchedPopularMovies = popularData.results;

  fetchedTopRatedMovies = topRatedData.results;

  fetchedUpcomingMovies = upcomingData.results;

  loadMovies(fetchedNowPlaying);

  nowPlayingBtn.addEventListener("click", () => loadMovies(fetchedNowPlaying));

  popularBtn.addEventListener("click", () => loadMovies(fetchedPopularMovies));

  topRatedBtn.addEventListener("click", () =>
    loadMovies(fetchedTopRatedMovies),
  );

  upcomingBtn.addEventListener("click", () =>
    loadMovies(fetchedUpcomingMovies),
  );
}

function loadMovies(fetchedMovies) {
  cardSection.innerHTML = "";

  for (let i = 0; i < 14; i++) {
    const cardDiv = document.createElement("div");

    const cardImageDiv = document.createElement("div");

    const image = document.createElement("img");

    const cardMovieDetailsDiv = document.createElement("div");

    const movieTitle = document.createElement("h1");

    const movieDate = document.createElement("p");

    image.src = `https://image.tmdb.org/t/p/original${fetchedMovies[i].backdrop_path}`;

    movieTitle.textContent = fetchedMovies[i].title;

    const [year, month, date] = fetchedMovies[i].release_date.split("-");

    const dateObj = new Date(year, month - 1, date);

    movieDate.textContent =
      dateObj.toLocaleString("default", {
        month: "short",
      }) +
      ", " +
      dateObj.getFullYear();

    cardSection.append(cardDiv);
    cardDiv.append(cardImageDiv);
    cardImageDiv.append(image);
    cardDiv.append(cardMovieDetailsDiv);
    cardMovieDetailsDiv.append(movieTitle);
    cardMovieDetailsDiv.append(movieDate);

    cardDiv.className = "card";
    cardImageDiv.className = "card-movie-image";

    image.className = "card-image";
    image.alt = "Movie Image";

    cardMovieDetailsDiv.className = "card-movie-details";

    cardDiv.addEventListener("click", () => {
      window.location.href = `./movie-details.html?id=${fetchedMovies[i].id}`;
    });
  }
}

async function checkLoginStatus() {
  const {
    data: { user },
  } = await databaseClient.auth.getUser();;

  if (user) {
    // User logged in
    signinBtn.style.display = "none";
    signupBtn.style.display = "none";
    logoutBtn.style.display = "block";
  } else {
    // User not logged in
    signinBtn.style.display = "block";
    signupBtn.style.display = "block";
    logoutBtn.style.display = "none";
  }
}

logoutBtn.addEventListener("click", async () => {
  await databaseClient.auth.signOut();

  window.location.reload();
});

checkLoginStatus();

fetchBanner();
fetchMovies();

setInterval(loadBanner, 5000);
