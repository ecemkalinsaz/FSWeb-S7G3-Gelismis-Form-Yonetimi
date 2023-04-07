import './App.css';
import { useState } from 'react';
import Form from './Form';

export default function App() {
  const [uyeListesi, setUyeListesi] = useState([]);

  const handleUyeEkle = (yeniUye) => {
    setUyeListesi((oncekiUyeListesi) => [...oncekiUyeListesi, yeniUye]);
  };

  return (
    <div className="App">
      {uyeListesi.map((uye, i) => (
        <p key={i}>{uye.name}</p>
      ))}
      <Form addUye={handleUyeEkle} />
    </div>
  );
}
