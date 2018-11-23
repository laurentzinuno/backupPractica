//librerias van en constantes. nos traemos el framework
const express = require('express');
//lo ponemos en marcha
const app = express();

//le pasamos una capa de middleware para que use el parseador JSON (para que el body se muestre bien)
app.use(express.json());

//variable de entorno. Si el PORT No existe, cojo el 3000. Si existe pone el port.
//es un OR IZQ OR DCHA. EXISTE IZQ? SI--> LO PONGO. NO? --> DCHA.
const port = process.env.PORT || 3000;
app.listen(port);
console.log("API escuchando en el puerto " + port);

app.get('/apitechu/v1/hello',
    function(req,res) {
      //peticion del cliente-->req
      //res respuesta al cliente
      console.log("Invocado GET /apitechu/v1/hello");
      //construyo la respuesta, el JSON directamente entre llaves
      res.send (
        {"msg" : "Hola desde API TechU"}
      );
    }

)
//creo una petición post que contemple dos parámetros
app.post('/apitechu/v1/monstruo/:p1/:p2',
function(req,res){

  console.log("Parametros");
  console.log(req.params);

  console.log("Query String");
  console.log(req.query);

  console.log("Headers");
  console.log(req.headers);

  console.log("Body");
  console.log(req.body);

}
)

//funcion de lista de usuarios basica
//app.get('/apitechu/v1/users',
//    function(req,res) {
//      console.log("Invocado GET /apitechu/v1/users");
      //construyo la respuesta, __dirname es una constante que
      //indica el path del directorio donde se ejecuta el script en ese momento
      //res.sendFile('usuarios.json',{root: __dirname});

      //cargo el json directamente. users es de tipo array (el json empieza por corchete)
      // require carga cosas. modulos o ficheros o mas cosas.
//      var users = require('./usuarios.json');
//      res.send(users);
//    }
//)

//funcion de lista de usuarios basica
app.get('/apitechu/v1/users',
    function(req,res) {
      console.log("Invocado GET /apitechu/v1/users");
      console.log("parametro top: " + req.query.$top);
      console.log("parametro count: " + req.query.$count);
      //cargo parametros
      var top = req.query.$top;
      var count = req.query.$count;
      var objReturn={};

      //cargo usuarios
      var users = require('./usuarios2.json');
      //console.log(users);
      var cuantos = users.length;

      if (count=="true"){
        objReturn.count = cuantos;
        console.log("cuantos: " + cuantos);
      }

      objReturn.users=top?users.slice(0,top):users;
      res.send(objReturn);
    }
)

//Vamos a hacer un handler para los post. quiero meter en el body
// el usuario que quiero agregar
app.post('/apitechu/v1/users',
  function(req,res) {
    console.log("Invocado POST /apitechu/v1/users");
    //vamos a recibir info / mandarla con cabeceras
    console.log(req.body.first_name);
    console.log(req.body.last_name);
    console.log(req.body.email);

    var newUser = {
      "first_name": req.body.first_name,
      "last_name": req.body.last_name,
      "email": req.body.email
    };
    //cargamos los usuarios
    var users = require("./usuarios2.json");
    //agregamos el nuevo usuario
    users.push(newUser);
    console.log("Usuario añadido");

    writeUserDataToFile(users);
/*
    //cargamos libreria acceso io
    const fs = require('fs');
    //transformo los datos a un formato que luego se pueda leer
    var jsonUserData = JSON.stringify(users);
    //guardo en un nuevo fichero la nueva lista con el nuevo usuario guardado
    fs.writeFile("./usuarios2.json", jsonUserData,"utf8",
      function(err){
        if(err){
          console.log(err);
        } else {
          console.log("Usuario persistido");

        }
      }
    )
    */
    res.send(users);
  }
)

//creo una funcion que me escriba en disco una lista de usuarios
function writeUserDataToFile(data){
  console.log("writeUserDataToFile");

  //cargamos libreria acceso io
  const fs = require('fs');
  //transformo los datos a un formato que luego se pueda leer
  var jsonUserData = JSON.stringify(data);
  //guardo en un nuevo fichero la nueva lista con el nuevo usuario guardado
  fs.writeFile("./usuarios2.json", jsonUserData,"utf8",
    function(err){
      if(err){
        console.log(err);
      } else {
        console.log("Usuario persistido");

      }
    }
  )
}
