import React from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";


// Import your styles and DummyDataSets if necessary
import {
  StyledContainer,
  Colors,
  MainContainer,
  ScreenTitles,
  ContentMarginTop,
  NotificationDateandTimeContainer,
  NotificationDate,
  NotificationTime,
  NotificationContentContainer,
  NotificationTitle,
  NotificationDescription,
  NotificationContainer,
  NotificationContent,
} from "../../styles/styles";

import { getNotifications } from "../../util/auth";
import { SafeAreaView } from "react-native-safe-area-context";


const Notification = () => {
  const navigation = useNavigation();
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [notificationsList, setNotificationsList] = React.useState([]);

  const fetch = async () => {
    setLoading(true); setError(false);
    try {
      const response = await getNotifications();

      console.log({ response });

      setNotificationsList(response?.notification ?? []);
    } catch (error) {
      console.log(error);
    }; setLoading(false);
  };

  React.useEffect(() => {
    fetch();
  }, []);

  const renderItem = ({ item }) => {
    const truncateText = (text, maxLength) => {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text;
    };

    const truncatedTitle = truncateText(item?.notificationTitle ?? "", 30); // Adjust the max length as needed
    const truncatedDescription = truncateText(
      item?.notificationBody ?? "",
      100
    ); // Adjust the max length as needed

    return (
      <NotificationContainer>
        <NotificationContent
          onPress={() =>
            navigation.navigate("NotificationDetails", {
              notificationItemData: item,
            })
          }
        >
          <NotificationContentContainer>
            <NotificationTitle>{truncatedTitle}</NotificationTitle>
            <NotificationDescription>
              {truncatedDescription}
            </NotificationDescription>
          </NotificationContentContainer>
          <NotificationDateandTimeContainer>
            <NotificationDate>{item.date}</NotificationDate>
            <NotificationTime>{item.time}</NotificationTime>
          </NotificationDateandTimeContainer>
        </NotificationContent>
      </NotificationContainer>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StyledContainer>
        <StatusBar style="light" backgroundColor={Colors.backgroundColor} />
        <MainContainer>
          <ScreenTitles>Notifications</ScreenTitles>
          <ContentMarginTop />

          <FlatList
            data={notificationsList}
            renderItem={renderItem}
            keyExtractor={(item) => item?._id?.toString() ?? ""}
            ListHeaderComponent={() => loading ? <ActivityIndicator /> : null}
            // ListEmptyComponent={() => <Text style={styles.empty}>You do not have any notification</Text>}
          />
        </MainContainer>
      </StyledContainer>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  empty: {
    width: '100%',
    color: 'white',
    textAlign: 'center',
  },
});
