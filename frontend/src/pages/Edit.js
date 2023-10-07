import React from "react";
import ItemRepository from "../components/ItemRepository";
import "../edit.css" 

class Edit extends React.Component {

    constructor() {
        super();
        this.itemRepository = new ItemRepository()
        this.state = {
            sending: false,
            sendOk: null,
            createMessage: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(){

    }

    render() {

        let {product} = this.props;    

        return (
            <div id="edit-containter">
                <h1>Editar Producto</h1>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <div class={"form-field"}>
                            <label>Articulo:</label>
                            <input type={"text"} name={"article"} placeholder="Articulo" value={product?.article} />
                        </div>
                        <div className={"form-field"}>
                            <label>Descripcion:</label>
                            <input type={"text"} name={"description"} placeholder="Descripcion" />
                        </div>
                        <div className={"form-field"}>
                            <label>Marca:</label>
                            <input type={"text"} name={"brand"} placeholder="Marca" />
                        </div>
                        <div className={"form-field"}>
                            <label>Unidades:</label>
                            <input type={"number"} name={"units"} placeholder="00" />
                        </div>
                        <div className={"form-field"}>
                            <label>Display:</label>
                            <input type={"number"} name={"display"} placeholder="00" />
                        </div>
                        <div className={"form-field"}>
                            <label>Bulk:</label>
                            <input type={"number"} name={"bulk"} placeholder="00" />
                        </div>
                        <div className={"form-field"}>
                            <label>Precio:</label>
                            <input type={"number"} name={"price"} step={"0.001"} placeholder="$00.00" />
                        </div>
                    </div>
                    <button type={"submit"} className={"upload-button"} disabled={this.state.sending}>Guardar</button>
                </form>

                <br />
                {this.state.createMessage ?
                    this.state.sendOk ?
                        <div class={"message-content success-message"}>
                            <div class="icon">
                                <img src="/images/success-icon.svg" alt={"alert-icon"} />

                            </div>
                            <div class="body">
                                <h3>Articulo Cargado</h3>
                                <p>Carga exitosa</p>
                            </div>
                        </div>
                        :
                        <div class={"message-content error-message"}>
                            <div class="icon">
                                <img src="/images/error-icon.svg" alt={"alert-icon"} />

                            </div>
                            <div class="body">
                                <h3>Error al Cargar</h3>
                                <p>Hubo un error al realizar la carga: {JSON.stringify(this.state.createMessage)} </p>
                            </div>
                        </div>
                    :
                    <span></span>
                }
            </div>
        )
    }


}


export default Edit;