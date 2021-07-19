// import winesJSON from './wine-data-set.json';
const winesJSON = require('./wine-data-set.json');

// const wines = JSON.parse(winesJSON);

// console.log(typeof winesJSON);
// console.log(winesJSON[0]);


// for (const [i, wine] of winesJSON.entries()) {
  
// }

const wines = winesJSON.reduce((obj, entry, i) => {
  console.log(i, entry);
  obj[i] = entry;
}, {});

console.log(wines[0]);