import './style.css'
import logo from '../pic/Monogramme BMF doré aux lauriers.png'
import { Link } from 'react-router-dom'
import { useDarkMode } from '../context/darkmode'

export default function Header() {
  const { darkMode, toggleDarkMode } = useDarkMode()

  return (
    <header>
      <img src={logo} alt="BMF logo" />
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
      </nav>
      <span className='light'>Light</span>
      <label className="switch" aria-label="Toggle dark mode">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={toggleDarkMode}
        />
        <span className="slider round" />
      </label>
      <span className='dark'>Dark</span>
    </header>
  )
}