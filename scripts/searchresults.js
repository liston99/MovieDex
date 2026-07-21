const params = new URLSearchParams(window.location.search);
const searchQuery = params.get("query")
const cardSection = document.getElementById("cardSection")
const searchResultTitle = document.getElementById("searchResultTitle");

searchResultTitle.textContent = `Search results for "${searchQuery}" `

let fetchedMovies = [];
async function fetchSearch() {
    const searchResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}&include_adult=false`);
    const searchData = await searchResponse.json();

    fetchedMovies = searchData.results;
    loadFetchedMovies(fetchedMovies);
}

function loadFetchedMovies(movies){
    cardSection.innerHTML = "";
    for (let i = 0; i < 14; i++) {
    const cardDiv = document.createElement("div");

    const cardImageDiv = document.createElement("div");

    const image = document.createElement("img");

    const cardMovieDetailsDiv = document.createElement("div");

    const movieTitle = document.createElement("h1");

    const movieDate = document.createElement("p");

    image.src = `https://image.tmdb.org/t/p/original${movies[i].backdrop_path}`;

    movieTitle.textContent = movies[i].title;

    const [year, month, date] = movies[i].release_date.split("-");

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
      window.location.href = `./movie-details.html?id=${movies[i].id}`;
    });
  }
    
}

fetchSearch();