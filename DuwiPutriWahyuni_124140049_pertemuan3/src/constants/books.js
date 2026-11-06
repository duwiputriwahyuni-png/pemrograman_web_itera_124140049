import PropTypes from 'prop-types';

// Kunci penyimpanan di localStorage
export const STORAGE_KEY = 'books-app:data';

// Daftar status buku: milik / baca / beli
export const STATUS_OPTIONS = [
  { value: 'milik', label: 'Dimiliki' },
  { value: 'baca', label: 'Sedang dibaca' },
  { value: 'beli', label: 'Ingin dibeli' },
];

export const getStatusLabel = (value) =>
  STATUS_OPTIONS.find((option) => option.value === value)?.label ?? value;

// PropTypes bentuk objek buku, dipakai ulang di banyak komponen
export const bookShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  status: PropTypes.oneOf(STATUS_OPTIONS.map((option) => option.value)).isRequired,
});
