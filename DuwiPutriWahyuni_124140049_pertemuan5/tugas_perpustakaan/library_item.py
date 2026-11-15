"""
library_item.py
Berisi abstract class LibraryItem beserta subclass Book dan Magazine.

Konsep OOP yang diterapkan:
- Abstract Class & Inheritance : LibraryItem(ABC) -> Book, Magazine
- Encapsulation                : atribut protected (_) dan private (__)
- Property decorator           : is_dipinjam, judul, item_id
- Polymorphism                 : get_detail() & hitung_denda() berbeda tiap subclass
"""

from abc import ABC, abstractmethod


class LibraryItem(ABC):
    """Abstract base class untuk seluruh item perpustakaan."""

    def __init__(self, item_id: str, judul: str):
        # Validasi input agar data selalu konsisten
        if not item_id or not item_id.strip():
            raise ValueError("ID item tidak boleh kosong!")
        if not judul or not judul.strip():
            raise ValueError("Judul item tidak boleh kosong!")

        self._item_id = item_id.strip()   # protected: boleh diakses subclass
        self._judul = judul.strip()       # protected
        self.__is_dipinjam = False        # private: hanya diubah lewat pinjam()/kembalikan()

    # ------------------------- PROPERTY (read-only) -------------------------
    @property
    def item_id(self) -> str:
        """ID unik item (read-only)."""
        return self._item_id

    @property
    def judul(self) -> str:
        """Judul item (read-only)."""
        return self._judul

    @property
    def is_dipinjam(self) -> bool:
        """Status peminjaman item (read-only dari luar class)."""
        return self.__is_dipinjam

    # ------------------------- METHOD CONCRETE -------------------------
    def pinjam(self) -> bool:
        """Menandai item sebagai dipinjam. Return False jika sudah dipinjam."""
        if self.__is_dipinjam:
            return False
        self.__is_dipinjam = True
        return True

    def kembalikan(self) -> bool:
        """Menandai item sebagai tersedia. Return False jika memang tidak dipinjam."""
        if not self.__is_dipinjam:
            return False
        self.__is_dipinjam = False
        return True

    def __str__(self) -> str:
        status = "Dipinjam" if self.__is_dipinjam else "Tersedia"
        return f"[{self._item_id}] {self._judul} ({self.get_tipe()}) - {status}"

    # ------------------------- METHOD ABSTRACT -------------------------
    @abstractmethod
    def get_tipe(self) -> str:
        """Mengembalikan jenis item (wajib dioverride subclass)."""

    @abstractmethod
    def get_detail(self) -> str:
        """Mengembalikan detail lengkap item (wajib dioverride subclass)."""

    @abstractmethod
    def hitung_denda(self, hari_terlambat: int) -> int:
        """Menghitung denda keterlambatan dalam Rupiah (wajib dioverride subclass)."""


class Book(LibraryItem):
    """Buku: denda Rp 1.000 per hari keterlambatan."""

    DENDA_PER_HARI = 1000

    def __init__(self, item_id: str, judul: str, penulis: str, jumlah_halaman: int):
        super().__init__(item_id, judul)
        if jumlah_halaman <= 0:
            raise ValueError("Jumlah halaman harus lebih dari 0!")
        self._penulis = penulis
        self._jumlah_halaman = jumlah_halaman

    def get_tipe(self) -> str:
        return "Buku"

    def get_detail(self) -> str:
        return (f"Buku | ID: {self.item_id} | Judul: {self.judul} | "
                f"Penulis: {self._penulis} | Halaman: {self._jumlah_halaman}")

    def hitung_denda(self, hari_terlambat: int) -> int:
        return max(0, hari_terlambat) * self.DENDA_PER_HARI


class Magazine(LibraryItem):
    """Majalah: denda Rp 500 per hari keterlambatan."""

    DENDA_PER_HARI = 500

    def __init__(self, item_id: str, judul: str, penerbit: str, edisi: str):
        super().__init__(item_id, judul)
        self._penerbit = penerbit
        self._edisi = edisi

    def get_tipe(self) -> str:
        return "Majalah"

    def get_detail(self) -> str:
        return (f"Majalah | ID: {self.item_id} | Judul: {self.judul} | "
                f"Penerbit: {self._penerbit} | Edisi: {self._edisi}")

    def hitung_denda(self, hari_terlambat: int) -> int:
        return max(0, hari_terlambat) * self.DENDA_PER_HARI
