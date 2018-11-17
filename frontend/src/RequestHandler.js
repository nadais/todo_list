import axios from 'axios';

export async function handleRequest( payload )
{
    let res = await axios.post('/api',
            {
                query: payload
            });
    return res.data;
}