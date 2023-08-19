import React, { useState, useContext } from "react";
import userApis from "../Apis/userApis";
import authContext from "../context/authContext";
import { useNavigate } from "react-router-dom";



const Login = (props) => {



    let [logged, setLogged] = useState({
        username: "",
        password: ""
    })
    let [error, setError] = useState("")

    let { userData, setUserData } = useContext(authContext);

    const navigate = useNavigate();

    function handleLogin(event) {
        event.preventDefault();

        if (!logged.username && !logged.password) {
            return setError("Please fill the all the mandetory ")
        }
        console.log(logged)
        userApis.post('/auth/login', logged)
            .then((res) => {
                console.log(res.data)
                setUserData(res.data)
                navigate("/Profile")
            })
            .catch((err) => console.log(err))

    }

    return (
        <div>
            <div className="form">
                <div className="welcome-heads">
                    <span >Welcome back! 👋</span>
                </div>
                <h2 className="sign-account">Sign in to your account</h2>
                <div className="data">
                    <form className="form-input">
                        <div >
                            <label htmlFor="username">Username</label><br />
                            <input type="text" placeholder="username"
                                onChange={(e) => setLogged({ ...logged, username: e.target.value })}
                            />
                        </div><br />
                        <div>
                            <label htmlFor="password">password</label> <br />
                            <input type="password" placeholder="Password"
                                onChange={(e) => setLogged({ ...logged, password: e.target.value })}
                            />
                        </div>
                        <div>
                            <button className="btn" type="submit" onClick={handleLogin}>Continue</button>
                        </div>

                    </form>
                    <div className="forget">
                        <span style={{ color: "#625BF7" }}>Forgot Password</span>
                    </div>
                </div>
                {
                    error && <span className="error" >{error}</span>
                }
                {props.children}
            </div>


        </div>
    )
}

export default Login;