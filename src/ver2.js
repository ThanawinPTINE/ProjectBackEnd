// npm i express
const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();
app.use(express.json());

const db = new sqlite3.Database('./Database/hopak.sqlite');
db.run(`CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY,
    name TEXT
)`);

app.get('/hopak/rooms', (req, res) => {
    db.all('SELECT * FROM rooms', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        }   else {
            res.json(rows);
        }
    });
});

app.get('/hopak/rooms/:id', (req, res) => {
    db.get('SELECT * FROM rooms WHERE id = ?', req.params.id, (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!row) {
                res.status(404).send('Room not found');
            } else {
                res.json(row);
            }
        }
    });
});

app.post('/hopak/rooms', (req, res) => {
    const room = req.body;
    db.run('INSERT INTO rooms (name) VALUES (?)', room.name, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            room.id = this.lastID;
            res.send(room);
        }
    });
});

app.put('/hopak/rooms/:id', (req, res) => {
    const room = req.body;
    db.run('UPDATE rooms SET name = ? WHERE id = ?', room.name, req.params.id, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(room);
        }
    });
});

app.delete('/hopak/rooms/:id', (req, res) => {
    db.run('DELETE FROM rooms WHERE id = ?', req.params.id, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({});
        }
    });
});

//<!-----------------------------------------------------!>//

db.run(`CREATE TABLE IF NOT EXISTS people (
    id INTEGER PRIMARY KEY,
    name TEXT
)`);

app.get('/hopak/people', (req, res) => {
    db.all('SELECT * FROM people', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        }   else {
            res.json(rows);
        }
    });
});

app.get('/hopak/people/:id', (req, res) => {
    db.get('SELECT * FROM people WHERE id = ?', req.params.id, (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!row) {
                res.status(404).send('Person not found');
            } else {
                res.json(row);
            }
        }
    });
});

app.post('/hopak/people', (req, res) => {
    const person = req.body;
    db.run('INSERT INTO people (name) VALUES (?)', person.name, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            person.id = this.lastID;
            res.send(person);
        }
    });
});

app.put('/hopak/people/:id', (req, res) => {
    const person = req.body;
    db.run('UPDATE people SET name = ? WHERE id = ?', person.name, req.params.id, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(person);
        }
    });
});

app.delete('/hopak/people/:id', (req, res) => {
    db.run('DELETE FROM people WHERE id = ?', req.params.id, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({});
        }
    });
});

//<!-----------------------------------------------------!>//

db.run(`CREATE TABLE IF NOT EXISTS renting (
    id INTEGER PRIMARY KEY,
    r_name TEXT,
    p_name TEXT
)`);

app.get('/hopak/renting', (req, res) => {
    db.all('SELECT * FROM renting', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        }   else {
            res.json(rows);
        }
    });
});

app.get('/hopak/renting/:id', (req, res) => {
    db.get('SELECT * FROM renting WHERE id = ?', req.params.id, (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!row) {
                res.status(404).send('Rent not found');
            } else {
                res.json(row);
            }
        }
    });
});

app.post('/hopak/renting', (req, res) => {
    const rent = req.body;
    db.run('INSERT INTO renting (r_name, p_name) VALUES (?, ?)', rent.r_name, rent.p_name , function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            rent.id = this.lastID;
            res.send(rent);
        }
    });
});

app.put('/hopak/renting/:id', (req, res) => {
    const rent = req.body;
    db.run('UPDATE renting SET r_name = ?, p_name = ?  WHERE id = ?', rent.r_name, rent.p_name , req.params.id, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(rent);
        }
    });
});

app.delete('/hopak/renting/:id', (req, res) => {
    db.run('DELETE FROM renting WHERE id = ?', req.params.id, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({});
        }
    });
});

//<!-----------------------------------------------------!>//

app.get('/hopak/summary', (req, res) => {
    db.all(`
        SELECT r_name , GROUP_CONCAT(p_name) AS p_name
        FROM renting
        GROUP BY r_name
    `, (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);
        }
    });
});

const port = process.env.PORT || 3300;
app.listen(port, () => console.log(`Listening of port ${port}...`));