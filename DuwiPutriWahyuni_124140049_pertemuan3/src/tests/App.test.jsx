import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App';
import { BookProvider } from '../context/BookContext';
import { STORAGE_KEY } from '../constants/books';

const SEED = [
  { id: 'a', title: 'Laskar Pelangi', author: 'Andrea Hirata', status: 'milik' },
  { id: 'b', title: 'Bumi', author: 'Tere Liye', status: 'baca' },
  { id: 'c', title: 'Cantik Itu Luka', author: 'Eka Kurniawan', status: 'beli' },
];

function renderApp(route = '/', seed = SEED) {
  if (seed) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  return render(
    <MemoryRouter initialEntries={[route]}>
      <BookProvider>
        <App />
      </BookProvider>
    </MemoryRouter>
  );
}

const getList = () => screen.getByRole('list', { name: 'Daftar buku' });

describe('Aplikasi Manajemen Buku (integrasi)', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('menambah buku baru ke daftar dan menyimpannya di localStorage', () => {
    renderApp('/', null);
    fireEvent.change(screen.getByLabelText('Judul'), { target: { value: 'Pulang' } });
    fireEvent.change(screen.getByLabelText('Penulis'), { target: { value: 'Leila S. Chudori' } });
    fireEvent.click(screen.getByRole('button', { name: 'Tambah buku' }));

    expect(within(getList()).getByText('Pulang')).toBeInTheDocument();
    expect(JSON.parse(window.localStorage.getItem(STORAGE_KEY))[0].title).toBe('Pulang');
  });

  it('memfilter buku berdasarkan status', () => {
    renderApp();
    fireEvent.click(screen.getByRole('button', { name: 'Sedang dibaca' }));

    const list = getList();
    expect(within(list).getByText('Bumi')).toBeInTheDocument();
    expect(within(list).queryByText('Laskar Pelangi')).not.toBeInTheDocument();
  });

  it('mencari buku berdasarkan judul atau nama penulis', () => {
    renderApp();
    const search = screen.getByLabelText('Cari judul atau penulis');

    fireEvent.change(search, { target: { value: 'eka' } }); // penulis
    expect(within(getList()).getByText('Cantik Itu Luka')).toBeInTheDocument();
    expect(within(getList()).queryByText('Bumi')).not.toBeInTheDocument();

    fireEvent.change(search, { target: { value: 'laskar' } }); // judul
    expect(within(getList()).getByText('Laskar Pelangi')).toBeInTheDocument();
  });

  it('mengedit buku yang sudah ada', () => {
    renderApp();
    fireEvent.click(screen.getByRole('button', { name: 'Edit Bumi' }));
    fireEvent.change(screen.getByLabelText('Judul'), { target: { value: 'Bulan' } });
    fireEvent.click(screen.getByRole('button', { name: 'Simpan perubahan' }));

    expect(within(getList()).getByText('Bulan')).toBeInTheDocument();
    expect(within(getList()).queryByText('Bumi')).not.toBeInTheDocument();
  });

  it('menghapus buku setelah konfirmasi', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    renderApp();
    fireEvent.click(screen.getByRole('button', { name: 'Hapus Bumi' }));

    expect(screen.queryByText('Bumi')).not.toBeInTheDocument();
    expect(JSON.parse(window.localStorage.getItem(STORAGE_KEY))).toHaveLength(2);
  });

  it('memuat data dari localStorage dan menampilkan statistik di halaman /statistik', () => {
    renderApp('/statistik');
    expect(screen.getByTestId('stat-total')).toHaveTextContent('3');
    expect(screen.getByTestId('stat-authors')).toHaveTextContent('3');
    expect(screen.getByTestId('stat-baca')).toHaveTextContent('1 (33%)');
  });

  it('berpindah halaman lewat navigasi', () => {
    renderApp();
    fireEvent.click(screen.getByRole('link', { name: 'Statistik' }));
    expect(screen.getByRole('heading', { name: 'Statistik koleksi' })).toBeInTheDocument();
  });
});
