import React from 'react';
import { api } from '../util/auth';
import { useNavigation } from '@react-navigation/native';
import store from '@react-native-async-storage/async-storage';

const AuthContext = React.createContext({});

export function useAuthentication() {
    const context = React.useContext(AuthContext);
    if (!context) return console.warn('useAuthentication can only be used inside auth provider');

    return context;
};

export default function ({ children }) {
    const nav = useNavigation();

    const [user, setUser] = React.useState(null);
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(null);

    React.useEffect(() => {
        if (error) setTimeout(() => setError(false), 5000);
    }, [error]);

    const getUser = async (data, callback, fallback) => {
        setLoading(true); setError(false);
        try {
            setUser(null);
            callback?.(data);
        }
        catch (err) {
            setError(err);
            fallback?.(err);
        }; setLoading(false);
    };

    const signin = async (data, callback, fallback) => {
        setLoading(true); setError(false);
        try {
            const res = await api.post('login', data);
            if (typeof res.data === 'string') throw new Error(res.data);

            console.log(res.data);
            await store.setItem('token', res.data?.jwtToken);
            setUser(res.data?.data); callback?.(res.data?.data);
        }
        catch (err) {
            console.error(err.message);
            setError(err.message);
            fallback?.(err);
        }; setLoading(false);
    };

    const signup = async (data, callback, fallback) => {
        setLoading(true); setError(false);
        try {
            const res = await api.post('signUp', data);
            console.log(res.data);
            callback?.(res.data);
        }
        catch (err) {
            console.log(err);
            // setError(err);
            fallback?.(err);
        }; setLoading(false);
    };

    const signout = async (callback, fallback) => {
        setLoading(true); setError(false);
        try {
            nav.reset({ index: 0, routes: [{ name: 'AuthStack', state: { routes: [{ name: 'Login' }] } }] });
            callback?.();
        }
        catch (err) {
            console.error(err);
            setError(err.message);
            fallback?.(err);
        }; setLoading(false);
    };

    const verify = async (otp, callback, fallback) => {
        setLoading(true); setError(false);
        try {
            const res = await api.post(`signUp?verify=${otp}`);
            if (typeof res.data === 'string') throw new Error(res.data);

            await store.setItem('token', res.data?.jwtToken);
            setUser(res.data?.data); callback?.(res.data?.data);
        }
        catch (err) {
            setError(err.message);
            fallback?.(err);
        }; setLoading(false);
    };

    const update = async (data, callback, fallback) => {
        setLoading(true); setError(false);
        try {
            const res = await api.post("updateMe", data, { headers: { 'Content-Type': 'multipart/form-data' } });
            console.log(res.data);
            if (typeof res.data === 'string' || res.data?.status !== 'success') throw new Error(res.data?.message || res.data);

            if (res.data?.jwtToken) await store.setItem('token', res.data?.jwtToken);
            setUser(prev => ({ ...prev, ...(res.data?.updatedUser || {}) })); callback?.(res.data);
        }
        catch (err) {
            console.error(err.message);
            setError(err.message);
            fallback?.(err);
        }; setLoading(false);
    };

    const changePassword = async (data, callback, fallback) => {
        setLoading(true); setError(false);
        try {
            const res = await api.patch('Updatepassword', data);
            if (typeof res.data === 'string') throw new Error(res.data);

            callback?.(res.data);
        }
        catch (err) {
            setError(err.message);
            fallback?.(err);
        }; setLoading(false);
    };

    return <AuthContext.Provider value={{ user, error, loading, setUser, signin, signup, signout, verify, update, setError, changePassword }}>{children}</AuthContext.Provider>;
};
