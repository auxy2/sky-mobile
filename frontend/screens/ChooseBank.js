import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, TouchableOpacity, Text, FlatList, ActivityIndicator } from "react-native";
import Modal from "react-native-modal"; // Import react-native-modal

// ======icon==============
import { Octicons } from "@expo/vector-icons";

//////components-------
import {
  StyledContainer,
  StyledButton,
  ButtonText,
  Colors,
  MainContainer,
  ScreenTitles,
  StyledFormArea,
  StyledTextInput,
  StyledTextInputLabel,
  ContentMarginTop,
  SaveAccountDetails,
  ModalContainer,
  InputModal,
  InputModalTitle,
  ItemName,
  CloseButton,
  InputModalHeading,
} from "../styles/styles";
import { useFormik } from "formik";
import { useBank } from "../contexts/bank.context";
import { SafeAreaView } from "react-native-safe-area-context";

const { backgroundColor, inputPlaceholder } = Colors;

const ChooseBank = ({ navigation: { replace } }) => {
  const { create, verify, all, data, loading } = useBank();
  const [isBankModalVisible, setBankModalVisible] = useState(false);

  const formik = useFormik({
    initialValues: {
      BankName: "",
      AccountName: "",
      AccountNumber: "",
    },
    onSubmit: async (val) => {
      await create(val, () => {
        replace('AddBankAccount')
      }, console.error);
    },
  });

  React.useEffect(() => {
    if (!loading && (formik.values?.AccountNumber.length === 10 && formik.values?.BankName)) handleFetchBankDetails();
  }, [formik.values?.BankName, formik.values?.AccountName, formik.values?.AccountNumber]);

  React.useEffect(() => {
    if (data.length === 0) all();
  }, []);

  const onSubmit = async (val) => {
    await create(val, console.log, console.error);
  };

  const handleFetchBankDetails = async () => {
    await verify(formik.values, formik.setValues, alert);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StyledContainer>
        <StatusBar style="light" backgroundColor={backgroundColor} />
        <MainContainer>
          <ScreenTitles>Choose Bank</ScreenTitles>
          {/* ===============FORM SECTION================ */}
          <ContentMarginTop />
          <StyledFormArea>
            <StyledTextInputLabel>Account number</StyledTextInputLabel>
            <StyledTextInput
              placeholder=" Enter account number"
              placeholderTextColor={inputPlaceholder}
              onChangeText={formik.handleChange("AccountNumber")}
              onBlur={formik.handleBlur("AccountNumber")}
              value={formik.values?.AccountNumber}
              keyboardType="numeric"
            />
            <StyledTextInputLabel>Bank name</StyledTextInputLabel>
            <TouchableOpacity onPress={() => setBankModalVisible(prev => !prev)}>
              <StyledTextInput
                placeholder="Select"
                placeholderTextColor={inputPlaceholder}
                onChangeText={formik.handleChange("BankName")}
                onBlur={formik.handleBlur("BankName")}
                value={formik.values?.BankName}
                editable={false}
              />
            </TouchableOpacity>
            <StyledTextInputLabel>Account name</StyledTextInputLabel>
            <StyledTextInput
              onChangeText={formik.handleChange("AccountName")}
              onBlur={formik.handleBlur("AccountName")}
              value={formik.values?.AccountName}
              keyboardType="default"
              editable={false}
            />
            <StyledButton onPress={loading ? null : formik.handleSubmit}>
              <ButtonText>{loading && formik.values?.AccountName ? <ActivityIndicator /> : 'Save bank account'}</ButtonText>
            </StyledButton>
            <SaveAccountDetails>
              Ensure to add accounts you have easy {"\n"} access to
            </SaveAccountDetails>
          </StyledFormArea>
        </MainContainer>
      </StyledContainer>

      {/* Bank Selection Modal */}
      <Modal
        isVisible={isBankModalVisible}
        style={{ margin: 0 }} // Use this to make the modal cover the entire screen
        backdropOpacity={0.5}
        animationIn="slideInUp" // Specify the animation you want
        animationOut="slideOutDown" // Specify the animation for closing
        onBackdropPress={() => setBankModalVisible(prev => !prev)}
      >
        <ModalContainer>
          <InputModal>
            <InputModalHeading>
              <InputModalTitle>Select a Bank</InputModalTitle>
              <CloseButton onPress={() => setBankModalVisible(prev => !prev)}>
                <Octicons name="x" size={24} color="white" />
              </CloseButton>
            </InputModalHeading>
            <FlatList
              data={data} //bankData
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    formik.setValues({ ...formik.values, BankName: item.name });
                    setBankModalVisible(prev => !prev);
                  }}
                >
                  <ItemName>{item.name}</ItemName>
                </TouchableOpacity>
              )}
            />
          </InputModal>
        </ModalContainer>
      </Modal>
    </SafeAreaView>
  );
};

export default ChooseBank;