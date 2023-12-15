
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, TouchableOpacity, Text } from "react-native";

// ======icon==============
import { Octicons } from '@expo/vector-icons';

//////components--------
import { Colors, CheckIcon, SuccessfulText, StyledContainer, SuccessContainer } from '../styles/styles';
import { SafeAreaView } from "react-native-safe-area-context";

const { backgroundColor, inputPlaceholder } = Colors;
const WithdrawSuccess = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StyledContainer>
                <StatusBar style="light" backgroundColor={backgroundColor} />
                <SuccessContainer>
                    <CheckIcon source={require("../assets/images/graph.png")} />
                    <SuccessfulText>Withdrawal Successful!</SuccessfulText>
                    <SuccessfulText>Extra cash sure looks good on you.</SuccessfulText>
                </SuccessContainer>
            </StyledContainer>
        </SafeAreaView>
    );
};


export default WithdrawSuccess;
