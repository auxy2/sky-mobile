import React from "react";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//screens --------
import ResetPin from "../screens/ResetPin";
import LoadingBarScreen from "../components/LoadingBar";

// ======Wallet screens================
import ChooseBank from "../screens/ChooseBank";
import BankCard from "../screens/Bank/bankCard";
import BankDetails from "../screens/Bank/BankDetails";
import AddBankAccount from "../screens/Bank/AddBankAccount";

import SellGiftcard from "../screens/SellGiftCard/SellGiftcard";

import CreatePin from "../screens/CreatePin";
import BtcWallet from "../screens/BtcWallet/BtcWallet";
import ChangePassword from "../screens/ChangePassword";

import UsdtWallet from "../screens/UsdtWallet";
import WithdrawFund from "../screens/WithdrawFund";
import HighCardRates from "../screens/HighCardRates";
import EthereumWallet from "../screens/EthereumWallet";
import SignUpOtp from "../screens/GetStarted/SignUpOtp";
import WithdrawSuccess from "../screens/WithdrawSuccess";
import GeneralSettings from "../screens/GeneralSettings";
import SecuritySettings from "../screens/SecuritySettings";
import GenerateUsdtWallet from "../screens/GenerateUsdtWallet";
import Transactions from "../screens/Transactions/Transactions";
import RateCalculator from "../screens/RateCalculator/RateCalculator";
import GenerateBtcWallet from "../screens/BtcWallet/GenerateBtcWallet";
import GenerateEthereumWallet from "../screens/GenerateEthereumWallet";

import Home from "../screens/home";
import Settings from "../screens/settings";
import SellCrypto from "../screens/Crypto";
import Tutorials from "../screens/tutorials";
import Login from "../screens/GetStarted/login";
import Signup from "../screens/GetStarted/signup";
import GetCryptoAddress from "../screens/Crypto/wallet";
import GetStarted from "../screens/GetStarted/getStarted";
import SignUpAuth from "../screens/GetStarted/signUpAuth";
import GenerateCryptoAddress from "../screens/Crypto/generate";
import GiftCardConfirmation from "../screens/GiftCardConfirmation";

// side bar screens==========
import Support from "../screens/Support";
import Referral from "../screens/referral";
import ProfileSettings from "../screens/ProfileSettings";

///page=====
import ContactUs from "../screens/ContactUs";
import Wallet from "../screens/wallet/wallet";
import Chat from "../screens/ChatScreen/Chat";
import CustomDrawer from "../screens/CustomDrawer";
import TemporaryScreen from "../components/TemporaryScreen";
import Notification from "../screens/Notifications/Notification";
import UserVerification from "../screens/UserVerification/UserVerification";
import NotificationDetails from "../screens/Notifications/NotificationDetails";
import GiftcardTransactionDetails from "../screens/Transactions/Giftcard.TransactionDetails";

// ====Reset password screens===========
import ResetOtp from "../screens/ResetPassword/ResetOtp";
import ResetOptions from "../screens/ResetPassword/ReserOptions";
import CreateNewPassword from "../screens/ResetPassword/CreateNewPassword";

// ==== rate alert screeens==========
import RateAlert from "../screens/RateAlert/RateAlert";
import AlertList from "../screens/RateAlert/AlertList";
import WithdrawFunPin from "../screens/WithdrawFunPin";
import RateAlertForm from "../screens/RateAlert/RateAlertForm";
import RateAlertDetails from "../screens/RateAlert/RateAlertDetails";

// Theme custom hook========
import { useTheme } from "../contexts/theme.context";


const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Authentication stack
function AuthStack() {
  const { theme } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: "",
        headerTransparent: true,
        headerTintColor: theme.white,
        headerLeftContainerStyle: { paddingLeft: 20, },
        headerStyle: { backgroundColor: "transparent" },
      }} initialRouteName="GetStarted"
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ResetOtp" component={ResetOtp} />
      <Stack.Screen name="SignUpOtp" component={SignUpOtp} />
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="SignUpAuth" component={SignUpAuth} />
      <Stack.Screen name="ResetOptions" component={ResetOptions} />
      <Stack.Screen name="TemporaryScreen" component={TemporaryScreen} />
      <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} />
    </Stack.Navigator>
  );
}

// ===========Loading bar screens===================

function LoadingStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: "",
        headerTransparent: true,
        headerTintColor: "white",
        headerLeftContainerStyle: { paddingLeft: 20 },
        headerStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen name="LoadingBarScreen" component={LoadingBarScreen} />
    </Stack.Navigator>
  );
}

