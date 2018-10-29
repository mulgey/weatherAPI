const weather = require('./weather');

const cities = process.argv.slice(2);
cities.forEach(weather.raporGetir);