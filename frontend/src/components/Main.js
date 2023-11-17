import React from 'react';
import { Route, Routes } from "react-router-dom";
import List from "../pages/List";
import Edit from "../pages/Edit";
import Upload from "../pages/Upload";
import PrivateRoute from '../pages/PrivateRoute';
import Login from '../pages/Login';


class Main extends React.Component {

    render() {
        return (
            <main>
                <Routes>
                    <Route path="/" element={<List />} />
                    <Route path="/listado" element={<List />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/carga" element={<PrivateRoute><Upload /></PrivateRoute>} />
                    <Route path="/editar" element={<PrivateRoute><Edit /></PrivateRoute>} />
                </Routes>
            </main>
        );
    }
}
//<Route path="/editar" element={<Edit />} />
export default Main;