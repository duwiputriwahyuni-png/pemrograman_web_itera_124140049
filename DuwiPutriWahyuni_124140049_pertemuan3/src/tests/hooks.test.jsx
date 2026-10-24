import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import useBookStats from '../hooks/useBookStats';
import useLocalStorage from '../hooks/useLocalStorage';

describe('useLocalStorage', () => {
  it('memakai nilai awal jika localStorage kosong', () => {
    const { result } = renderHook(() => useLocalStorage('kunci-a', ['awal']));
    expect(result.current[0]).toEqual(['awal']);
  });

  it('membaca nilai yang sudah tersimpan', () => {
    window.localStorage.setItem('kunci-b', JSON.stringify(['tersimpan']));
    const { result } = renderHook(() => useLocalStorage('kunci-b', []));
    expect(result.current[0]).toEqual(['tersimpan']);
  });

  it('menyimpan perubahan ke localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('kunci-c', []));
    act(() => result.current[1](['baru']));
    expect(JSON.parse(window.localStorage.getItem('kunci-c'))).toEqual(['baru']);
  });

  it('kembali ke nilai awal jika data tersimpan rusak', () => {
    window.localStorage.setItem('kunci-d', '{bukan json');
    const { result } = renderHook(() => useLocalStorage('kunci-d', []));
    expect(result.current[0]).toEqual([]);
  });
});

describe('useBookStats', () => {
  const books = [
    { id: '1', title: 'A', author: 'Dewi', status: 'milik' },
    { id: '2', title: 'B', author: 'dewi ', status: 'baca' },
    { id: '3', title: 'C', author: 'Budi', status: 'milik' },
    { id: '4', title: 'D', author: 'Sari', status: 'beli' },
  ];

  it('menghitung total, jumlah per status, persentase, dan penulis unik', () => {
    const { result } = renderHook(() => useBookStats(books));
    expect(result.current.total).toBe(4);
    expect(result.current.count).toEqual({ milik: 2, baca: 1, beli: 1 });
    expect(result.current.percent.milik).toBe(50);
    expect(result.current.uniqueAuthors).toBe(3);
  });

  it('aman untuk daftar kosong (tanpa pembagian dengan nol)', () => {
    const { result } = renderHook(() => useBookStats([]));
    expect(result.current.total).toBe(0);
    expect(result.current.percent.milik).toBe(0);
  });
});
