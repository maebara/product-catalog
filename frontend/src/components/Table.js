import React from 'react';

class Table extends React.Component {

    render() {
        return (
            <table>
                <tr className='header-table'>
                    {this.props.isSelectOn ? <th></th> : <span></span>}
                    <th className='article-column'>Cod. Articulo</th>
                    <th>Marca</th>
                    <th>Descripcion</th>
                    <th className='units-column' >Unidades</th>
                    <th className='display-column'>Display</th>
                    <th className='bulk-column'>Bulto</th>
                    <th className='price-column'>Precio Unitario</th>
                </tr>
                {
                    this.props.filteredItems.map((item, i) =>
                        <tr>
                            {this.props.isSelectOn ?
                                <td className='checkbox-column'>
                                    <div className={"line"}>
                                        <input id={item._id} className={"checkbox-table"} type={"checkbox"} />
                                    </div>
                                </td>
                                :
                                <span></span>
                            }
                            <td className='article-column'>{item.articleCode}</td>
                            <td>{item.brand}</td>
                            <td>{item.description}</td>
                            <td className='units-column'>{item.units}</td>
                            <td className='display-column'>{item.display}</td>
                            <td className='bulk-column'>{item.bulk}</td>
                            <td className='price-column'>$ {item.price?.toString().replace(".", ",")}</td>
                        </tr>
                    )
                }
            </table>
        );
    }
}

export default Table;