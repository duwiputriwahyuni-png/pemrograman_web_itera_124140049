import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { STATUS_OPTIONS, bookShape } from '../../constants/books';
import './BookForm.css';

const EMPTY_VALUES = { title: '', author: '', status: 'milik' };

// Validasi kolom wajib isi (spasi saja dianggap kosong)
function validate(values) {
  const errors = {};
  if (!values.title.trim()) errors.title = 'Judul wajib diisi.';
  if (!values.author.trim()) errors.author = 'Nama penulis wajib diisi.';
  return errors;
}

/**
 * Form tambah / edit buku (reusable).
 * Jika `bookToEdit` ada, form berpindah ke mode edit dan terisi data buku.
 */
export default function BookForm({ bookToEdit = null, onSubmit, onCancel = () => {} }) {
  const [values, setValues] = useState(EMPTY_VALUES);
  const [errors, setErrors] = useState({});
  const headingRef = useRef(null);
  const isEditing = Boolean(bookToEdit);

  // Sinkronkan isi form saat mode edit dimulai / dibatalkan
  useEffect(() => {
    if (bookToEdit) {
      setValues({ title: bookToEdit.title, author: bookToEdit.author, status: bookToEdit.status });
      headingRef.current?.focus(); // membawa pengguna ke form saat tombol Edit ditekan
    } else {
      setValues(EMPTY_VALUES);
    }
    setErrors({});
  }, [bookToEdit]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Hapus pesan error kolom ini begitu pengguna mulai mengetik
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const foundErrors = validate(values);
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      return;
    }
    onSubmit({
      title: values.title.trim(),
      author: values.author.trim(),
      status: values.status,
    });
    if (!isEditing) setValues(EMPTY_VALUES);
  };

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <h2 className="book-form__heading" tabIndex={-1} ref={headingRef}>
        {isEditing ? 'Ubah data buku' : 'Tambah buku baru'}
      </h2>

      <div className="book-form__grid">
        <div className={`field ${errors.title ? 'field--error' : ''}`}>
          <label htmlFor="book-title">Judul</label>
          <input
            id="book-title"
            name="title"
            type="text"
            value={values.title}
            onChange={handleChange}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? 'book-title-error' : undefined}
            placeholder="Contoh: Laskar Pelangi"
          />
          {errors.title && (
            <p id="book-title-error" className="field__error" role="alert">
              {errors.title}
            </p>
          )}
        </div>

        <div className={`field ${errors.author ? 'field--error' : ''}`}>
          <label htmlFor="book-author">Penulis</label>
          <input
            id="book-author"
            name="author"
            type="text"
            value={values.author}
            onChange={handleChange}
            aria-invalid={Boolean(errors.author)}
            aria-describedby={errors.author ? 'book-author-error' : undefined}
            placeholder="Contoh: Andrea Hirata"
          />
          {errors.author && (
            <p id="book-author-error" className="field__error" role="alert">
              {errors.author}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="book-status">Status</label>
          <select id="book-status" name="status" value={values.status} onChange={handleChange}>
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="book-form__actions">
        <button type="submit" className="btn btn--primary">
          {isEditing ? 'Simpan perubahan' : 'Tambah buku'}
        </button>
        {isEditing && (
          <button type="button" className="btn btn--ghost" onClick={onCancel}>
            Batal
          </button>
        )}
      </div>
    </form>
  );
}

BookForm.propTypes = {
  bookToEdit: bookShape,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};
