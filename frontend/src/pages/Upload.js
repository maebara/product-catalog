import React from "react";
import ItemRepository from "../components/ItemRepository";
import "../upload.css";

class Upload extends React.Component {
    constructor() {
        super();
        this.itemRepository = new ItemRepository()
        this.state = {
            sending: false,
            createStatus: null,
            createMessage: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        //block form
        e.preventDefault()
        this.setState({sending: true})

        let {article, description, brand, units, display, bulk, price} = e.target.elements

        //validar datos
        let item = {
            "id": 123,
            "article": article.value,
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
                this.setState({sending: false, createStatus: true, createMessage: response.data})
            })
            .catch(error => {
                this.setState({sending: false, createStatus: false, createMessage: error})
            })
    }

    render() {
        return (
            <div id="upload-containter">
                <h1>Cargar Producto</h1>
                <form onSubmit={this.handleSubmit}>
                    <div class={"form-group"}>
                        <label>Articulo:</label>
                        <input type={"text"} name={"article"}/>
                    </div>
                    <div className={"form-group"}>
                        <label>Description:</label>
                        <input type={"text"} name={"description"}/>
                    </div>
                    <div className={"form-group"}>
                        <label>Marca:</label>
                        <input type={"text"} name={"brand"}/>
                    </div>
                    <div className={"form-group"}>
                        <label>Unidades:</label>
                        <input type={"number"} name={"units"}/>
                    </div>
                    <div className={"form-group"}>
                        <label>Display:</label>
                        <input type={"number"} name={"display"}/>
                    </div>
                    <div className={"form-group"}>
                        <label>Bulk:</label>
                        <input type={"number"} name={"bulk"}/>
                    </div>
                    <div className={"form-group"}>
                        <label>Precio:</label>
                        <input type={"number"} name={"price"} step={"0.001"}/>
                    </div>
                    <button type={"submit"} className={"upload-button"} disabled={this.state.sending}>Cargar</button>
                </form>

                <br/>
                <div class={"form-group"}>
                    Response Status: {this.state.createStatus?.toString()}
                    <br/>
                    Response Message: {JSON.stringify(this.state.createMessage)}
                </div>
            </div>
        )
    }

}

export default Upload;