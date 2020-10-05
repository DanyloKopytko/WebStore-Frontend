import React from "react";
import axios from "axios";

const SendRefreshPass = () => {
    const handleSendRefreshPass = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3000/auth/sendRefreshPass', {userEmail: e.target.userEmail.value});
    }

    return (
        <>
            <form onSubmit={(e) => handleSendRefreshPass(e)}>
                <input name="userEmail" type="email" placeholder="Enter your e-mail"/>
                <button>Send e-mail</button>
            </form>
        </>
    );
}

export default SendRefreshPass;