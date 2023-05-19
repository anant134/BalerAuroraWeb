import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './loginStyle.css';
import { ToastContainer, toast } from 'react-toastify';
import dataservice from '../../service/dataservice';
const Login = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        email: "",
        password: ""
    });






    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const Vaildation = () => {

        if (state.email.length == 0) {
            toast.error("Please enter email id", {
                position: toast.POSITION.TOP_CENTER
            });
            return false;
        } else if (state.password.length == 0) {
            toast.error("Please enter password", {
                position: toast.POSITION.TOP_CENTER
            });
            return false;
        }
        // if (state.email.length != 0) {
        //     const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        //     if (regex.test(state.email.emailid) === false) {
        //         toast.error("Invaild Email id", {
        //             position: toast.POSITION.TOP_CENTER
        //         });
        //         return false;
        //     }
        // }

        return true

    }
    const Signin = () => {
        if (Vaildation()) {
            // toast.success("Wow so easy!", {
            //     position: toast.POSITION.TOP_CENTER
            // });
            dataservice("user", {
                requestfor: 'userauth', data: {
                    flag: 'auth',
                    password: state.password, username: state.email
                }
            })
                .then(function (data) {
                    if (data.resultkey == 1) {
                        var result = data.resultvalue[0];
                        toast.error(`Welcome ${result.username}!`, {
                            position: toast.POSITION.TOP_CENTER
                        });
                        // notify(1, `Welcome ${result.username}!`);
                        // localStorage.setItem('userinfo', JSON.stringify(result));

                        // Menu(result.id);
                        // history.push('/dashboard');

                    } else {
                        //notify(2, "Invaild username/password");
                        toast.error("Invaild username/password", {
                            position: toast.POSITION.TOP_CENTER
                        });
                    }

                }).catch(function (edata) {

                    toast.error(edata.toString(), {
                        position: toast.POSITION.TOP_CENTER
                    });
                });
        }


    }
    return (
        <>
            <div className='wrapper'>
                <div className='container main'>
                    <div className='row'>
                        <div className='col-md-6 side-image'>

                        </div>
                        <div className='col-md-6 right'>
                            <div className='input-box'>
                                <h1 onClick={() => { navigate("/") }}>Barle Aurora</h1>
                                <header>Sign In</header>
                                <div className='input-field'>
                                    <input onChange={handleChange} type={"text"} className='input' id={'email'} required autoComplete='false' />
                                    <label htmlFor='email'>Email</label>
                                </div>
                                <div className='input-field'>
                                    <input type={"password"} onChange={handleChange} className='input' id={'password'} required autoComplete='false' />
                                    <label htmlFor='email'>Password</label>
                                </div>
                                <div className='input-field'>
                                    <input type={"submit"} onClick={Signin} className="submit" value={"Sign in"} />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>);
}

export default Login;