//===================== Drawer stack=========================
function DrawerStack({ navigation }) {
  const { theme } = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerTintColor: theme.white,
        drawerActiveTintColor: theme.white,
        drawerInactiveTintColor: theme.white,
        drawerActiveBackgroundColor: "none",
        drawerLabelStyle: {
          fontSize: 13,
          marginLeft: -20,
          fontWeight: "500",
          paddingBottom: 18,
          borderBottomWidth: 1,
          borderBottomColor: theme.white,
        },
        headerStyle: { backgroundColor: theme.backgroundColor, elevation: 0, shadowOpacity: 0 },
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
            <Ionicons name="notifications-outline" size={24} color={theme.white} paddingRight={16} />
          </TouchableOpacity>
        ),
      }}
    >
      <Drawer.Screen
        name="HomeStack"
        component={Home}
        options={{
          headerTitle: "",
          drawerIcon: () => (
            <Ionicons name="person-outline" size={18} color="white" />
          ),
        }}
      />
      <Drawer.Screen
        name="ProfileSettings"
        component={ProfileSettings}
        options={{
          drawerIcon: () => (
            <Ionicons name="person-outline" size={18} color="white" />
          ),
        }}
      />
      <Drawer.Screen
        name="RateCalculator"
        component={RateCalculator}
        options={{
          drawerIcon: () => (
            <Ionicons name="person-outline" size={18} color="white" />
          ),
        }}
      />
      <Drawer.Screen
        name="AddBankAccount"
        component={AddBankAccount}
        options={{
          drawerIcon: () => (
            <Ionicons name="settings-outline" size={18} color="white" />
          ),
        }}
      />
      <Drawer.Screen
        name="Referral"
        component={Referral}
        options={{
          drawerIcon: () => (
            <Ionicons name="person-outline" size={18} color="white" />
          ),
        }}
      />
      <Drawer.Screen
        name="Support"
        component={Support}
        options={{
          drawerIcon: () => (
            <Ionicons name="person-outline" size={18} color="white" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

// Bottom Tab Navigator
function TabNavigator() {
  const { theme } = useTheme();
  
  return (
    <Tab.Navigator
      options={{ style: { padding: 30 } }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.tabBarActiveBG,
        tabBarInactiveTintColor: theme.tabBarInactiveBG,
        tabBarItemStyle: { paddingBottom: 10 },
        tabBarActiveBackgroundColor: "rgba(19, 80, 232, 0.3)",
        tabBarStyle: { backgroundColor: theme.tabBarColor, padding: 10, height: 70 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={DrawerStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={Transactions}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="receipt-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Main navigation
export default function MainNavigators() {
  const { theme } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: "",
        headerTransparent: true,
        headerTintColor: theme.white,
        headerLeftContainerStyle: { paddingLeft: 20 },
        headerStyle: { backgroundColor: "transparent" },
      }}
      initialRouteName="AuthStack"
    // initialRouteName="MainContent"
    >
      <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }} />
      <Stack.Screen name="MainContent" component={TabNavigator} options={{ headerShown: false }} />

      <Stack.Group>
        <Stack.Screen name="BtcWallet" component={BtcWallet} />
        <Stack.Screen name="SellCrypto" component={SellCrypto} />
        <Stack.Screen name="SellGiftcard" component={SellGiftcard} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="HighCardRates" component={HighCardRates} />
        <Stack.Screen name="GetCryptoAddress" component={GetCryptoAddress} />
        <Stack.Screen name="NotificationDetails" component={NotificationDetails} />
        <Stack.Screen name="GenerateCryptoAddress" component={GenerateCryptoAddress} />

        <Stack.Screen name="Support" component={Support} />
        <Stack.Screen name="Referral" component={Referral} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="UsdtWallet" component={UsdtWallet} />
        <Stack.Screen name="RateCalculator" component={RateCalculator} />
        <Stack.Screen name="LoadingBarScreen" component={LoadingStack} />
        <Stack.Screen name="EthereumWallet" component={EthereumWallet} />
        <Stack.Screen name="GenerateBtcWallet" component={GenerateBtcWallet} />
        <Stack.Screen name="GenerateUsdtWallet" component={GenerateUsdtWallet} />
        <Stack.Screen name="GiftCardConfirmation" component={GiftCardConfirmation} />
        <Stack.Screen name="GenerateEthereumWallet" component={GenerateEthereumWallet} />

      </Stack.Group>

      {/* { ─── Wallet Screens ──────────────────────────────────────────────} */}
      <Stack.Group>
        <Stack.Screen name="BankCard" component={BankCard} />
        <Stack.Screen name="ChooseBank" component={ChooseBank} />
        <Stack.Screen name="BankDetails" component={BankDetails} />
        <Stack.Screen name="WithdrawFund" component={WithdrawFund} />
        <Stack.Screen name="AddBankAccount" component={AddBankAccount} />
        <Stack.Screen name="WithdrawFunPin" component={WithdrawFunPin} />
        <Stack.Screen name="WithdrawSuccess" component={WithdrawSuccess} />
      </Stack.Group>

      {/* { ─── Transaction Screens ──────────────────────────────────────────────} */}
      <Stack.Group>
        <Stack.Screen name="GiftcardTransactionDetails" component={GiftcardTransactionDetails} />
      </Stack.Group>

      {/* { ─── Settings Screens ──────────────────────────────────────────────} */}
      <Stack.Group>
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="ResetPin" component={ResetPin} />
        <Stack.Screen name="RateAlert" component={RateAlert} />
        <Stack.Screen name="Tutorials" component={Tutorials} />
        <Stack.Screen name="CreatePin" component={CreatePin} />
        <Stack.Screen name="AlertList" component={AlertList} />
        <Stack.Screen name="RateAlertForm" component={RateAlertForm} />
        <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
        <Stack.Screen name="GeneralSettings" component={GeneralSettings} />
        <Stack.Screen name="UserVerification" component={UserVerification} />
        <Stack.Screen name="SecuritySettings" component={SecuritySettings} />

        {/* ====reset password========== */}
        <Stack.Screen name="ResetOtp" component={ResetOtp} />
        <Stack.Screen name="ResetOptions" component={ResetOptions} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="RateAlertDetails" component={RateAlertDetails} />
        <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
