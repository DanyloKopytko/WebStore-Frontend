import axios from 'axios';

const requester = async (method, url, data, staySigned, history, signOut) => {
    const accessToken = JSON.parse(sessionStorage.getItem('tokens') || localStorage.getItem('tokens'))?.accessToken

    const response = await axios({
        method,
        url,
        data,
        headers: {Authorization: accessToken}
    });

    if (response.data.message === 'jwt expired') {
        const tokens = await axios.post('http://localhost:3000/auth/refreshTokens', {},
            {
                headers:
                    {Authorization: JSON.parse(sessionStorage.getItem('tokens'))?.refreshToken}
            }
        );

        if (tokens.data.message === 'Bad token') {
            signOut();
            return history.push('/error');
        }

        const tokenPair = JSON.stringify({
            accessToken: tokens.data.accessToken,
            refreshToken: tokens.data.refreshToken
        });

        staySigned ? localStorage.setItem('tokens', tokenPair) : sessionStorage.setItem('tokens', tokenPair);
        await requester(method, url, data, staySigned, history, signOut);
    }
    return response;
};

export default requester;