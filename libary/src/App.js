import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [name, setName] = useState('Library');
  const [description, setDescription] = useState(' ');
  const [deleted, setDeleted] = useState(' ');
  const [author1, setAuthor1] = useState('Уильям Шекспир');
  const [author, setAuthor] = useState(' ');
  const [year, setYear] = useState(' ');
  const [ISBN, setISBN] = useState(' ');
  const [publisher, setPublisher] = useState(' ');
  const [book1, setBook1] = useState(' ');
  // список авторов
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [respond, setAuthorRespond] = useState([]);
  const [bookRespond, setBookRespond] = useState([]);
  const [url, setUrl] = useState(["https://kakturan.cz/api/author/"]);
  const [bookUrl, setBookUrl] = useState(["https://kakturan.cz/api/books/"]);

  function authorFunction1() {
    setName('Уильям Шекспир')
    setDescription('Уи́льям Шекспи́р — английский поэт и драматург, зачастую считается величайшим англоязычным писателем и одним из лучших драматургов мира. Часто именуется национальным поэтом Англии. Дошедшие до нас работы, включая некоторые, написанные совместно с другими авторами, состоят из 38 пьес, 154 сонетов, 4 поэм и 3 эпитафий.')
    setBook1('Ромео и Джульетта')
  }

  function bookFunction1() {
    setName('Ромео и Джульетта')
    setDescription('«Ромео и Джульетта» — это трагедия Уильяма Шекспира о любви двух юношей и девушек из враждующих веронских семей Монтекки и Капулетти. Это произведение, написанное около 1594–1595 годов, стало основой для множества других произведений искусства, включая оперу Шарля Гуно, балет Сергея Прокофьева, a также многочисленные фильмы и мюзиклы. ')
    setAuthor('Уильям Шекспир')
    setYear('1596')
    setISBN(' ')
    setPublisher(' ')
  }

  function getAuthor(url) {
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setAuthorRespond(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
      setName(respond.name)
      setDescription(respond.description)
  }

  function getBook(bookUrl) {
    fetch(bookUrl)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setBookRespond(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
      setName(bookRespond.name)
      setDescription(bookRespond.description)
  }

  // чтение авторов
  function readAuthors() {
    const items = [];
    
    for (let i = 1; i <= 5; i++) {
      items.push("Автор - " + i);
    }
    setAuthors(items);
  }

  // чтение книг
  // TODO/TOASK how to make this
  function readBooks(event) {
    const indexB = event.target.selectedIndex;
    const items = [];

    for (let i = 1; i <= 5; i++) {
      items.push("Книга - " + i + " автор " + indexB);
    }
    setBooks(items);
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
            <button className="btn btn-primary m-2" onClick={readAuthors}>R</button>
            <button className="btn btn-secondary m-2">E</button>
            <button className="btn btn-success m-2">D</button>
            <select class="form-select" onChange={readBooks} size="10" aria-label="Default select example">
              {authors.map((item, index) => (
                <option key={index}>{item}</option>
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
              {books.map((item, index) => (
                <option key={index}>{item}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
