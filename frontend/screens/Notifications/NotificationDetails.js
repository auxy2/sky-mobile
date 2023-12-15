import React from "react";
import { ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

// Assuming your styles are correctly defined in the 'styles/styles.js' file
import {
  StyledContainer,
  Colors,
  MainContainer,
  ScreenTitles,
  ContentMarginTop,
  NotificationDateandTimeContainer,
  NotificationDate,
  NotificationTime,
  NotificationDetailsContainer,
  NotificationDetailsTop,
  NotificationDetailsTitle,
  NotificationDetailsBottom,
  NotificationDetailsDescription,
} from "../../styles/styles";

const NotificationDetails = ({ route }) => {
  // Extract the data passed from the Notification screen
  const { notificationItemData } = route.params || {};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StyledContainer>
        <StatusBar style="light" backgroundColor={Colors.backgroundColor} />
        <MainContainer>
          <ScreenTitles>Details</ScreenTitles>
          <ContentMarginTop />
          <ScrollView>
          <NotificationDetailsContainer>
            <NotificationDetailsTop>
              {/* Display the extracted data */}
              <NotificationDetailsTitle>{notificationItemData.title}</NotificationDetailsTitle>
              <NotificationDateandTimeContainer>
                <NotificationDate>{notificationItemData.date}</NotificationDate>
                <NotificationTime>{notificationItemData.time}</NotificationTime>
              </NotificationDateandTimeContainer>
            </NotificationDetailsTop>
            <NotificationDetailsBottom>
              <NotificationDetailsDescription>{notificationItemData.description}</NotificationDetailsDescription>
            </NotificationDetailsBottom>
          </NotificationDetailsContainer>
          </ScrollView>
         
        </MainContainer>
      </StyledContainer>
    </SafeAreaView>
  );
};

export default NotificationDetails;
