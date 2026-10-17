'use strict';

// ===== Data & Class (ES6 Classes, Object Literals, Default Params) =====
class Profile {
  constructor({ nama, nim, prodi, kampus, email, motto = '-' }) {
    Object.assign(this, { nama, nim, prodi, kampus, email, motto });
  }
  get namaDepan() { return this.nama.split(' ')[0]; }
  render() {
    const { nama, nim, prodi, kampus, email, motto } = this; // destructuring
    return `<h3 style="margin:0 0 .6rem">${nama}</h3>
      <dl><dt>NIM</dt><dd>${nim}</dd><dt>Prodi</dt><dd>${prodi}</dd>
      <dt>Kampus</dt><dd>${kampus}</dd><dt>Email</dt><dd>${email}</dd>
      <dt>Motto</dt><dd>${motto}</dd></dl>`;
  }
}

class TaskManager {
  #tasks = []; // private field
  constructor(key) { this.key = key; this.#tasks = this.#load(); }
  #load() {
    try { return JSON.parse(localStorage.getItem(this.key)) ?? []; } catch { return []; }
  }
  #save() { localStorage.setItem(this.key, JSON.stringify(this.#tasks)); }
  add(text, prioritas = 'sedang') {
    this.#tasks = [...this.#tasks, { id: Date.now(), text, prioritas, selesai: false }]; // spread
    this.#save();
  }
  toggle(id) {
    this.#tasks = this.#tasks.map(t => (t.id === id ? { ...t, selesai: !t.selesai } : t));
    this.#save();
  }
  remove(id) { this.#tasks = this.#tasks.filter(t => t.id !== id); this.#save(); }
  list(filter = 'semua') {
    const urut = { tinggi: 0, sedang: 1, rendah: 2 };
    return this.#tasks
      .filter(({ selesai }) => filter === 'semua' || (filter === 'selesai') === selesai)
      .sort((a, b) => urut[a.prioritas] - urut[b.prioritas]);
  }
  stats() {
    const total = this.#tasks.length;
    const selesai = this.#tasks.reduce((n, t) => n + (t.selesai ? 1 : 0), 0);
    return { total, selesai, aktif: total - selesai, persen: total ? Math.round((selesai / total) * 100) : 0 };
  }
}

const profile = new Profile({
  nama: 'Duwi Putri Wahyuni', nim: '124140049', prodi: 'Teknik Informatika',
  kampus: 'Institut Teknologi Sumatera', email: '124140049@student.itera.ac.id',
  motto: 'Belajar sedikit demi sedikit, konsisten setiap hari.'
});
const tasks = new TaskManager('paw-tasks');
let skills = JSON.parse(localStorage.getItem('paw-skills') ?? 'null') ?? ['HTML', 'CSS', 'JavaScript', 'Git'];
let filter = 'semua';

const $ = (sel) => document.querySelector(sel);
const esc = (s) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// ===== Render =====
const renderTasks = () => {
  const items = tasks.list(filter);
  $('#taskList').innerHTML = items.length
    ? items.map(({ id, text, prioritas, selesai }) => `
      <li class="${selesai ? 'done' : ''}">
        <input type="checkbox" data-id="${id}" ${selesai ? 'checked' : ''} aria-label="Selesai: ${esc(text)}">
        <span class="txt">${esc(text)}</span>
        <span class="prio ${prioritas}">${prioritas}</span>
        <button class="del" data-del="${id}" aria-label="Hapus ${esc(text)}">Hapus</button>
      </li>`).join('')
    : '<li class="empty">Belum ada tugas di sini. Tambahkan tugas pertama Anda.</li>';
  const { total, aktif, selesai, persen } = tasks.stats();
  $('#stats').innerHTML = [['Total', total], ['Aktif', aktif], ['Selesai', selesai], ['Progres', persen + '%']]
    .map(([label, nilai]) => `<div><b>${nilai}</b><span class="muted">${label}</span></div>`).join('');
  $('#barFill').style.width = persen + '%';
};

const renderSkills = () => {
  $('#skillList').innerHTML = skills
    .map((s, i) => `<li>${esc(s)}<button data-skill="${i}" aria-label="Hapus skill ${esc(s)}">×</button></li>`).join('');
  localStorage.setItem('paw-skills', JSON.stringify(skills));
};

const tambahSkill = (...baru) => { skills = [...new Set([...skills, ...baru])]; renderSkills(); }; // rest + spread

// ===== Greeting & Clock =====
const sapaan = (jam) => (jam < 11 ? 'Selamat pagi' : jam < 15 ? 'Selamat siang' : jam < 18 ? 'Selamat sore' : 'Selamat malam');
const tick = () => {
  const now = new Date();
  $('#greeting').textContent = `${sapaan(now.getHours())}, ${profile.namaDepan}!`;
  $('#clock').textContent = now.toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'medium' });
};

