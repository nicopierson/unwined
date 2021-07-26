const fs = require("fs");


function writeJSONFile (obj, filename) {
  
  fs.writeFile(filename, JSON.stringify(obj, null, 4), (err) => {
    if (err) {
      console.error(err);
      return;
    };
    console.log("File has been created");
  });
}

// normalize data
function normalizeJSON (objJSON) {
  const normalizedObj = objJSON.reduce((obj, entry, i) => {
    obj[i] = entry;
    return obj;
  }, {});

  return normalizedObj;
}

// normalize data
function makeWineryJSON (objJSON) {

  const winerySet = new Set();
  const wineries = [];
  objJSON.forEach(({country, winery}, i) => {
    
    if (winerySet.has(winery)) {
      // do nothing
    } else {
      winerySet.add(winery);
      const newObj = {
        name: winery,
        country,
        ownerId: 1,
      };
      wineries.push(newObj);
    }
  });

  return wineries;
}

// normalize data: with keys of name, country and ownerId
// make owner id 1
// keys of winery and country in the wine json
function normalizeWineryJSON (objJSON) {
  let wineryObj = {};
  const winerySet = new Set();
  let index = 1;
  objJSON.forEach(({country, winery}) => {
    if (winerySet.has(winery)) {

    } else {
      winerySet.add(winery);
      wineryObj[winery] = {
        name: winery,
        country,
        ownerId: 1,
        index,
      };
      index++;
    }
  });

  return wineryObj;
}

function makeWineTypesJSON (objJSON) {
  const wineSet = new Set();
  const objArray = [];
  objJSON.forEach(({variety}, i) => {
    if (wineSet.has(variety)) {

    } else {
      wineSet.add(variety);
      objArray.push({ variety })
    }
  });

  return objArray;
}

function normalizeWineTypesJSON (objJSON) {
  const wineSet = new Set();
  const wineTypeObj = {};
  let index = 1; // sequelize starts indexing at 1
  objJSON.forEach(({variety}) => {
    if (wineSet.has(variety)) {

    } else {
      wineSet.add(variety);
      wineTypeObj[variety] = {
        variety,
        index,
      }
      index++;
    }
  });

  return wineTypeObj;
}

function makeWineJSON (objJSON, wineries, wineTypes) {
  const wineObj = objJSON.map((obj, i) => {
    const newObj = {
      ...obj,
      name: obj.title,
      rating: obj.points,
      userId: 1,
      wineryId: wineries[obj.winery].index,
      wineTypeId: wineTypes[obj.variety].index,
      colorTypeId: 2,
    };
    delete newObj.title;
    delete newObj.taster_name;
    delete newObj.taster_twitter_handle;
    delete newObj.variety;
    delete newObj.points;
    delete newObj.winery;
    return newObj;
  });

  return wineObj;
}

const winesJSON = require('./wine-data-set.json');


// normalize wine JSON data
// const saveFile = './wine-data-normalized.json';
// const normalizedWines = normalizeJSON(winesJSON);
// writeJSONFile(normalizedWines, saveFile);



// normalize Wineries
// const saveFile = './winery-normalized.json';
const wineriesNormalized = normalizeWineryJSON(winesJSON); // now normalizes
// writeJSONFile(wineriesNormalized, saveFile);

// make winery data
// const saveFile = './winery-data.json';
// const wineries = makeWineryJSON(winesJSON);
// writeJSONFile(wineries, saveFile);


// make Array of Objects for the Type of wines
// const saveFile = './wine-types-data.json';
// const wineTypes = makeWineTypesJSON(winesJSON);
// writeJSONFile(wineTypes, saveFile);

// normalize wine types
// const saveFile = './wine-types-normalized.json';
const wineTypesNormalized = normalizeWineTypesJSON(winesJSON);
// writeJSONFile(wineTypesNormalized, saveFile);




// reformat array of wine objects
// need wineTypesNormalized and wineriesNormalized variables
const saveFile = './wines-data.json';
const wines = makeWineJSON(winesJSON, wineriesNormalized, wineTypesNormalized);
writeJSONFile(wines, saveFile);