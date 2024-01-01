import React from "react";
import { api } from '../../util/auth';
import Modal from "react-native-modal";
import { StatusBar } from "expo-status-bar";
import { Octicons } from '@expo/vector-icons';
import { View, TouchableOpacity, FlatList, Image, ScrollView } from "react-native";

import {
  StyledContainer,
  StyledButton,
  ButtonText,
  Colors,
  MainContainer,
  StyledFormArea,
  StyledTextInput,
  StyledTextInputLabel,
  RateEntryText,
  ContentMarginTop,
  ShortModalContainer,
  ShortModal,
  ShortModalTitle,
  ShortModalItemName,
  CloseButton,
  ShortModalHeading,
  ShortModalItemContainer,
  SmallLeftInput,
  RightSmallInput,
  NairaText,
  DoubleInput,
} from '../../styles/styles';
import { Formik } from "formik";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useCrypto } from "../../contexts/crypto.context";

const { backgroundColor, inputPlaceholder } = Colors;

const CrptoRate = () => {
  const navigation = useNavigation();
  const { rates, allRates } = useCrypto();
  const [cryptoRate, setCryptoRate] = React.useState(0);
  const [categoryModalVisible, setCategoryModalVisible] = React.useState(false);
  const [userData, setUserData] = React.useState({ selectedCategory: "", product: "", amount: 0 });

  // Function to handle changes in the amount input and calculate the amount in USD
  const handleAmountChange = (amount) => {
    const amountInUSD = amount * cryptoRate;
    setUserData({ ...userData, product: amountInUSD, amount }); // Add 'amount' to the 'userData' object
  };

  const toggleCardCategoryModal = () => setCategoryModalVisible(!categoryModalVisible);

  React.useEffect(() => {
    if (rates.length === 0) allRates();
  }, []);


  const rate = React.useMemo(() => +(rates.find(item => item.product == userData.product)?.rate || '0') * userData.amount, [userData.amount, userData.product])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StyledContainer>
        <StatusBar style="light" backgroundColor={backgroundColor} />
        <MainContainer>
          <ScrollView>
            <RateEntryText>Check the real value of your crypto</RateEntryText>
            <ContentMarginTop />
            <Formik initialValues={userData}
              onSubmit={() => {
                console.log(userData, navigation);
                navigation.navigate('SellCrypto');
              }}
            >

              {({ handleSubmit }) => (

                <StyledFormArea>
                  <StyledTextInputLabel>Currency</StyledTextInputLabel>
                  <TouchableOpacity onPress={toggleCardCategoryModal}>
                    <StyledTextInput
                      editable={false}
                      placeholder="Select"
                      value={userData.product}
                      placeholderTextColor={inputPlaceholder}
                      onChangeText={amount => setUserData(prev => ({ ...prev, amount }))}
                    />
                  </TouchableOpacity>

                  <StyledTextInputLabel>Amount in USD</StyledTextInputLabel>
                  <View>
                    <StyledTextInput
                      placeholder="Amount"
                      keyboardType="numeric"
                      value={userData.amount}
                      placeholderTextColor={inputPlaceholder}
                      onChangeText={amount => setUserData(prev => ({ ...prev, amount }))}
                    />
                  </View>

                  <DoubleInput>
                    <SmallLeftInput>
                      <Image source={require("../../assets/images/flag.png")} style={{ width: 20, height: 20 }} />
                      <NairaText>NGN</NairaText>
                    </SmallLeftInput>
                    <RightSmallInput
                      editable={false}
                      placeholder="Rate"
                      value={rate.toLocaleString()}
                      placeholderTextColor={inputPlaceholder}
                    />
                  </DoubleInput>

                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Sell Crypto</ButtonText>
                  </StyledButton>
                </StyledFormArea>
              )}
            </Formik>
          </ScrollView>
        </MainContainer>
      </StyledContainer>

      <Modal
        isVisible={categoryModalVisible}
        style={{ margin: 0 }}
        onBackdropPress={toggleCardCategoryModal}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <ShortModalContainer>
          <ShortModal>
            <ShortModalHeading>
              <ShortModalTitle>Select a Category</ShortModalTitle>
              <CloseButton onPress={toggleCardCategoryModal}>
                <Octicons name="x" size={24} color="white" />
              </CloseButton>
            </ShortModalHeading>
            <FlatList
              data={rates}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => {
                  setUserData(prev => ({ ...prev, product: item?.product || '' }));
                  setCategoryModalVisible(false);
                }}>
                  <ShortModalItemContainer>
                    {item.image && (
                      <Image
                        source={{ uri: item.image }}
                        style={{ width: 25, height: 25, marginRight: 10, borderRadius: 50 }}
                      />
                    )}
                    <ShortModalItemName>{item?.product}</ShortModalItemName>
                  </ShortModalItemContainer>
                </TouchableOpacity>
              )}
            />
          </ShortModal>
        </ShortModalContainer>
      </Modal>
    </SafeAreaView>
  );
};

export default CrptoRate;
