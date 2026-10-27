import { Routes, Route } from 'react-router-dom'
import Header from './Components/header'
import Footer from './Components/Footer'
import Home from './pages/Home'
import ApiData from './Components/ApiData'
import ProductsPage from './pages/ProductsPage'
import About from './pages/About'

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/api-test" element={<ApiData />} />
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  )
}