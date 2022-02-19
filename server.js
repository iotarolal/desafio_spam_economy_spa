const enviar_email = require('./email.js');
const express = require('express');
const axios = require('axios');
const uuid = require('uuid');
const fs = require('fs');

const app = express();

app.use(express.static('static'));

app.get('/mailing', async(req, res) => {

    // obtenemos parametros
    const {correos, asunto, contenido} = req.query;

    // funcion envio de mail 
  //  enviar_email(correos, asunto, contenido);

    const id = uuid.v4();

  // obtengo indicadores
    const  apiindicador = await axios.get('https://mindicador.cl/api/');
    const indicadores = apiindicador.data; 

    const uf = indicadores.uf.valor;
    const euro = indicadores.euro.valor;
    const utm = indicadores.utm.valor;
    const dolar = indicadores.dolar.valor;

//    res.send({uf, euro, utm, dolar});

    const mensaje =  contenido +  `El valor del dolar el día de hoy es: ${dolar}\n
    El valor del euro el día de hoy es: ${euro}\n
    El valor del uf el día de hoy es: ${uf}\n
    El valor del utm el día de hoy es: ${utm}\n`;

    
//    res.send({mensaje});

// guargar el mail
    createfile(id,  mensaje)
})

let puerto = 3000;
app.listen(puerto, () => {
    console.log(`servidor corriendo en el puerto ${puerto}`);
});

// funcion para crear archivos

async function createfile(id, mensaje) {

    
    const namefile = `correos/${id}.txt`;
    
    fs.writeFile(namefile, mensaje,
            'UTF-8',
            function() { 
                console.log('archivo creado')
            }
        )
        
}
    
