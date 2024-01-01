import React, { useContext, useState } from "react";
import { StatusBar, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import axios from "axios"; // Make sure axios is installed
import {
  StyledContainer,
  MainContainer,
  StyledFormArea,
  StyledTextInput,
  ButtonText,
  StyledButton,
  Colors,
  SignupOtpContent,
  SignupOtpText,
  MsgBox,
} from "../../styles/styles";
import { useAuthentication } from "../../contexts/auth.context";

const { inputPlaceholder, backgroundColor } = Colors;

const SignUpOtp = ({ navigation }) => {
  const { verify, loading } = useAuthentication();
  // const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ name: "", balance: "" });

  const handleSubmit = async ({ otp }, { setFieldError }) => {
    await verify(otp, () =>
      navigation.navigate("MainContent"),
      err => setFieldError('otp', err.message)
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StyledContainer>
        <StatusBar style="light" backgroundColor={backgroundColor} />
        <MainContainer>
          <SignupOtpContent>
            <SignupOtpText>Enter the OTP that was sent to you!</SignupOtpText>
          </SignupOtpContent>
          <Formik
            initialValues={{ otp: "" }}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <StyledFormArea>
                <StyledTextInput
                  placeholder="* * * * * *"
                  placeholderTextColor={inputPlaceholder}
                  onChangeText={handleChange("otp")}
                  onBlur={handleBlur("otp")}
                  value={values.otp}
                  keyboardType="numeric"
                />
                {errors.otp && <MsgBox>{errors.otp}</MsgBox>}

                <StyledButton
                  onPress={handleSubmit}
                  disabled={loading}
                  style={{ marginTop: 20 }}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <ButtonText>VERIFY</ButtonText>
                  )}
                </StyledButton>
              </StyledFormArea>
            )}
          </Formik>
        </MainContainer>
      </StyledContainer>
    </SafeAreaView>
  );
};

export default SignUpOtp;
