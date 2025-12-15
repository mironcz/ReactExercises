import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Modal.css';
import ModalAuthor from './ModalAuthor';
import ModalBook from './ModalBook';

function App() {
  const [name, setName] = useState('Library');
  const [description, setDescription] = useState(' ');
  const [author, setAuthor] = useState(' ');
  const [year, setYear] = useState(' ');
  const [ISBN, setISBN] = useState(' ');
  const [publisher, setPublisher] = useState(' ');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenBook, setIsModalOpenBook] = useState(false);
  const [currentAuthorInx, setCurrentAuthorInx] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // <--- важно! иначе страница перезагрузится
    const form = e.target; // сама форма
    const data = new FormData(form); // создаём объект FormData
    const values = Object.fromEntries(data.entries()); // превращаем в обычный объект
    console.log('Отправляем на сервер:', values);
    setIsModalOpen(false);

    const response = await fetch('http://localhost:8080/api/author/update/' + selectedAuthor.authorId, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
    .catch(err => {
        console.error("Failed to PUT: ", err);
      }); 

    console.log(response);
  };

  const handleSubmitBook = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const values = Object.fromEntries(data.entries());
    console.log('Отправляем на сервер:', values);
    setIsModalOpenBook(false);

    const response = await fetch('http://localhost:8080/api/book/update/' + selectedBook.bookId, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
    .catch(err => {
        console.error("Failed to PUT: ", err);
      }); 

    console.log(response);
  };


  function closeModal() {
    setIsModalOpen(false);
  };

  function editAuthor() {
    setIsModalOpen(true);
  };

    function closeModalBook() {
    setIsModalOpenBook(false);
  };

  function editBook() {
    setIsModalOpenBook(true);
  };

  // список авторов
  const getAuthorsUrl = "http://localhost:8080/api/author";
  const [authors, setAuthors] = useState([]);
  // книги автора
  const getBookByAuthorId = "http://localhost:8080/api/book/byAuthor/";
  const [books, setBooks] = useState([]);

  // чтение авторов
  function getAuthors() {
    fetch(getAuthorsUrl)
      .then(response => {
        if (!response.ok) {
          return null;
        } else return response.json();
      })
      .then(result => {
        setAuthors(result);
        console.log("Загруженные авторы:", result);
      })
      .catch(err => {
        console.error("Failed to GET: ", err);
      });
  }

  // чтение книг
  function readBooks(event) {
    setSelectedAuthor(authors[event.target.selectedIndex]);
    const authorId = authors[event.target.selectedIndex].authorId;
    setCurrentAuthorInx(authorId);
    readBooksById(authorId);
  }

  function refreshBooks() {
    readBooksById(currentAuthorInx);
  }

  function readBooksById(id) {
    fetch(getBookByAuthorId + id)
      .then(response => {
        if (!response.ok) {
          console.error("Failed to GET: ", response.status);
          return [];
        } else {
          return response.json();
        }
      })
      .then(result => {
        setBooks(result);
        console.log("Загруженные книги: ", result);
      })
      .catch(err => {
        console.error("Failed to GET: ", err);
      });
  }

  // чтение данных книги
  function readBooksInfo(event) {
    const book = books[event.target.selectedIndex];
    setSelectedBook(books[event.target.selectedIndex]);
    setName(book.name);
    setDescription(book.description);
    setAuthor(book.author);
    setYear(book.year);
    setPublisher(book.publish);
    setISBN(book.isbn);
  }

  function deleteBook() {
    fetch('http://localhost:8080/api/book/' + selectedBook.bookId, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) {
          console.error("Failed to DELETE: ", response.status);
          return [];
        } else {
          readBooksById(selectedAuthor.authorId);
        }
      })
       .catch(err => {
        console.error("Failed to DELETE: ", err);
      });
  }

  function deleteAuthor() {
    fetch('http://localhost:8080/api/author/' + selectedAuthor.authorId, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) {
          console.error("Failed to DELETE: ", response.status);
          return [];
        } else {
          getAuthors();
        }
      })
       .catch(err => {
        console.error("Failed to DELETE: ", err);
      });
 }

  return (
    <div className="vh-100 d-flex flex-column">
      <div className="flex-grow-1 border-bottom d-flex justify-content-left align-items-left" style={{ flexBasis: "40%" }}>
        <h1>Name: {name}</h1>
        <ol>
        <li>Description: {description}</li>
        <li>author: {author}</li>
        <li>year: {year}</li>
        <li>ISBN: {ISBN}</li>
        <li>publisher: {publisher}</li>
        </ol>
      </div>

      <div className="d-flex flex-grow-1" style={{ flexBasis: "60%" }}>
        <div className="w-50 border-end d-flex justify-content-left align-items-left">
          <div>
            <button className="btn btn-primary m-2" onClick={getAuthors}>R</button>
            <button className="btn btn-secondary m-2"onClick={editAuthor}>E</button>
            <button className="btn btn-success m-2"onClick={deleteAuthor}>D</button>
            <select className="form-select" onChange={readBooks} size="10" aria-label="Default select example">
              {authors.map((author) => (
                <option key={author.authorId}>{(author.deleted ? '*' : '') + author.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-50 d-flex justify-content-left align-items-left">
          <div>
            <button className="btn btn-primary m-2" onClick={refreshBooks}>R</button>
            <button className="btn btn-secondary m-2"onClick={editBook}>E</button>
            <button className="btn btn-success m-2"onClick={deleteBook}>D</button>
            <select className="form-select" onChange={readBooksInfo} size="10" aria-label="size 3 select example">
              {books.map((book) => (
                <option key={book.bookId}>{(book.deleted ? '*' : '') + book.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ModalAuthor author={selectedAuthor} handleSubmit={handleSubmit} closeModal={closeModal}
         />
      )}
      {isModalOpenBook && (
        <ModalBook book={selectedBook} author={selectedAuthor} handleSubmitBook={handleSubmitBook} closeModalBook={closeModalBook}
         />
      )}

    </div>
  );
}

export default App;
