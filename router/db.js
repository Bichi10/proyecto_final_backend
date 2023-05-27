const { router, Router } = require ('express');
const router = new Router();

const mysql = require ('mysql');

// conexion a base de datos

const conn = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'edu_fisica'
});

conn.connect((err) => {
    if(err) throw err;
    console.log("CONEXION ESTABLECIDA");
    
})

// SELECT 
router.get('/', (req, res) => {
    let sql = "SELECT * FROM alumno, materia, nota by id_alumno";
    let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.render('nota', {
        results: results
    });
    });
});

// Insertar 
router.post('/save', (req, res) => {
    let data = { nota: req.body.nota, materia: req.body.materia, alumno: req.body.alumno};
    let sql = "INSERT INTO nota SET ?";
    let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect('/');
    });
});


//UPDATE
router.post('/update', (req, res) => {
    let sql = "UPDATE nota SET nota='" + req.body.nota + "', materia='" + req.body.materia + "',alumno='" + req.body.alumno
    let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/');
    });
});

// DELETE
router.post('/delete',(req, res) => {
    let sql = "DELETE FROM nota WHERE id_nota="+req.body.id_nota+"";
    let query = conn.query(sql, (err, results) => {
    if(err) throw err;
        res.redirect('/');
    });
});
module.exports.router;