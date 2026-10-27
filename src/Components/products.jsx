import { useEffect, useState } from "react";
import "./style.css";

const productsUrl = "http://localhost:8000/API_Books.php";
export default function Products () {
  const [Produit , setProduit] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const controller = new AbortController()

    async function loadProducts() {
      try {
        if (!productsUrl) throw new Error("Configurez REACT_APP_API_BASE_URL puis redemarrez React.")
        const response = await fetch(productsUrl, { signal: controller.signal })
        if (!response.ok) throw new Error("Erreur HTTP " + response.status)
        const data = await response.json()
        if (!Array.isArray(data)) throw new Error("La reponse doit etre un tableau de produits.")
        setProduit(data)
      } catch (err) {
        if (!controller.signal.aborted) setError(err.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadProducts()
    return () => controller.abort()
  }, [])

  if (loading) return <p role="status">Chargement des produits...</p>
  if (error) return <p role="alert">Impossible de charger les produits : {error}</p>

  return (
    <main className="productCatalog">
      <h1 className="productCatalogTitle">Nos produits</h1>
      <div className="productGrid">
        {Produit.map((c, index) => (
          <article className="productCard" key={c.id ?? `${c.title ?? c.nom}-${index}`}>
            <div className="productImageWrap">
              <img src={c.image} alt={c.title ?? c.nom} className="productImage" />
            </div>
            <div className="productInfo">
              <h2 className="productName">{c.title ?? c.nom}</h2>
              <p className="productDetail">{c.detail ?? c.details}</p>
              <h5>{c.Auteur}</h5>
              <span className="productPrice">{c.prix}</span>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}