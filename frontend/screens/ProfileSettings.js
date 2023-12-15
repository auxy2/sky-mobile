import { ActivityIndicator, Image, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect, useContext } from "react";

//////components--------
import {
  StyledContainer,
  Colors,
  MainContainer,
  ScreenTitles,
  ContentMarginTop,
  ProfileImageContainer,
  UploadProfileImage,
  ProfilePicture,
  SmallInputContainer,
  ProfileInputSmall,
  ButtonText,
  StyledFormArea,
  ProfileInputField,
  ProfleInputfieldContainer,
  StyledButton,
  ProfileNameContainer,
  ProfileNameText,
  UserNameText,
  ImageContainer,
  CameraIconBg,
  CameraIconContainer,
  TextLink,
  TextLinkContent,
  AlertPopUpMessage,
  AlertPopUpErrorText,
  AlertPopUpText,
} from "../styles/styles";
import { createFormData } from "../util/createFormData";
import { useAuthentication } from "../contexts/auth.context";
import defaultProfileImage from '../assets/images/nopicture.png';

const { white, danger, success, backgroundColor, inputPlaceholder } = Colors;

const ProfileSettings = ({ navigation }) => {
  const { user, update, error, loading } = useAuthentication();

  const [data, setData] = useState({});
  const [image, setImage] = useState(null);
  const [showUpdateSuccessAlert, setShowUpdateSuccessAlert] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      // base64: true,
    });
    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    let form = new FormData();
    if (image) form.append('image', image);

    Object.entries(data).forEach(key => form.append(key, data[key]));
    if (data?.firstName && data?.lastName) form.append('name', data.firstName + ' ' + data.lastName);

    await update(data, () => {
      setShowUpdateSuccessAlert(true);
      setTimeout(() => setShowUpdateSuccessAlert(false), 3000);
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StyledContainer>
        <StatusBar style="light" backgroundColor={backgroundColor} />
        <MainContainer>
          <ScreenTitles>Update Profile</ScreenTitles>
          <ContentMarginTop />
          <ScrollView>
          <ProfileImageContainer>
            <ImageContainer>
              <CameraIconContainer onPress={pickImage}>
                <CameraIconBg>
                  <Ionicons name="camera" size={27} color={white} />
                </CameraIconBg>
              </CameraIconContainer>
              <UploadProfileImage>
                <ProfilePicture>
                  {image ? (
                    <Image
                      resizeMode="contain"
                      source={{ uri: image.uri }}
                      style={{ width: 100, height: 100 }}
                    />
                  ) : (
                    <Image
                      resizeMode="contain"
                      style={{ width: 100, height: 100 }}
                      source={user?.profilePhoto || defaultProfileImage}
                    />
                  )}
                </ProfilePicture>
              </UploadProfileImage>
            </ImageContainer>

            <ProfileNameContainer>
              <ProfileNameText>{user?.name}</ProfileNameText>
              <UserNameText>@{user?.username}</UserNameText>
            </ProfileNameContainer>
          </ProfileImageContainer>
          {/* input fields=============== */}
          <StyledFormArea>
            <SmallInputContainer>
              <ProfileInputSmall
                placeholder={"First name"}
                placeholderTextColor={inputPlaceholder}
                value={data?.firstName || user?.name?.split(' ')?.[0]}
                onChangeText={(firstName) => setData(prev => ({ ...prev, firstName }))}
              />
              <ProfileInputSmall
                placeholder={"Last name"}
                value={data?.lastName || user?.name?.split(' ')?.[1]}
                placeholderTextColor={inputPlaceholder}
                onChangeText={(lastName) => setData(prev => ({ ...prev, lastName }))}
              />
            </SmallInputContainer>
            <ProfleInputfieldContainer>
              <ProfileInputField
                placeholder={"Username"}
                value={data?.username || user?.username}
                placeholderTextColor={inputPlaceholder}
                onChangeText={(username) => setData(prev => ({ ...prev, username }))}
              />
              <ProfileInputField
                placeholder={"Phone number"}
                placeholderTextColor={inputPlaceholder}
                value={data?.phoneNumber || user?.phoneNumber || user?.phoneNumner || ''}
                onChangeText={(phoneNumber) => setData(prev => ({ ...prev, phoneNumber }))}
              />
              <ProfileInputField
                placeholder={"Email"}
                value={user?.email}
                placeholderTextColor={inputPlaceholder}
                onChangeText={(email) => setData(prev => ({ ...prev, email }))}
              />
            </ProfleInputfieldContainer>
            <StyledButton onPress={handleSubmit}>
              <ButtonText>{loading ? <ActivityIndicator /> : 'UPDATE'}</ButtonText>
            </StyledButton>
            <TextLink onPress={() => navigation.navigate("UserVerification")}>
              <TextLinkContent>Request verification</TextLinkContent>
            </TextLink>
          </StyledFormArea>
          </ScrollView>
        </MainContainer>
      </StyledContainer>
      {/* Error Alert */}
      {error && (
        <AlertPopUpMessage>
          <Octicons name="alert" size={20} color={danger} />
          <AlertPopUpErrorText>{error}</AlertPopUpErrorText>
        </AlertPopUpMessage>
      )}

      {/* Success Alert */}
      {showUpdateSuccessAlert && (
        <AlertPopUpMessage>
          <Ionicons name="checkmark-circle" size={20} color={success} />
          <AlertPopUpText>
            Your password has been changed successfully.
          </AlertPopUpText>
        </AlertPopUpMessage>
      )}
    </SafeAreaView>
  );
};

export default ProfileSettings;
