"""
member.py
Class Member: anggota perpustakaan yang dapat meminjam item.
"""

from library_item import LibraryItem


class Member:
    """Anggota perpustakaan dengan batas maksimal peminjaman."""

    MAKS_PINJAM = 3

    def __init__(self, member_id: str, nama: str):
        self._member_id = member_id
        self._nama = nama
        self.__item_dipinjam = []   # private: daftar item yang sedang dipinjam

    @property
    def member_id(self) -> str:
        return self._member_id

    @property
    def nama(self) -> str:
        return self._nama

    @property
    def item_dipinjam(self) -> tuple:
        """Salinan read-only (tuple) agar list asli tidak bisa diubah dari luar."""
        return tuple(self.__item_dipinjam)

    def pinjam_item(self, item: LibraryItem) -> bool:
        """Meminjam item jika batas belum tercapai dan item tersedia."""
        if len(self.__item_dipinjam) >= self.MAKS_PINJAM:
            print(f"Gagal: {self._nama} sudah mencapai batas {self.MAKS_PINJAM} pinjaman.")
            return False
        if not item.pinjam():
            print(f"Gagal: '{item.judul}' sedang dipinjam.")
            return False
        self.__item_dipinjam.append(item)
        print(f"Sukses: {self._nama} meminjam '{item.judul}'.")
        return True

    def kembalikan_item(self, item: LibraryItem, hari_terlambat: int = 0) -> int:
        """Mengembalikan item. Return total denda (0 jika tidak terlambat)."""
        if item not in self.__item_dipinjam:
            print(f"Gagal: {self._nama} tidak sedang meminjam '{item.judul}'.")
            return 0
        self.__item_dipinjam.remove(item)
        item.kembalikan()
        denda = item.hitung_denda(hari_terlambat)   # polymorphism
        print(f"Sukses: {self._nama} mengembalikan '{item.judul}'. Denda: Rp {denda:,}")
        return denda

    def __str__(self) -> str:
        return f"Member {self._member_id} - {self._nama} ({len(self.__item_dipinjam)} pinjaman)"
