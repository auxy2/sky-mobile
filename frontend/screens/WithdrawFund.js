import React from "react";
import { useFormik } from "formik";
import Modal from "react-native-modal";
import { withdraw } from "../util/auth";
import * as Styles from "../styles/styles";
import { StatusBar } from "expo-status-bar";
import WithdrawFunPin from "./WithdrawFunPin";
import { Octicons } from "@expo/vector-icons";
import { useBank } from '../contexts/bank.context';
import { useAuthentication } from "../contexts/auth.context";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Animated, StyleSheet, Modal as RNModal, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback } from "react-native";

const { backgroundColor, inputPlaceholder, white } = Styles.Colors;

const WithdrawFund = ({ navigation: { navigate } }) => {
  const { bank, get, loading } = useBank();
  const { user, setUser } = useAuthentication();
  const [visible, setVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [selectedBank, setSelectedBank] = React.useState("");
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = React.useState(false);
  const [isWithdrawPinVissible, setWithdrawPinVissible] = React.useState(false);

  const scale = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (!bank) get();
  }, []);

  React.useEffect(() => {
    Animated.timing(scale, {
      duration: 4000,
      toValue: +visible,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const handleSelectedAccount = () => {
    setVisible(false);
    setSelectedBank(bank?.AccountNumber);
  }

  const toggleWidrawPinModal = () => {
    setWithdrawPinVissible(!isWithdrawPinVissible);
  };

  const toggleSuccessModal = () => {
    setSuccessModalVisible(!isSuccessModalVisible);
  };

  const formik = useFormik({
    initialValues: { amount: "" },
    onSubmit: async (values) => {
      try {
        setIsButtonDisabled(true);
        const balance = parseFloat(String(user?.wallet_Balance).replace(/,/g, ""));
        console.log(balance);
        if (values.amount > balance) {
          throw Error("Insufficient balance");
        }
        if (values.amount < balance) setErrorMessage("");
        const result = await withdraw(values);
        console.log(result);
        if (result.status === "success") {
          toggleSuccessModal();
          setUser(prev => ({ ...prev, wallet_Balance: result.wallet_Balance }))
        }
      } catch (error) {
        setErrorMessage("check your intenet and try again");
      } finally {
        setIsButtonDisabled(false);
      }
    }
  });

  const valid = React.useMemo(() => Boolean(formik.values.amount.length && selectedBank.length), [formik.values, selectedBank]);

  const handleWithdraw = async (pin) => {
    try {
      let res = await withdraw({ pin, ...formik.values });
      if (res.status !== 'success') throw new Error(res.message);

      setUser((prev = {}) => ({ ...prev, wallet_Balance: res?.wallet_Balance }));
      setWithdrawPinVissible(false);
    } catch (error) {
      console.error(error);
      setErrorMessage(error?.message || error);
    };
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Styles.StyledContainer>
        <StatusBar style="light" backgroundColor={backgroundColor} />
        <Styles.MainContainer>
          <Styles.ScreenTitles>Withdraw Fund</Styles.ScreenTitles>
          <Styles.BalanceContainer>
            <Styles.BalanceTitle>Account Balance</Styles.BalanceTitle>
            <Styles.Balance>
              <Styles.NairaIcon />
              <Styles.BalanceAmount>{user?.wallet_Balance}</Styles.BalanceAmount>
            </Styles.Balance>
          </Styles.BalanceContainer>
          <Styles.StyledFormArea>
            <Styles.StyledTextInputLabel>Amount</Styles.StyledTextInputLabel>
            <Styles.StyledTextInput
              placeholder="Enter amount here"
              placeholderTextColor={inputPlaceholder}
              onChangeText={formik.handleChange("amount")}
              onBlur={formik.handleBlur("amount")}
              value={formik.values.amount}
              keyboardType="numeric"
            />
            <Styles.StyledTextInputLabel>Bank Account</Styles.StyledTextInputLabel>
            <TouchableOpacity onPress={() => setVisible(prev => !prev)}>
              <Styles.StyledTextInput
                placeholder="Choose bank"
                placeholderTextColor={inputPlaceholder}
                value={selectedBank}
                editable={false}
              />
            </TouchableOpacity>
            <Styles.MsgBox>{errorMessage}</Styles.MsgBox>
            <Styles.StyledButton
              disabled={isButtonDisabled}
              onPress={valid ? toggleWidrawPinModal : null}
            >
              {isButtonDisabled ? <ActivityIndicator size={"large"} /> : <Styles.ButtonText>WITHDRAW</Styles.ButtonText>}
            </Styles.StyledButton>
          </Styles.StyledFormArea>
        </Styles.MainContainer>
      </Styles.StyledContainer>

      <RNModal transparent visible={visible}>
          <TouchableWithoutFeedback onPress={() => setVisible(false)}>
            <View style={styles.container}>
              {loading ? (
                <ActivityIndicator size='large' />
              ) : bank ? (
                <View style={styles.wrapper}>
                  <Styles.AddedBankInfo onPress={handleSelectedAccount}>
                    <View>
                      <Styles.ItemName inputPlaceholder="white">{bank?.AccountNumber}</Styles.ItemName>
                      <Styles.ItemName inputPlaceholder="white">{bank?.BankName}</Styles.ItemName>
                    </View>
                  </Styles.AddedBankInfo>
                </View>
              ) : (
                <Styles.NoBankAlert backgroundColor="white">
                  <Styles.NoBankAlertText>No account added yet</Styles.NoBankAlertText>
                  <Styles.AddBankButton onPress={() => { setVisible(false); navigate("ChooseBank"); }}>
                    <Styles.AddBankButtonText>Add Bank</Styles.AddBankButtonText>
                  </Styles.AddBankButton>
                </Styles.NoBankAlert>
              )}
            </View>
          </TouchableWithoutFeedback>
          </RNModal>


    

      <Modal
        isVisible={isWithdrawPinVissible}
        style={{ margin: 0 }}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <WithdrawFunPin withdraw={handleWithdraw} toggleWidrawPinModal={toggleWidrawPinModal} />
      </Modal>

      <Modal
        isVisible={isSuccessModalVisible}
        style={{ margin: 0 }}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <Styles.SuccessAlertModal>
          <Styles.AlertModalIcon onPress={toggleSuccessModal}>
            <Octicons name="x" size={30} color={white} />
          </Styles.AlertModalIcon>
          <Styles.CheckIcon source={require("./../assets/icons/check.png")} />
          <Styles.AlertModalText>Your transaction is processing!</Styles.AlertModalText>
          <Styles.AlertModalTextSpan>
            You will be notified once your transaction is complete.
          </Styles.AlertModalTextSpan>
        </Styles.SuccessAlertModal>
      </Modal>

    </SafeAreaView>
  );
};

export default WithdrawFund;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 50,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  wrapper: {
    padding: 15,
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'black',
  },
});
