import 'bootstrap/dist/css/bootstrap.min.css';
import './App.js'
import './EditAuthor';

function EditBook({book, author, onSubmit, onClose}) {
  if (!book) return null;
  return (
  <div 
  class="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50">
  <div class="bg-white p-4 rounded shadow">
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Информация о книге</h2>
        <form onSubmit={onSubmit}
        className="p-4 border rounded shadow-sm bg-light">
          <div className="mb-3">
            <label className="form-label">Название</label>
            <input
              type="text"
              className="form-control"
              name="name"
              defaultValue={book.name}
              placeholder="Введите имя книги"
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
              type="test"
              className="form-control"
              name="year"
              defaultValue={book.year}
              placeholder="Book's year"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Издатель</label>
            <input
              type="test"
              className="form-control"
              name="publish"
              defaultValue={book.publisher}
              placeholder="Book's publisher"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">ISBN</label>
            <input
              type="test"
              className="form-control"
              name="isbn"
              defaultValue={book.isbn}
              placeholder="Book's ISBN"
            />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary w-50 me-2">
              Сохранить
            </button>
            <button type="button" className="btn btn-danger w-50" onClick={onClose}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
}
export default EditBook