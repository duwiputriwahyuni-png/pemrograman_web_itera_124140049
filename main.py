"""Program utama: menggunakan modul math_operations."""

# Cara impor 1: impor seluruh modul (dipanggil dengan prefix modul)
import math_operations

# Cara impor 2: impor fungsi/konstanta spesifik
from math_operations import (
    luas_persegi_panjang,
    keliling_persegi_panjang,
    luas_lingkaran,
    keliling_lingkaran,
)

# Cara impor 3: impor dengan alias
import math_operations as mo


def judul(teks: str) -> None:
    """Mencetak judul seksi.

    Parameter:
        teks (str): teks judul.
    """
    print(f"\n{'=' * 40}\n{teks}\n{'=' * 40}")


def main() -> None:
    """Menjalankan seluruh fungsi modul dengan berbagai nilai uji."""
    print(f"Konstanta PI dari modul: {math_operations.PI}")

    judul("PERSEGI")
    for sisi in (4, 7.5, 10):
        print(f"Sisi {sisi:>5} -> Luas: {math_operations.luas_persegi(sisi):>8.2f}"
              f" | Keliling: {math_operations.keliling_persegi(sisi):>7.2f}")

    judul("PERSEGI PANJANG")
    for p, l in ((5, 3), (10, 2.5), (8, 8)):
        print(f"{p:>4} x {l:<4} -> Luas: {luas_persegi_panjang(p, l):>7.2f}"
              f" | Keliling: {keliling_persegi_panjang(p, l):>6.2f}")

    judul("LINGKARAN")
    for r in (3, 7, 10.5):
        print(f"r = {r:>5} -> Luas: {luas_lingkaran(r):>8.2f}"
              f" | Keliling: {keliling_lingkaran(r):>7.2f}")

    judul("KONVERSI SUHU")
    print(f"{'Celsius':>8} | {'Fahrenheit':>10} | {'Kelvin':>8}")
    print("-" * 33)
    for c in (-10, 0, 25, 37, 100):
        print(f"{c:>8.2f} | {mo.celsius_ke_fahrenheit(c):>10.2f} | "
              f"{mo.celsius_ke_kelvin(c):>8.2f}")


if __name__ == "__main__":
    main()
