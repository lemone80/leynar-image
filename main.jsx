import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

const App = () => {
  const [prompt, setPrompt] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const generateImage = async () => {
    setLoading(true)
    setError("")
    setImageUrl("")

    try {
      const response = await fetch("https://api.stability.ai/v2beta/stable-image/generate/core", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_STABILITY_API_KEY}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          prompt: prompt,
          output_format: "png",
          model: "stable-diffusion-xl-beta-v2-2-2"
        })
      })

      const data = await response.json()
      if (data && data.image) {
        setImageUrl(`data:image/png;base64,${data.image}`)
      } else {
        setError("Errore nella generazione dell'immagine.")
      }
    } catch (err) {
      setError("Errore nella richiesta API.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ fontFamily: 'sans-serif', textAlign: 'center', padding: '2rem' }}>
      <h1>🎨 Leynar Image Generator</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Es. Funny dog with glasses"
        style={{ width: "60%", padding: "10px", fontSize: "16px" }}
      />
      <br /><br />
      <button onClick={generateImage} disabled={loading} style={{ padding: "10px 20px", fontSize: "16px" }}>
        {loading ? "Generating..." : "🎬 Generate Image"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {imageUrl && (
        <div style={{ marginTop: "2rem" }}>
          <img src={imageUrl} alt="Generated" style={{ maxWidth: "90%", border: "1px solid #ccc" }} />
          <br />
          <a href={imageUrl} download="leynar-image.png">Download Image</a>
        </div>
      )}
    </main>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);