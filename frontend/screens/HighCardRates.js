import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

//////components--------
import {
  StyledContainer,
  Colors,
  MainContainer,
  ScreenTitles,
  ContentMarginTop,
} from "../styles/styles";
import { getHighCardRates } from "../util/auth";
import { SafeAreaView } from "react-native-safe-area-context";

const { backgroundColor } = Colors;

const HighCardRates = () => {
  const [data, setData] = useState([]);
  const selectedDataSet = "highCardRates";

  const fetch = async () => {
    try {
      const response = await getHighCardRates();

      console.log({ response });
      console.log("{ response");

      setData(response.cardRates);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item?.title}</Text>
      <View style={styles.rateContainer}>
        <Text style={styles.type}>{item?.rateType}</Text>
        <Text style={styles.rate}>
          NGN {item?.rateAmount ?? 0}
          {selectedDataSet === "highCardRates"}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StyledContainer>
        <StatusBar style="light" backgroundColor={backgroundColor} />
        <MainContainer>
          <ScreenTitles>High Card Rates</ScreenTitles>
          {/* --------------------data list--------------------- */}
          <ContentMarginTop />
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </MainContainer>
      </StyledContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#17203D",
    width: "100%",
    padding: 20,
    marginVertical: 8,
    borderRadius: 15,
  },
  rateContainer: {
    paddingTop: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  type: {
    fontSize: 14,
    color: "#fff",
  },
  rate: {
    fontSize: 14,
    color: "#fff",
  },
});

export default HighCardRates;
