import { Link, NavLink } from "react-router-dom";
import './appHeader.scss';

// Link - компонент который будет заменять ссылки и направлять при клике по пути "path"
// NavLink - компонент который будет заменять ссылки и направлять при клике по пути "path" только стилизованный (можно применять классы)

// exact - заменён на end
// activStyle - удалён. (теперь стили нужно передовать функцию в виде колбэка)

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
                    <li><NavLink 
                            end 
                            style={({isActive}) => ({color: isActive ? '#9f0013' : 'inherit'})} 
                            to="/">Characters</NavLink></li>
                    <li><NavLink 
                            end 
                            style={({isActive}) => ({color: isActive ? '#9f0013' : 'inherit'})} 
                            to="/comics">Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;