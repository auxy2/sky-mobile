import React, { useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Octicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import {
  StyledContainer,
  StyledFormArea,
  StyledTextInput,
  RightIcon,
  ButtonText,
  StyledButton,
  Colors,
  MsgBox,
  TwoFaModal,
  StyledTextInputLabel,
} from "../../styles/styles";

const { inputPlaceholder } = Colors;

const TwoFa = ({ isVisible, closeModal }) => {
  const [userData, setUserData] = useState({
    password: "",
  });

  const [hidePassword, setHidePassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [messageType, setMessageType] = useState(null); // Set default to null
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleSubmit = async () => {
    setIsButtonDisabled(true);

    try {
      // Replace with your password validation logic (e.g., API request)
      const isPasswordCorrect = await checkPassword(userData.password);

      if (isPasswordCorrect) {
        closeModal(); // Close modal on successful password entry
      } else {
        setErrorMessage("Incorrect password");
        setMessageType("error"); // Set message type to "error"
      }
    } catch (error) {
      setErrorMessage(error.message);
      setMessageType("error");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const checkPassword = async (enteredPassword) => {
    // Replace with your actual password validation logic
    return enteredPassword === "correct_password"; // Change to your correct password
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={closeModal}>
      <TwoFaModal>
        <StyledTextInputLabel>
          Enter your password to verify you are the owner of this account.
        </StyledTextInputLabel>
        <StyledFormArea>
          <MyTextInput
            placeholder="Password"
            placeholderTextColor={inputPlaceholder}
            onChangeText={(text) => {
              setUserData({ ...userData, password: text });
            }}
            value={userData.password}
            secureTextEntry={hidePassword}
            togglePasswordVisibility={() => setHidePassword(!hidePassword)}
          />
          {errorMessage && (
            <MsgBox type={messageType}>{errorMessage}</MsgBox>
          )}
          {!isButtonDisabled ? (
            <StyledButton onPress={handleSubmit}>
              <ButtonText>SUBMIT</ButtonText>
            </StyledButton>
          ) : (
            <StyledButton disabled={true}>
              <ActivityIndicator size="large" color={inputPlaceholder} />
            </StyledButton>
          )}
        </StyledFormArea>
      </TwoFaModal>
    </Modal>
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

export default TwoFa;
