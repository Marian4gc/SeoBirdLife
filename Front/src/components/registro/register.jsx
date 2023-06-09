import React, { useState } from 'react'
import axios from '../../api/axios'
import Logo from '../images/logoAventurero.png';
import GolondrinaR from '../images/golondrinaLeft.svg';
import GolondrinaL from '../images/golondrinaRight.svg';
import './register.css';
import Swal from 'sweetalert2';


const REGISTRATION_URL = '/api/register'

function Register() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(REGISTRATION_URL, {
                username: username,
                password: password
            },
                {
                    headers: { 'Content-Type': 'application/json' }
                })

            console.log(response.data)
            setSuccess(true)
        } catch {
            console.log('No funciona')
            // alert('Este usuario ya está registrado, por favor, elige otro')
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Este nombre de usuario ya está registrado, por favor, elige otro',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = '/register';
            });
        }
    }

    return (

        <div className='d-flex container justify-content-center'>
            <div >
                <header className='d-flex justify-content-center' >
                    <img src={GolondrinaL} id="bird1" />
                    <img src={Logo} />
                    <img src={GolondrinaR} id="bird2" />
                </header>
                {success ? (
                    <div className='success d-flex container justify-content-center mt-7'>
                        <div className="d-flex flex-column align-items-center">
                            <h2>¡Registro completado!</h2>
                            <a href='/login' className='mt-5 btn-login btnAzul'>Ve al inicio de sesión</a>
                        </div>
                    </div>
                ) : (
                    <div id='secRegister' className='d-flex container justify-content-center mt-7' >
                        <h1>Registro de usuario</h1>
                        <div className='box-registration'>
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
                                    minLength={3}
                                />

                                <label htmlFor='password' className="form-label mt-3">Contraseña</label>
                                <input
                                    type='password'
                                    id='password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                    className='form-control'
                                    minLength={6}
                                />
                                <div>
                                    <p className='avisoDatos'>Protección de datos personales. <br/>
                                        Utilizaremos sus datos para gestionar la inscripción como aventurero, y realizar análisis estadísticos. </p>
                                    <input type={'checkbox'} required /> Acepto el tratamiento de datos para gestionar la inscripción como aventurero.
                                </div>


                                <div className='d-flex container justify-content-center'>
                                    <button className='mt-5 btnAzul'>Registrarse</button>
                                </div>
                            </form>
                            <p className='text-center'>Si ya estás registrado pasa a:</p>
                            <div className='d-flex container justify-content-center'>
                                <a href="/login" className='btnAzul'>Iniciar sesión</a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Register