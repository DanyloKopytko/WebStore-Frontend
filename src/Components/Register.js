import React, {useState} from "react";
import { useHistory } from "react-router-dom";

import post from "../Utils/post";

const Register = () => {
    const history = useHistory();

    const handleRegister = async (e) => {
        try{
            e.preventDefault();

            if (e.target.pass.value !== e.target.passCheck.value) return alert('Password mismatch')

            const bodyFormData = new FormData();

            console.log(e.target.name.value)
            console.log(e.target.avatar.files['0']);

            bodyFormData.set('name', `${e.target.name.value}`);
            bodyFormData.set('surname', `${e.target.surname.value}`);
            bodyFormData.set('login', `${e.target.login.value}`);
            bodyFormData.set('pass', `${e.target.pass.value}`);
            bodyFormData.set('email', `${e.target.mail.value}`);
            bodyFormData.set('phone_number', `${e.target.phone_number.value}`);
            e.target.avatar.files['0'] && bodyFormData.append('avatar', e.target.avatar.files['0']);

            const res = await post('http://localhost:3000/auth/register', bodyFormData, {headers: {'Content-Type': 'multipart/form-data'}})

            if(res.data?.error) {
                return alert(res.data.message);
            } else {
                alert('Registration successful');
                return history.push('/login');
            }
        } catch (e) {
            return alert(`${e.message}`);
        }
    }

    return (
        <>
            <form onSubmit={(e) => handleRegister(e)}>
                <input type="text" name="name" placeholder="Name"/>
                <input type="text" name="surname" placeholder="Surname"/>
                <input type="text" name="mail" placeholder="E-mail"/>
                <input type="text" name="login" placeholder="Login"/>
                <input type="tel"  name="phone_number" placeholder="Phone number" pattern="\(?\+[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})?"/>
                <input type="password" name="pass" placeholder="Password"/>
                <input type="password" name="passCheck" placeholder="Confirm password"/>
                <input type="file" name="avatar"/>
                <button>Register</button>
            </form>
        </>
    )
}

export default Register;