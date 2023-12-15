import React from 'react';
import { api } from '../util/auth';

const RateContext = React.createContext({});

export function useRate() {
    const context = React.useContext(RateContext);
    if (!context) return console.warn('useRate can only be used inside rate provider');

    return context;
};

export default function ({ children }) {
    const [data, setData] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(null);

    const get = (id) => data.find(item => item.id === id);

    const all = async (callback, fallback) => {
        setLoading(true); setError(false);
        try {
            let res = await api.get('listAlart');
            setData(res.data?.rateList ?? []);
            callback?.(res.data);
        } catch (err) {
            setError(err.message);
            console.error(err);
            fallback?.(err);
        }
        setLoading(false);
    };

    const create = async (data, callback, fallback) => {
        setLoading(true); setError(false);
        try {
            callback?.();
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

    const remove = async (id, callback, fallback) => {
        setLoading(true); setError(false);
        try {
            let res = await api.delete(`deleteAlart?id=${id}`);
            console.log(res.data);
            if (res.data?.status !== 'success') throw new Error("Failed to delete rate");
            setData(prev => prev.filter(item => item._id !== id));
            callback?.(res.data);
        } catch (err) {
            setError(err.message);
            fallback?.(err);
        }
        setLoading(false);
    };


    return <RateContext.Provider value={{ all, get, create, update, remove, data, error, loading }}>{children}</RateContext.Provider>;
};
