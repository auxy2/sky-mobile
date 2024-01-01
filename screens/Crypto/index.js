import React from "react";
import { StyleSheet } from "react-native";
import * as Styles from '../../styles/styles';
import { SafeAreaView } from "react-native-safe-area-context";
import { useCrypto, options } from "../../contexts/crypto.context";

export default ({ navigation: { push } }) => {
    const { all, rates, allRates, data, loading } = useCrypto();

    React.useEffect(() => {
        if (data.length === 0) all();
        if (rates.length === 0) allRates();
    }, []);

    return <SafeAreaView style={styles.container}>
        <Styles.StyledContainer>
            <Styles.MainContainer>
                <Styles.ScreenTitles>Sell Cryptocurrency</Styles.ScreenTitles>
                <Styles.ContentMarginTop />

                {options.map(item => (
                    <Styles.CryptoContainer key={item.title} onPress={loading ? null : () => push(data?.[item.id] ? 'GetCryptoAddress' : 'GenerateCryptoAddress', item)}>
                        <Styles.CryptoLeftSide>
                            <Styles.CryptoLefttSideImage source={item.left} />
                            <Styles.CryptoLeftSideText>
                                {item.title}
                            </Styles.CryptoLeftSideText>
                        </Styles.CryptoLeftSide>
                        <Styles.CryptoRightSide source={item.right} />
                    </Styles.CryptoContainer>
                ))}

            </Styles.MainContainer>
        </Styles.StyledContainer>
    </SafeAreaView>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