// ===== Async: Promise + async/await =====
const kutipan = [
  { teks: 'Kode yang baik adalah kode yang mudah dibaca.', oleh: 'Prinsip clean code' },
  { teks: 'Mulai dari kecil, selesaikan, lalu perbaiki.', oleh: 'Kebiasaan developer' },
  { teks: 'Bug hari ini adalah pelajaran untuk besok.', oleh: 'Catatan praktikum' },
  { teks: 'Konsisten lebih penting daripada sempurna.', oleh: 'Catatan belajar' }
];
const ambilKutipan = () => new Promise((resolve, reject) => {
  setTimeout(() => (Math.random() < 0.95 ? resolve(kutipan[Math.floor(Math.random() * kutipan.length)]) : reject(new Error('Jaringan terputus'))), 600);
});
const muatKutipan = async () => {
  $('#quote').textContent = 'Memuat...';
  try {
    const { teks, oleh } = await ambilKutipan();
    $('#quote').innerHTML = `“${teks}”<br><span class="muted">— ${oleh}</span>`;
  } catch ({ message }) {
    $('#quote').textContent = `Gagal memuat kutipan (${message}). Coba lagi.`;
  }
};

// ===== Events =====
const tambahTugas = () => {
  const teks = $('#taskInput').value.trim();
  if (!teks) { $('#taskInput').focus(); return; }
  tasks.add(teks, $('#prioInput').value);
  $('#taskInput').value = '';
  renderTasks();
};
$('#addBtn').addEventListener('click', tambahTugas);
$('#taskInput').addEventListener('keydown', e => e.key === 'Enter' && tambahTugas());
$('#taskList').addEventListener('change', ({ target }) => { if (target.dataset.id) { tasks.toggle(+target.dataset.id); renderTasks(); } });
$('#taskList').addEventListener('click', ({ target }) => { if (target.dataset.del) { tasks.remove(+target.dataset.del); renderTasks(); } });
document.querySelectorAll('.chip').forEach(btn => btn.addEventListener('click', () => {
  filter = btn.dataset.filter;
  document.querySelectorAll('.chip').forEach(b => b.classList.toggle('active', b === btn));
  renderTasks();
}));
const submitSkill = () => { const v = $('#skillInput').value.trim(); if (v) { tambahSkill(v); $('#skillInput').value = ''; } };
$('#skillBtn').addEventListener('click', submitSkill);
$('#skillInput').addEventListener('keydown', e => e.key === 'Enter' && submitSkill());
$('#skillList').addEventListener('click', ({ target }) => {
  if (target.dataset.skill !== undefined) { skills = skills.filter((_, i) => i !== +target.dataset.skill); renderSkills(); }
});
$('#quoteBtn').addEventListener('click', muatKutipan);

const setTheme = (t) => {
  document.documentElement.dataset.theme = t;
  $('#themeBtn').textContent = t === 'dark' ? 'Mode terang' : 'Mode gelap';
  localStorage.setItem('paw-theme', t);
};
$('#themeBtn').addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));

// ===== Init =====
$('#profile').innerHTML = profile.render();
setTheme(localStorage.getItem('paw-theme') ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
tick(); setInterval(tick, 1000);
renderTasks(); renderSkills(); muatKutipan();
