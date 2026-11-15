"""
library.py
Class Library: menyimpan dan mengelola koleksi LibraryItem.
"""

from library_item import LibraryItem


class Library:
    """Pengelola koleksi perpustakaan."""

    def __init__(self, nama: str):
        self._nama = nama
        self.__koleksi = {}   # private: dict {item_id: LibraryItem}

    @property
    def jumlah_item(self) -> int:
        return len(self.__koleksi)

    def tambah_item(self, item: LibraryItem) -> bool:
        """Menambahkan item ke koleksi. Menolak duplikat ID & objek non-LibraryItem."""
        if not isinstance(item, LibraryItem):
            print("Gagal: hanya objek LibraryItem yang boleh ditambahkan.")
            return False
        if item.item_id in self.__koleksi:
            print(f"Gagal: ID '{item.item_id}' sudah terdaftar.")
            return False
        self.__koleksi[item.item_id] = item
        print(f"Item ditambahkan: {item.judul} ({item.get_tipe()})")
        return True

    def tampilkan_tersedia(self):
        """Menampilkan item yang belum dipinjam."""
        tersedia = [i for i in self.__koleksi.values() if not i.is_dipinjam]
        print(f"\n=== Katalog Tersedia - {self._nama} ({len(tersedia)} item) ===")
        if not tersedia:
            print("(Tidak ada item tersedia)")
        for item in tersedia:
            print(" -", item.get_detail())   # polymorphism

    def tampilkan_semua(self):
        """Menampilkan seluruh item beserta statusnya."""
        print(f"\n=== Seluruh Koleksi - {self._nama} ({self.jumlah_item} item) ===")
        for item in self.__koleksi.values():
            print(" -", item)

    def cari_berdasarkan_id(self, item_id: str):
        """Return item dengan ID tersebut, atau None."""
        return self.__koleksi.get(item_id)

    def cari_berdasarkan_judul(self, kata_kunci: str) -> list:
        """Pencarian judul (tidak case-sensitive, sebagian kata cukup)."""
        kunci = kata_kunci.lower().strip()
        return [i for i in self.__koleksi.values() if kunci in i.judul.lower()]
