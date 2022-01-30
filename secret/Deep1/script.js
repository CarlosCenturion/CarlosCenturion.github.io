const logo = document.getElementById('logo')
const search = document.getElementById('searchBtn')
const pirate = document.getElementById('pirateBtn')
const movie = document.getElementById('movieBtn')
const moviesBtn = document.getElementById('moviesBtn')
const svalue = document.getElementById('svalue')
const charly = document.getElementById('charly')
const barraDerecha = document.getElementById('barraDerecha')

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
            window.open(`https://duckduckgo.com/?q=${svalue.value}`)
        }
        else if (mode == "p") {
            window.open(`https://www.pirate-bay.net/search?q=${svalue.value}?q=${svalue.value}`)
        }
        else if (mode == "m") {
            window.open(`https://cuevana3.io/?s=${svalue.value}`)
            window.open(`https://pelisplushd.net/search?s=${svalue.value}`)
            window.open(`https://ver-pelis.tv/ver/buscar?s=${svalue.value}`)
            window.open(`https://pelishouse.com/?s=${svalue.value}`)
            window.open(`https://www.netflix.com/search?q=${svalue.value}`)
        }
        else if (mode == "g") {
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
    svalue.style.backgroundColor = "green"
    barraDerecha.style.backgroundColor = "green"
})

pirate.addEventListener('click', () => {
    searchResult("p")
})

pirate.addEventListener('mouseenter', () => {
    logo.style.color = "red"
    svalue.style.backgroundColor = "red"
    barraDerecha.style.backgroundColor = "red"
})

movie.addEventListener('click', () => {
    searchResult("m")
})

movie.addEventListener('mouseenter', () => {
    logo.style.color = "blue"
    svalue.style.backgroundColor = "blue"
    barraDerecha.style.backgroundColor = "blue"
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
    svalue.style.backgroundColor = color
    barraDerecha.style.backgroundColor = color
}


// Boton Magico
const MagicBtn = document.getElementById('svalue')


MagicBtn.addEventListener(('click'), function (e) {
    const x = e.clientX
    const y = e.clientY

    const buttonTop = e.target.offsetTop
    const buttonLeft = e.target.offsetLeft

    const xInside = x - buttonLeft
    const yInside = y - buttonTop

    const circle = document.createElement('span')
    circle.classList.add('circle')
    circle.style.left = xInside + 'px'
    circle.style.top = yInside + 'px'

    this.appendChild(circle)
    document.body.appendChild(circle)




    setTimeout(() => circle.remove(), 400)
})




// MoonPhase

function recomendaciones(fase) {
    switch (fase) {
        case "Creciente":
            var consejos = `
                <ol>
                <li>Podar árboles enfermos.</li>
                <li>Podar frutales para darles mayor rendimiento.</li>
                <li>Sembrar flores y cultivar en terrenos arenosos.</li>
                <li>Sembrar hortalizas de hoja como lechuga, acelga, espinaca, etc.</li>
                <li>Abonar plantas para que crezcan más rápido.</li>
                <li>Realizar injertos.</li>
                <li>Evitar regar plantas de flor</li>
                </ol>            
                `

            var consejo = document.createElement('div')
            consejo.innerHTML = consejos
            moonphase.appendChild(consejo)
            break;

        case "Cuarto creciente":

            var consejos = `
                <ol>
                <li>Podar árboles enfermos.</li>
                <li>Podar frutales para darles mayor rendimiento.</li>
                <li>Sembrar flores y cultivar en terrenos arenosos.</li>
                <li>Sembrar hortalizas de hoja como lechuga, acelga, espinaca, etc.</li>
                <li>Abonar plantas para que crezcan más rápido.</li>
                <li>Realizar injertos.</li>
                <li>Evitar regar plantas de flor</li>
                </ol>            
                `

            var consejo = document.createElement('div')
            consejo.innerHTML = consejos
            moonphase.appendChild(consejo)

            break;

        case "Menguante":
            var consejos = `
            <ol>
            <li>Transplantar plantas cuando este finalizando la fase.</li>
            <li>Cortar el cesped.</li>
            <li>Sembrar semillas de verduras que crecen bajo tierra como nabos, zanahoria, entre otras.</li>
            <li>Regar plantas en flor.</li>
            </ol>            
            `

            var consejo = document.createElement('div')
            consejo.innerHTML = consejos
            moonphase.appendChild(consejo)
            break;

        case "Cuarto menguante":

            var consejos = `
            <ol>
            <li>Transplantar plantas cuando este finalizando la fase.</li>
            <li>Cortar el cesped.</li>
            <li>Sembrar semillas de verduras que crecen bajo tierra como nabos, zanahoria, entre otras.</li>
            <li>Regar plantas en flor.</li>
            </ol>            
            `

            var consejo = document.createElement('div')
            consejo.innerHTML = consejos
            moonphase.appendChild(consejo)
            break;

        case "Luna nueva":

            var consejos = `
            <ol>
            <li>Preparar el suelo  </li>
            <li>Abonar </li>
            <li>Eliminar la maleza </li>
            <li>Quitar hojas marchitas </li>
            <li>Sembrar prado </li>
            <li>Sembrar arboles de hoja redonda. y hortalizas de raíz. </li>
            <li>Podar frecuentemente. </li>
            </ol>            
            `

            var consejo = document.createElement('div')
            consejo.classList.add('ListaDeConsejos')
            consejo.innerHTML = consejos
            moonphase.appendChild(consejo)

            break;

        case "Luna llena":
            var consejos = `
                <ol>
                <li>Sembrar semillas de germinación lenta. </li>
                <li>Cosechar frutos y hortalizas de hoja. </li>
                <li>Fertilizar </li>
                <li>Regar </li>
                <li>Dividir plantas. </li>
                <li>Transplantar plantas de interior. En este periodo de concentra la energía en el crecimiento de las raíces. </li>
                </ol>            
                `

            var consejo = document.createElement('div')
            consejo.classList.add('ListaDeConsejos')
            consejo.innerHTML = consejos
            moonphase.appendChild(consejo)
            break;

        default:
            break;
    }
}

function load_moon_phases(obj, callback) {
    var gets = []
    for (var i in obj) {
        gets.push(i + "=" + encodeURIComponent(obj[i]))
    }
    gets.push("LDZ=" + new Date(obj.year, obj.month - 1, 1) / 1000)
    var xmlhttp = new XMLHttpRequest()
    var url = "https://www.icalendar37.net/lunar/api/?" + gets.join("&")
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
           // console.log(JSON.parse(xmlhttp.responseText))
            callback(JSON.parse(xmlhttp.responseText))
        }
    }
    xmlhttp.open("GET", url, true)
    xmlhttp.send()
}

function example_1(moon) {
    var day = new Date().getDate()
    var dayWeek = moon.phase[day].dayWeek
    var html = "<div>" +
        "<b>" + moon.nameDay[dayWeek] + "</b>" +
        "<div>" + day + " <b>" + moon.monthName + "</b> " +
        moon.year + "</div>" +
        "<div shadow>" + moon.phase[day].svg + "</div>" +
        "<div>" + moon.phase[day].phaseName + " " +
        "" + ((moon.phase[day].isPhaseLimit) ? "" : Math.round(moon.phase[day].lighting) + "%") +
        "</div>" +
        "</div>"
    document.getElementById("moonphase").innerHTML = html

    recomendaciones(moon.phase[day].phaseName);

}
var configMoon = {
    lang: 'es',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    size: 150,
    lightColor: "rgb(255,255,255)",
    shadeColor: "black",
    texturize: true,
}
load_moon_phases(configMoon, example_1)
//

