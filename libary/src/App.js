import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [name, setName] = useState('Library');
  const [description, setDescription] = useState(' ');
  const [author, setAuthor] = useState(' ');
  const [year, setYear] = useState(' ');
  const [ISBN, setISBN] = useState(' ');
  const [publisher, setPublisher] = useState(' ');
  // список авторов
  const getAuthorsUrl = "http://localhost:8080/api/author";
  const [authors, setAuthors] = useState([]);
  // книги автора
  const [books, setBooks] = useState([]);
  const getBookByAuthorIdUrl = "http://localhost:8080/api/book/author/";

   // чтение авторов
   function getAuthors() {
    fetch(getAuthorsUrl)
      .then(response => response.json())
      .then(result => setAuthors(result));

      console.log(JSON.stringify(authors));
  }

  // чтение книг
  function readBooks(event) {
    const index = event.target.selectedIndex;
    fetch(getBookByAuthorIdUrl + index)
      .then(response => response.json())
      .then(result => setBooks(result));

      console.log(JSON.stringify(books));
  }

  return (
    <div className="vh-100 d-flex flex-column">
      <div className="flex-grow-1 border-bottom d-flex justify-content-left align-items-left" style={{ flexBasis: "40%" }}>
        <h1>Name: {name}</h1>
        <p><ol>
        <li>Description: {description}</li>
        <li>author: {author}</li>
        <li>year: {year}</li>
        <li>ISBN: {ISBN}</li>
        <li>publisher: {publisher}</li>
        </ol></p>
      </div>

      <div className="d-flex flex-grow-1" style={{ flexBasis: "60%" }}>
        <div className="w-50 border-end d-flex justify-content-left align-items-left">
          <div>
            <button className="btn btn-primary m-2" onClick={getAuthors}>R</button>
            <button className="btn btn-secondary m-2">E</button>
            <button className="btn btn-success m-2">D</button>
            <select class="form-select" onChange={readBooks} size="10" aria-label="Default select example">
              {authors.map((author) => (
                <option key={author.authorId}>{author.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-50 d-flex justify-content-left align-items-left">
          <div>
            <button className="btn btn-primary m-2">C</button>
            <button className="btn btn-secondary m-2">E</button>
            <button className="btn btn-success m-2">D</button>
            <select class="form-select" size="10" aria-label="size 3 select example">
              {books.map((book) => (
                <option key={book.bookId}>{book.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
