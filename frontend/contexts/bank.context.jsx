import React from 'react';
import { api } from '../util/auth';
import { useAuthentication } from './auth.context';

const BankContext = React.createContext({});

export function useBank() {
    const context = React.useContext(BankContext);
    if (!context) return console.warn('useBank can only be used inside bank provider');

    return context;
};

export default function ({ children }) {
    const { user } = useAuthentication();

    const [data, setData] = React.useState([]);
    const [bank, setBank] = React.useState(null);
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(null);

    React.useEffect(() => {
        // if user is logged in and data is empty fet user's banks
        // if (user && !bank)get();
    }, [user]);

    const get = async (callback, fallback) => {
        console.log("getting user's card");
        setLoading(true); setError(false);
        try {
            let res = await api.get('savedBank');
            console.log(res.data?.bank);
            setBank(res.data?.bank ?? null);
            callback?.(res.data);
        } catch (err) {
            console.error(err);
            setError(err.message);
            fallback?.(err.message);
        }
        setLoading(false);
    };

    const all = async (callback, fallback) => {
        setLoading(true); setError(false);
        try {
            let res = await api.get('listBank');
            console.log('all', res.data);
            setData(res.data?.bank ?? []);
            callback?.(res.data);
        } catch (err) {
            fallback?.(err);
        }
        setLoading(false);
    };

    const verify = async (data, callback, fallback) => {
        setLoading(true); setError(false);
        try {
            let res = await api.get(`addBank?AccountNumber=${data.AccountNumber}&bankName=${data.BankName}`);
            if (typeof res.data === 'string') throw new Error(res.data);
            console.log(res.data?.data);

            setBank(res.data?.data);
            callback?.(res.data?.data);
        } catch (err) {
            fallback?.(err);
        }
        setLoading(false);
    };

    const create = async (data, callback, fallback) => {
        setLoading(true); setError(false);
        try {
            let res = await api.post("saveBank", data);
            if (typeof res.data === 'string') throw new Error(res.data);

            setBank(res.data?.data);
            callback?.(res.data?.data);
        } catch (err) {
            fallback?.(err);
        }
        setLoading(false);
    };

    const update = async (data, callback, fallback) => {
        setLoading(true); setError(false);
        try {
            callback?.();
        } catch (err) {
            fallback?.(err);
        }
        setLoading(false);
    };

    const remove = async (callback, fallback) => {
        setLoading(true); setError(false);
        try {
            let res = await api.delete('deleteBank');
            if (typeof res.data?.status !== 'success') throw new Error(res.data);
            console.log(res.data);
            // await new Promise(res => setTimeout(res, 2000));
            setBank(() => null);
            callback?.();
        } catch (err) {
            fallback?.(err);
        }
        setLoading(false);
    };


    return <BankContext.Provider value={{ all, get, bank, create, verify, update, remove, data, error, loading }}>{children}</BankContext.Provider>;
};
