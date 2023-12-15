import React, { useContext, useRef, useState } from "react";
import { StatusBar, View, TextInput, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Octicons } from "@expo/vector-icons";

import {
  StyledContainer,
  MainContainer,
  ScreenTitles,
  ContentMarginTop,
  StyledTextInputLabel,
  StyledButton,
  ButtonText,
  Colors,
  AlertPopUpMessage,
  AlertPopUpText,
  AlertPopUpErrorText,
} from "../styles/styles";

const { backgroundColor, inputPlaceholder, danger, success } = Colors;

function WithdrawFunPin({ withdraw, toggleSuccessModal }) {
  const [pin, setPin] = useState(["", "", "", ""]); // Array to store 4-digit PIN

  const inputRefs = useRef([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showUpdateSuccessAlert, setShowUpdateSuccessAlert] = useState(false);

  const handleInputChange = (index, text) => {
    if (/^[0-9]$/.test(text) || text === "") {
      const newPin = [...pin];
      newPin[index] = text;
      setPin(newPin);

      if (index < 3 && text !== "") {
        inputRefs.current[index + 1].focus();
      } else if (index > 0 && text === "") {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleBackspace = (index) => {
    if (index > 0) {
      const newPin = [...pin];
      newPin[index - 1] = "";
      setPin(newPin);
      inputRefs.current[index - 1].focus();
    }
  };

  const widthdarwalPin = async () => {
    // Check if the entered PIN matches your criteria (e.g., server validation)

    await withdraw(pin.join(''));
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StyledContainer>
        <StatusBar style="light" backgroundColor={backgroundColor} />
        <MainContainer>
          <ScreenTitles>Transaction PIN</ScreenTitles>
          <ContentMarginTop />
          <View style={styles.container}>
            <StyledTextInputLabel>PIN</StyledTextInputLabel>
            <View style={styles.inputContainer}>
              {pin.map((digit, index) =>
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
              )}
            </View>
            <StyledButton onPress={widthdarwalPin}>
              <ButtonText>PROCEED</ButtonText>
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

export default WithdrawFunPin;
