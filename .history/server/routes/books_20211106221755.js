// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
    // find all books in the books collection
    book.find((err, books) => {
        if (err) {
            return console.error(err);
        } else {
            res.render('books/index', {
                title: 'Books',
                books: books
            });
        }
    });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    res.render('details/add', { title: 'Add Book' })

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    let newBook = Book({
        "Title": req.body.title,
        "Author": req.body.author,
        "Genre": req.body.genre,
        "Price": req.body.price
    });

    Book.create(newBook, (err, book) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            //refresh the book list
            console.log('Book Created');
            res.redirect('/books');
        }
    });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    let id = req.params.id;

    Book.findById(id, (err, bookToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            //show the edit view
            res.render('details/edit', { title: 'Edit Book', book: bookToEdit });
        }
    })
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    let id = req.params.id;

    let updatedBook = Book({
        "_id": id,
        "Title": req.body.title,
        "Author": req.body.author,
        "Genre": req.body.genre,
        "Price": req.body.price
    });


    Book.updateOne({ _id: id }, updatedBook, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            //refresh the book list
            console.log('Book Updated');
            res.redirect('/books');
        }
    });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    let id = req.params.id;

    Book.deleteOne({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            //refresh the book list
            console.log('Book Deleted');
            res.redirect('/books');
        }
    });
});


module.exports = router;