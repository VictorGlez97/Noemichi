import { useState } from "react";
import { useAuth } from "../components/Context";
import { useNavigate } from "react-router-dom";

import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

import NoemichiBakery from '../assets/img/noemichis.png';

const Login = () => {
    
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useAuth();

    const handleLogin = async (e) => {
        
        await login(username, password);

        const validation = login(username, password);

        if ( validation ) {
            navigate('/');
        }

    }

    return(
        <>
            <div className="flex align-items-center align-self-center justify-content-center align-content-center">

                <Card 
                    className="md:col-3 sm:col-4 mt-5"
                >
                    <div className='col-12 flex justify-content-center'>
                        <img src={NoemichiBakery} alt='Noemichis bakery' style={{ width: '8rem', height: '8rem', marginTop: '-2rem' }} />
                    </div>
                    <div className="">

                        <div className="p-field col-12">
                            <label htmlFor="name">Usuario</label>
                            <div>
                                <InputText 
                                    id="username" 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)}
                                    className='md:col-12 w-12 p-inputtext-sm' 
                                />
                            </div>
                        </div>

                        <div className="p-field col-12 mb-3">
                            <label htmlFor="name">Contraseña</label>
                            <div>
                                <Password 
                                    id="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='p-inputtext-sm w-full' 
                                    toggleMask
                                    feedback={false}
                                />
                            </div>
                        </div>

                        <div className="flex justify-content-end mr-2">
                            <Button 
                                label="Entrar" 
                                size="small"
                                onClick={handleLogin} 
                            />
                        </div>

                    </div>
                </Card>

            </div>
        </>
    )
}

export default Login;