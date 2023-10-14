import React from "react";
import ItemRepository from "../components/ItemRepository";
import "../upload.css";

class Upload extends React.Component {
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

    handleSubmit(e) {
        //block form
        e.preventDefault()
        this.setState({ sending: true, createMessage: null })

        let { articleCode, description, brand, units, display, bulk, price } = e.target.elements

        //validar datos
        let item = {
            "articleCode": articleCode.valueAsNumber,
            "description": description.value,
            "brand": brand.value,
            "units": units.valueAsNumber,
            "display": display.valueAsNumber,
            "bulk": bulk.valueAsNumber,
            "price": price.valueAsNumber
        }

        //enviar a server
        this.itemRepository.createItem(item)
            .then(response => {
                this.setState({ sending: false, sendOk: true, createMessage: response.data })
            })
            .catch(error => {
                this.setState({ sending: false, sendOk: false, createMessage: error })
            })
    }

    render() {
        return (
            <div id="upload-containter">
                <h1>Cargar Producto</h1>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <div className="form-fields">
                        <div class={"form-group"}>
                            <label>Cod. Articulo:</label>
                            <input type={"number"} name={"articleCode"} placeholder="Articulo" />
                        </div>
                        <div className={"form-group"}>
                            <label>Descripcion:</label>
                            <input type={"text"} name={"description"} placeholder="Descripcion" />
                        </div>
                        <div className={"form-group"}>
                            <label>Marca:</label>
                            <input type={"text"} name={"brand"} placeholder="Marca" />
                        </div>
                        <div className={"form-group"}>
                            <label>Unidades:</label>
                            <input type={"number"} name={"units"} placeholder="00" />
                        </div>
                        <div className={"form-group"}>
                            <label>Display:</label>
                            <input type={"number"} name={"display"} placeholder="00" />
                        </div>
                        <div className={"form-group"}>
                            <label>Bulk:</label>
                            <input type={"number"} name={"bulk"} placeholder="00" />
                        </div>
                        <div className={"form-group"}>
                            <label>Precio:</label>
                            <input type={"number"} name={"price"} step={"0.001"} placeholder="$00.00" />
                        </div>
                    </div>
                    <button type={"submit"} className={"upload-button"} disabled={this.state.sending}>Cargar</button>
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

export default Upload;