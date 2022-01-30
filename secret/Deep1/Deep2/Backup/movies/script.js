// ef7b680201d2020eb85d99244f7b96a8
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ef7b680201d2020eb85d99244f7b96a8&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=ef7b680201d2020eb85d99244f7b96a8&query="'
const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById("main")

getMovies(API_URL)

async function getMovies(url) {
    const response = await fetch(url)
    const data = await response.json()
  
    showMovies(data.results)

}

function showMovies(movies){
    main.innerHTML = ''

    movies.forEach(movie => {
        console.log(movie)
        const { title,poster_path,vote_average,overview} = movie

        const movieElement = document.createElement('div')
        movieElement.classList.add('movie')

        movieElement.innerHTML = `
         <img src="${IMG_PATH + poster_path}"
          alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
              <span class="${getClassByRate(vote_average)}">${vote_average}</span>
          </div>

        <div class="overview">
            <h3>Ver Online</h3>

            <button class="boton ">
            <a href="https://cuevana3.io/?s=${title}">Cuevana</a></i>
            </button>

            <button class="boton ">
            <a href="https://www.netflix.com/search?q=${title}">Netflix</a></i>
            </button>

            <button class="boton ">
            <a href="https://pelisplushd.net/search?s=${title}">PelisPlusHD</a></i>
            </button>

            <button class="boton ">
            <a href="https://ver-pelis.tv/ver/buscar?s=${title}">VerPelis</a></i>
            </button>

            <button class="boton ">
            <a href="https://pelishouse.com/?s=${title}">Pelis House</a></i>
            </button>

        </div>            

        
   
    `
        
    main.appendChild(movieElement)
      
    });
}

function getClassByRate(vote){
    if(vote >= 8){
        return 'green'
    }else if(vote >= 5){
        return 'orange'
    }else{
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchTerm = search.value

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)
        search.value = ''
    }else{
        window.location.reload()
    }
})