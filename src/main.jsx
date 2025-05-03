
import React from 'react'
import ReactDOM from 'react-dom/client'

const App = () => {
  return (
    <main style={{ fontFamily: 'sans-serif', textAlign: 'center', paddingTop: '3rem' }}>
      <h1>🎨 Leynar Generator</h1>
      <p>Progetto React + Vite pronto per Vercel.</p>
    </main>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
