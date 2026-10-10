let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(angka);
}

function tambahBarang() {

    const nama = document.getElementById("namaBarang").value.trim();
    const harga = Number(document.getElementById("hargaBarang").value);
    const jumlah = Number(document.getElementById("jumlahBarang").value);

    const errorNama = document.getElementById("errorNama");
    const errorHarga = document.getElementById("errorHarga");
    const errorJumlah = document.getElementById("errorJumlah");

    errorNama.textContent = "";
    errorHarga.textContent = "";
    errorJumlah.textContent = "";

    let valid = true;

    if (nama.length < 3) {
        errorNama.textContent =
            "Nama barang minimal 3 karakter.";
        valid = false;
    }

    if (harga < 500) {
        errorHarga.textContent =
            "Harga minimal Rp500.";
        valid = false;
    }

    if (!Number.isInteger(jumlah) || jumlah < 1) {
        errorJumlah.textContent =
            "Jumlah harus berupa bilangan bulat minimal 1.";
        valid = false;
    }

    if (!valid) {
        return;
    }

    const barang = {
        nama: nama,
        harga: harga,
        jumlah: jumlah
    };

    keranjang.push(barang);

    simpanData();
    tampilkanKeranjang();

    document.getElementById("namaBarang").value = "";
    document.getElementById("hargaBarang").value = "";
    document.getElementById("jumlahBarang").value = 1;
}



function tampilkanKeranjang() {

    const tbody = document.getElementById("keranjang");

    tbody.innerHTML = "";

    let total = 0;

    keranjang.forEach((barang, index) => {

        const subtotal = barang.harga * barang.jumlah;

        total += subtotal;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${barang.nama}</td>
            <td>${formatRupiah(barang.harga)}</td>
            <td>${barang.jumlah}</td>
            <td>${formatRupiah(subtotal)}</td>
            <td>
                <button class="delete-btn" onclick="hapusBarang(${index})">
                    Hapus
                </button>
            </td>
        `;

        tbody.appendChild(row);
    });

    hitungTotal(total);
}


function hitungTotal(total) {

    let diskon = 0;

    if (total >= 50000) {
        diskon = total * 0.10;
    }

    const totalBayar = total - diskon;

    document.getElementById("totalBelanja").textContent =
        formatRupiah(total);

    document.getElementById("diskon").textContent =
        formatRupiah(diskon);

    document.getElementById("totalBayar").textContent =
        formatRupiah(totalBayar);
}


function hapusBarang(index) {

    keranjang.splice(index, 1);

    simpanData();
    tampilkanKeranjang();
}


function prosesPembayaran() {

    let total = keranjang.reduce(
        (sum, barang) => sum + (barang.harga * barang.jumlah),
        0
    );

    let diskon = 0;

    if (total >= 50000) {
        diskon = total * 0.10;
    }

    let totalBayar = total - diskon;

    const uangBayar = Number(
        document.getElementById("uangBayar").value
    );

    if (keranjang.length === 0) {
        alert("Keranjang masih kosong.");
        return;
    }

    if (uangBayar <= 0) {
        alert("Masukkan uang pembayaran.");
        return;
    }

    if (uangBayar < totalBayar) {
        alert("Uang pembayaran kurang.");
        return;
    }

    const kembalian = uangBayar - totalBayar;

    document.getElementById("kembalian").textContent =
        formatRupiah(kembalian);

    alert("Pembayaran berhasil!");
}


function transaksiBaru() {

    const konfirmasi = confirm(
        "Apakah kamu yakin ingin memulai transaksi baru?"
    );

    if (!konfirmasi) {
        return;
    }

    keranjang = [];

    localStorage.removeItem("keranjang");

    document.getElementById("uangBayar").value = "";

    document.getElementById("kembalian").textContent =
        formatRupiah(0);

    tampilkanKeranjang();
}


function simpanData() {

    localStorage.setItem(
        "keranjang",
        JSON.stringify(keranjang)
    );
}


tampilkanKeranjang();