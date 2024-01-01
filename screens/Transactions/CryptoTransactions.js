import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, ScrollView } from "react-native";

// ======dummy data sets===========
import DummyDataSets from "../../constants/DummyDataSets";

const { inputPlaceholder, danger, success } = Colors;

//////components--------
import {
  Colors,
  ReceiptImage,
  ReceiptText,
  NoRecordReceiptContainer,
} from "../../styles/styles";
import { cryptoTransactionHis } from "../../util/auth";

const CryptoTransaction = () => {
  const [transactionsHis, setTransactionHis] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const data = async () => {
      try {
        const response = await cryptoTransactionHis();
        console.log(response);
        if (response.status === "success") {
          setTransactionHis(response.trns);
        }
      } catch (error) {
        console.log(error);
      }
    };
    data();
  }, []);

  useEffect(() => {
    const data = async () => {
      try {
        const response = await cryptoTransactionHis();
        if (response.status === "success") {
          setTransactionHis((prev) => [...prev, ...response.trns]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    // data();
    const timeoutId = setTimeout(data, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  const selectedDataSet = "transactionData";
  let data = DummyDataSets[selectedDataSet];
  data = transactionsHis;

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={require("../../assets/images/icon-logo.png")} />
      <View style={styles.transactInfo}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.currency}</Text>
          <Text style={styles.subtitle}>{new Date(item.createdAt).toDateString()}</Text>
          <Text style={styles.subtitle}>{item.txId}</Text>
        </View>
        <View style={styles.rateContainer}>
          <Text style={styles.rate}>{item.amount?.toLocaleString() || 'Nil'}</Text>
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
  );

  return (
    <View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={data}
          style={{ flexGrow: 1 }}
          renderItem={renderItem}
          keyExtractor={(item) => item.txId}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      )}
      {/* Conditionally render the withdrawal receipt container */}
      {!isLoading && data.length === 0 && (
        <NoRecordReceiptContainer>
          <ReceiptImage source={require("../../assets/icons/receipt.png")} />
          <ReceiptText>No withdrawal record found</ReceiptText>
        </NoRecordReceiptContainer>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    gap: 8,
    flexGrow: 1,
    padding: 16,
    width: "100%",
    borderRadius: 15,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
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

export default CryptoTransaction;
