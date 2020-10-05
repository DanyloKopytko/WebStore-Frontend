import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const RefreshPass = () => {
    const history = useHistory();

    const handleRefreshPass = async (e) => {
        e.preventDefault();

        if (e.target.newPass.value !== e.target.newPassConfirm.value) return alert('Password mismatch');

        const newPass = e.target.newPass.value;
        const refreshPass = history.location.pathname.split('/')[2]

        const response = await axios.post('http://localhost:3000/auth/refreshPass', {pass: newPass, refreshPass});

        alert(response.data.message);
        if(!response.data.error) history.push('/');
    }

    return (
        <>
            <form onSubmit={(e) => handleRefreshPass(e)}>
                <input name="newPass" type="password" placeholder="Enter your new password"/>
                <input name="newPassConfirm" type="password" placeholder="Confirm your password"/>
                <button>Submit</button>
            </form>
        </>
    );
}

export default RefreshPass;

