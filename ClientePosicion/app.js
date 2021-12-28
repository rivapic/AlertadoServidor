'use strict';
var http = require('http');
const url = require('url');
var fs = require('fs');
let lati;
let long;
let phone;
let date_ob = new Date();

http.createServer(function (req, res) {

    if (req.url == '/consulta') {
        console.log("Entro en consulta");
        fs.readFile('openlayer.html', 'utf8', function (err, data) {
            console.log("latitud=" + lati);
            console.log("longiud=" + long);
            var result = data.replace(/XXXXXX/g, long);
            var result = result.replace(/YYYYYY/g, lati);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write("Alerta del telefono=" + phone +"\n");

            let date = ("0" + date_ob.getDate()).slice(-2);
            let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            let year = date_ob.getFullYear();
            let hours = date_ob.getHours();
            let minutes = date_ob.getMinutes();
            let seconds = date_ob.getSeconds();
            console.log("Date time =" + year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

            res.write("\n\n  Generada =" + year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
            res.write(result);
            return res.end();
        });
    } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        console.log(req.url);
        const queryObject = url.parse(req.url, true).query;
        console.log(queryObject);
        console.log(queryObject.lat);
        console.log(queryObject.lon);
        console.log(queryObject.phone);
        if (typeof queryObject.lat !== 'undefined' && queryObject.lon !== 'undefined' && queryObject.phone !== 'undefined') {
            console.log("Parametros definidos");
            date_ob = new Date();
            let date = ("0" + date_ob.getDate()).slice(-2);
            let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            let year = date_ob.getFullYear();
            let hours = date_ob.getHours();
            let minutes = date_ob.getMinutes();
            let seconds = date_ob.getSeconds();
            console.log("Date time =" +year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
            lati = queryObject.lat;
            long = queryObject.lon;
            phone = queryObject.phone;
            console.log("latitud = " + lati);
            console.log("longitud =" + long);
            res.write("\n Posicionamiento enviado\n");
            res.write("\n Telefono =" + phone);
            res.write("\n Latitud =" + lati);
            res.write("\n Longitud =" + long);
            res.write("\n Date time =" + year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
            res.end('\n \n Respuesta finaliaza\n');
        } else {
            console.log("Algun parametro sin definir");
            res.write("\n Posicionamiento fallido, faltan datos por definir\n");
            res.end('\n \n Faltan datos \n');
        }
    }

}).listen(80);

