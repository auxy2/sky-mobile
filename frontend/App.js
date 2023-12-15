import React from 'react';
import "react-native-gesture-handler";
import MainNavigators from "./navigation/MainNavigators";
import { NavigationContainer } from "@react-navigation/native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

// contexts
import AuthProvider from './contexts/auth.context';
import BankProvider from './contexts/bank.context';
import RateProvider from './contexts/rate.context';
import ThemeProvider from './contexts/theme.context';
import CryptoProvider from './contexts/crypto.context';


export default function App() {
  return <BottomSheetModalProvider>
    <NavigationContainer>
      <AuthProvider>
        <BankProvider>
          <RateProvider>
            <CryptoProvider>
              <ThemeProvider>
                <MainNavigators />
              </ThemeProvider>
            </CryptoProvider>
          </RateProvider>
        </BankProvider>
      </AuthProvider>
    </NavigationContainer>
  </BottomSheetModalProvider>;
};
