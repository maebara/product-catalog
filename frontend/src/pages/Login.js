import React from "react";
import UserRepository from "../components/UserRepository";
import "../login.css";
import { useNavigate } from "react-router-dom";
import sessionStorage from "../components/SessionStorage";

class Login extends React.Component {
    constructor() {
        super();
        this.userRepository = new UserRepository()
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
        const { navigation } = this.props;
        this.setState({ sending: true, createMessage: null })
        let { username, password } = e.target.elements

        console.log("sending..")
        console.log(username.value + " " + password.value)
        //enviar a server
        this.userRepository.getToken({ user: username.value, pass: password.value })
            .then(response => {
                this.setState({ sending: false, sendOk: true, createMessage: response.data })
                sessionStorage.setToken(response.data?.token)
                navigation("/")
            })
            .catch(error => {
                this.setState({ sending: false, sendOk: false, createMessage: error })
                console.log(error)
            })

    }

    render() {
        return (
            <div id="login-container">
                <form id="loginForm" onSubmit={this.handleSubmit}>
                    <label className="login-label" for="username">Usuario</label>
                    <input className="login-input" id="username" name="username" placeholder="Ingresa tu usuario" ></input>
                    <label className="login-label" for="password">Contraseña</label>
                    <input className="login-input" type="password" id="password" name="password" placeholder="Ingresa tu contraseña" ></input>

                    <button className="login-button" type={"submit"} disabled={this.state.sending}>Ingresar</button>
                </form>
                <br />
                {this.state.createMessage ?
                    this.state.sendOk ?
                        <div class={"message-content success-message"}>
                            <div class="icon">
                                <img src="/images/success-icon.svg" alt={"alert-icon"} />

                            </div>
                            <div class="body">
                                <h3>Login exitoso.</h3>
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
    const navigation = useNavigate();

    return <Login {...props} navigation={navigation} />
} 