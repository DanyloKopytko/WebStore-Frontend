import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';
import {connect} from 'react-redux';

import Login from './components/Login';
import Register from './components/Register';
import {signUpByToken} from './actions/userFlow';

function App({signUpByToken, name, id, role}) {

    useEffect(() => {
        async function fetchData() {
            await signUpByToken();
        }

        JSON.parse(localStorage.getItem('tokens') || sessionStorage.getItem('tokens'))?.accessToken &&
        fetchData();
    }, []);

    const showLogin = () => {
        return (
            <>
                <Login/>
                <button onClick={() => setAuthStatus(false)}>I don't have an account</button>
            </>
        );
    };

    const showRegister = () => {
        return (
            <>
                <Register/>
                <button onClick={() => setAuthStatus(true)}>Already have an account?</button>
            </>
        );
    };

    const changeMenuStatus = () => {
        return setMenuStatus(prevMenuStatus => !prevMenuStatus);
    };

    const [authStatus, setAuthStatus] = useState(false);
    const [menuStatus, setMenuStatus] = useState(false);

    return (
        <>
            <button onClick={() => changeMenuStatus()}>
                Menu
            </button>
            {menuStatus && (authStatus ? showLogin() : showRegister())}
            <Router>
                <Switch>
                </Switch>
            </Router>

        </>
    );
}

function mapStateToProps({userInfo}) {
    return {
        name: userInfo.name,
        id: userInfo.id,
        role: userInfo.role
    };
}

const mapDispatchToProps = {signUpByToken};

export default connect(mapStateToProps, mapDispatchToProps)(App);
