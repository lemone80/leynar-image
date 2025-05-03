import { useState } from 'react'
import './App.css'

function App() {
  const [prompt, setPrompt] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generateImage = async () => {
    if (!prompt) return
    setLoading(true)
    setError('')
    setImageUrl('')

    try {
      const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_STABILITY_API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          text_prompts: [{ text: prompt }],
          cfg_scale: 7,
          height: 512,
          width: 512,
          samples: 1,
          steps: 30
        })
      })

      const data = await response.json()
      if (data && data.artifacts && data.artifacts.length > 0) {
        const base64Image = data.artifacts[0].base64
        setImageUrl(`data:image/png;base64,${base64Image}`)
      } else {
        setError('Errore nella generazione dell'immagine.')
      }
    } catch (err) {
      setError('Errore durante la richiesta.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <h1>Leynar Generator</h1>
      <input
        type="text"
        placeholder="Scrivi la tua idea ironica"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={generateImage} disabled={loading}>
        {loading ? 'Generando...' : 'Genera'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {imageUrl && (
        <div style={{ marginTop: '2rem' }}>
          <img src={imageUrl} alt="Generated" style={{ maxWidth: '90%' }} />
          <br />
          <a href={imageUrl} download="leynar.png">Download</a>
        </div>
      )}
    </div>
  )
}

export default App