import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import BookForm from '../components/BookForm/BookForm';

describe('BookForm', () => {
  it('menampilkan error dan tidak submit saat kolom wajib kosong', () => {
    const onSubmit = vi.fn();
    render(<BookForm onSubmit={onSubmit} />);

    fireEvent.click(screen.getByRole('button', { name: 'Tambah buku' }));

    expect(screen.getByText('Judul wajib diisi.')).toBeInTheDocument();
    expect(screen.getByText('Nama penulis wajib diisi.')).toBeInTheDocument();
    expect(screen.getByLabelText('Judul')).toHaveAttribute('aria-invalid', 'true');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('menganggap isian berisi spasi saja sebagai kosong', () => {
    const onSubmit = vi.fn();
    render(<BookForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText('Judul'), { target: { value: '   ' } });
    fireEvent.change(screen.getByLabelText('Penulis'), { target: { value: 'Tere Liye' } });
    fireEvent.click(screen.getByRole('button', { name: 'Tambah buku' }));

    expect(screen.getByText('Judul wajib diisi.')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('mengirim data yang sudah dirapikan saat form valid', () => {
    const onSubmit = vi.fn();
    render(<BookForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText('Judul'), { target: { value: '  Bumi  ' } });
    fireEvent.change(screen.getByLabelText('Penulis'), { target: { value: 'Tere Liye' } });
    fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'baca' } });
    fireEvent.click(screen.getByRole('button', { name: 'Tambah buku' }));

    expect(onSubmit).toHaveBeenCalledWith({ title: 'Bumi', author: 'Tere Liye', status: 'baca' });
    // Form dikosongkan setelah berhasil menambah
    expect(screen.getByLabelText('Judul')).toHaveValue('');
  });

  it('menghapus pesan error saat pengguna mulai mengetik', () => {
    render(<BookForm onSubmit={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: 'Tambah buku' }));
    expect(screen.getByText('Judul wajib diisi.')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Judul'), { target: { value: 'B' } });
    expect(screen.queryByText('Judul wajib diisi.')).not.toBeInTheDocument();
  });

  it('terisi data buku dan berganti ke mode edit', () => {
    const book = { id: '1', title: 'Laskar Pelangi', author: 'Andrea Hirata', status: 'milik' };
    render(<BookForm bookToEdit={book} onSubmit={vi.fn()} onCancel={vi.fn()} />);

    expect(screen.getByLabelText('Judul')).toHaveValue('Laskar Pelangi');
    expect(screen.getByRole('button', { name: 'Simpan perubahan' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Batal' })).toBeInTheDocument();
  });
});
