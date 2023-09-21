require('dotenv').config();

const fs = require('fs/promises');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const hostName = 'localhost';
const PORT = process.env.PORT || 3000;
let users = require('./db.json');

app.get('/users', async (req, res) => {
    const users = await fs.readFile('./db.json', 'utf-8');
    res.json({data: JSON.parse(users)});
});

app.get('/users/:id', async (req, res) => {
    const {id} = req.params;

    const user = await users.find((user) => user.id === +id);

    if (!user) {
        return res.status(404).json({error: 'User not found'});
    }

    res.json({data: user});
});

app.post('/users', async (req, res) => {
    const {name, age, email} = req.body;

    if (name.length < 3 || age < 0) {
        return res.status(400).json({
            error: 'Invalid data'
        });
    }

    const newUser = {
        id: users.length + 1,
        name,
        age,
        email,
    };

    users.push(newUser);

    await fs.writeFile('./db.json', JSON.stringify(users));
    res.status(201).json({ data: newUser })
});

app.put('/users/:id', async (req, res) => {
    const {id} = req.params;
    const {name, age, email} = req.body;
    const userId = users.findIndex((user) => user.id === +id);

    if (userId === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    if (name.length < 3 || age < 0) {
        return res.status(400).json({
            error: 'Invalid data'
        });
    }

    users[userId] = {
        ...users[userId],
        name,
        age,
        email,
    };

    await fs.writeFile('./db.json', JSON.stringify(users));
    res.json({message: 'User updated', data: users[userId]});
});

app.delete('/users/:id', async (req, res) => {
    const {id} = req.params;
    const userId = users.findIndex((user) => user.id === +id);

    if (userId === -1) {
        return res.status(404).json({error: 'User not found'});
    }

    users.splice(userId, 1);

    await fs.writeFile('./db.json', JSON.stringify(users));
    res.json({message: 'User deleted'});
});

app.listen(PORT, () => {
    console.log(`Server running at http://${hostName}:${PORT}/`);
});
