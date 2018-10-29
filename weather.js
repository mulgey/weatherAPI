// Required modules
const https = require('https');
const api = require('./API.json');
const http = require('http');

// Print Error Messages
function printError(err) {
    console.error(err.message);
}

// Funciton to print the message inside the get(cityName) function
function printReport (weatherChunk) {
        const rapor = `${weatherChunk.name} için hava durumu ${weatherChunk.main.temp} derece olup, nem miktarı yüzde ${weatherChunk.main.humidity} civarındadır.`;
        console.log(rapor);
    }

function get(cityName) {
            try {
            const talep = https.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${api.key}&units=metric&lang=tr`, (res) => {
                let body = "";
                
                res.on('data', (chunk) => {
                    body += chunk;
                })

                res.on('end', () => {
                        // Parse the data
                        const weatherChunk = JSON.parse(body);
                        // Print the data
                        try {
                            printReport(weatherChunk);
                        } catch (err) {
                            console.log("Girdiğiniz veriler hatalıdır, lütfen kontrol edip tekrar deneyiniz.");
                        }
                    }
                )
                
            });
            talep.on("error", err => console.log("Adreste muhtemel problem")); 
        } catch (err) {
            console.log('Bağlantı adresinde muhtemel problem.')
        }
}


module.exports.raporGetir = get;