import React from "react";
import {connect} from "react-redux";
import {useHistory} from 'react-router-dom';

import {signOut} from "../actions/userFlow";
import requester from "../factories/requester";

const VerifyEmail = ({signOut}) => {
    const history = useHistory();

    const mailToken = history.location.pathname.split('/')[2];

    const response = requester('post', 'http://localhost:3000/users/verifyEmail', {mailToken}, signOut, history);

    if(response.data?.error) history.push('/error')

    return (
        <>
        <h1>Thank you for verifying</h1>
        </>
    )
};

const mapDispatchToProps = {signOut};

export default connect(null, mapDispatchToProps)(VerifyEmail);