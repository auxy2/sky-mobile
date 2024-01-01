import React from "react";
import { StatusBar } from "expo-status-bar";

//////components--------
import {
    StyledContainer,
    Colors,
    ButtonStyle,
    ButtonText,
    MainContainer,
    ScreenTitles,
    GenerateCryptoIcon,
    GenerateCryptoTitle,
    GenerateCryptoDetails,
    GenerateCryptoContainer,
} from '../../styles/styles';
import { SafeAreaView } from "react-native-safe-area-context";

const { backgroundColor } = Colors;
const BtcWallet = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StyledContainer>
                <StatusBar style="light" backgroundColor={backgroundColor} />
                <MainContainer>
                    <ScreenTitles>BTC Wallet</ScreenTitles>
                    <GenerateCryptoContainer>
                        <GenerateCryptoIcon source={require("../../assets/icons/cryptowallet.png")} />
                        <GenerateCryptoTitle>Generate your SkyshowNg BTC {"\n"} wallet </GenerateCryptoTitle>
                        <GenerateCryptoDetails>A unique BTC adress would be{"\n"} generated for you</GenerateCryptoDetails>
                        <ButtonStyle onPress={() => navigation.navigate("GenerateBtcWallet")}>
                            <ButtonText>Generate BTC Wallet</ButtonText>
                        </ButtonStyle>
                    </GenerateCryptoContainer>
                </MainContainer>
            </StyledContainer>
        </SafeAreaView>
    );
};


export default BtcWallet;
