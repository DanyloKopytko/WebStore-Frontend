import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";

import requester from "../factories/requester";
import {signOut, signUpByToken} from "../actions/userFlow"

const UserHomePage = ({userInfo, signOut}) => {
    const history = useHistory;

    const [userInfoState, setUserInfoState] = useState(userInfo);

    useEffect(() => {
        !userInfoState.name && setUserInfoState(userInfo);
    });

    const handleDefaultChanges = async (e) => {
        e.preventDefault();

        const newData = await requester("patch", "http://localhost:3000/users/", {
            email: e.target.email.value,
            login: e.target.login.value,
            name: e.target.name.value,
            surname: e.target.surname.value,
        }, signOut, history);

        setUserInfoState(newData.data.user);
    };

    const handlePassChange = async (e) => {
        e.preventDefault();

        if (e.target.newPass.value !== e.target.newPassConfirm.value || e.target.oldPass.value === e.target.newPass.value) return alert('Password mismatch');

        const response = await requester("patch", "http://localhost:3000/users/changePass", {
            oldPass: e.target.oldPass.value,
            newPass: e.target.newPass.value
        }, signOut, history);

        return alert(response.data.message);
    };

    const handlePhotoChange = async (e) => {
        try {
            e.preventDefault();
            const bodyFormData = new FormData();
            bodyFormData.append('image', e.target.avatar.files['0']);
            bodyFormData.set('avatar_url', userInfo.avatar_url);

            await requester('patch', 'http://localhost:3000/users/photo', bodyFormData, signOut, history);

            setTimeout(async () => {
                const newData = await requester('post', 'http://localhost:3000/auth/getUserByAccessToken', {}, signOut, history)
                setUserInfoState(newData.data.user);
            }, 300);
        } catch (e) {
            console.log(e);
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        const response = await requester('post',
            'http://localhost:3000/users/sendVerifyEmail',
            {userEmail: userInfoState.email},
            signOut, history);
        return alert(response.data.message);
    }

    return userInfoState.name ? (
        <>
            <h1>Welcome back, {userInfoState.name}</h1>
            <img src={userInfoState.avatar_url} alt="AVATAR" width="75px" height="75px"/>
            <form onSubmit={(e) => handleDefaultChanges(e)}>
                <input name="email" type="e-mail" placeholder={userInfoState.email}/>
                <input name="login" type="text" placeholder={userInfoState.login}/>
                <input name="name" type="text" placeholder={userInfoState.name}/>
                <input name="surname" type="text" placeholder={userInfoState.surname}/>
                <button>Submit changes</button>
            </form>
            <form onSubmit={(e) => handlePassChange(e)}>
                <input name="oldPass" type="password" placeholder="Enter your old pass"/>
                <input name="newPass" type="password" placeholder="Enter your new pass"/>
                <input name="newPassConfirm" type="password" placeholder="Confirm your new pass"/>
                <button>Change pass</button>
            </form>
            <form onSubmit={(e) => handlePhotoChange(e)}>
                <input name="avatar" type="file"/>
                <button>Change avatar</button>
            </form>
            {userInfoState.verified ? <p>Your account is verified</p> :
                <button onClick={(e) => handleVerify(e)}>Verify E-mail</button>
            }
        </>
    ) : <></>
};

function mapStateToProps({userInfo}) {
    return {
        userInfo
    };
}

const mapDispatchToProps = {signOut, signUpByToken};

export default connect(mapStateToProps, mapDispatchToProps)(UserHomePage);