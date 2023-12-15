import React from 'react';
import { useFormik } from 'formik';
import Modal from "react-native-modal";
import * as Styles from '../../styles/styles';
import { Octicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from '../../contexts/theme.context';
import { categories as getAllCateogires, sellGiftCard, subCartegories } from "../../util/auth";
import { ActivityIndicator, Image, Pressable, SafeAreaView, ScrollView, StatusBar, View } from 'react-native';

import FormModal from './CardForm';
import CountryModal from './CardCountry';
import CategoryModal from './CardCategory';
import SubCategoryModal from './SubCategory';

export default function ({ navigation }) {
  const { theme } = useTheme();
  const [loading, setLoading] = React.useState(false);
  const [cardForms, setcardForms] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [formModal, setFormModal] = React.useState(false);
  const [subCategories, setSubCategories] = React.useState([]);
  const [countryModal, setCountryModal] = React.useState(false);
  const [successModal, setSuccessModal] = React.useState(false);
  const [categoryModal, setCategoryModal] = React.useState(false);
  const [subcategoryModal, setSubCategoryModal] = React.useState(false);

  const initialValues = { cardType: '', image: null, cardCode: '', cardAmount: '', cardForm: '', subCatigory: '', selectedRate: '', CardCountary: '', comment: '', PromoCode: '' };

  const onSubmit = async ({ cardType, subCatigory, cardAmount, image }) => {
    if (!(cardType && subCatigory && cardAmount && image)) return;
    setLoading(true);
    try {
      let form = new FormData();
      Object.keys(formik.values).forEach(key => form.append(key, formik.values[key]));

      let res = await sellGiftCard(form);
      if (res.status !== 'success') throw new Error(res.message);

      setSuccessModal(true);
      formik.resetForm(initialValues);
    } catch (error) {
      console.error(error);
    }; setLoading(false);
  };

  const formik = useFormik({ onSubmit, initialValues });
  const totalAmount = React.useMemo(() => {
    let myAmount = formik.values.cardAmount || 0;
    let rateAmount = subCategories.find(item => item.name == formik.values.subCatigory)?.rate || 0;

    formik.setFieldValue('selectedRate', rateAmount);
    return (+myAmount * +rateAmount).toFixed(2);
  }, [formik.values.cardAmount, formik.values.subCatigory]);

  React.useEffect(() => {
    if (categories.length == 0) fetchCategories();
  }, []);

  React.useEffect(() => {
    fetchSubCategories();
  }, [formik.values.cardType]);

  const fetchCategories = async () => {
    try {
      let res = await getAllCateogires();
      console.log(res);
      setCategories(res.cardCategory);
    } catch (error) { };
  };

  const fetchSubCategories = async () => {
    if (!formik.values.cardType) return;

    try {
      let res = await subCartegories(formik.values.cardType);
      console.log(res.status, res);
      if (res?.status !== 'sucees') throw new Error(res?.message || res);

      setcardForms(res.cardForm);
      setSubCategories(res.subcategories);
    } catch (err) {
      console.error(err);
    };
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) formik.setFieldValue('image', result.assets[0]);
  };

  return <SafeAreaView style={{ flex: 1 }}>
    <StatusBar style="light" backgroundColor={theme.backgroundColor} />

    <Styles.StyledContainer>
      <Styles.MainContainer>
        <Styles.ScreenTitles>Sell Gift Card</Styles.ScreenTitles>

        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <Styles.StyledFormArea>
            <Styles.StyledTextInputLabel>Gift card category</Styles.StyledTextInputLabel>
            <Pressable onPress={() => setCategoryModal(prev => !prev)}>
              <Styles.StyledTextInput
                editable={false}
                placeholder="Select"
                value={formik.values.cardType}
                onChangeText={formik.handleChange('cardType')}
                placeholderTextColor={Styles.Colors.inputPlaceholder}
              />
            </Pressable>
            <CategoryModal
              cartegories={categories}
              isModalVisible={categoryModal}
              toggleModal={() => setCategoryModal(prev => !prev)}
              handleCategorySelection={formik.handleChange('cardType')}
            />

            <Styles.StyledTextInputLabel>Gift card form (Optional)</Styles.StyledTextInputLabel>
            <Pressable onPress={() => setFormModal(prev => !prev)}>
              <Styles.StyledTextInput
                editable={false}
                placeholder="Select"
                value={formik.values.cardForm}
                onChangeText={formik.handleChange('cardForm')}
                placeholderTextColor={Styles.Colors.inputPlaceholder}
              />
            </Pressable>
            <FormModal
              isModalVisible={formModal}
              filteredCardForms={cardForms}
              toggleModal={() => setFormModal(prev => !prev)}
              handleCardFormSelection={formik.handleChange('cardForm')}
            />

            <Styles.StyledTextInputLabel>Gift card country (optional)</Styles.StyledTextInputLabel>
            <Pressable onPress={() => setCountryModal(prev => !prev)}>
              <Styles.StyledTextInput
                editable={false}
                placeholder="Select"
                value={formik.values.CardCountary}
                onChangeText={formik.handleChange('CardCountary')}
                placeholderTextColor={Styles.Colors.inputPlaceholder}
              />
            </Pressable>
            <CountryModal
              isModalVisible={countryModal}
              toggleModal={() => setCountryModal(prev => !prev)}
              handleCategorySelection={formik.handleChange('CardCountary')}
            />

            <Styles.StyledTextInputLabel>Gift Card Type</Styles.StyledTextInputLabel>
            <Pressable onPress={() => setSubCategoryModal(prev => !prev)}>
              <Styles.StyledTextInput
                editable={false}
                placeholder="Select"
                value={formik.values.subCatigory}
                onChangeText={formik.handleChange('subCatigory')}
                placeholderTextColor={Styles.Colors.inputPlaceholder}
              />
            </Pressable>
            <SubCategoryModal
              subcategories={subCategories}
              isModalVisible={subcategoryModal}
              toggleModal={() => setSubCategoryModal(prev => !prev)}
              handleSubCategorySelection={formik.handleChange('subCatigory')}
            />

            <Styles.StyledTextInputLabel>Amount (minimum amount)</Styles.StyledTextInputLabel>
            <Styles.StyledTextInput
              keyboardType="number-pad"
              placeholder="Enter amount"
              value={formik.values.cardAmount}
              onChangeText={formik.handleChange('cardAmount')}
              placeholderTextColor={Styles.Colors.inputPlaceholder}
            />

            <Styles.StyledTextInputLabel>Upload gift card image</Styles.StyledTextInputLabel>
            <Styles.AllUploadedImages>
              {formik.values.image ?
                <Styles.GiftCardImage>
                  <Pressable onPress={() => formik.setFieldValue('image', null)}>
                    <Image source={{ uri: formik.values.image.uri }} style={{ width: 60, height: 60, borderRadius: 160 }} />
                  </Pressable>
                </Styles.GiftCardImage> :
                <Pressable onPress={pickImage}>
                  <Styles.GiftcardImageUpload />
                </Pressable>}
              <Styles.SelectedImages>
              </Styles.SelectedImages>
            </Styles.AllUploadedImages>

            <Styles.StyledTextInputLabel>If Image is blury, enter code here (optional)</Styles.StyledTextInputLabel>
            <Styles.StyledTextInput
              placeholder="Card code"
              value={formik.values.cardCode}
              onChangeText={formik.handleChange('cardCode')}
              placeholderTextColor={Styles.Colors.inputPlaceholder}
            />

            <Styles.StyledTextInputLabel>Comment</Styles.StyledTextInputLabel>
            <Styles.StyledTextInput
              value={formik.values.comment}
              placeholder="leave a comment here (Optional)"
              onChangeText={formik.handleChange('comment')}
              placeholderTextColor={Styles.Colors.inputPlaceholder}
            />

            <Styles.StyledTextInputLabel>Promo code</Styles.StyledTextInputLabel>
            <Styles.StyledTextInput
              placeholder="Enter Promo code"
              value={formik.values.PromoCode}
              onChangeText={formik.handleChange('PromoCode')}
              placeholderTextColor={Styles.Colors.inputPlaceholder}
            />

            <Styles.CardRateContainer>
              <Styles.CardRateInner>
                <Styles.TopTextContainer>
                  <View>
                    <Styles.CardRateTopText>Rate</Styles.CardRateTopText>
                  </View>

                  <View>
                    <Styles.CardRateTopText>{subCategories.find(item => item.name == formik.values.subCatigory)?.rate || 0}</Styles.CardRateTopText>
                  </View>
                </Styles.TopTextContainer>
                <Styles.BottomTextContainer>
                  <View>
                    <Styles.CardTotalText>Total</Styles.CardTotalText>
                  </View>

                  <View>
                    <Styles.CardPriceText>{totalAmount}</Styles.CardPriceText>
                  </View>
                </Styles.BottomTextContainer>
              </Styles.CardRateInner>
            </Styles.CardRateContainer>

            <Styles.StyledButton onPress={formik.handleSubmit}>
              {loading ? <ActivityIndicator /> : <Styles.ButtonText>Proceed</Styles.ButtonText>}
            </Styles.StyledButton>

          </Styles.StyledFormArea>
        </ScrollView>
      </Styles.MainContainer>
    </Styles.StyledContainer>

    <Modal style={{ margin: 0 }} isVisible={successModal} animationIn='slideInUp' animationOut='slideOutDown' backdropOpacity={0.5}>
      <Styles.SuccessAlertModal>
        <Styles.AlertModalIcon onPress={() => setSuccessModal(prev => !prev)}>
          <Octicons name="x" size={30} color={theme.white} />
        </Styles.AlertModalIcon>

        <Styles.CheckIcon source={require("../../assets/icons/check.png")} />
        <Styles.AlertModalText>Your transaction is processing!</Styles.AlertModalText>

        <Styles.AlertModalTextSpan>
          You will be notified once your transaction is complete.
        </Styles.AlertModalTextSpan>
      </Styles.SuccessAlertModal>
    </Modal>
  </SafeAreaView>;
};
