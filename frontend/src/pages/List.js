import React from "react";
import Table from "../components/Table";
import ItemRepository from "../components/ItemRepository";

class List extends React.Component {

    constructor() {
        super();
        this.itemRepository = new ItemRepository()
        this.state = {
            searchText: "",
            filteredItems: [],
            items: [],
            isSelectOn: false,
            deleting: false,
            deleteStatus: null,
            deleteMessage: null
        }
        this.handleInput = this.handleInput.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
    }

    componentDidMount() {
        this.itemRepository.getItems()
            .then(response => this.setState({items: response.data, filteredItems: response.data}))
    }

    handleInput(event) {
        let searchTarget = event.target.value.toLowerCase()

        this.setState({
            filteredItems:
                this.state.items.filter(item =>
                    item.description.toLowerCase().includes(searchTarget) ||
                    item.brand.toLowerCase().includes(searchTarget)
                )
        })
    }

    handleDelete(evt) {
        evt.preventDefault()
        this.setState({deleting: true})
        let checks = document.querySelectorAll(".checkbox-table");
        let checkeds = Array.from(checks).filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.id)

        this.itemRepository.deleteAll({ids: checkeds})
            .then(response => {
                this.setState({
                    deleting: false,
                    deleteStatus: true,
                    deleteMessage: response.data,
                    isSelectOn: false,
                    items: this.state.items.filter(item => !checkeds.includes(item._id)),
                    filteredItems: this.state.filteredItems.filter(item => !checkeds.includes(item._id)),
                })
            })
            .catch(error => {
                this.setState({deleting: false, deleteStatus: false, deleteMessage: error})
            })
    }

    handleSelect(evt) {
        evt.preventDefault()
        this.setState({isSelectOn: !this.state.isSelectOn})
    }

    render() {
        return (
            <div id="main-container">
                <div>
                    * El buscador busca por marca y descripcion.
                </div>
                <div id="search">
                    <label>Buscador: </label>
                    <input onInput={this.handleInput}/>
                    <button onClick={this.handleSelect}>Seleccionar</button>
                    <button>Editar</button>
                    <button onClick={this.handleDelete} disabled={this.state.deleting}>Borrar</button>
                </div>
                <Table {...this.state}/>
            </div>
        )
    }
}


export default List;