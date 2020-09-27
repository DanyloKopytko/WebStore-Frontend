import axios from 'axios';

const requester = async (method, url, data, ...rest) => {
    const accessToken = JSON.parse(sessionStorage.getItem('tokens')).accessToken

    const response = await axios({
        method,
        url,
        data,
        headers: {Authorization: accessToken}
    });

    if (response.data.message === 'jwt expired') {
        console.log('gotcha if');
        const tokens = await axios.post('http://localhost:3000/auth/refreshTokens', {},
            {
                headers:
                    {Authorization: JSON.parse(sessionStorage.getItem('tokens'))?.refreshToken}
            }
        );
        console.log(tokens);

        if (tokens.data.message === 'Bad token') {
            rest.signOut();
            return rest.history.push('/error');
        }

        const tokenPair = JSON.stringify({
            accessToken: tokens.data.accessToken,
            refreshToken: tokens.data.refreshToken
        });

        rest.staySigned ? localStorage.setItem('tokens', tokenPair) : sessionStorage.setItem('tokens', tokenPair);
        await requester(method, url, data, ...rest);
    }
    return response;
};

export default requester;