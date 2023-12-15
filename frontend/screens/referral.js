import React from "react";
import { api, refer } from "../util/auth";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ======icon==============

//////components--------
import {
  Colors,
  ButtonText,
  ScreenTitles,
  MainContainer,
  CryptoCopyBtn,
  StyledContainer,
  GenerateCryptoIcon,
  CryptoAddressInput,
  GenerateCryptoTitle,
  CryptoInputContainer,
  GenerateCryptoDetails,
  GenerateCryptoContainer,
} from "../styles/styles";


const { backgroundColor, white } = Colors;
const Referral = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [referLink, setReferLink] = React.useState("");

  React.useEffect(() => {
    fetch();
  }, []);

  React.useEffect(() => {
    if (data && data?.active) {
      (async () => {
        setLoading(true);

        const res = await refer();
        setReferLink(res.link);

        setLoading(false);
      })();
    }
  }, [data]);

  const fetch = async () => {
    setLoading(true);
    try {
      let res = await api.get('Admin/ReferralRate');
      if (res.data?.status !== 'success') throw new Error('Something went wrong');

      setData(res.data);
    } catch (err) {
      console.error(err);
    }; setLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StyledContainer>
        <StatusBar style="light" backgroundColor={backgroundColor} />
        <MainContainer>
          <ScreenTitles>Referral</ScreenTitles>
          {loading ? <ActivityIndicator /> : data?.active ? <GenerateCryptoContainer>
            <GenerateCryptoIcon
              source={require("../assets/icons/cryptowallet.png")}
            />
            <GenerateCryptoTitle>
              Refer your friends and get N{data?.refRate}
            </GenerateCryptoTitle>
            <GenerateCryptoDetails>
              Earn referral bonus when your friends signs up {"\n"} and trade
              successfully.
            </GenerateCryptoDetails>
            <CryptoInputContainer>
              <CryptoAddressInput editable={false} placeholder={referLink} placeholderTextColor={white} />
              <CryptoCopyBtn>
                <ButtonText>Copy</ButtonText>
              </CryptoCopyBtn>
            </CryptoInputContainer>
          </GenerateCryptoContainer> : <Text>No referral program going on</Text>}
        </MainContainer>
      </StyledContainer>
    </SafeAreaView>
  );
};

export default Referral;
