import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, TouchableOpacity, Text, FlatList, Image, ScrollView } from "react-native"; // Import Image component
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Formik } from "formik";

// ======icon==============
import { Octicons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';

import {
  StyledContainer,
  StyledButton,
  ButtonText,
  Colors,
  MainContainer,
  ScreenTitles,
  StyledFormArea,
  StyledTextInput,
  StyledTextInputLabel,
  RateEntryText,
  ContentMarginTop,
  FooterText,
  ShortModalContainer,
  ShortModal,
  ShortModalTitle,
  ShortModalItemName,
  CloseButton,
  ShortModalHeading,
  ShortModalItemContainer,
  SuccessAlert,
  AlertText,
  AlertIcon,
  DoubleInput,
  SmallLeftInput,
  RightSmallInput,
  NairaText,
  CheckHighrateText,
  RateItemContainer,
  RateContainer,
  RateItemsContent,
  RateCalculatorRates,
  RatePriceInfo,
  MsgBox,

} from '../../styles/styles';
import { giftCardRateCalc } from "../../util/auth";


const { backgroundColor, inputPlaceholder, white, success, primary } = Colors;

// card Category ========
// const cardCategory = [
//   {
//     id: 1, image: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg", name: "AMAZON CARD",
//     subcategories: [
//       { id: 11, name: "Amazon Subcategory 1", image: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg", minimumAmount: 10, rate: 10 },
//       { id: 12, name: "Amazon Subcategory 2", image: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg", minimumAmount: 25, rate: 20 },
//       { id: 13, name: "Amazon Subcategory 3", image: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg", minimumAmount: 50, rate: 70 },
//     ]
//   },
//   {
//     id: 2, image: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg", name: "ITUNES CARD",
//     subcategories: [
//       { id: 1, name: "Itunes Subcategory 1", image: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg", minimumAmount: '10', rate: '70' },
//       { id: 2, name: "Itunes Subcategory 2", image: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg", minimumAmount: '30', rate: '40' },
//       { id: 3, name: "Itunes Subcategory 3", image: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg", minimumAmount: '70', rate: '100' },
//     ]
//   },

// ];


const GiftcardRate = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isCardCategoryModalVisible, setCardCategoryModalVisible] = useState(false);
  const [isCardSubCategoryModalVisible, setCardSubCategoryModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [minimumAmount, setMinimumAmount] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedSubCategoryRate, setSelectedSubCategoryRate] = useState(0); // New state variable for the selected subcategory rate
  const [totalRate, setTotalRate] = useState(''); // New state variable for the calculated total rate

  const [userData, setUserData] = useState({
    selectedCategory: '',
    selectedSubCategory: '',
    minimumAmount: '',
    enteredAmount: '',
    totalRate: '',
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await giftCardRateCalc();
        console.log(res);
        const data = res.rates[0]
        setCategories(data.gitCard_Cartigories)
        setSubCategories(data.giftCardSub_Cartigories);
      } catch (error) {
        console.log(error)
      }

    }
    fetch()
    console.log('data')
  }, [totalRate])


  const toggleCardCategoryModal = () => {
    setCardCategoryModalVisible(!isCardCategoryModalVisible);
  };

  const toggleCardSubCategoryModal = () => {
    setCardSubCategoryModalVisible(!isCardSubCategoryModalVisible);
  };

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    toggleCardCategoryModal();
    toggleCardSubCategoryModal();
  };

  const handleSubCategorySelection = (subCategory) => {
    setSelectedSubCategory(subCategory.name);
    setMinimumAmount(subCategory.minimumAmount);
    setSelectedSubCategoryRate(Number(subCategory.rate)); // Set the selected subcategory rate
    toggleCardSubCategoryModal();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StyledContainer>
        <StatusBar style="light" backgroundColor={backgroundColor} />
        <MainContainer>
          <ScrollView>
            <RateEntryText>Check the real value of your gift card{"\n"}Give card category</RateEntryText>


            <Formik initialValues={userData}
              onSubmit={(values) => {
                const formData = {
                  selectedCategory: selectedCategory ? selectedCategory.name : "",
                  selectedSubCategory,
                  minimumAmount,
                  enteredAmount,
                  totalRate,
                };

                console.log("Form Data:", formData);
                try {

                  // navigation.navigate('SellGiftcard');
                } catch (error) {
                  console.error('Error:', error);
                  // Handle the error gracefully, e.g., show an error message to the user
                }

              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <StyledFormArea>
                  <StyledTextInputLabel>Category</StyledTextInputLabel>
                  <TouchableOpacity onPress={toggleCardCategoryModal}>
                    <StyledTextInput
                      placeholder="Select"
                      placeholderTextColor={inputPlaceholder}
                      value={selectedCategory ? selectedCategory.name : ""}
                      editable={false}
                    />
                  </TouchableOpacity>

                  <StyledTextInputLabel>Sub Category</StyledTextInputLabel>
                  <TouchableOpacity onPress={toggleCardSubCategoryModal}>
                    <StyledTextInput
                      placeholder="Select"
                      placeholderTextColor={inputPlaceholder}
                      value={selectedSubCategory}
                      editable={false}
                    />
                  </TouchableOpacity>
                  <RatePriceInfo>
                    <StyledTextInputLabel>Amount in USD</StyledTextInputLabel>
                    <StyledTextInputLabel>(minimum amount {minimumAmount})</StyledTextInputLabel>
                  </RatePriceInfo>
                  <View>
                    <StyledTextInput
                      placeholder="Amount"
                      placeholderTextColor={inputPlaceholder}
                      keyboardType="number-pad"

                      onChangeText={(text) => {
                        setEnteredAmount(text);
                        if (text < minimumAmount) {
                          setErrorMessage("Amount cannot be lower than the minimum");
                        } else {
                          setErrorMessage('');
                          const total = Number(text) * selectedSubCategoryRate; // Calculate the total
                          setTotalRate(total.toFixed(2)); // Set the calculated total rate
                        }
                      }}
                    />
                  </View>
                  <MsgBox>{errorMessage}</MsgBox>
                  <DoubleInput>
                    <SmallLeftInput>
                      <Image source={require("../../assets/images/flag.png")} style={{ width: 20, height: 20 }} />
                      <NairaText>NGN</NairaText>
                    </SmallLeftInput>
                    <RightSmallInput
                      placeholder="Rate"
                      keyboardType="number-pad"
                      placeholderTextColor={inputPlaceholder}
                      value={totalRate.toString()}
                      editable={false}
                    />
                  </DoubleInput>

                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Sell Giftcard</ButtonText>
                  </StyledButton>
                  <TouchableOpacity onPress={() => navigation.navigate('HighCardRates')}>
                    <CheckHighrateText>Check highest rates</CheckHighrateText>
                  </TouchableOpacity>
                </StyledFormArea>
              )}
            </Formik>
          </ScrollView>
        </MainContainer>
      </StyledContainer>



      {/* =Alert pop up========= */}




      {/* =========CARD CATEGORY=============== */}

      <Modal
        isVisible={isCardCategoryModalVisible}
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
              data={categories}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleCategorySelection(item)}
                >
                  <ShortModalItemContainer>
                    {item.image && (
                      <Image
                        source={{ uri: item.image }}
                        style={{
                          width: 25,
                          height: 25,
                          marginRight: 10,
                          borderRadius: 50,
                        }}
                      />
                    )}
                    <ShortModalItemName>{item.name}</ShortModalItemName>
                  </ShortModalItemContainer>
                </TouchableOpacity>
              )}
            />
          </ShortModal>
        </ShortModalContainer>
      </Modal>

      {/* Card Sub Category Modal */}
      <Modal
        isVisible={isCardSubCategoryModalVisible}
        style={{ margin: 0 }}
        onBackdropPress={toggleCardSubCategoryModal}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <ShortModalContainer>
          <ShortModal>
            <ShortModalHeading>
              <ShortModalTitle>Select a Sub-Category</ShortModalTitle>
              <CloseButton onPress={toggleCardSubCategoryModal}>
                <Octicons name="x" size={24} color="white" />
              </CloseButton>
            </ShortModalHeading>
            <FlatList
              data={
                selectedCategory ? subCategories : [] // Render subcategories of the selected category
              }
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSubCategorySelection(item)}
                >

                  <RateItemsContent>
                    <RateItemContainer>
                      {item.image && (
                        <Image
                          source={{ uri: item.image }}
                          style={{
                            width: 25,
                            height: 25,
                            marginRight: 10,
                            borderRadius: 50,
                          }}
                        />
                      )}
                      <ShortModalItemName>{item.name}</ShortModalItemName>
                    </RateItemContainer>
                    <RateContainer>
                      <ShortModalItemName>{item.minimumAmount}</ShortModalItemName>
                    </RateContainer>
                  </RateItemsContent>



                </TouchableOpacity>
              )}
            />
          </ShortModal>
        </ShortModalContainer>
      </Modal>
    </SafeAreaView>
  );
};

export default GiftcardRate;





