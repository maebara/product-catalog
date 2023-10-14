import React from 'react';
import { Route, Routes } from "react-router-dom";
import List from "../pages/List";
import Edit from "../pages/Edit";
import Upload from "../pages/Upload";


class Main extends React.Component {

    render() {
        return (
            <main>
                <Routes>
                    <Route path="/" element={<List />} />
                    <Route path="/carga" element={<Upload />} />
                    <Route path="/listado" element={<List />} />
                    <Route path="/editar" element={<Edit />} />
                </Routes>
            </main>
        );
    }
}

export default Main;