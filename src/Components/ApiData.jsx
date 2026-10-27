import { useState, useEffect } from 'react';
import { productsUrl } from '../api';

export default function ApiData() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    async function loadProducts() {
      try {
        if (!productsUrl) throw new Error('Configurez REACT_APP_API_BASE_URL puis redemarrez React.');
        const response = await fetch(productsUrl, { signal: controller.signal });
        if (!response.ok) throw new Error('Erreur HTTP ' + response.status);
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error('La reponse doit etre un tableau de produits.');
        setProducts(data);
      } catch (err) {
        if (!controller.signal.aborted) setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadProducts();
    return () => controller.abort();
  }, []);

  if (loading) return <p role="status">Chargement des produits...</p>;
  if (error) return <p role="alert">Impossible de charger les produits : {error}</p>;
  return (
    <section>
      <h1>Produits de l'API</h1>
      {products.length === 0 && <p>Aucun produit disponible.</p>}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.nom}</h2>
            <img src={product.image} alt={product.nom} width="160" />
            <p>{product.description}</p>
            <p>Prix : {product.prix}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}