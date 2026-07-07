const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

const movieTitle = document.querySelector(".movie-title");
const movieGenre = document.querySelector(".movie-date-genre");
const movieRating = document.querySelector(".movie-rating");
const movieDesc = document.querySelector(".movie-desc");
const moviePoster = document.querySelector(".movie-image img");
const trailerBtn = document.querySelector(".watch-trailer-btn");

const castContainer = document.querySelector(".c-details");



async function fetchMovieDetails() {
  try {
    // Movie details request
    const movieResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
    );

    const movieData = await movieResponse.json();

    // Cast request
    const castResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`
    );

    const castData = await castResponse.json();

    const videoResponse = await fetch(
  `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
);

const videoData = await videoResponse.json();

loadTrailer(videoData.results);

    loadMovie(movieData);
    loadCast(castData.cast);

  } catch (error) {
    console.log("Error fetching movie:", error);
  }
}

function loadMovie(movie) {
  movieTitle.textContent = movie.title;

  const [year, month, date] = movie.release_date.split("-");

  const dateObj = new Date(year, month - 1, date);

  const releaseDate =
    dateObj.toLocaleString("default", { month: "short" }) +
    " " +
    dateObj.getDate() +
    ", " +
    dateObj.getFullYear();

  movieGenre.textContent =
    `${releaseDate} • ${movie.genres
      .map((genre) => genre.name)
      .join(" • ")}`;

  movieRating.innerHTML = `
    ⭐ ${movie.vote_average.toFixed(1)}
    <span class="total-votes">
      (${movie.vote_count})
    </span>
  `;

  movieDesc.textContent = movie.overview;

  moviePoster.src =
    `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
}

function loadCast(cast) {
  castContainer.innerHTML = "";

  cast.slice(0, 10).forEach(actor => {
    castContainer.innerHTML += `
      <div class="cast-image">
        <img 
          src="${
            actor.profile_path
              ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
              : "/assets/image.png"
          }"
          alt="${actor.name}"
        />
        <p>${actor.name}</p>
      </div>
    `;
  });
}


function loadTrailer(videos) {
  const trailer = videos.find(
    video =>
      video.type === "Trailer" &&
      video.site === "YouTube"
  );

  if (trailer) {
    trailerBtn.addEventListener("click", () => {
      window.open(
        `https://www.youtube.com/watch?v=${trailer.key}`,
        "_blank"
      );
    });
  } else {
    trailerBtn.textContent = "Trailer Not Available";
    trailerBtn.disabled = true;
  }
}
fetchMovieDetails();