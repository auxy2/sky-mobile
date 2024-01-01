import React from "react";
import { useTheme } from "../contexts/theme.context";
import { StatusBar, View, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GenContent, ScreenTitles, GenContainer, GenTogleText, MainContainer, GenContentLeft, StyledContainer, GenContentRight, ContentMarginTop, GenContenLeftTextBig, GenContenLeftTextSmall } from '../styles/styles';

export default () => {
    const { theme, lightMode, setLightMode } = useTheme();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StyledContainer>
                <StatusBar style={lightMode ? "light" : "dark"} backgroundColor={theme.backgroundColor} />
                <MainContainer>
                    <ScreenTitles>General Settings</ScreenTitles>
                    <ContentMarginTop />
                    <GenContainer>
                        <GenContent>
                            <GenContentLeft>
                                <GenContenLeftTextSmall style={{ color: theme.inputPlaceholder }}>Theme settings</GenContenLeftTextSmall>
                                <GenContenLeftTextBig style={{ color: theme.white }}>Light & dark theme</GenContenLeftTextBig>
                            </GenContentLeft>
                            <GenContentRight>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <GenTogleText style={{ color: theme.white }}>Light</GenTogleText>
                                    <Switch
                                        value={!lightMode}
                                        onValueChange={() => setLightMode(prev => !prev)}
                                    />
                                    <GenTogleText style={{ color: theme.white }}>Dark</GenTogleText>
                                </View>
                            </GenContentRight>
                        </GenContent>
                        <GenContent>
                            <GenContentLeft>
                                <GenContenLeftTextSmall>Notification settings</GenContenLeftTextSmall>
                                <GenContenLeftTextBig>Turn on notifications</GenContenLeftTextBig>
                            </GenContentLeft>
                            <GenContentRight>
                                <GenTogleText>On</GenTogleText>
                                <Switch/>
                                <GenTogleText>Off</GenTogleText>
                            </GenContentRight>
                        </GenContent>
                    </GenContainer>
                </MainContainer>
            </StyledContainer>
        </SafeAreaView>
    );
};
