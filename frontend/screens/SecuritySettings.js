import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, TouchableOpacity, Text, Switch } from "react-native";

// ======icon==============
import { Ionicons, Octicons } from '@expo/vector-icons';

//////components--------
import {
    StyledContainer,
    Colors,
    MainContainer,
    ScreenTitles,
    ContentMarginTop,
    SecuritySettingsContainer,
    SettingsIconLeft,
    SettingsIconRight,
    SecuritySettingsContainerText,
    SecuritySettingsContainerInner

} from '../styles/styles';
import { SafeAreaView } from "react-native-safe-area-context";
import TwoFa from "./TwoFA/TwoFa";

const { backgroundColor, inputPlaceholder} = Colors;


const SecuritySettings = ({navigation}) => {
  





    return (
        <SafeAreaView style={{ flex: 1 }}>
        <StyledContainer>
            <StatusBar style="light" backgroundColor= {backgroundColor}/>
            <MainContainer>
                <ScreenTitles>Security Settings</ScreenTitles>
                <ContentMarginTop/>
            {/* =======Change pin================= */}
                <SecuritySettingsContainer  onPress ={() => navigation.navigate("CreatePin")}>
                    <SecuritySettingsContainerInner>
                        <SettingsIconLeft><Octicons name="shield" size={16} color={inputPlaceholder} /></SettingsIconLeft>
                        <SecuritySettingsContainerText>Create pin</SecuritySettingsContainerText>
                    </SecuritySettingsContainerInner>
                    <SettingsIconRight><Ionicons name="caret-forward" size={16} color={inputPlaceholder} /></SettingsIconRight>
                </SecuritySettingsContainer>
             {/* =======Reset pin================= */}
             <SecuritySettingsContainer onPress ={() => navigation.navigate("ResetPin")}>   
                    <SecuritySettingsContainerInner>
                    <SettingsIconLeft><Octicons name="shield" size={16} color={inputPlaceholder} /></SettingsIconLeft>
                        <SecuritySettingsContainerText>Reset pin</SecuritySettingsContainerText>
                    </SecuritySettingsContainerInner>
                    <SettingsIconRight><Ionicons name="caret-forward" size={16} color={inputPlaceholder} /></SettingsIconRight>
                </SecuritySettingsContainer>
             {/* =======Change password================= */}
             <SecuritySettingsContainer onPress ={() => navigation.navigate("ChangePassword")}>
                    <SecuritySettingsContainerInner>
                        <SettingsIconLeft><Octicons name="lock" size={16} color={inputPlaceholder} /></SettingsIconLeft>
                        <SecuritySettingsContainerText>Change password</SecuritySettingsContainerText>
                    </SecuritySettingsContainerInner>
                    <SettingsIconRight><Ionicons name="caret-forward" size={16} color={inputPlaceholder} /></SettingsIconRight>
            </SecuritySettingsContainer>
         
            </MainContainer>
        </StyledContainer> 


        </SafeAreaView>
    );
};


export default SecuritySettings;
