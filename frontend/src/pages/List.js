import React from "react";
import Table from "../components/Table";
import ItemRepository from "../components/ItemRepository";
import "../list.css"
import { useNavigate } from "react-router-dom";

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
        this.handleEdit = this.handleEdit.bind(this)
    }

    componentDidMount() {
        this.itemRepository.getItems()
            .then(response => this.setState({ items: response.data, filteredItems: response.data }))
            .catch(err => {
                //spinner y mostrar msj de error timeout en el listado
                console.log(err)
            })
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
        this.setState({ deleting: true })
        let checks = document.querySelectorAll(".checkbox-table");
        let checkeds = Array.from(checks).filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.id)


        if (!checkeds.length) {
            this.setState({ isSelectOn: !this.state.isSelectOn, deleting: false })
            return;
        }

        this.itemRepository.deleteAll({ ids: checkeds })
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
                this.setState({ deleting: false, deleteStatus: false, deleteMessage: error })
            })
    }

    handleEdit(evt) {
        evt.preventDefault()
        const { navigation } = this.props;
        this.setState({ deleting: true })
        let checks = document.querySelectorAll(".checkbox-table");
        let checkeds = Array.from(checks).filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.id)

        let items = this.getItems(checkeds)

        if (!items.length) {
            this.setState({ isSelectOn: !this.state.isSelectOn, deleting: false })
            return;
        }

        navigation("/editar", {
            state: {
                items
            }
        })
    }

    getItems(ids) {
        return this.state.items.filter(item => ids.includes(item._id))
    }

    handleSelect(evt) {
        evt.preventDefault()
        this.setState({ isSelectOn: !this.state.isSelectOn })
    }

    render() {

        return (
            <div id="main-container">
                <div>
                    * El buscador busca por marca y descripcion.
                </div>
                <div id="table-actions">
                    <div id="search">
                        <i className="fa-solid fa-magnifying-glass fa-lg"></i>
                        <input className={"search-box"} placeholder={"Buscar"} onInput={this.handleInput} />
                    </div>

                    <div id="actions">
                        <button className={"edit-button action-button"} onClick={this.handleEdit}
                            disabled={this.state.deleting} hidden={!this.state.isSelectOn}>Editar
                        </button>
                        <button className={"delete-button action-button"} onClick={this.handleDelete}
                            disabled={this.state.deleting} hidden={!this.state.isSelectOn}>Borrar
                        </button>
                        <button className={"select-button action-button"} onClick={this.handleSelect}>Seleccionar
                        </button>
                    </div>
                </div>
                <Table {...this.state} />
            </div>
        )
    }
}



export default function (props) {
    const navigation = useNavigate();

    return <List {...props} navigation={navigation} />
} 