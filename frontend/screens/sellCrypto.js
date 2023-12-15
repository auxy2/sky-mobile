import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    Colors,
    ScreenTitles,
    MainContainer,
    CryptoLeftSide,
    StyledContainer,
    CryptoContainer,
    CryptoRightSide,
    ContentMarginTop,
    CryptoLeftSideText,
    CryptoLefttSideImage,

} from '../styles/styles';

const options = [
    {
        title: 'Sell BTC',
        right: require("../assets/icons/btc.png"),
        left: require("../assets/icons/transact.png"),
    },
    {
        title: 'Sell ETHEREUM',
        left: require("../assets/icons/transact3.png"),
        right: require("../assets/icons/transact3.png"),
    },
    {
        title: 'Sell USDT',
        left: require("../assets/icons/transact2.png"),
        right: require("../assets/icons/transact2.png"),
    },
];

const SellCrypto = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StyledContainer>
                <StatusBar style="light" backgroundColor={Colors.backgroundColor} />
                <MainContainer>
                    <ScreenTitles>Sell Cryptocurrency</ScreenTitles>
                    <ContentMarginTop></ContentMarginTop>
                    <CryptoContainer onPress={() => navigation.navigate("BtcWallet")}>
                        <CryptoLeftSide>
                            <CryptoLefttSideImage source={require("../assets/icons/transact.png")} />
                            <CryptoLeftSideText>Sell BTC</CryptoLeftSideText>
                        </CryptoLeftSide>
                        <CryptoRightSide source={require("../assets/icons/btc.png")} />
                    </CryptoContainer>
                    {/* === Ethereum wallet===== */}
                    <CryptoContainer onPress={() => navigation.navigate("EthereumWallet")}>
                        <CryptoLeftSide>
                            <CryptoLefttSideImage source={require("../assets/icons/transact3.png")} />
                            <CryptoLeftSideText>Sell ETHEREUM</CryptoLeftSideText>
                        </CryptoLeftSide>
                        <CryptoRightSide source={require("../assets/icons/ethereum.png")} />
                    </CryptoContainer>
                    {/* === USDT wallet===== */}
                    <CryptoContainer onPress={() => navigation.navigate("UsdtWallet")}>
                        <CryptoLeftSide>
                            <CryptoLefttSideImage source={require("../assets/icons/transact2.png")} />
                            <CryptoLeftSideText>Sell USDT</CryptoLeftSideText>
                        </CryptoLeftSide>
                        <CryptoRightSide source={require("../assets/icons/usdt.png")} />
                    </CryptoContainer>

                </MainContainer>
            </StyledContainer>
        </SafeAreaView>
    );
};


export default SellCrypto;
