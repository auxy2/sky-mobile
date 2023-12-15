import React from "react";
import * as Styles from '../../styles/styles';
import { useCrypto } from "../../contexts/crypto.context";
import { ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default ({ navigation: { push }, route: { params } }) => {
    const { create, loading } = useCrypto();

    const handleGenerate = async () => {
        await create(params, () => {
            setTimeout(() => {
                push('GetCryptoAddress', params);
            }, 1000);
        }, console.error);
    };

    return <SafeAreaView style={styles.container}>
        <Styles.StyledContainer>
            <Styles.MainContainer>
                <Styles.ScreenTitles>{params?.name} Wallet</Styles.ScreenTitles>

                <Styles.GenerateCryptoContainer>
                    <Styles.GenerateCryptoIcon source={require("../../assets/icons/cryptowallet.png")} />
                    <Styles.GenerateCryptoTitle>Generate your SkyshowNg {"\n"} {params?.name} wallet</Styles.GenerateCryptoTitle>
                    <Styles.GenerateCryptoDetails>A unique {params?.name} adress would be{"\n"} generated for you</Styles.GenerateCryptoDetails>

                    <Styles.ButtonStyle onPress={loading ? null : handleGenerate}>
                        <Styles.ButtonText>{loading ? <ActivityIndicator /> : `Generate ${params?.name} Wallet`}</Styles.ButtonText>
                    </Styles.ButtonStyle>
                </Styles.GenerateCryptoContainer>

            </Styles.MainContainer>
        </Styles.StyledContainer>
    </SafeAreaView>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

