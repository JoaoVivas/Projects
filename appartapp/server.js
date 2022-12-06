const express = require('express');
const fetch = require('node-fetch');
const http = require('http');
const bodyParser  = require('body-parser');
const { send } = require('process');

function timeconvertDate(time){
    //time arrey in seconds to HH:MM:SS format
    var x;
    for (x in time){
        hours = Math.floor(time[x]/3600);
        minutes =  Math.floor(time[x]/60) - hours*60;
        seconds = time[x] - (hours*3600) - (minutes*60);
        time[x] = `${hours}:${minutes}:${seconds}`;
    }
    return time;
}

async function routematrixapirequest (data){
    //send request to mapquest routematrix api JSON format data
    const MY_KEY = '5zV8s2r6wLrmr5OYA8AQhGelLoDemQFV';
    const  api_url = `http://www.mapquestapi.com/directions/v2/routematrix?key=${MY_KEY}`;
    
    const fetch_options = {
        method: 'POST',
        body: JSON.stringify(data)
    }

    fetch_res = await fetch(api_url, fetch_options);

    const jsonres = await fetch_res.json();
    const distance = jsonres.distance;
    const time =timeconvertDate(jsonres.time);
    const result = {
        distance: distance,
        time: time
    }
    return result;
}

const app = express();

app.listen(3000, () => console.log("Listening at 3000"));
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));
app.use(bodyParser.urlencoded({extended: true}));

var routeType;
app.post('/fileapi', async (req, res)=> {
    result = await routematrixapirequest(req.body)
    console.log(result)
    res.json(result)
})
app.post('/api', async (req, res) => {
    var location = req.body.location.toString();
    var latlon = location.split(','); 
    var lat = latlon[0];
    var lon = latlon[1];
    console.log(req.body.routeType)
    let data = {
        locations: [{
            latLng: {
                lng: lon,
                lat: lat
            }},
            {
                street: 'Estrada de camorim',
                adminArea5: 'Rio de Janeiro',
                adminArea5Type: 'City',
                latLng: {
                lng: -43.41657705633124,
                lat: -22.969199974206248
            }}
             ,
             {latLng :  {
                 lng: -43.1790104,
                 lat: -22.9569748
             }}
        ],
        options: {
            allToAll: false,
            unit: 'k',
            routeType: req.body.routeType,
            doReverseGeocode: true
        }   
    };
});




