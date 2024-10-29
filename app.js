const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const url = 'https://rickandmortyapi.com/api/character';

const getCharacter = async (URL) => {
    const response = await fetch(proxyUrl + URL);
    const data = await response.json();
    return data.results;
};

// Crear las tarjetas de personajes
const characterCard = async(characters) => {
    const container = document.getElementById('targets');
    container.innerHTML = '';  // Limpiar el contenido anterior
    characters.forEach(character => {
        makeCard(character);
    });
};

// Crear una tarjeta individualmente
function makeCard(character) {
    const container = document.createElement('div');
    container.classList.add('card');

    const imgCard = document.createElement('img');
    imgCard.src = character.image;
    imgCard.alt = character.name;

    const nameCard = document.createElement('h2');
    nameCard.textContent = `NOMBRE: ${character.name}`;

    const status = document.createElement('h3');
    status.textContent = `ESTADO: ${character.status}`;

    const specie = document.createElement('h4');
    specie.textContent = `ESPECIE: ${character.species}`;

    container.appendChild(imgCard);
    container.appendChild(nameCard);
    container.appendChild(status);
    container.appendChild(specie);

    document.getElementById('targets').appendChild(container);

    container.addEventListener('mouseenter', () => {
        container.style.boxShadow = '0px 0px 10px 0px red';
    });

    container.addEventListener('mouseleave', () => {
        container.style.boxShadow = '';
    });
}

// Filtrar personajes en tiempo real
const searchCharacters = async (query) => {
    const response = await fetch(`${url}?name=${query}`);
    const data = await response.json();
    return data.results || []; // Si no encuentra resultados, devuelve un arreglo vacío
};

// Detectar el cambio en el input y realizar la búsqueda
const nombres = document.getElementById('nombres');
nombres.addEventListener('input', async (event) => {
    const query = event.target.value.trim();
    if (query) {
        const characters = await searchCharacters(query);
        characterCard(characters);
    } else {
        const allCharacters = await getCharacter(url); // Mostrar todos los personajes si el campo está vacío
        characterCard(allCharacters);
    }
});

// Cargar todos los personajes al cargar la página
window.addEventListener('DOMContentLoaded', async () => {
    const allCharacters = await getCharacter(url);
    characterCard(allCharacters);
});
