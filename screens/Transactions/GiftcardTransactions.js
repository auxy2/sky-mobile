import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import moment from "moment"; // Import moment library
import DummyDataSets from "../../constants/DummyDataSets";
import { useNavigation } from "@react-navigation/native";

import {
  Colors,
  ReceiptImage,
  ReceiptText,
  TransactionContent,
  WithdrawalReceiptContainer,
} from "../../styles/styles";
import { getgiftCarfHistory } from "../../util/auth";

const { backgroundColor, white, inputPlaceholder, danger, success } = Colors;

const GiftCardTransaction = () => {
  const [history, setHistory] = useState([]);
  const navigation = useNavigation();
  const selectedDataSet = "giftCardtransactionData";
  const data = DummyDataSets[selectedDataSet];

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getgiftCarfHistory();
        console.log(response);
        setHistory(response.trns);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  // Group transactions by date using moment
  const groupedData = history.reduce((acc, item) => {
    const Date = moment(item.Date).format("MMMM D, YYYY");
    if (!acc[Date]) {
      acc[Date] = [];
    }
    acc[Date].push(item);
    return acc;
  }, {});

  const renderTransactionItem = ({ item }) => (
    <TouchableOpacity
      style={{ width: '100%' }}
      onPress={() => {
        // Navigate to the details page here
        navigation.navigate("GiftcardTransactionDetails", {
          transaction: item,
        });
      }}
    >
      <View style={styles.item}>
        {/* <Image source={require("../../assets/images/icon-logo.png")} /> */}
        <View style={styles.transactInfo}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.cardType}</Text>
            <Text style={styles.subtitle}>{item.subCatigory}</Text>
            <Text style={styles.subtitle}>{new Date(item.createdAt).toDateString()}</Text>
          </View>
          <View style={styles.rateContainer}>
            <Text style={styles.rate}>N{item.cardAmount?.toLocaleString() || 'Nil'}</Text>
            <Text
              style={[
                styles.status, item.status === "success" ? styles.successStatus : item.status === "pending" ? styles.pendingStatus : styles.failedStatus,
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderTransactionGroup = ({ item }) => (
    <View style={styles.transactionGroup}>
      <Text style={styles.Date}>{item.date}</Text>
      <FlatList
        data={item.transactions}
        renderItem={renderTransactionItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );

  const groupedDataArray = Object.keys(groupedData).map((date) => ({
    date,
    transactions: groupedData[date],
  }));

  // Check if there are any transactions in groupedDataArray
  const noWithdrawalsFound = groupedDataArray.length === 0;

  return (
    <View>
      {!noWithdrawalsFound ? ( // Show if there are withdrawals
        <View style={styles.TransactionList}>
          <FlatList
            data={groupedDataArray}
            renderItem={renderTransactionGroup}
            keyExtractor={(item) => item.date}
          />
        </View>
      ) : (
        // Show if there are no withdrawals
        <WithdrawalReceiptContainer>
          <ReceiptImage source={require("../../assets/icons/receipt.png")} />
          <ReceiptText>No withdrawal record found</ReceiptText>
        </WithdrawalReceiptContainer>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    gap: 8,
    padding: 16,
    width: "100%",
    borderRadius: 15,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between'
  },
  transactInfo: {
    gap: 70,
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rateContainer: {
    paddingTop: 8,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  Date: {
    fontSize: 12,
    marginBottom: 10,
    color: inputPlaceholder, //
  },
  subtitle: {
    color: "#fff",
  },
  status: {
    fontSize: 11,
    fontWeight: "bold",
  },
  successStatus: {
    color: success, // Set your success color here
  },
  pendingStatus: {
    color: inputPlaceholder, // Set your pending color here
  },
  failedStatus: {
    color: danger, // Set your failed color here
  },
  rate: {
    fontSize: 14,
    color: "#fff",
  },
  TransactionList: {
    marginBottom: 10,
  },
  transactionGroup: {
    marginBottom: 20,
  },
  transactionDate: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
});

export default GiftCardTransaction;
