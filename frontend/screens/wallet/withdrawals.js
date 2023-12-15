import React, { } from "react";
import { Colors, ReceiptImage, ReceiptText, WithdrawalReceiptContainer } from "../../styles/styles";
import { View, Text, StyleSheet, Image, SectionList, ScrollView, ActivityIndicator } from "react-native";


const { inputPlaceholder, danger, success } = Colors;

const Header = ({ date }) => {
  return <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
    <Text style={{ color: 'white' }}>{new Date(date).toDateString()}</Text>
  </View>;
};

export default ({ history, loading = false }) => {

  const sections = React.useMemo(() => groupDataByDate(history), [history]);

  const RenderItem = ({ item }) => {
    console.log(item, 'from within');
    return (
      <View style={styles.item}>
        <Image source={require("../../assets/images/icon-logo.png")} />
        <View style={styles.transactInfo}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item?.bankName}</Text>
            {/* <Text style={styles.subtitle}>{item?.accounName}</Text> */}
            <Text style={styles.subtitle}>{new Date(item.createdAt).toDateString()}</Text>
          </View>
          <View style={styles.rateContainer}>
            <Text style={styles.rate}>N{item?.amount?.toLocaleString() || 'Nil'}</Text>
            <Text
              style={[
                styles.status,
                item?.status === "success" ? styles.successStatus : item?.status === "pending" ? styles.pendingStatus : styles.failedStatus,
              ]}
            >
              {item?.status}
            </Text>
          </View>
        </View>
      </View>
    )
  };

  React.useEffect(() => {
    console.log(sections, 'section');
  }, [sections]);

  return <ScrollView style={{ flex: 1, height: '100%', paddingBottom: 10 }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
    {loading ? <ActivityIndicator /> : <SectionList
      sections={sections}
      stickyHeaderHiddenOnScroll
      keyExtractor={(item, index) => index}
      renderItem={({ item }) => <RenderItem item={item} />}
      renderSectionHeader={({ section }) => <Header date={section.date} />}
      ListEmptyComponent={() => (
        <WithdrawalReceiptContainer>
          <ReceiptImage source={require("../../assets/icons/receipt.png")} />
          <ReceiptText>No withdrawal record found</ReceiptText>
        </WithdrawalReceiptContainer>
      )}
    />}
  </ScrollView>;
};

const styles = StyleSheet.create({
  item: {
    width: "100%",
    padding: 16,
    marginVertical: 8,
    borderRadius: 15,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  transactInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 70,
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

// export default Withdrawals;

function formatDate(dateString) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const date = new Date(dateString);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}

function groupDataByDate(datas) {
  const groupedMessages = {};

  datas.forEach(item => {
    const formattedDate = formatDate(item?.createdAt);

    if (!groupedMessages[formattedDate]) groupedMessages[formattedDate] = { date: item?.createdAt, data: [] };
    groupedMessages[formattedDate].data.push(item);
  });

  return Object.values(groupedMessages);
};