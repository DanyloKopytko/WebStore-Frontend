import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route
} from 'react-router-dom';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';

import PrivateRouter from "./components/PrivateRouter";
import Login from './components/Login';
import Register from './components/Register';

import VerifyEmail from './pages/VerifyEmail';
import UserHomePage from './pages/UserHomePage';
import ErrorPage from './pages/ErrorPage';
import SendRefreshPass from "./pages/SendRefreshPass";
import RefreshPass from "./pages/RefreshPass";

import {signUpByToken, signOut} from './actions/userFlow';


function App({signUpByToken, signOut, userInfo}) {
    const history = useHistory();

    const [authStatus, setAuthStatus] = useState(false);
    const [menuStatus, setMenuStatus] = useState(false);

    useEffect(() => {
        async function fetchData() {
            await signUpByToken(history, signOut);
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

    return (
        <>
            <button onClick={() => changeMenuStatus()}>
                Menu
            </button>
            {menuStatus && (authStatus ? showLogin() : showRegister())}
            <Router>
                <Link to='/userPage'>{userInfo.name}</Link>
                <Switch>
                    <PrivateRouter path='/userPage' component={UserHomePage}/>
                    <Route path='/error' component={ErrorPage}/>
                    <Route path='/verifyEmail/:mailToken' component={VerifyEmail}/>
                    <Route path={'/sendRefreshPass'} component={SendRefreshPass}/>
                    <Route path={'/refreshPass/:refreshPass'} component={RefreshPass}/>
                </Switch>
            </Router>

        </>
    );
}

function mapStateToProps({userInfo}) {
    return {userInfo};
}

const mapDispatchToProps = {signUpByToken, signOut};

export default connect(mapStateToProps, mapDispatchToProps)(App);
