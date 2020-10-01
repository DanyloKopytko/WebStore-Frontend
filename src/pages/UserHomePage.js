import React from "react";
import { connect } from "react-redux";

const UserHomePage = ({userInfo}) => {
    return userInfo.name ? (
        <>
            <h1>Welcome back, {userInfo.name}</h1>
        </>
    ) : <></>
}

function mapStateToProps({userInfo}) {
    return {
        userInfo
    };
}

export default connect(mapStateToProps)(UserHomePage);