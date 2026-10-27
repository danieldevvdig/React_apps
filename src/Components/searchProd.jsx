import React, { useEffect, useState } from 'react'

export default function SearchProd({ products, setFilteredProducts }) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const value = query.trim().toLowerCase()

    if (!value) {
      setFilteredProducts(products)
      return
    }

    const filtered = products.filter((product) => {
      const name = (product.nom || '').toLowerCase()
      const description = (product.description || '').toLowerCase()

      return name.includes(value) || description.includes(value)
    })

    setFilteredProducts(filtered)
  }, [query, products, setFilteredProducts])

  const resetFilters = () => setQuery('')

  return (
    <div className="searchWrap">
      <div className="searchBar">
        <span className="searchIcon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="6" />
            <path d="M16 16L21 21" />
          </svg>
        </span>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          aria-label="Search products"
        />
      </div>

      <button type="button" className="resetBtn" onClick={resetFilters}>
        Reset
      </button>
    </div>
  )
}
