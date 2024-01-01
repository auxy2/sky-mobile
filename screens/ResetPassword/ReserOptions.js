import React, { useState, useEffect } from "react";
import { StatusBar, View, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  StyledContainer,
  MainContainer,
  ButtonText,
  StyledButton,
  SignupOtpText,
  SignupOtpContent,
  StyledTextInput,
  Colors,
  AlertPopUpMessage,
  AlertPopUpText,
  AlertPopUpErrorText,
} from "../../styles/styles";
import { resetPassword } from "../../util/auth";
import { Ionicons, Octicons } from "@expo/vector-icons";

const {
  backgroundColor,
  inputPlaceholder,
  primary,
  inputBg,
  white,
  success,
  danger,
} = Colors;

const ResetOptions = ({ navigation, ...rest }) => {
  const [showUpdateSuccessAlert, setShowUpdateSuccessAlert] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [chosenOption, setChosenOption] = useState("Number");

  console.log(rest);


  const sendOTP = async (option) => {
    // Simulate sending OTP (you should implement your actual logic here)
    setLoading(true);
    try {
      const response = await resetPassword(text);
      console.log(response);
      if (response.status === "success") {
        navigation.navigate("ResetOtp", { params: { text } });
      }

      // setTimeout(() => {
      //   setLoading(false);
      //   setShowUpdateSuccessAlert(true);
      //   setErrorMessage("");

      //   // You can show different messages based on the chosen option
      //   if (option === "Number") {
      //     setShowUpdateSuccessAlert(true);
      //     setErrorMessage("");
      //   } else if (option === "Email") {
      //     setShowUpdateSuccessAlert(true);
      //     setErrorMessage("");
      //   }

      //   // Hide the success alert after 3 seconds
      //   setTimeout(() => {
      //     setShowUpdateSuccessAlert(false);
      //     // Navigate to OTP screen after hiding the alert
      //     setTimeout(() => {
      //       navigation.navigate("ResetOtp"); // Replace "OTPScreen" with your actual OTP screen name
      //     }, 500); // Delay before navigating (you can adjust this as needed)
      //   }, 3000); // 3 seconds
      // }, 2000); // Simulated delay for OTP sending
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    // Assuming you have sent OTP successfully
  };

  const handleSubmit = async () => { };

  return (
    <StyledContainer>
      <StatusBar style="light" />
      <MainContainer>
        <SignupOtpContent>
          <SignupOtpText>
            An OTP would be sent to you to reset your password. Choose your
            preferred destination
          </SignupOtpText>
        </SignupOtpContent>
        <StyledTextInput
          onChangeText={setText}
          placeholder="Enter email or number"
          placeholderTextColor={inputPlaceholder}
        />

        <StyledButton
          style={{ marginTop: 20 }}
          onPress={() => sendOTP(chosenOption)}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size={"large"} />
          ) : (
            <ButtonText>CONTINUE</ButtonText>
          )}
        </StyledButton>
      </MainContainer>
      {errorMessage && (
        <AlertPopUpMessage>
          <Octicons name="alert" size={20} color={danger} />
          <AlertPopUpErrorText>{errorMessage}</AlertPopUpErrorText>
        </AlertPopUpMessage>
      )}

      {/* Success Alert */}
      {showUpdateSuccessAlert && (
        <AlertPopUpMessage>
          <Ionicons name="checkmark-circle" size={20} color={success} />
          <AlertPopUpText>
            {chosenOption === "Number"
              ? "An OTP has been sent to your number."
              : "An OTP has been sent to your email."}
          </AlertPopUpText>
        </AlertPopUpMessage>
      )}
    </StyledContainer>
  );
};

export default ResetOptions;
