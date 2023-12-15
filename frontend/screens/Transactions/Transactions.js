import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import GiftCardTransaction from "./GiftcardTransactions";
import CryptoTransaction from "./CryptoTransactions";
import BillsTransaction from "./BillsTransactions";


//----------components--------
import {
  StyledContainer,
  TransactionTab,
  TabsContainer,
  Colors,
  MainContainer,
  ContentMarginTop,
} from '../../styles/styles';
const { backgroundColor, white } = Colors;

const Transactions = () => {
  const [activeTab, setActiveTab] = useState("Giftcard");

  const tabs = [
    { label: "Giftcard", content: <GiftCardTransaction /> },
    { label: "Crypto", content: <CryptoTransaction /> },
    { label: "Bills", content: <BillsTransaction /> },
  ];

  const renderTab = ({ item }) => {
    const isActive = activeTab === item.label;

    return (
      <TransactionTab
        active={isActive}
        onPress={() => setActiveTab(item.label)}
      >
        <Text style={{ color: isActive ? backgroundColor : white }}>{item.label}</Text>
      </TransactionTab>
    );
  };

  const renderContent = () => {
    const activeTabContent = tabs.find((tab) => tab.label === activeTab);

    if (activeTabContent) {
      return activeTabContent.content;
    }

    return null;
  };

  return (
    <StyledContainer style={{ flex: 1 }}>
      <ContentMarginTop />
      <MainContainer>
        <TabsContainer>
          <View>
            <FlatList
              horizontal
              data={tabs}
              renderItem={renderTab}
              keyExtractor={(item) => item.label}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </TabsContainer>
        <View style={{ flex: 1 }}>
          <ContentMarginTop />
          {renderContent()}
        </View>
      </MainContainer>
    </StyledContainer>
  );
};

export default Transactions;