const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const loadPokemonDetail = document.getElementById('pokemonDetail');

const maxRecords = 151;
const limit = 5;
let offset = 0;

// Seleção dos elementos da modal
function showModal(pokemon) {
    document.getElementById('modalTopoDetail').className = pokemon.type;
    document.getElementById('modalName').innerText = pokemon.name;
    document.getElementById('modalId').innerText = `#${pokemon.number}`;
    document.getElementById('modalImage').src = pokemon.photo;
    document.getElementById('modalTypesDetail').innerHTML = `${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}`;
    document.getElementById('modalHieghtDetail').innerText = `${pokemon.height}"`;
    document.getElementById('modalWeightDetail').innerText = `${pokemon.weight}"`;
    document.getElementById('modalAbilitiesDetail').innerHTML = `<span>Habilidades: </span>${pokemon.abilities.map((ability) => `<li>${ability}</li>`).join('')}`;
    document.getElementById('pokemonModal').style.display = 'flex';
}

// Fechamento da modal
document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('pokemonModal').style.display = 'none';
});

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}"  onclick="showModal(${JSON.stringify(pokemon).replace(/"/g, '&quot;')})">
                </div>
            </li>
        `).join('');

        pokemonList.innerHTML += newHtml;
    })
}

// Carregamento da primeira página ao abrir a página
loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordWithNextPage = offset + limit

    if (qtdRecordWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})


