'use strict';
var http = require('http');
const url = require('url');
var fs = require('fs');
let lati;
let long;
let phone;
let date_ob = new Date();
let id_alerta = '0';
let ip_client 

http.createServer(function (req, res) {

    if (req.url == '/consulta') {
        console.log("Entro en consulta");
        fs.readFile('openlayer.html', 'utf8', function (err, data) {
            console.log("ip cliente consulta = " + req.socket.remoteAddress);
            console.log("latitud = " + lati);
            console.log("longiud = " + long);
            console.log("User agent = " + req.headers['user-agent']);
            var result = data.replace(/XXXXXX/g, long);
            var result = result.replace(/YYYYYY/g, lati);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write("\n Id alerta = " + id_alerta);
            res.write("\n Alerta del telefono = " + phone +"\n");
            console.log("Date time =" + date_ob.getFullYear() + "-" + ("0" + (date_ob.getMonth() + 1)).slice(-2) + "-" + ("0" + date_ob.getDate()).slice(-2) + " " + date_ob.getHours() + ":" + date_ob.getMinutes() + ":" + date_ob.getSeconds());
            res.write("\n\n  Generada =" + date_ob.getFullYear() + "-" + ("0" + (date_ob.getMonth() + 1)).slice(-2) + "-" + ("0" + date_ob.getDate()).slice(-2) + " " + date_ob.getHours() + ":" + date_ob.getMinutes() + ":" + date_ob.getSeconds()); 
            res.write("\n\n  ip client alerta =" + ip_client);
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
            console.log("ip cliente = " + req.socket.remoteAddress);
            console.log("User agent = " + req.headers['user-agent']);
            id_alerta = ++id_alerta;
            date_ob = new Date();
            console.log("Date time =" + date_ob.getFullYear() + "-" + ("0" + (date_ob.getMonth() + 1)).slice(-2) + "-" + ("0" + date_ob.getDate()).slice(-2) + " " + date_ob.getHours() + ":" + date_ob.getMinutes() + ":" + date_ob.getSeconds());
            lati = queryObject.lat;
            long = queryObject.lon;
            phone = queryObject.phone;
            ip_client = req.socket.remoteAddress;
            console.log("id alerta=" + id_alerta);
            console.log("latitud = " + lati);
            console.log("longitud =" + long);
            res.write("\n Posicionamiento enviado\n");
            res.write("\n Telefono =" + phone);
            res.write("\n Latitud =" + lati);
            res.write("\n Longitud =" + long);
            res.write("\n Date time =" + date_ob.getFullYear() + "-" + ("0" + (date_ob.getMonth() + 1)).slice(-2) + "-" + ("0" + date_ob.getDate()).slice(-2) + " " + date_ob.getHours() + ":" + date_ob.getMinutes() + ":" + date_ob.getSeconds());
            res.write("\n Id alerta =" + id_alerta);
            res.write("\n ip cliente =" + req.socket.remoteAddress);
            res.end('\n \n Respuesta finaliaza\n');
        } else {
            console.log("Algun parametro sin definir");
            console.log("ip cliente = " + req.socket.remoteAddress);
            console.log("User agent = " + req.headers['user-agent']);
            res.write("\n Posicionamiento fallido, faltan datos por definir\n");
            res.end('\n \n Faltan datos \n');
        }
    }

}).listen(80);

