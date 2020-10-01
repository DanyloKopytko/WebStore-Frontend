import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route
} from 'react-router-dom';
import {connect} from 'react-redux';
import { useHistory } from 'react-router-dom'

import UserHomePage from './pages/UserHomePage'
import PrivateRouter from "./components/PrivateRouter";
import Login from './components/Login';
import Register from './components/Register';
import {signUpByToken} from './actions/userFlow';
import ErrorPage from "./pages/ErrorPage";


function App({signUpByToken, staySigned}) {
    const history = useHistory();
    useEffect(() => {
        async function fetchData() {

            await signUpByToken(history, staySigned);
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
                <Link to='/userPage'>Cabinet</Link>
                <Switch>
                    <PrivateRouter path='/userPage' component={UserHomePage}/>
                    <Route path='/error' component={ErrorPage}/>
                </Switch>
            </Router>

        </>
    );
}

function mapStateToProps({userInfo}) {
    return {
        name: userInfo.name,
        id: userInfo.id,
        role: userInfo.role,
        staySigned: userInfo.staySigned
    };
}

const mapDispatchToProps = {signUpByToken};

export default connect(mapStateToProps, mapDispatchToProps)(App);
