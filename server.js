import express from 'express';
import mongoose from 'mongoose';

import User from './models/user.js';
import Livro from './models/livro.js';

const app = express();
app.use(express.json());

// Usuarios
app.post('/usuarios', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/usuarios', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para deletar um usuário
app.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Livros

app.post('/livros', async (req, res) => {
    try {
        const newBook = await Livro.create(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/livros', async (req, res) => {
    try {
        const books = await Livro.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para deletar um livro
app.delete('/livros/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedLivro = await Livro.findByIdAndDelete(id);
        if (!deletedLivro) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }
        res.status(200).json({ message: 'Livro deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

mongoose.connect('mongodb+srv://gustavoroviana:Mrgustavo04.@apitrab1.kipll.mongodb.net/?retryWrites=true&w=majority&appName=APITrab1')
    .then(() => console.log("Banco de dados conectado"))
    .catch(() => console.log("deu ruim"));

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});

