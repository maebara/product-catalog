import React from 'react';
import {Link, NavLink} from "react-router-dom"

class Header extends React.Component {

    render() {
        let {links} = this.props;
        return (
            <header>
                <NavLink to="/" exact>
                    <h1>App Catalogo</h1>
                </NavLink>
                <ul id="menu" style={{listStyleType: "none"}}>
                    {
                        links.map((link, i) =>
                            <li key={i} className="menu">
                                <NavLink to={`/${link}`}>{link}</NavLink>
                            </li>
                        )
                    }
                </ul>
            </header>
        );
    }
}

export default Header;