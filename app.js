const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const books = []

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/books', (req, res) => {
    res.json(books);
});

app.post('/books', (req, res) => {
    const { title, author, publishedDate } = req.body;
    const id = Math.floor(Math.random() * 1000000);
    const newBook = { id, title, author, publishedDate };
    books.push(newBook);
    res.json(newBook);
});
app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(book => book.id === id);
    if (index === -1) {
        return res.status(404).json({ message: `Book with ID ${id} not found.` });
    }
    books.splice(index, 1);
    res.json({ message: `Book with ID ${id} successfully deleted.` });
});


app.listen(3000, () => {
    console.log('Server started on port 3000');
});