import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const themes = {
    dark: {
        white: "#ffffff",
        black: "#080D18",
        danger: "#FF0000",
        primary: "#1350E8", 
        success: "#3CDF21",
        cardsBg: "#17203D",
        cardsBorder: "#2E3852",
        primaryHover: "#144FE1",
        homeHeaderBg: "#102249",
        backgroundColor: "#020817",
        inputBorderFocus: "#1350E8",
        inputPlaceholder: "#8B9CC8",
        inputBg: "rgba(19, 80, 232, 0.3)",
        buttonTextColor: "#ffffff",
        ContainerColor: "rgba(19, 80, 232, 0.3)"
    },
    light: {
        white: "#080D18",
        black: "#000000",
        danger: "#FF0000",
        success: "#3CDF21",
        primary: "#1350E8",
        cardsBg: "#17203D",
        cardsBorder: "#2E3852",
        primaryHover: "#144FE1",
        homeHeaderBg: "#102249",
        backgroundColor: "#f4f5ff",
        inputBorderFocus: "#1350E8",
        inputPlaceholder: "#8B9CC8",
        inputBg: "rgba(19, 80, 232, 0.3)",
        buttonTextColor: "#ffffff",
        ContainerColor: "#255174"
    },
};

const ThemeContext = React.createContext();

export function useTheme() {
    const context = React.useContext(ThemeContext);
    if (!context) return console.warn("useTheme can only be used inside ThemeProvider");

    return context;
};

export default function ({ children }) {
    const [lightMode, setLightMode] = React.useState(false);

    const theme = React.useMemo(() => themes[lightMode ? 'light' : 'dark'], [lightMode]);

    React.useEffect(() => {
        getThemeValue();
    }, []);

    React.useEffect(() => {
        updateThemeValue();
    }, [lightMode]);

    const getThemeValue = async () => {
        try {
            let theme = JSON.parse(await AsyncStorage.getItem('theme') || 'false');
            setLightMode(theme);
        } catch (error) { };
    };

    const updateThemeValue = async () => {
        try {
            await AsyncStorage.setItem('theme', JSON.stringify(lightMode));
        } catch (error) { };
    };

    return <ThemeContext.Provider value={{ theme, lightMode, setLightMode }}>
        <ThemeProvider theme={theme} children={children} />
    </ThemeContext.Provider>
}