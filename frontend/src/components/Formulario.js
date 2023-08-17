import React, {Fragment} from 'react';

class Formulario extends React.Component{

    constructor(){
        super();
        this.state = {
            mostrar: false
        }
        this.handleMostrar = this.handleMostrar.bind(this);
    }

    handleMostrar(){
        this.setState({mostrar: !this.state.mostrar})
    }

    render(){
        return (
            <Fragment>{this.state.mostrar?
                <form>
                    <div>
                        <input type="text" placeholder="Nombre"/>
                    </div>
                    <div>
                        <input type="text" placeholder="Apellido"/>
                    </div>
                    <button>Agregar</button>
                </form>: null}
                <button onClick = {this.handleMostrar}>Mostrar</button>
            </Fragment>
        )
    }
}

export default Formulario;