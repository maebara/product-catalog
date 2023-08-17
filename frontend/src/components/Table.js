import React from 'react';

class Table extends React.Component {

    render() {
        return (
            <table>
                <tr>
                    { this.props.isSelectOn ? <th></th> : <span></span> }
                    <th>Articulo</th>
                    <th>Marca</th>
                    <th>Descripcion</th>
                    <th>Unidades</th>
                    <th>Display</th>
                    <th>Bulto</th>
                    <th>Precio Unitario</th>
                </tr>
                {
                    this.props.filteredItems.map((item, i) =>
                        <tr>
                            { this.props.isSelectOn ? <td><input id={item._id} className={"checkbox-table"} type={"checkbox"}/></td> : <span></span> }
                            <td>{item.id}</td>
                            <td>{item.brand}</td>
                            <td>{item.description}</td>
                            <td>{item.units}</td>
                            <td>{item.display}</td>
                            <td>{item.bulk}</td>
                            <td>$ {item.price?.toString().replace(".", ",")}</td>
                        </tr>
                    )
                }
            </table>
        );
    }
}

export default Table;