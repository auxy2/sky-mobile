import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, ScrollView, ActivityIndicator } from "react-native";

import {
  StyledContainer,
  InnerContainer,
  StyledFormArea,
  StyledTextInput,
  RightIcon,
  ButtonText,
  StyledButton,
  Colors,
  MsgBox,
  ToSignupPageBox,
  ToSignupPageText,
  TextLink,
  TextLinkContent,
  ScreenTitlesHeader,
} from "../../styles/styles";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  isEmail,
  isValidName,
  isValidPassword,
  isValidPhone,
} from "../../util/validator";
import { useAuthentication } from "../../contexts/auth.context";

const { inputPlaceholder, backgroundColor } = Colors;

const Signup = () => {
  const navigation = useNavigation();
  const { signup, error, loading,setError } = useAuthentication();


  const [messageType] = useState();
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [data, setData] = useState({ name: "", email: "", username: "", phoneNumber: "", password: "", passConfirm: "" });

  // const handleMessage = (message, type = "FAILED") => {
  //   setMessage(message);
  //   setMessageType(type);
  // };

  const handleSignup = async () => {
    const { status, message } = isValidPassword(data.password, data.passConfirm);

    console.log(status,message)

    // if (!isEmail(data.email)) return setError("Enter a valid email");
    // // else if (isValidPhone(data.phoneNumber)) return setError("Enter a valid phone number");
    // else if (!status) return setError(message ?? "Password must be at least 8");

    await signup(data, () => { navigation.navigate("SignUpAuth", data); });
  };

  return ( 
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StyledContainer>
          <StatusBar style="light" backgroundColor={backgroundColor} />
          <InnerContainer>
            <ScreenTitlesHeader />
            <StyledFormArea>
              <StyledTextInput
                placeholder="Full name"
                placeholderTextColor={inputPlaceholder}
                onChangeText={(name) => setData(prev => ({ ...prev, name }))}
                // onBlur={handleBlur("name")}
                value={data.name}
                keyboardType="default"
              />
              <StyledTextInput
                placeholder="Username"
                placeholderTextColor={inputPlaceholder}
                onChangeText={(username) => setData(prev => ({ ...prev, username }))}
                // onBlur={handleBlur("name")}
                value={data.username}
                keyboardType="default"
              />
              <StyledTextInput
                placeholder="Email"
                placeholderTextColor={inputPlaceholder}
                onChangeText={(email) => setData(prev => ({ ...prev, email }))}
                // onBlur={handleBlur("email")}
                value={data.email}
                keyboardType="email-address"
              />
              <StyledTextInput
                placeholder="Phone number"
                placeholderTextColor={inputPlaceholder}
                onChangeText={(phoneNumber) => setData(prev => ({ ...prev, phoneNumber }))}
                // onBlur={handleBlur("phoneNumber")}
                value={data.phoneNumber}
                keyboardType="numeric"
              />
              <MyTextInput
                placeholder="Password"
                placeholderTextColor={inputPlaceholder}
                onChangeText={(password) => setData(prev => ({ ...prev, password }))}
                // onBlur={handleBlur("password")}
                value={data.password}
                secureTextEntry={hidePassword}
                togglePasswordVisibility={() => setHidePassword(!hidePassword)}
              />
              <MyTextInput
                placeholder="Confirm password"
                placeholderTextColor={inputPlaceholder}
                onChangeText={(passConfirm) => setData(prev => ({ ...prev, passConfirm }))}
                // onBlur={handleBlur("passConfirm")}
                value={data.passConfirm}
                secureTextEntry={hideConfirmPassword}
                togglePasswordVisibility={() =>
                  setHideConfirmPassword(!hideConfirmPassword)
                }
              />
              <MsgBox type={messageType}>{error}</MsgBox>
              {!loading ? (
                <StyledButton onPress={handleSignup}>
                  <ButtonText>CREATE ACCOUNT</ButtonText>
                </StyledButton>
              ) : (
                <StyledButton disabled={true}>
                  <ActivityIndicator size="large" color={inputPlaceholder} />
                </StyledButton>
              )}
              <ToSignupPageBox>
                <ToSignupPageText>Already have an account? </ToSignupPageText>
                <TextLink onPress={() => navigation.navigate("Login")}>
                  <TextLinkContent>Login</TextLinkContent>
                </TextLink>
              </ToSignupPageBox>
            </StyledFormArea>
          </InnerContainer>
        </StyledContainer>
      </ScrollView>
    </SafeAreaView>
  );
};

const MyTextInput = ({ icon, togglePasswordVisibility, ...props }) => {
  return (
    <View>
      <StyledTextInput {...props} />
      {props.value.length > 0 && (
        <RightIcon onPress={togglePasswordVisibility}>
          <Octicons
            name={props.secureTextEntry ? "eye-closed" : "eye"}
            size={17}
            color={inputPlaceholder}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default Signup;

// const handleSignup = async (credentials, setSubmitting) => {

//   // Check if the user already exists and is unverified
//   const checkUserStatusUrl = 'https://your-api-url/checkUserStatus'; //  API endpoint

//   try {
//     const userStatusResponse = await axios.post(checkUserStatusUrl, {
//       email: credentials.email,
//       phoneNumber: credentials.phoneNumber,
//     });

//     const { userExists, isUnverified } = userStatusResponse.data;

//     if (userExists) {
//       if (isUnverified) {
//         // User exists but is unverified, so prompt them to verify
//         setUnverifiedUser(true);
//         handleMessage("Account exists but is unverified. Please check your email for verification instructions.", 'FAILED');
//       } else {
//         // User exists and is verified, don't allow account creation
//         handleMessage("User already exists. Please log in.", 'FAILED');
//       }
//     } else {
//       // User doesn't exist, proceed with account creation
//       const createAccountUrl = 'https://9e8b-102-88-35-220.ngrok-free.app/api/V1/skyshowNG/signUp';
//       const response = await axios.post(createAccountUrl, credentials);
//       const { message, status, data } = response.data;

//       if (status === 'success') {
//         setUserData({ ...userData, ...data });
//         navigation.navigate('SignUpAuth', { email: credentials.email, phoneNumber: credentials.phoneNumber });
//       } else {
//         handleMessage(message || 'An error occurred', status);
//         console.error("Request failed:", message);
//       }
//     }
//   } catch (error) {
//     console.error("An error occurred:", error.message);
//     setSubmitting(false);
//     handleMessage("An error occurred. Check your network connection and try again", 'FAILED');
//   } finally {
//     setSubmitting(false);
//     setTimeout(() => {
//     }, 5000);
//   }
// };
