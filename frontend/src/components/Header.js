import React from 'react';
import { Link, NavLink } from "react-router-dom"

class Header extends React.Component {

    render() {
        let { links } = this.props;
        return (
            <header>
                <NavLink to="/" exact>
                    <div className={"logo"}>
                        <img src="/images/logo-3.png" height={65} alt={"logo-icon"} />
                    </div>
                </NavLink>
                <ul id="menu" style={{ listStyleType: "none" }}>
                    {
                        links.map((link, i) =>
                            <li key={i} className="menu">
                                <NavLink to={`/${link.path}`}>{link.name}</NavLink>
                            </li>
                        )
                    }
                </ul>
            </header>
        );
    }
}

export default Header;