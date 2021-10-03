const http = require('http');
const query = require('querystring');
const apiHandler = require('./apiResponses.js');
const htmlHandler = require('./htmlResponses.js');
const mediaHandler = require('./mediaResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const handlePost = (request, response, parsedUrl) => {
  const body = [];
  switch (parsedUrl) {
    case '/getPokemon':
      request.on('error', (err) => {
        console.dir(err);
        response.statusCode = 400;
        response.end();
      });

      request.on('data', (chunk) => {
        body.push(chunk);
      });

      request.on('end', () => {
        const bodyString = Buffer.concat(body).toString();
        const bodyParams = query.parse(bodyString);

        apiHandler.getPokemon(request, response, bodyParams);
      });
      break;

    case '/getPokemonById':
      request.on('error', (err) => {
        console.dir(err);
        response.statusCode = 400;
        response.end();
      });

      request.on('data', (chunk) => {
        body.push(chunk);
      });

      request.on('end', () => {
        const bodyString = Buffer.concat(body).toString();
        const bodyParams = query.parse(bodyString);

        apiHandler.getPokemonById(request, response, bodyParams);
      });
      break;

    default:
      break;
  }
};

const handleGet = (request, response, parsedUrl) => {
  console.log(parsedUrl);

  if (parsedUrl === '/') {
    htmlHandler.getIndex(request, response);
  } else if (parsedUrl === '/index.css') {
    htmlHandler.getCSS(request, response);
  } else if (parsedUrl.includes('/media')) {
    const imageName = parsedUrl.substring(parsedUrl.lastIndexOf('/') + 1);
    mediaHandler.getImage(request, response, imageName);
  } else {
    apiHandler.getNotFound(request, response);
  }
};

const onRequest = (request, response) => {
  const urlStr = request.url.split('?')[0];

  switch (request.method) {
    case 'POST':
      handlePost(request, response, urlStr);
      break;

    default:
      handleGet(request, response, urlStr);
      break;
  }
};

http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1:${port}`);
