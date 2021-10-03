const XMLHttpRequest = require('xhr2');

const pokeapiURL = 'https://pokeapi.co/api/v2';

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getPokemon = (request, response, body) => {
  if (!body.page) {
    return respondJSON(request, response, 400, { id: 'badRequest', message: 'Request must contain a valid page number' });
  }

  const req = new XMLHttpRequest();
  req.open('get', `${pokeapiURL}/pokemon-species?limit=20&offset=${20 * body.page}`);

  req.onload = () => respondJSON(request, response, 200, JSON.parse(req.response));

  req.onerror = () => respondJSON(request, response, 400, { id: 'badRequest', message: 'There seems to be a problem with PokeAPI' });

  return req.send();
};

const getPokemonById = (request, response, body) => {
  if (!body.id) {
    return respondJSON(request, response, 400, { id: 'badRequest', message: 'Request must contain a valid ID number' });
  }

  console.log(body);

  const req = new XMLHttpRequest();
  req.open('get', `${pokeapiURL}/pokemon-species/${body.id}`);

  req.onload = () => respondJSON(request, response, 200, JSON.parse(req.response));

  req.onerror = () => respondJSON(request, response, 400, { id: 'badRequest', message: 'There seems to be a problem with PokeAPI' });

  return req.send();
};

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
};
