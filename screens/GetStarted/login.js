import React, { useState, useEffect, useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { useContext } from "react";

// Import styles and constants from another file
import {
  StyledContainer,
  InnerContainer,
  StyledFormArea,
  StyledTextInput,
  ButtonText,
  StyledButton,
  Colors,
  ToSignupPageBox,
  ToSignupPageText,
  TextLink,
  TextLinkContent,
  AlertPopUpMessage,
  AlertPopUpErrorText,
  AlertPopUpText,
} from "../../styles/styles";
import { isEmail } from "../../util/validator";
import { useAuthentication } from "../../contexts/auth.context";

// Destructure constants from the Colors object
const { inputPlaceholder, backgroundColor, success, danger } = Colors;

// Define the Login component

const Login = ({ navigation }) => {
  const [statusMessage, setStatusMessage] = useState("");
  const [data, setData] = useState({ email: "", password: "" });
  const { signin, error, loading, setError } = useAuthentication();

  const handleSignin = async () => {
    if (!isEmail(data.email)) return setError("Enter a valid email");
    else if (data.password.length < 8) return setError("Password must be at least 8");

    await signin(data, () => {
      setStatusMessage("Welcome back");
      setTimeout(() => { navigation.navigate('MainContent'); }, 3000);
    });
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StyledContainer>
        <StatusBar style="light" backgroundColor={backgroundColor} />
        <InnerContainer>
          <StyledFormArea>
            <StyledTextInput
              placeholder="Enter email"
              placeholderTextColor={inputPlaceholder}
              onChangeText={(email) => setData(prev => ({ ...prev, email }))}
            />
            {/* Password Input */}
            <StyledTextInput
              placeholder="Password"
              placeholderTextColor={inputPlaceholder}
              onChangeText={(password) => setData(prev => ({ ...prev, password }))}
            />

            {/* ==========Button========= */}
            {!loading ? (
              <StyledButton onPress={handleSignin}>
                <ButtonText>LOG IN</ButtonText>
              </StyledButton>
            ) : (
              <StyledButton disabled={true}>
                <ActivityIndicator size="large" color={inputPlaceholder} />
              </StyledButton>
            )}
            <ToSignupPageBox>
              <ToSignupPageText>
                Don't have an account already?
              </ToSignupPageText>
              <TextLink onPress={() => navigation.navigate("Signup")}>
                <TextLinkContent>Signup</TextLinkContent>
              </TextLink>
            </ToSignupPageBox>
            <TextLink onPress={() => navigation.navigate("ResetOptions")}>
              <TextLinkContent>Reset Password</TextLinkContent>
            </TextLink>
          </StyledFormArea>
        </InnerContainer>
      </StyledContainer>

      {statusMessage && (
        <AlertPopUpMessage>
          <Ionicons name="checkmark-circle" size={20} color={success} />
          <AlertPopUpText>{statusMessage}</AlertPopUpText>
        </AlertPopUpMessage>
      )}
      {error && (
        <AlertPopUpMessage>
          <Octicons name="alert" size={20} color={danger} />
          <AlertPopUpErrorText>{error}</AlertPopUpErrorText>
        </AlertPopUpMessage>
      )}


    </SafeAreaView>
  );
};

// MyTextInput component

export default Login;
