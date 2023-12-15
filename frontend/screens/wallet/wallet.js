import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, TouchableOpacity, Text, FlatList } from "react-native";

//icons ========
import { Octicons } from "@expo/vector-icons";

//////components--------
import {
  Colors,
  UserWalletScreen,
  UserWalletContainer,
  WalletTitle,
  WalletBalanceTitle,
  WalletBalanceContent,
  WalletBalance,
  WalletButtonContainer,
  WalletButton,
  WalletButtonText,
  // BreakDownContainer,
  // BreakDownText,
  WithdrawalHistoryContainer,
  WithdrawalText,
  WithdrawalHistory,
  ReceiptImage,
  WithdrawalReceiptContainer,
  ReceiptText,
} from "../../styles/styles";
import Withdrawals from "./withdrawals";
import { ngnHistory } from "../../util/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthentication } from "../../contexts/auth.context";

const { darkBlue } = Colors;

const Wallet = ({ navigation }) => {
  const { user } = useAuthentication();
  const [withdrawHistory, setWithdrwHistory] = useState([]);
  useEffect(() => {
    const data = async () => {
      try {
        const response = await ngnHistory();
        console.log(response);
        if (response.status === "success") {
          setWithdrwHistory((prev) => [...prev, ...response.trns]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    // data();
    const timeoutId = setTimeout(data, 2000);

    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: darkBlue }}>
      {console.log(withdrawHistory)}
      <UserWalletScreen>
        <StatusBar style="light" backgroundColor={darkBlue} />
        <UserWalletContainer>
          <WalletTitle>Wallet</WalletTitle>
          <WalletBalanceTitle>Account Balance</WalletBalanceTitle>
          <WalletBalanceContent>
            <WalletBalance>{user?.wallet_Balance}</WalletBalance>
          </WalletBalanceContent>
          <WalletButtonContainer>
            <WalletButton onPress={() => navigation.navigate("WithdrawFund")}>
              <WalletButtonText>Withdraw Funds</WalletButtonText>
            </WalletButton>
            <WalletButton onPress={() => navigation.navigate("AddBankAccount")}>
              <WalletButtonText>Bank Accounts</WalletButtonText>
            </WalletButton>
          </WalletButtonContainer>
          {/* <BreakDownContainer>
                        <BreakDownText>View Breakdown</BreakDownText>
                    </BreakDownContainer> */}
          {/* Replace the icon with withdraw history if found */}
        </UserWalletContainer>
        <WithdrawalHistoryContainer>
          <WithdrawalText>Withdrawals</WithdrawalText>
          <WithdrawalHistory>
            {/* =======widthdrawal history=========== */}
            <Withdrawals history={withdrawHistory} />
          </WithdrawalHistory>
        </WithdrawalHistoryContainer>
      </UserWalletScreen>
    </SafeAreaView>
  );
};

export default Wallet;
