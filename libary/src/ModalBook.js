import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from "react-dom";
import { useRef } from 'react';
import './Modal.css';
import ModalAuthor from './ModalAuthor';


function ModalBook({ book, author, handleSubmitBook, closeModalBook}) {
  if (!book) return null;
  return (
  <div 
  class="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50">
  <div class="bg-white p-4 rounded shadow">
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Change author information</h2>
        <form onSubmit={handleSubmitBook}
        className="p-4 border rounded shadow-sm bg-light">
          <div className="mb-3">
            <label className="form-label">Имя</label>
            <input
              type="text"
              className="form-control"
              name="name"
              defaultValue={book.name}
              placeholder="Введите название книги"
            />
          </div>
          
          <input type="hidden" name="authorId" value={book.authorId} />
          <div className="mb-3">
            <label className="form-label">Автор</label>
            <input
              type="text"
              className="form-control"
              name="authorName"
              value={author.name}
              placeholder=""
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Год</label>
            <input
              type="text"
              className="form-control"
              name="year"
              defaultValue={book.year}
              placeholder=""
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Издатель</label>
            <input
              type="text"
              className="form-control"
              name="publish"
              defaultValue={book.publish}
              placeholder=""
            />
          </div>

          <div className="mb-3">
            <label className="form-label">ISBN</label>
            <input
              type="text"
              className="form-control"
              name="isbn"
              defaultValue={book.isbn}
              placeholder=""
            />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary w-50 me-2">
              Сохранить
            </button>
            <button type="button" className="btn btn-danger w-50" onClick={closeModalBook}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
}

export default ModalBook