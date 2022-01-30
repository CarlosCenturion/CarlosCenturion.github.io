const logo = document.getElementById('logo')
const search = document.getElementById('searchBtn')
const pirate = document.getElementById('pirateBtn')
const movie = document.getElementById('movieBtn')
const moviesBtn = document.getElementById('moviesBtn')
const svalue = document.getElementById('svalue')
const charly = document.getElementById('charly')

let red = 0
let green = 0
let blue = 0
let min = 0
let max = 255
let alpha = 1

svalue.addEventListener("keydown", (e) => {
    if (e.code === "Enter") searchResult("d")
})

function searchResult(mode) {


    if (svalue.value != "") {

        if (mode == "d") {
            window.location.href = `https://duckduckgo.com/?q=${svalue.value}`
        }
        else if (mode == "p") {
            window.location.href = `https://www.pirate-bay.net/search?q=${svalue.value}?q=${svalue.value}`
        }
        else if (mode == "m") {
            window.open(`https://cuevana3.io/?s=${svalue.value}`)
            window.open(`https://pelisplushd.net/search?s=${svalue.value}`)
            window.open(`https://ver-pelis.tv/ver/buscar?s=${svalue.value}`)
            window.open(`https://pelishouse.com/?s=${svalue.value}`)
            window.open(`https://www.netflix.com/search?q=${svalue.value}`)
        }
        else if (mode == "g"){
            window.open(`https://www.gamestorrents.nu/?s=${svalue.value}`)
        }

    } else {
        svalue.placeholder = "Enserio...?"
    }
}

search.addEventListener('click', () => {
    searchResult("d")
})

search.addEventListener('mouseenter', () => {
    logo.style.color = "green"
})

pirate.addEventListener('click', () => {
    searchResult("p")
})

pirate.addEventListener('mouseenter', () => {
    logo.style.color = "red"
})

movie.addEventListener('click', () => {
    searchResult("m")
})

movie.addEventListener('mouseenter', () => {
    logo.style.color = "blue"
})

svalue.addEventListener('mouseenter', () => {
    timer2 = setInterval(cambiar, 500);

})

svalue.addEventListener('mouseleave', () => {
    clearTimeout(timer2)
})



logo.addEventListener('mouseenter', () => {
    timer = setInterval(cambiar, 500);
})

logo.addEventListener('mouseleave', () => {
    clearTimeout(timer)
})

logo.addEventListener('click', () => { window.location.href = "https://github.com/CarlosCenturion" })
charly.addEventListener('click', () => { window.location.href = "https://carloscenturion.github.io" })



function cambiar() {
    red = red >= max ? 0 : red + 12;
    green = green >= max ? 0 : green + 17;
    blue = blue >= max ? 0 : blue + 9;
    changeColor(red, green, blue, alpha);
}




function changeColor(r, g, b, a) {
    var color = `rgba(${r},${g},${b},${a})`
    logo.style.color = color
}