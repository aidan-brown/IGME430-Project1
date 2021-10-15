const XMLHttpRequest = require('xhr2');
const axios = require('axios').default;

const pokeapiURL = 'https://pokeapi.co/api/v2';
let favorites = [];

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getPokemon = async (request, response, body) => {
  if (!body.page) {
    return respondJSON(request, response, 400, { id: 'badRequest', message: 'Request must contain a valid page number' });
  }

  const res = await axios.get(`${pokeapiURL}/pokemon-species?limit=20&offset=${20 * body.page}`);
  
  return respondJSON(request, response, 200, res.data);
};

const getPokemonById = async (request, response, body) => {
  if (!body.id) {
    return respondJSON(request, response, 400, { id: 'badRequest', message: 'Request must contain a valid ID number' });
  }

  const gameRes = await axios.get(`${pokeapiURL}/pokemon/${body.id}`)
  const gameData = gameRes.data;

  const speciesRes = await axios.get(`${pokeapiURL}/pokemon-species/${body.id}`)
  const speciesData = speciesRes.data;

  const responseJSON = {
    ...gameData,
    ...speciesData,
  }

  return respondJSON(request, response, 200, responseJSON);
};

const addFavoritePokemon = (request, response, body) => {
  if (!body.name || !body.id) {
    return respondJSON(request, response, 400, { id: 'badRequest', message: 'Request must contain a valid Name and ID number' });
  }

  if (favorites.some(e => e.id === body.id)){
    return respondJSON(request, response, 400, { id: 'badRequest', message: 'Pokemon has been favorited already' });
  }

  const pokeData = {
    name: body.name,
    id: body.id,
  };

  favorites.push(pokeData);

  return respondJSON(request, response, 201, pokeData);
}

const removeFavoritePokemon = (request, response, body) => {
  if (!body.id || !favorites.some(e => e.id === body.id)){
    return respondJSON(request, response, 400, { id: 'badRequest', message: 'Request must contain a valid ID number' });
  }

  const removedPokeData = favorites.filter(e => e.id === body.id)[0];
  favorites = favorites.filter(e => e.id !== body.id);

  return respondJSON(request, response, 200, removedPokeData);
}

const getNotFound = (request, response) => {
  const responseJSON = {
    id: 'notFound',
    message: 'The page you are looking for was not found',
  };

  if (request.method === 'GET') {
    return respondJSON(request, response, 404, responseJSON);
  }
  return respondJSONMeta(request, response, 404);
};

module.exports = {
  getPokemon,
  getPokemonById,
  getNotFound,
  addFavoritePokemon,
  removeFavoritePokemon
};
