import React from 'react';
import { api } from '../util/auth';

const CryptoContext = React.createContext({});

export const options = [
    {
        id: 'btc',
        name: 'BTC',
        title: 'Sell BTC',
        responseName: 'address',
        url: 'btc_Wallet_Address',
        right: require("../assets/icons/btc.png"),
        left: require("../assets/icons/transact.png"),
    },
    {
        id: 'usdt',
        name: 'USDT',
        title: 'Sell USDT',
        url: 'generate-Tether',
        responseName: 'UsdtAddress',
        left: require("../assets/icons/transact2.png"),
        right: require("../assets/icons/transact2.png"),
    },
    {
        id: 'eth',
        name: 'ETHEREUM',
        title: 'Sell ETHEREUM',
        responseName: 'EtherAddress',
        url: 'generateEtheriumWallet',
        left: require("../assets/icons/transact3.png"),
        right: require("../assets/icons/transact3.png"),
    },
];

export function useCrypto() {
    const context = React.useContext(CryptoContext);
    if (!context) return console.warn('useCrypto can only be used inside crypto provider');

    return context;
};

export default function ({ children }) {
    const [data, setData] = React.useState([]);
    const [rates, setRates] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(null);

    const get = (id) => data.find(item => item.id === id);

    const all = async (callback, fallback) => {
        setLoading(true); setError(false);
        try {
            let res = await api.get('users_Wallets');
            console.log(res.data);
            setData(res.data);
            callback?.(res.data);
        } catch (err) {
            setError(err.message);
            console.error(err);
            fallback?.(err);
        }
        setLoading(false);
    };

    const allRates = async (callback, fallback) => {
        setLoading(true); setError(false);
        try {
            let res = await api.get('Admin/allCryptoRates');
            if (res.data.status !== 'sucess') throw new Error(res.data?.message || 'Something went wrong');

            setRates(res.data?.crytoRAtes || []);
            callback?.(res.data);
        }
        catch (err) {
            fallback?.(err);
            console.error(err);
        }; setLoading(false);
    };

    const create = async (data, callback, fallback) => {
        setLoading(true); setError(false);
        try {
            let res = await api.get(data.url);
            let attr = res.data?.[data.responseName];
            setData(prev => ({ ...prev, [data.id]: attr }));
            console.log(res.data);
            callback?.(res.data);
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

    return <CryptoContext.Provider value={{ all, get, create, update, rates, data, error, allRates, loading }}>{children}</CryptoContext.Provider>;
};
