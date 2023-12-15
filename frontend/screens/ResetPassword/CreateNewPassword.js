import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { CommonActions, useRoute } from "@react-navigation/native";
import { Formik } from "formik";
import axios from "axios";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

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
  StyledTextInputLabel,
  SuccessAlertModal,
  AlertModalIcon,
  CheckIcon,
  AlertModalText,
  AlertModalTextSpan,
  NewPasswordTextContainer,
  NewPasswordText,
  ScreenTitles,
  MainContainer,
  ContentMarginTop,
} from "../../styles/styles";

import { SafeAreaView } from "react-native-safe-area-context";
import { isValidPassword } from "../../util/validator";
import { resetPass } from "../../util/auth";

const { inputPlaceholder, backgroundColor, success, danger } = Colors;

const CreateNewPassword = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [userData, setUserData] = useState({
    password: "",
    passConfirm: "",
  });

  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await resetPass(userData);
      if (response.status === "success") {
        setMessage(response.message);
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              {
                name: "AuthStack",
                state: {
                  routes: [
                    {
                      name: "Login",
                    },
                  ],
                  index: 0,
                },
              },
            ],
          })
        );
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StyledContainer>
          <StatusBar style="light" backgroundColor={backgroundColor} />
          <NewPasswordTextContainer>
            <ScreenTitles>Create new password</ScreenTitles>
          </NewPasswordTextContainer>
          <ContentMarginTop />
          <MainContainer>
            <ScrollView>
              <StyledFormArea>
                <StyledTextInputLabel>New password</StyledTextInputLabel>
                <MyTextInput
                  placeholder="Password"
                  placeholderTextColor={inputPlaceholder}
                  onChangeText={(text) => {
                    setUserData({ ...userData, password: text });
                  }}
                  value={userData.password}
                  secureTextEntry={hidePassword}
                  togglePasswordVisibility={() =>
                    setHidePassword(!hidePassword)
                  }
                />
                <StyledTextInputLabel>
                  Confirm new password
                </StyledTextInputLabel>
                <MyTextInput
                  placeholder="Confirm password"
                  placeholderTextColor={inputPlaceholder}
                  onChangeText={(text) => {
                    setUserData({ ...userData, passConfirm: text });
                  }}
                  value={userData.passConfirm}
                  secureTextEntry={hideConfirmPassword}
                  togglePasswordVisibility={() =>
                    setHideConfirmPassword(!hideConfirmPassword)
                  }
                />

                {/* <MsgBox>dwdss</MsgBox> */}
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>UPDATE PASSWORD</ButtonText>
                </StyledButton>
              </StyledFormArea>
            </ScrollView>
          </MainContainer>
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

export default CreateNewPassword;
