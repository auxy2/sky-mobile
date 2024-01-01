import React, { useContext, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  StyledContainer,
  MainContainer,
  ScreenTitles,
  ContentMarginTop,
  InnerContainer,
  StyledFormArea,
  ButtonText,
  StyledButton,
  Colors,
  MsgBox,
  StyledTextInputLabel,
  AlertPopUpMessage,
  AlertPopUpErrorText,
  AlertPopUpText,
} from "../styles/styles";
import { createUserPin } from "../util/auth";
import { Ionicons, Octicons } from "@expo/vector-icons";

const { backgroundColor, inputPlaceholder, danger, success, white, primary} = Colors;

function CreatePin() {
  const [errorMessage, setErrorMessage] = useState(""); // For error messages
  const [showUpdateSuccessAlert, setShowUpdateSuccessAlert] = useState(false); // For success messages
  const [isAlertMessageVisible, setAlertMessageVisible] = useState(false); // For showing/hiding the alert message
  const [alertMessage, setAlertMessage] = useState(""); // For the alert message text

  const [pin, setPin] = useState(["", "", "", "", "", "", "", ""]); // Array to store 8-digit PIN
  const inputRefs = useRef([]);

// =========function to show alert message with timer==========
  const showAlertMessage = (message) => {
    setAlertMessage(message);
    setAlertMessageVisible(true);
  
    setTimeout(() => {
      setAlertMessageVisible(false);
      setAlertMessage(""); // Clear the message text
    }, 3000); // Hide after 3 seconds
  };


  // Function to handle input change for each digit
  const handleInputChange = (index, text) => {
    if (/^[0-9]$/.test(text) || text === "") {
      const newPin = [...pin];
      newPin[index] = text;
      setPin(newPin);

      // Move to the next input field
      if (index < 7 && text !== "") {
        inputRefs.current[index + 1].focus();
      } else if (index > 0 && text === "") {
        // Handle backspace, clear the current input and move to the previous one
        inputRefs.current[index - 1].focus();
      }
    }
  };

  // Function to handle backspace key press
  const handleBackspace = (index) => {
    if (index > 0) {
      const newPin = [...pin];
      newPin[index - 1] = "";
      setPin(newPin);
      inputRefs.current[index - 1].focus();
    }
  };

  const onPressHandler = async () => {
    // console.log(pin);
    const newPin = pin.slice(0, 4).join("");
    const confirmedPin = pin.slice(-4).join("");

    // ==added authentication parts here==========

    if (newPin === "" || confirmedPin === "") {
      showAlertMessage("Input fields cannot be empty."); // Show input field empty error
      return;
    }
  
    if (newPin !== confirmedPin) {
      showAlertMessage("PIN do not match. Make sure the PIN are same."); // Show PIN mismatch error
      return;
    }
// =======to here==============
    const data = { newpin: newPin, confirmPin: confirmedPin };
    console.log(data);
    try {
      const response = await createUserPin(data);
      console.log(response);
      if (response.status === "success") {
      setShowUpdateSuccessAlert(true); // Show success message
      }

    } catch (error) {
      setErrorMessage("An error occurred. Please try again."); // Display an error message
      showAlertMessage("An error occurred. Please try again."); // Show the alert message with a timer
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StyledContainer>
        <StatusBar style="light" backgroundColor={backgroundColor} />
        <MainContainer>
          <ScreenTitles>Create new PIN</ScreenTitles>
          <ContentMarginTop />
          <View style={styles.container}>
            <StyledTextInputLabel>Create new PIN</StyledTextInputLabel>
            <View style={styles.inputContainer}>
              {pin.slice(0, 4).map((digit, index) => (
                <TextInput
                  key={index}
                  style={styles.input}
                  onChangeText={(text) => handleInputChange(index, text)}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === "Backspace") {
                      handleBackspace(index);
                    }
                  }}
                  value={digit}
                  keyboardType="numeric"
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  maxLength={1}
                />
              ))}
            </View>
            <StyledTextInputLabel>Confirm PIN</StyledTextInputLabel>
            <View style={styles.inputContainer}>
              {pin.slice(4, 8).map((digit, index) => (
                <TextInput
                  key={index + 4}
                  style={styles.input}
                  onChangeText={(text) => handleInputChange(index + 4, text)}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === "Backspace") {
                      handleBackspace(index + 4);
                    }
                  }}
                  value={digit}
                  keyboardType="numeric"
                  ref={(ref) => (inputRefs.current[index + 4] = ref)}
                  maxLength={1}
                />
              ))}
            </View>
            <StyledButton onPress={onPressHandler}>
              <ButtonText>CREATE PINs</ButtonText>
            </StyledButton>
          </View>
        </MainContainer>
      </StyledContainer>
      {/* // Error Alert */}
    {errorMessage && (
      <AlertPopUpMessage>
        <Octicons name="alert" size={20} color={danger} />
        <AlertPopUpErrorText>{errorMessage}</AlertPopUpErrorText>
      </AlertPopUpMessage>
    )}

    {/* // Success Alert */}
    {showUpdateSuccessAlert && (
      <AlertPopUpMessage>
        <Ionicons name="checkmark-circle" size={20} color={success} />
        <AlertPopUpText>Your PIN has been created successfully.</AlertPopUpText>
      </AlertPopUpMessage>
    )}

    {/* // Alert Message */}
    {isAlertMessageVisible && (
      <AlertPopUpMessage>
        <Octicons name="info" size={20} color={danger} />
        <AlertPopUpErrorText>{alertMessage}</AlertPopUpErrorText>
      </AlertPopUpMessage>
    )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
  },
  input: {
    width: 60,
    height: 50,
    borderWidth: 1,
    borderColor: primary,
    textAlign: "center",
    fontSize: 18,
    margin: 5,
    color: white,
    borderRadius: 6,
  },
});

export default CreatePin;
