"""
main.py
Skrip pengujian sistem manajemen perpustakaan.
Jalankan dengan: python main.py
"""

from library_item import Book, Magazine, LibraryItem
from library import Library
from member import Member


def main():
    perpus = Library("Perpustakaan ITERA")

    print("--- 1. Menambahkan Item ---")
    perpus.tambah_item(Book("B001", "Pemrograman Python", "Budi Santoso", 320))
    perpus.tambah_item(Book("B002", "Basis Data Dasar", "Siti Rahma", 280))
    perpus.tambah_item(Magazine("M001", "Tech Monthly", "Gramedia", "Nov 2026"))
    perpus.tambah_item(Magazine("M002", "Sains Populer", "Kompas", "Okt 2026"))
    perpus.tambah_item(Book("B001", "Duplikat", "Anonim", 100))   # ditolak (ID sama)

    print("\n--- 2. Katalog Tersedia ---")
    perpus.tampilkan_tersedia()

    print("\n--- 3. Pencarian ---")
    hasil = perpus.cari_berdasarkan_judul("python")
    print("Cari judul 'python':", [i.judul for i in hasil])
    item = perpus.cari_berdasarkan_id("M001")
    print("Cari ID 'M001'     :", item.get_detail() if item else "Tidak ditemukan")
    print("Cari ID 'X999'     :", perpus.cari_berdasarkan_id("X999"))

    print("\n--- 4. Peminjaman & Status Ketersediaan ---")
    anggota = Member("A01", "Ahmad Fadhil")
    buku = perpus.cari_berdasarkan_id("B001")
    majalah = perpus.cari_berdasarkan_id("M001")
    anggota.pinjam_item(buku)
    anggota.pinjam_item(majalah)
    anggota.pinjam_item(buku)   # gagal: sudah dipinjam
    print("Status B001 dipinjam?", buku.is_dipinjam)
    perpus.tampilkan_tersedia()

    print("\n--- 5. Pengembalian & Denda (Polymorphism) ---")
    anggota.kembalikan_item(buku, hari_terlambat=3)      # 3 x 1000
    anggota.kembalikan_item(majalah, hari_terlambat=3)   # 3 x 500
    perpus.tampilkan_semua()

    print("\n--- 6. Bukti Encapsulation & Abstract Class ---")
    try:
        buku.is_dipinjam = True   # property read-only
    except AttributeError:
        print("is_dipinjam bersifat read-only (AttributeError).")
    try:
        LibraryItem("X", "Abstrak")
    except TypeError as err:
        print("LibraryItem tidak bisa diinstansiasi:", err)


if __name__ == "__main__":
    main()
