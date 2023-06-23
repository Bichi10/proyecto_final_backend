const { Router } = require ("express");
const router = new Router();
const mysql = require ('mysql');

// Conexión a base de datos
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'colegios'
    })
    
    conn.connect((err) => {
        if (err) throw err;
        console.log('Conexión establecida...')
    });
    
    
    //RUTAS
    // SELECT 
    router.get('/', (req, res) => {
        let sql = "SELECT * FROM notas";
        let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.render('alumnos', {
            results: results
        });
        });
    });
    
    // Insertar 
    router.post('/save', (req, res) => {
        let data = { nombre_alumno: req.body.nombre_alumno, 
            apellido_alumno: req.body.apellido_alumno, 
            dni: req.body.dni, 
            colegio: req.body.colegio, 
            turno:req.body.turno ,
            materia:req.body.materia,
            nota:req.body.nota, 
            curso:req.body.curso 
         };
        let sql = "INSERT INTO notas SET ?";
        let query = conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect('/');
        });
    });
    
    
    //UPDATE
    router.post('/update', (req, res) => {
        let sql = "UPDATE notas SET nombre_alumno='" + req.body.nombre_alumno
        + "', apellido_alumno='" + req.body.apellido_alumno
        + "',dni='" + req.body.dni 
        + "',Colegio='" + req.body.colegio 
        + "',nota='" + req.body.nota 
        + "',curso='" + req.body.curso
        + "' WHERE id_alumno=" 
        + req.body.id;
        let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/');
        });
    });
    
    // DELETE
    router.post('/delete',(req, res) => {
        let sql = "DELETE FROM notas WHERE id_alumno="+req.body.id_alumno+"";
        let query = conn.query(sql, (err, results) => {
        if(err) throw err;
            res.redirect('/');
        });
    });
    
    module.exports = router;