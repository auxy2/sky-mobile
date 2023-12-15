import React from "react";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../../contexts/theme.context";
import { ButtonText, StyledButton, GetStartedImg, InnerContainer, StyledContainer, GetStartedTitle, GetStartedContainer } from '../../styles/styles';

export default ({ navigation }) => {
    const { theme, lightMode } = useTheme();

    return (
        <StyledContainer style={{ backgroundColor: theme.backgroundColor }}>
            <StatusBar style={lightMode ? "light" : "dark"} backgroundColor={theme.backgroundColor} />
            <InnerContainer>
                <GetStartedContainer>
                    <GetStartedImg source={require("../../assets/images/welcome-image.png")} resizeMode="cover" />
                    <GetStartedTitle style={{ color: theme.white }}>Trade your gift cards, cryptocurrencies and pay bills. </GetStartedTitle>
                </GetStartedContainer>
                <StyledButton onPress={() => navigation.navigate("Login")} style={{ backgroundColor: theme.primary }}>
                    <ButtonText style={{ color: theme.buttonTextColor }}>GET STARTED</ButtonText>
                </StyledButton>
            </InnerContainer>
        </StyledContainer>
    );
};
