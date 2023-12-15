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
  ButtonText,
  StyledButton,
  Colors,
  StyledTextInputLabel,
  AlertPopUpMessage,
  AlertPopUpText,
  AlertPopUpErrorText,
} from "../styles/styles";
import { resetUserPin } from "../util/auth";
import { Ionicons, Octicons } from "@expo/vector-icons";

const { backgroundColor, inputPlaceholder, danger, success } = Colors;

function ResetPinInputFields() {
  const inputRefs = useRef([]);
  const [pin, setPin] = useState(Array(12).fill("")); // Array to store 12-digit PIN
  const [errorMessage, setErrorMessage] = useState(null);
  const [showUpdateSuccessAlert, setShowUpdateSuccessAlert] = useState(false);



  // Function to handle input change for each digit
  const handleInputChange = (index, text) => {
    if (/^[0-9]$/.test(text) || text === "") {
      const newPin = [...pin];
      newPin[index] = text;
      setPin(newPin);

      // Move to the next input field
      if (index < 11 && text !== "") {
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

  const resetPin = async () => {
    // Check if the entered PIN matches your criteria (e.g., server validation)

    const oldPin = pin.slice(0, 4).join("");
    const newPin = pin.slice(4, 8).join("");
    const confirmPin = pin.slice(-4).join("");
    console.log("new", oldPin, newPin, confirmPin);
    // if (enteredPin !== "123456") {
    //   setErrorMessage("Invalid PIN. Please try again."); // Replace with actual validation logic
    //   return;
    // }

    const data = { oldPin, newPin, confirmPin };

    try {
      // Send a request to the server to reset the PIN
      // Replace this with your actual server API call
      const response = await resetUserPin(data);
      console.log(response);

      // If the server call is successful, show a success message
      setShowUpdateSuccessAlert(true);
      setErrorMessage(null);
    } catch (error) {
      // Handle network errors or server communication errors here
      setErrorMessage(
        "An error occurred while resetting the PIN. Please try again later."
      );
      setShowUpdateSuccessAlert(false);
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
            <StyledTextInputLabel>Old PIN</StyledTextInputLabel>
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
                  placeholderTextColor={inputPlaceholder}
                  value={digit}
                  keyboardType="numeric"
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  maxLength={1}
                />
              ))}
            </View>
            <StyledTextInputLabel>New PIN</StyledTextInputLabel>
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
                  placeholderTextColor={inputPlaceholder}
                  value={digit}
                  keyboardType="numeric"
                  ref={(ref) => (inputRefs.current[index + 4] = ref)}
                  maxLength={1}
                />
              ))}
            </View>
            <StyledTextInputLabel>Confirm New PIN</StyledTextInputLabel>
            <View style={styles.inputContainer}>
              {pin.slice(8, 12).map((digit, index) => (
                <TextInput
                  key={index + 8}
                  style={styles.input}
                  onChangeText={(text) => handleInputChange(index + 8, text)}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === "Backspace") {
                      handleBackspace(index + 8);
                    }
                  }}
                  placeholderTextColor={inputPlaceholder}
                  value={digit}
                  keyboardType="numeric"
                  ref={(ref) => (inputRefs.current[index + 8] = ref)}
                  maxLength={1}
                />
              ))}
            </View>
            <StyledButton onPress={resetPin}>
              <ButtonText>RESET PIN</ButtonText>
            </StyledButton>
          </View>
        </MainContainer>
      </StyledContainer>

      {/* Error Alert */}
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
          <AlertPopUpText>Your PIN has been reset successfully.</AlertPopUpText>
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
    borderColor: "gray",
    textAlign: "center",
    fontSize: 18,
    color: inputPlaceholder,
    margin: 5,
    borderRadius: 6,
  },
});

export default ResetPinInputFields;
