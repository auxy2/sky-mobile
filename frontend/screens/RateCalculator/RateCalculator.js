


import React from "react";
import CrptoRate from "./CrptoRate";
import GiftcardRate from "./GiftcardRate";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Colors,
  ScreenTitles,
  TabsContainer,
  ContentMarginTop,
  RateCalculatorTab,
  TabContentsContainer
} from '../../styles/styles';
const { backgroundColor, white } = Colors;

const tabs = [
  {
    title: 'Giftcard',
    component: GiftcardRate,
  },
  {
    title: 'Crypto',
    component: CrptoRate,
  },
];

export default () => {
  const [index, setindex] = React.useState(0);
  const Component = React.useMemo(() => tabs[index].component, [index]);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom", "left", "right"]}>
      <StatusBar style="light" backgroundColor={backgroundColor} />
      <TabContentsContainer>

        <ContentMarginTop />
        <ScreenTitles>Rate Calculator</ScreenTitles>
        <ContentMarginTop />
        <TabsContainer>
          <View style={{ flexDirection: 'row' }}>
            {tabs.map((item, id) => (
              <RateCalculatorTab key={id} active={id === index} onPress={() => setindex(id)}>
                <Text style={{ color: id === index ? backgroundColor : white }}>{item.title}</Text>
              </RateCalculatorTab>
            ))}
          </View>
        </TabsContainer>

        <View style={{ flex: 1 }}>
          <Component />
        </View>
      </TabContentsContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    gap: 10,
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',

  },
});
