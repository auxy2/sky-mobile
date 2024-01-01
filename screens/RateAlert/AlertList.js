import { FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { alertList } from "../../util/auth";
import React, { useEffect, useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";

//////components--------
import {
  StyledContainer,
  Colors,
  MainContainer,
  ScreenTitles,
  ContentMarginTop,
  RateAlertItem,
  RateItemName,
  RateItemIcon
} from '../../styles/styles';
const { backgroundColor, success } = Colors;

// In AlertList component


const list = [{
  "asset": "Gift Card",
  "enteredAmount": "200",
  "selectedCategory": "AMAZON",
  "selectedNotifyMethod": "Email",
  "selectedRate": "830",
  "selectedSubCategory": "US Doller",
}, {
  "asset": "Gift Card",
  "enteredAmount": "200",
  "selectedCategory": "WALmat",
  "selectedNotifyMethod": "Sms",
  "selectedRate": "530",
  "selectedSubCategory": "UDT",
},
{
  "asset": "Gift Card",
  "enteredAmount": "200",
  "selectedCategory": "KDP",
  "selectedNotifyMethod": "Sms",
  "selectedRate": "5530",
  "selectedSubCategory": "UDT",
}]

const AlertList = ({ navigation, route }) => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await alertList()
        console.log(response)
        setData(response.rateList)
      } catch (error) {
        console.log(error)
      }

    }
    fetch()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StyledContainer>
        <StatusBar style="light" backgroundColor={backgroundColor} />
        <MainContainer>
          <ScreenTitles>Rate List</ScreenTitles>
          <ContentMarginTop />
          <FlatList data={data} keyExtractor={(item) => item._id} renderItem={({ item }) => (
            <RateAlertItem onPress={() => { navigation.push("RateAlertDetails", item._id) }} >
              <RateItemName>{item.selectedCategory}</RateItemName>
              <RateItemIcon>
                <Ionicons name="alert" color={success} size={16} />
              </RateItemIcon>
            </RateAlertItem>
          )} />
        </MainContainer>
      </StyledContainer>
    </SafeAreaView>
  );
};

export default AlertList;
