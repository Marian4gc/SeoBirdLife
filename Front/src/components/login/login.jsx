import React, { useState } from 'react';
import axios from '../../api/axios';
import './login.css';
import Logo from '../images/logoAventurero.png';
import GolondrinaR from '../images/golondrinaLeft.svg';
import GolondrinaL from '../images/golondrinaRight.svg';
import Swal from 'sweetalert2';

const LOGIN_URL = '/api/login_check';
import jwtDecode from 'jwt-decode';

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({username: username, password: password}),
                    {
                        headers:{'content-Type' : 'application/json'},
                        withCredentials: true
                    }
            )

            const accessToken = response.data.token;
            const token = { accessToken: accessToken };
            console.log(accessToken);
            
            const storedToken = window.localStorage.setItem(
                'loggedAppUser', accessToken
            );

            console.log(storedToken)

            const auth_username = { username: username }
            const stored_username = window.localStorage.setItem(
                'name', JSON.stringify(auth_username)
            );
            console.log(stored_username)

            const decoded_token = jwtDecode(accessToken)
            console.log(decoded_token);

            const decoded_role = decoded_token.roles
            console.log(decoded_role[1])

           // const userRole = { role: decoded_role }
            const stored_roles = window.localStorage.setItem(
                'role', decoded_role
            )

            setUsername(username)
            setPassword('')
            setSuccess(true)

            console.log('¡Estás logead@!')

        }catch {
            console.log('No funciona')
            Swal.fire({
                icon: 'error',
                title: 'Algo ha fallado...',
                text: 'Comprueba si está bien escrito tu usuario y contraseña',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = '/login';
            });
        }
    }

    return (
        <div className='d-flex container justify-content-center'>
            <div className=''>
                <header className='d-flex justify-content-center'>

                    <img src={GolondrinaL} id="bird1" />
                    <img src={Logo} />
                    <img src={GolondrinaR} id="bird2" />
                </header>
                {success ? (
                    <div className='success d-flex container justify-content-center mt-7'>
                        <div className="d-flex flex-column align-items-center">
                            <h1 id='welcome-message'>¡Bienvenid@, {username}!</h1>
                            <a href='/map' className='mt-5 btn-login btnAzul'>Comienza tu aventura</a>

                            <a href='/userlist' className='greenbtn mt-3'>¡Hola admin!</a>
                        </div>
                    </div>

                ) : (
                    <div id='secLogin' className='d-flex container justify-content-center mt-5'>
                        <h1>Inicio de sesión</h1>
                        <div className='box-fichaje'>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor='username' className="form-label">Usuario</label>
                                <input
                                    type='text'
                                    id='username'
                                    autoComplete='off'
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                    required
                                    className='form-control'
                                />

                                <label htmlFor='password' className="form-label mt-3">Contraseña</label>
                                <input
                                    type='password'
                                    id='password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                    className='form-control'
                                />
                                <div className='d-flex container justify-content-center'>
                                    <button className='mt-5 btnAzul'>Entrar</button>
                                </div>
                            </form>


                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Login;