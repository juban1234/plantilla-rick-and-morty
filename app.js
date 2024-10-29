const url = 'https://rickandmortyapi.com/api/character'

const getCharacter = async (URL) => {
    const response = await fetch(URL)
    const data = await response.json()
    return data.results
}

// Crear las tarjetas de personajes
const characterCard = async(characters) => {
    const container = document.getElementById('targets')
    container.innerHTML = ''  // Limpiar el contenido anterior
    characters.forEach(character => {
        makeCard(character)
    })
}

// Crear una tarjeta individualmente
function makeCard(character) {
    const container = document.createElement('div')
    container.id='container'

    const imgCard = document.createElement('img')
    imgCard.id = 'img-container'
    imgCard.src = character.image
    imgCard.alt = character.name

    const nameCard = document.createElement('h2')
    nameCard.id= 'name-container'
    nameCard.textContent = `NOMBRE: ${character.name}`

    const status = document.createElement('h3')
    status.id='statu-container'
    status.textContent = `ESTADO: ${character.status}`

    const specie = document.createElement('h4')
    specie.id = 'especie-container'
    specie.textContent = `ESPECIE: ${character.species}`

    const order = document.createElement('div')
    order.classList.add('order')

    order.appendChild(nameCard)
    order.appendChild(status)
    order.appendChild(specie)

    container.appendChild(imgCard)
    container.appendChild(order)

    document.getElementById('targets').appendChild(container)

    container.addEventListener('mouseenter', () => {
        container.style.boxShadow = '0px 0px 10px 0px red'
    })

    container.addEventListener('mouseleave', () => {
        container.style.boxShadow = ''
    })
}

// Filtrar personajes en tiempo real
const searchCharacters = async (query) => {
    const response = await fetch(`${url}?name=${query}`)
    const data = await response.json()
    return data.results || [] // Si no encuentra resultados, devuelve un arreglo vacío
}

// Detectar el cambio en el input y realizar la búsqueda
const nombres = document.getElementById('nombres')
nombres.addEventListener('input', async (event) => {
    const query = event.target.value.trim()
    if (query) {
        const characters = await searchCharacters(query)
        characterCard(characters)
    } else {
        const allCharacters = await getCharacter(url) // Mostrar todos los personajes si el campo está vacío
        characterCard(allCharacters)
    }
})

// Cargar todos los personajes al cargar la página
window.addEventListener('DOMContentLoaded', async () => {
    const allCharacters = await getCharacter(url)
    characterCard(allCharacters)
})
