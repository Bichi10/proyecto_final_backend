const express = require("express");
const app = express();
const hbs = require ('hbs');
const router = require ('./router/formulario');
const router1 = require ('./views/alumnos');
const SMTPPool = require("nodemailer/lib/smtp-pool");
const port = 3000;

//---------------HANDLEBARS

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

/*  -------------middleware ---*/
app.use("/assets", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

//Configurar Express para procesar datos en formato JSON

app.use(express.json());


app.use(require("./router/router"));

app.get("/", (req, res) => {
    res.render('home',{
      nombre: 'Mauri',
      titulo: 'Aplicacion colegio'
    })
  });
  
  app.get("/generic", (req, res) => {
    res.render('generic',{
      nombre: 'Cosme Fulanito',
      titulo: 'UTN FULL STACK '
    })
  });
  
  app.get("/Contacto", (req, res) => {
    res.render('contacto')
  });
  
  /*app.get("/alumnos", (req, res) => {
    res.sendFile(__dirname +"/views/alumnos.html")
  });
*/  

  app.get("/formulario", (req, res) => {
    res.sendFile(__dirname +"/public/formulario.html")
  });
  
  
  app.get("/colegios", (req, res) => {
    res.render('colegio')
  });
  
  app.post('/usuario',(req, res)=>{
    const nombre = req.body.nombre;
    const correo = req.body.correo;
  
    console.log('Datos formulario: ', nombre, correo);
  
    res.send('Datos recibidos');
  
  })

app.listen(port, () => {
    console.log(`Usando el puerto http://localhost:${port}`);
});
