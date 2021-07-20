'use strict';

const wineTypes = require('../../assets/wine-types-data.json');

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('WineTypes', wineTypes
    // [
      // { type: 'Cabernet Sauvignon' },
      // { type: 'Pinot Noir' },
      // { type: 'Malbec' },
      // { type: 'Red Blend' },
      // { type: 'Port' },
      // { type: 'Bordeaux' },
      // { type: 'Viognier' },
      // { type: 'Riesling' },
      // { type: 'Zinfandel' },
      // { type: 'Moscato' },
      // { type: 'Syrah-Mourvèdre' },
      // { type: 'Tinto Fino' },
      // { type: 'Cabernet Franc' },
      // { type: 'Chardonnay' },
      // { type: 'Grenache' },
      // { type: 'Bordeaux-style Red Blend' },
      // { type: 'Merlot' },
      // { type: 'Gelber Muskateller' },
      // { type: 'Scheurebe' },
      // { type: 'Tempranillo' },
      // { type: 'Vernaccia' },
      // { type: 'Sauvignon Blanc' },
      // { type: 'Pinot Gris' },
      // { type: 'Verdicchio' },
      // { type: 'St. Laurent' },
      // { type: 'Pinotage' },
      // { type: 'Rosé' },
      // { type: 'Sangiovese' },
      // { type: 'Sparkling Blend' },
      // { type: 'Syrah' },
      // { type: 'Nebbiolo' },
      // { type: 'Cinsault' },
      // { type: 'Dornfelder' },
      // { type: 'White Blend' },
      // { type: 'Vermentino' },
      // { type: 'G-S-M' },
      // { type: 'Rhône-style Red Blend' },
      // { type: 'Carmenère' },
      // { type: 'Colorino' },
      // { type: 'Gamay' },
      // { type: 'Shiraz' },
      // { type: 'Gewürztraminer' },
      // { type: 'Melon' },
      // { type: 'Chenin Blanc' },
      // { type: 'Petite Verdot' },
      // { type: 'Chenin Blanc-Viognier' },
      // { type: 'Grüner Veltliner' },
      // { type: 'Pinot Nero' },
      // { type: 'Blaufränkisch' },
      // { type: 'Aligoté' },
      // { type: 'Pinot Grigio' },
      // { type: 'Mourvèdre' },
      // { type: 'Sangiovese Grosso' },
      // { type: 'Malbec-Syrah' },
      // { type: 'Picapoll' },
      // { type: 'Malvasia' },
      // { type: 'Ribolla Gialla' },
      // { type: 'Teran' },
      // { type: 'Petite Sirah' },
      // { type: 'Muskat Ottonel' },
      // { type: 'Barbera' },
      // { type: 'Xarel-lo' },
      // { type: 'Provence white blend' },
      // { type: 'Lambrusco' },
      // { type: 'Verdejo' },
    // ]
    , {});
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('WineTypes', null, {});
  }
};