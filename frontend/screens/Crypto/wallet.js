import React from "react";
import Modal from "react-native-modal";
import QRCode from "react-native-qrcode-svg";
import * as Styles from '../../styles/styles';
import { Octicons } from "@expo/vector-icons";
import { useCrypto } from "../../contexts/crypto.context";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default ({ navigation: { push }, route: { params } }) => {
  const { data, rates } = useCrypto();
  const [rate, setRate] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [selectedNotifyMethod, setSelectedNotifyMethod] = React.useState("");

  React.useEffect(() => {
    let one = rates.find(item => item.product == params.id);
    console.log(one, rates, params);
    setRate(one);
  }, [params, rates]);

  React.useEffect(() => {
    if (copied) {
      let id = setTimeout(() => setCopied(false), 3000);
      return () => clearTimeout(id);
    }
  }, [copied]);

  const handleNotifyMethodSelection = (method) => {
    setSelectedNotifyMethod(method);
    setVisible(prev => !prev);
  };


  return <SafeAreaView style={styles.container}>
    <Styles.StyledContainer>
      <Styles.MainContainer>
        <Styles.ScreenTitles>{params?.name} Wallet</Styles.ScreenTitles>
        {copied && <View style={styles.header}><Text style={styles.txt}>Copied</Text></View>}

        <Styles.WalletAddressContainer>
          <View style={styles.qr}>
            {data?.[params.id] ? <QRCode size={200} color="black" backgroundColor="white" value={data[params.id]} /> : null}
          </View>

          <Styles.DownloadQrCode>
            <Octicons name="download" size={18} color={Styles.Colors.white} />
            <Styles.DownloadQrCodeText>Download QR Code</Styles.DownloadQrCodeText>
          </Styles.DownloadQrCode>

          <Styles.CryptoInputContainer>
            <Styles.CryptoAddressInput disabled value={data?.[params.id]} />
            <Styles.CryptoCopyBtn>
              <Styles.ButtonText>Copy</Styles.ButtonText>
            </Styles.CryptoCopyBtn>
          </Styles.CryptoInputContainer>

          <Styles.CryptoAddressDetails>
            You can receive {params?.name} with the QR code or address above. It would
            automatically be converted and added to your account balance.
          </Styles.CryptoAddressDetails>

          <Styles.StyledButtonVarient onPress={() => setVisible(prev => !prev)}>
            <Styles.ButtonTextBlue>View {params?.name} rates</Styles.ButtonTextBlue>
          </Styles.StyledButtonVarient>
        </Styles.WalletAddressContainer>

      </Styles.MainContainer>
    </Styles.StyledContainer>

    {/* ====================Crypto rates modal================= */}
    <Modal
      isVisible={visible}
      style={{ margin: 0 }}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackdropPress={() => setVisible(prev => !prev)}
    >
      <Styles.ShortModalContainer>
        <Styles.ShortModal>
          <Styles.ShortModalHeading>
            <Styles.ShortModalTitle>Select a Notification Method</Styles.ShortModalTitle>
            <Styles.CloseButton onPress={() => setVisible(prev => !prev)}>
              <Octicons name="x" size={24} color="white" />
            </Styles.CloseButton>
          </Styles.ShortModalHeading>
          <FlatList
            data={["Email", "SMS", "Push Notification"]}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleNotifyMethodSelection(item)}>
                <Styles.ShortModalItemContainer>
                  <Styles.ShortModalItemName>{item}</Styles.ShortModalItemName>
                </Styles.ShortModalItemContainer>
              </TouchableOpacity>
            )}
          />
        </Styles.ShortModal>
      </Styles.ShortModalContainer>
    </Modal>
  </SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FFF'
  },
  txt: {
    color: Styles.Colors.backgroundColor,
  },
  qr: {
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
