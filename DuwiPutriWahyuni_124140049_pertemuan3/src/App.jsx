import { Link, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';

function NotFound() {
  return (
    <section>
      <h1>Halaman tidak ditemukan</h1>
      <p>
        Alamat yang Anda buka tidak ada. <Link to="/">Kembali ke rak buku</Link>
      </p>
    </section>
  );
}

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/statistik" element={<Stats />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
