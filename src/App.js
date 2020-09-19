import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";

import Login from './Components/Login'

function App() {
    return (
        <Router>
            <div>
                {/*<Link to="/register">Register </Link>*/}
                <Link to="/login">Login </Link>
            </div>
            <Switch>
                {/*<Route path='/register' component={Register}/>*/}
                <Route path='/login' component={Login}/>
            </Switch>
        </Router>
    )
}


export default App;
