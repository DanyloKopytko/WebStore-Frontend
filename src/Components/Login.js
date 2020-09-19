import React from "react";
import { connect } from "react-redux";
import post from "../Utils/post";

import {signUp} from "../Actions/userFlow";

const Login = ({signUp}) => {
    const handleLogin  = async (e) => {
        try {
            e.persist();
            e.preventDefault();
            const res = await post('http://localhost:3000/auth/login', {
                loginOrEmail: e.target.login.value,
                pass: e.target.pass.value
            })
            console.log(res)
            console.log(e.target.staySigned.checked);
            res.data?.error ? alert(res.data.message) : await signUp(res.data, e.target.staySigned.checked);
        } catch (e) {
            alert(e.message)
        }
    }

    return (
        <>
            <form onSubmit={(e) => handleLogin(e)}>
                <input type="text" name="login" placeholder="Enter your login or e-mail"/>
                <input type="password" name="pass" placeholder="Enter your password"/>
                <input type="checkbox" name="staySigned" onChange={event => console.log(event.target.value)}/>
                <button>Login</button>
            </form>
        </>
    )
}

const mapDispatchToProps = {signUp}

export default connect(null, mapDispatchToProps)(Login);