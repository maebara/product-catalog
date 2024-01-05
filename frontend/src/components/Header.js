import React from 'react';
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom";
class Header extends React.Component {
    constructor() {
        super();
        this.handleGoTo = this.handleGoTo.bind(this)
    }

    handleGoTo(value) {
        const { navigation } = this.props;
        navigation(value)
    }

    render() {
        let { links } = this.props;


        return (
            <header >
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

                <select id="menu-bar" onChange={e => this.handleGoTo(e.target.value)} >
                    {
                        links.map((link, i) =>
                            <option data-limit='100' key={i} className="menu-option" value={`/${link.path}`} >
                                {link.name}
                            </option>
                        )
                    }
                </select>
            </header>
        );
    }
}

export default function (props) {
    const navigation = useNavigate();

    return <Header {...props} navigation={navigation} />
} 