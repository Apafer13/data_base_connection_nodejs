const express = require('express');
const {connection} = require('./db/connection');
const { error } = require('console');
const app = new express()

const port = 3000;

app.use(express.json())

const db = connection()


app.get("/", (req, res) => {
    res.send("<h1>Bienvenid@ al servidor</h1>");
  });

app.get("/tasks", (req, res) => {
    db.query('SELECT * FROM todo', (error, results)  => {
        if(error){
            console.log('Ha ocurrido un error', error);
            return res.status(500).send('Ha ocurrido un error')
        }
        res.json(results)
    })
})

app.get("/tasks/:index", (req, res) => {
    let id = req.params.index
    db.query('SELECT * FROM todo where id ='+id, (error, result) => {
        if(error){
            console.log('Ha ocurrido un error', error);
            return res.status(500).send('Ha ocurrido un error');
        };
        res.json(result)
    });
})


app.post("/tasks", (req, res) => {
    db.query('INSERT INTO todo (name, description, created_at, updated_at, status) values ("'+req.body.name+'", "'+req.body.description+'", "'+req.body.created_at+'", "'+req.body.updated_at+'", "'+req.body.status+'")', (error, result) => {
        if(error){
            console.log('Ha ocurrido un error', error);
            return res.status(500).send('Ha ocurrido un error');
        };
        res.json(result)
    })
})

app.post('/tasks/:index', (req, res) => {
    let id = req.params.index
    db.query('UPDATE todo SET name="'+req.body.name+'", description="'+req.body.description+'", created_at="'+req.body.created_at+'", updated_at="'+req.body.updated_at+'", status="'+req.body.status+'" WHERE id='+id,(error, result) => {
        if(error){
            console.log('Ha ocurrido un error', error);
            return res.status(500).send('Ha ocurrido un error');
        };
        res.json(result)
    })

})

app.delete("/tasks/:index", (req, res) => {
    let id = req.params.index
    db.query('DELETE FROM todo WHERE id='+id, (error, result) => {
        if(error){
            console.log('Ha ocurrido un error', error);
            return res.status(500).send('Ha ocurrido un error');
        };
        res.json({ message: "Elemento eliminado correctamente" });
    })
})

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
  