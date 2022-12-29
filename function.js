const getpokemon = id => 'https:pokeapi.co/api/v2/pokemon/${id}'
const generator = () => Array(150).fill().map((_, index) =>
fetch(getpokemon(index + 1)).then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {
    const element = types.map(typeInfo => typeInfo.type.name)

    accumulator += `
      <li class="card ${element[0]}">
      <img class="card-image alt="${name}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png"</img>
        <h2 class="card-title">${id}. ${name}</h2>
        <p class="card-subtitle">${element.join(" | ")}</p>
      </li>
    `
    return accumulator
  }, "")


  const insert = pokemons => {
    const ul = document.querySelector('[data-js = "pokedex"]')
    ul.innerHTML = pokemons
  }
  
  const pokemonPromises = generator()
  Promise.all(pokemonPromises)
  .then(generator)
  .then(insert)
