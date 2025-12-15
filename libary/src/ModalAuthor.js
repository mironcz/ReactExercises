
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.js'

function ModalAuthor({author, handleSubmit, closeModalAuthor}) {
  if (!author) return null;
  return (
  <div 
  class="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50">
  <div class="bg-white p-4 rounded shadow">
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Информация о авторе</h2>
        <form onSubmit={handleSubmit}
        className="p-4 border rounded shadow-sm bg-light">
          <div className="mb-3">
            <label className="form-label">Имя</label>
            <input
              type="text"
              className="form-control"
              name="name"
              defaultValue={author.name}
              placeholder="Введите имя автора"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Описание</label>
            <input
              type="test"
              className="form-control"
              name="description"
              defaultValue={author.description}
              placeholder="Введите описание автора"
            />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary w-50 me-2">
              Сохранить
            </button>
            <button type="button" className="btn btn-danger w-50" onClick={closeModalAuthor}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
}
export default ModalAuthor