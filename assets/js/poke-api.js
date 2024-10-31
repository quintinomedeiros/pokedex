const pokeApi = {}

// Função para conversão dos dados da api em elementos da classe Pokemon
function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typesSlot) => typesSlot.type.name);
    // Tipo principal = 1° item dos tipos caso exista
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}

// Função para manipulação dos detalhes do pokemon
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset =0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        // Captura a resposta da API
        .then((response) => response.json())
        // Captura o campor 'results' do corpo da resposta que traz nome e URL (detalhamento) de cada elemento
        .then((jsonBody) => jsonBody.results)
        // Faz uma nova requisição das informações constantes na URL (detalhamento) de cada elemento, transformando a resposta da promessa em .json
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        // Espera da resolução da lista de promessas
        .then((detailRequests) => Promise.all(detailRequests))
        // Geração da lista com os detalhes dos pokemons após o processamento das requisições
        .then((pokemonsDetails) => pokemonsDetails)

}