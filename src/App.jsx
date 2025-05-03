import { useState } from 'react'
import './App.css'

function App() {
  const [idea, setIdea] = useState('')
  const [result, setResult] = useState(null)

  const handleGenerate = async () => {
    if (!idea) return
    setResult('Generazione in corso...')
    setTimeout(() => {
      setResult(`Immagine generata per: "${idea}"`)
    }, 2000)
  }

  return (
    <div className="app">
      <h1>Leynar Generator</h1>
      <input
        type="text"
        placeholder="Scrivi la tua idea ironica"
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
      />
      <button onClick={handleGenerate}>Genera</button>
      {result && <p>{result}</p>}
    </div>
  )
}

export default App
