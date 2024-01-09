import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useAxios = <T>(
    config: AxiosRequestConfig<any>,
    loadOnStart: boolean = true,
    queryArrays?: any[]
): [boolean, T | undefined, string, () => void] => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<T>();
    const [error, setError] = useState('');
    const location = useLocation();

    useEffect(() => {

        if (loadOnStart) {
            sendRequest();
        }
        else if (queryArrays?.find(query => query === location.pathname)) {
            sendRequest();
        } else
            setLoading(false);

    }, [location.pathname, ...(queryArrays || [])]);

    const request = () => {
        sendRequest();
    };

    const sendRequest = async () => {
        setLoading(true);

        await axios(config)
            .then((response) => {
                setError('');
                setData(response.data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setLoading(false));
    };

    return [loading, data, error, request];
};
