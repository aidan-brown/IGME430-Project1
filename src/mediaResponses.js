const fs = require('fs');
const mime = require('mime-types');

const imageDict = {
  bg: fs.readFileSync(`${__dirname}/../client/media/background.png`),
  dexBg: fs.readFileSync(`${__dirname}/../client/media/dexScreen.jpg`),
  buttonIdle: fs.readFileSync(`${__dirname}/../client/media/buttons.svg`),
  buttonUp: fs.readFileSync(`${__dirname}/../client/media/buttons-pressed-up.svg`),
  buttonDown: fs.readFileSync(`${__dirname}/../client/media/buttons-pressed-down.svg`),
  buttonLeft: fs.readFileSync(`${__dirname}/../client/media/buttons-pressed-left.svg`),
  buttonRight: fs.readFileSync(`${__dirname}/../client/media/buttons-pressed-right.svg`),
  bug: fs.readFileSync(`${__dirname}/../client/media/types/bug.png`),
  dark: fs.readFileSync(`${__dirname}/../client/media/types/dark.png`),
  dragon: fs.readFileSync(`${__dirname}/../client/media/types/dragon.png`),
  electric: fs.readFileSync(`${__dirname}/../client/media/types/electric.png`),
  fairy: fs.readFileSync(`${__dirname}/../client/media/types/fairy.png`),
  fighting: fs.readFileSync(`${__dirname}/../client/media/types/fighting.png`),
  fire: fs.readFileSync(`${__dirname}/../client/media/types/fire.png`),
  flying: fs.readFileSync(`${__dirname}/../client/media/types/flying.png`),
  ghost: fs.readFileSync(`${__dirname}/../client/media/types/ghost.png`),
  grass: fs.readFileSync(`${__dirname}/../client/media/types/grass.png`),
  ground: fs.readFileSync(`${__dirname}/../client/media/types/ground.png`),
  ice: fs.readFileSync(`${__dirname}/../client/media/types/ice.png`),
  normal: fs.readFileSync(`${__dirname}/../client/media/types/normal.png`),
  poison: fs.readFileSync(`${__dirname}/../client/media/types/poison.png`),
  psychic: fs.readFileSync(`${__dirname}/../client/media/types/psychic.png`),
  rock: fs.readFileSync(`${__dirname}/../client/media/types/rock.png`),
  steel: fs.readFileSync(`${__dirname}/../client/media/types/steel.png`),
  water: fs.readFileSync(`${__dirname}/../client/media/types/water.png`),
};

const getImage = (request, response, imageName) => {
  response.writeHead(200, { 'Content-Type': mime.lookup(imageName) });
  response.write(imageDict[imageName.split('.')[0]]);
  response.end();
};

module.exports = {
  getImage,
};
