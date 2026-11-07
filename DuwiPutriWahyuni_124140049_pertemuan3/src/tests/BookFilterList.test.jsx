import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import BookFilter from '../components/BookFilter/BookFilter';
import BookList from '../components/BookList/BookList';

describe('BookFilter', () => {
  it('memanggil onStatusChange saat chip status diklik', () => {
    const onStatusChange = vi.fn();
    render(<BookFilter status="semua" query="" onStatusChange={onStatusChange} onQueryChange={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: 'Sedang dibaca' }));
    expect(onStatusChange).toHaveBeenCalledWith('baca');
    expect(screen.getByRole('button', { name: 'Semua' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('memanggil onQueryChange saat mengetik di kotak pencarian', () => {
    const onQueryChange = vi.fn();
    render(<BookFilter status="semua" query="" onStatusChange={vi.fn()} onQueryChange={onQueryChange} />);

    fireEvent.change(screen.getByLabelText('Cari judul atau penulis'), { target: { value: 'bumi' } });
    expect(onQueryChange).toHaveBeenCalledWith('bumi');
  });
});

describe('BookList', () => {
  const books = [{ id: '1', title: 'Bumi', author: 'Tere Liye', status: 'baca' }];

  it('menampilkan pesan rak kosong jika belum ada buku', () => {
    render(<BookList books={[]} totalCount={0} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText(/Rak masih kosong/)).toBeInTheDocument();
  });

  it('menampilkan pesan khusus jika filter tidak menemukan hasil', () => {
    render(<BookList books={[]} totalCount={3} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText(/Tidak ada buku yang cocok/)).toBeInTheDocument();
  });

  it('merender buku dan memanggil callback edit / hapus', () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    render(<BookList books={books} totalCount={1} onEdit={onEdit} onDelete={onDelete} />);

    expect(screen.getByText('Bumi')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Edit Bumi' }));
    fireEvent.click(screen.getByRole('button', { name: 'Hapus Bumi' }));
    expect(onEdit).toHaveBeenCalledWith(books[0]);
    expect(onDelete).toHaveBeenCalledWith(books[0]);
  });
});
