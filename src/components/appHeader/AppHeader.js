import { Link, NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import './appHeader.scss';

// Link - компонент который будет заменять ссылки и направлять при клике по пути "path"
// NavLink - компонент который будет заменять ссылки и направлять при клике по пути "path" только стилизованный (можно применять классы)

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink exact activeStyle={{color: '#9f0013'}} to="/">Characters</NavLink></li>
                    <li><NavLink exact activeStyle={{color: '#9f0013'}} to="/comics">Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;