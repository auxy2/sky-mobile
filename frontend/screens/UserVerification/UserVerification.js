import React from "react";
import { useFormik } from "formik";
import Modal from "react-native-modal";
import { StatusBar } from "expo-status-bar";
import { Octicons } from '@expo/vector-icons';
import * as Styles from '../../styles/styles';
import { verification } from "../../util/auth";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Image, Pressable, ActivityIndicator } from "react-native";


const UserVerification = ({ navigation }) => {
  const [loading, setLoading] = React.useState(false);
  const [successModal, setSuccessModal] = React.useState(false);

  const initialValues = { firstName: '', lastName: '', nin: '', images: [] };

  const onSubmit = async (values = {}) => {
    let validated = Object.values(values).every(val => val.length > 0);
    if (!validated) return;

    const form = new FormData();
    Object.keys(values).forEach(key => form.append(key, values[key]));

    setLoading(true);
    try {
      let res = await verification(form);
      console.log(res);
      if (typeof res === 'string' || res?.status !== 'success') throw new Error(res?.message || res);

      setSuccessModal(true);
      formik.resetForm(initialValues);
      setTimeout(() => setSuccessModal(false), 5000);
    }
    catch (err) {
      console.error(err);
    }; setLoading(false);
  };


  const pickFile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) formik.setFieldValue('images', [...formik.values.images, ...result.assets]);
  };

  const formik = useFormik({ onSubmit, initialValues });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Styles.StyledContainer>
        <StatusBar style="light" backgroundColor={Styles.Colors.backgroundColor} />
        <Styles.MainContainer>
          <Styles.ScreenTitles>Verify Your Identity</Styles.ScreenTitles>
          <ScrollView>
            <Styles.StyledFormArea>
              <Styles.StyledTextInputLabel>First name</Styles.StyledTextInputLabel>
              <Styles.StyledTextInput
                value={formik.values.firstName}
                placeholder="Enter your first name"
                onChangeText={formik.handleChange('firstName')}
                placeholderTextColor={Styles.Colors.inputPlaceholder}
              />

              <Styles.StyledTextInputLabel>Last name</Styles.StyledTextInputLabel>
              <Styles.StyledTextInput
                value={formik.values.lastName}
                placeholder="Enter your last name"
                onChangeText={formik.handleChange('lastName')}
                placeholderTextColor={Styles.Colors.inputPlaceholder}
              />

              <Styles.StyledTextInputLabel>National Identification number(NIN)</Styles.StyledTextInputLabel>
              <Styles.StyledTextInput
                value={formik.values.nin}
                placeholder="Enter your NIN"
                onChangeText={formik.handleChange('nin')}
                placeholderTextColor={Styles.Colors.inputPlaceholder}
              />

              <Styles.StyledTextInputLabel>Upload any valid document(Drivers license, National ID, International Passport)</Styles.StyledTextInputLabel>
              <Styles.AllUploadedImages>
                <Pressable onPress={pickFile}>
                  <Styles.GiftcardImageUpload />
                </Pressable>
                <Styles.SelectedImages>
                  {formik.values.images.map((img, id) => <Styles.AddedImages key={id}>
                    <Styles.GiftCardImage>
                      <Pressable onPress={() => {
                        formik.setFieldValue("images", formik.values.images.filter((_, index) => id !== index));
                      }}>
                        <Image source={{ uri: img.uri }} style={{ width: 60, height: 60, borderRadius: 160 }} />
                      </Pressable>
                    </Styles.GiftCardImage>
                  </Styles.AddedImages>)}
                </Styles.SelectedImages>
              </Styles.AllUploadedImages>
            </Styles.StyledFormArea>

            <Styles.StyledButton onPress={loading ? null : formik.handleSubmit}>
              {loading ? <ActivityIndicator /> : <Styles.ButtonText>Proceed</Styles.ButtonText>}
            </Styles.StyledButton>
          </ScrollView>
        </Styles.MainContainer>
      </Styles.StyledContainer>

      {/* ==========================Success Modal ============================= */}
      <Modal isVisible={successModal} style={{ margin: 0 }} backdropOpacity={0.5} animationIn="slideInUp" animationOut="slideOutDown">
        <Styles.SuccessAlertModal>
          <Styles.AlertModalIcon onPress={() => setSuccessModal(prev => !prev)}>
            <Octicons name="x" size={30} color={Styles.Colors.white} />
          </Styles.AlertModalIcon>
          <Styles.CheckIcon source={require("../../assets/icons/check.png")} />
          <Styles.AlertModalText>Your request has been submited. </Styles.AlertModalText>
          <Styles.AlertModalTextSpan>You wll be notified soon, with our decision</Styles.AlertModalTextSpan>
        </Styles.SuccessAlertModal>
      </Modal>
    </SafeAreaView>
  );
};
export default UserVerification;