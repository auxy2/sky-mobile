import React from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from '@expo/vector-icons';
import { useRate } from "../../contexts/rate.context";
import { ActivityIndicator, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    Colors,
    ButtonText,
    NoBankAlert,
    StyledButton,
    RateInfoText,
    RateItemIcon,
    RateItemName,
    ScreenTitles,
    RateAlertItem,
    MainContainer,
    StyledContainer,
    ContentMarginTop,
    NoBankAlertImage,
    ScreenTitlesHeader,

} from '../../styles/styles';

const RateAlert = ({ navigation: { push, navigate } }) => {
    const { all, data, loading } = useRate();

    React.useEffect(() => {
        if (!loading && data.length === 0) all();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StyledContainer>
                <StatusBar style="light" backgroundColor={Colors.backgroundColor} />
                <MainContainer>
                    <ScreenTitlesHeader>
                        <ScreenTitles>Rate List</ScreenTitles>
                    </ScreenTitlesHeader>

                    <ContentMarginTop />

                    {loading ? <ActivityIndicator size='large' /> : data.length ?
                        <FlatList data={data} keyExtractor={(item) => item._id} renderItem={({ item }) => (
                            <RateAlertItem onPress={() => { push("RateAlertDetails", { id: item._id }) }} >
                                <RateItemName>{item.selectedCategory}</RateItemName>
                                <RateItemIcon>
                                    <Ionicons name="alert" color={Colors.success} size={16} />
                                </RateItemIcon>
                            </RateAlertItem>
                        )} /> :
                        <NoBankAlert>
                            <NoBankAlertImage source={require("../../assets/icons/clock.png")} />
                            <RateInfoText>No rate alert yet</RateInfoText>
                            <StyledButton onPress={() => navigate("RateAlertForm")}>
                                <ButtonText>Set rate</ButtonText>
                            </StyledButton>
                        </NoBankAlert>
                    }
                </MainContainer>
            </StyledContainer>
        </SafeAreaView>
    );
};


export default RateAlert;
