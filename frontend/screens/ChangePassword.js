import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import { Ionicons, Octicons } from "@expo/vector-icons";

import {
  StyledContainer,
  InnerContainer,
  StyledFormArea,
  StyledTextInput,
  RightIcon,
  ButtonText,
  StyledButton,
  Colors,
  ToSignupPageBox,
  ToSignupPageText,
  TextLink,
  TextLinkContent,
  StyledTextInputLabel,
  ScreenTitles,
  ContentMarginTop,
  AlertPopUpMessage,
  AlertPopUpErrorText,
  AlertPopUpText,
} from "../styles/styles";
import { useAuthentication } from "../contexts/auth.context";

const { inputPlaceholder, backgroundColor, danger, success } = Colors;

const ChangePassword = ({ navigation }) => {
  const { error, loading, changePassword } = useAuthentication();

  const [hidePassword, setHidePassword] = React.useState(true);
  const [showUpdateSuccessAlert, setShowUpdateSuccessAlert] = React.useState(false); // For success message
  const [userData, setUserData] = React.useState({ CurrentPassword: "", password: "", passConfirm: "" });


  const handleSubmit = async () => {
    await changePassword(userData, () => {
      setShowUpdateSuccessAlert(true);
    }, () => { });
  };

  useEffect(() => {
    if (showUpdateSuccessAlert) {
      let id = setTimeout(() => {
        setShowUpdateSuccessAlert(false);
      }, 3000);

      return () => clearTimeout(id);
    };
  }, [showUpdateSuccessAlert]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StyledContainer>
          <StatusBar style="light" backgroundColor={backgroundColor} />
          <ScreenTitles>Change Password</ScreenTitles>
          <ContentMarginTop />
          <InnerContainer>
            <StyledFormArea>
              <StyledTextInputLabel>Current password</StyledTextInputLabel>
              <MyTextInput
                placeholder="Current password"
                placeholderTextColor={inputPlaceholder}
                onChangeText={(CurrentPassword) => setUserData(prev => ({...prev, CurrentPassword}))}
                // onBlur={handleBlur("password")}
                secureTextEntry={hidePassword}
                togglePasswordVisibility={() => setHidePassword(!hidePassword)}
              />
              <StyledTextInputLabel>New password</StyledTextInputLabel>
              <MyTextInput
                placeholder="Enter new password"
                placeholderTextColor={inputPlaceholder}
                onChangeText={(password) => setUserData(prev => ({...prev, password}))}
                // onBlur={handleBlur("password")}
                secureTextEntry={hidePassword}
                togglePasswordVisibility={() => setHidePassword(!hidePassword)}
              />
              <StyledTextInputLabel>Confirm password</StyledTextInputLabel>
              <MyTextInput
                placeholder="Confirm new password"
                placeholderTextColor={inputPlaceholder}
                onChangeText={(passConfirm) => setUserData(prev => ({...prev, passConfirm}))}
                // onBlur={handleBlur("password")}
                secureTextEntry={hidePassword}
                togglePasswordVisibility={() => setHidePassword(!hidePassword)}
              />


              <StyledButton onPress={handleSubmit}>
                <ButtonText>Update password</ButtonText>
              </StyledButton>

              <ToSignupPageBox>
                <ToSignupPageText>
                  Can't remember your password?
                </ToSignupPageText>
              </ToSignupPageBox>
              <TextLink onPress={() => navigation.navigate("ResetOptions")}>
                <TextLinkContent>Reset Password</TextLinkContent>
              </TextLink>
            </StyledFormArea>
          </InnerContainer>
        </StyledContainer>
      </ScrollView>
      {/* Error Alert */}
      {error && (
        <AlertPopUpMessage>
          <Octicons name="alert" size={20} color={danger} />
          <AlertPopUpErrorText>{error}</AlertPopUpErrorText>
        </AlertPopUpMessage>
      )}

      {/* Success Alert */}
      {showUpdateSuccessAlert && (
        <AlertPopUpMessage>
          <Ionicons name="checkmark-circle" size={20} color={success} />
          <AlertPopUpText>Your password has been changed successfully.</AlertPopUpText>
        </AlertPopUpMessage>
      )}

    </SafeAreaView>
  );
};

const MyTextInput = ({ icon, togglePasswordVisibility, ...props }) => {
  return (
    <View>
      <StyledTextInput {...props} />
      {props > 0 && (
        <RightIcon onPress={togglePasswordVisibility}>
          <Octicons
            name={props.secureTextEntry ? "eye-closed" : "eye"}
            size={24}
            color={inputPlaceholder}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default ChangePassword;
