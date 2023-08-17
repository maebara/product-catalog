import React, {Fragment} from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            links: ["listado", "carga", "editar"]
        }
    }

    render() {
        let {links} = this.state;
        return (
            <Fragment>
                <Header links={links}/>
                <Main/>
                <Footer/>
            </Fragment>
        )
    }
}

export default App;
