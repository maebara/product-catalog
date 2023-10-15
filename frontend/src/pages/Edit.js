import React from "react";
import ItemRepository from "../components/ItemRepository";
import "../edit.css"
import { useLocation } from "react-router-dom";

class Edit extends React.Component {
    constructor() {
        super();
        this.itemRepository = new ItemRepository()
        this.state = {
            items: [],
            sending: false,
            sendOk: null,
            createMessage: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault()
        this.setState({ sending: true, createMessage: null })
        let items = this.state.items

        //enviar a server
        this.itemRepository.updateAll(items)
            .then(response => {
                this.setState({ sending: false, sendOk: true, createMessage: response.data })
            })
            .catch(error => {
                this.setState({ sending: false, sendOk: false, createMessage: error })
            })

    }

    handleChange(evt) {
        evt.preventDefault()
        let { position, name, type } = evt.target.attributes;
        let items = this.state.items

        if (type.value == "number") {
            items[position.value][name.value] = evt.target.valueAsNumber
        } else if (type.value == "text") {
            items[position.value][name.value] = evt.target.value
        }


        this.setState({ items: items })
    }
    componentDidMount() {
        const { location } = this.props;
        this.setState({ items: location?.state?.items })
    }

    render() {
        let { items } = this.state
        return (
            <div id="edit-containter">
                <h1>Editar Producto</h1>
                <br />

                {items ?
                    <form onSubmit={this.handleSubmit}>
                        {
                            items.map((item, i) =>
                                <div className="form-row">
                                    <div class={"edit-form-field"}>
                                        <label>Id:</label>
                                        <input type={"text"} name={`_id`} value={item?._id} />
                                    </div>
                                    <div class={"edit-form-field"}>
                                        <label>Cod. Articulo:</label>
                                        <input type={"number"} position={i} name={`articleCode`} placeholder="Articulo" value={item?.articleCode} onChange={this.handleChange} />
                                    </div>
                                    <div className={"edit-form-field"}>
                                        <label>Descripcion:</label>
                                        <input type={"text"} position={i} name={`description`} placeholder="Descripcion" value={item?.description} onChange={this.handleChange} />
                                    </div>
                                    <div className={"edit-form-field"}>
                                        <label>Marca:</label>
                                        <input type={"text"} position={i} name={`brand`} placeholder="Marca" value={item?.brand} onChange={this.handleChange} />
                                    </div>
                                    <div className={"edit-form-field"}>
                                        <label>Unidades:</label>
                                        <input type={"number"} position={i} name={`units`} placeholder="00" value={item?.units} onChange={this.handleChange} />
                                    </div>
                                    <div className={"edit-form-field"}>
                                        <label>Display:</label>
                                        <input type={"number"} position={i} name={`display`} placeholder="00" value={item?.display} onChange={this.handleChange} />
                                    </div>
                                    <div className={"edit-form-field"}>
                                        <label>Bulk:</label>
                                        <input type={"number"} position={i} name={`bulk`} placeholder="00" value={item?.bulk} onChange={this.handleChange} />
                                    </div>
                                    <div className={"edit-form-field"}>
                                        <label>Precio:</label>
                                        <input type={"number"} position={i} name={`price`} step={"0.001"} placeholder="$00.00" value={item?.price} onChange={this.handleChange} />
                                    </div>
                                </div>
                            )
                        }

                        <div className={"box-button"}>
                            <button type={"submit"} className={"edit-upload-button"} disabled={this.state.sending}>Guardar</button>
                        </div>
                    </form>
                    :
                    <p>
                        Seleccionar en el listado los productos a editar.
                    </p>
                }

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

export default function (props) {
    const location = useLocation();

    return <Edit {...props} location={location} />
} 