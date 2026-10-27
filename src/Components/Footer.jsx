import './style.css'
import logo from '../pic/Monogramme BMF doré aux lauriers.png'

export default function Footer () {
    return <footer>
        <div>
            <div className='footerLogo'>
                <img src={logo} />
            </div>
            <div className='footerNav'>
                <nav><a href="#">Home</a>
                <a href="#">Products</a>
                <a href="#">about</a></nav>
                
                <nav><a href="#">facebook</a>
                <a href="#">linkden</a>
                <a href="#">twitter</a></nav>
                
                <nav><a href="#">email</a>
                <a href="#">login</a>
                <a href="#">more</a></nav>
                
            </div>
        </div>
        <h2>copyright@2026 - All Rights Reserved</h2>
    </footer>
}