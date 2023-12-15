import React from "react";
import { StatusBar } from "expo-status-bar";
// ======icon==============

//////components--------
import {
    StyledContainer,
    Colors,
    MainContainer,
    ScreenTitles,
    ContentMarginTop,
    AlertItemDetails,
    AlertItemRow,
    AlertItemDetailsLeftText,
    AlertItemDetailsRightText,
    ItemDeleteBtn,
    DeleteBtnText,
    ItemButtonsContainer

} from '../../styles/styles';
import { ActivityIndicator } from "react-native";
import { useRate } from "../../contexts/rate.context";
import { SafeAreaView } from "react-native-safe-area-context";

const { backgroundColor } = Colors;
const RateAlertDetails = ({ navigation, route: { params } }) => {
    const { get, remove, loading } = useRate();
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        setData(get(params.id));
    }, [params.id]);

    const deleteHandler = async () => {
        await remove(params.id, navigation.goBack, err => alert(err.message));
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StyledContainer>
                <StatusBar style="light" backgroundColor={backgroundColor} />
                <MainContainer>
                    <ScreenTitles>Alert Details</ScreenTitles>
                    <ContentMarginTop />
                    <AlertItemDetails>
                        <AlertItemRow>
                            <AlertItemDetailsLeftText>Notification Type</AlertItemDetailsLeftText>
                            <AlertItemDetailsRightText>{data?.selectedNotifyMethod}</AlertItemDetailsRightText>
                        </AlertItemRow>
                        <AlertItemRow>
                            <AlertItemDetailsLeftText>Asset</AlertItemDetailsLeftText>
                            <AlertItemDetailsRightText>{data?.asset}</AlertItemDetailsRightText>
                        </AlertItemRow>
                        <AlertItemRow>
                            <AlertItemDetailsLeftText>Category</AlertItemDetailsLeftText>
                            <AlertItemDetailsRightText>{data?.selectedCategory}</AlertItemDetailsRightText>
                        </AlertItemRow>
                        <AlertItemRow>
                            <AlertItemDetailsLeftText>Sub Category</AlertItemDetailsLeftText>
                            <AlertItemDetailsRightText>{data?.selectedSubCategory}</AlertItemDetailsRightText>
                        </AlertItemRow>
                        <AlertItemRow>
                            <AlertItemDetailsLeftText>Current Rate</AlertItemDetailsLeftText>
                            <AlertItemDetailsRightText>{data?.selectedRate}</AlertItemDetailsRightText>
                        </AlertItemRow>
                        <AlertItemRow>
                            <AlertItemDetailsLeftText>Notify me when the rate is above</AlertItemDetailsLeftText>
                            <AlertItemDetailsRightText>{data?.enteredAmount}</AlertItemDetailsRightText>
                        </AlertItemRow>
                    </AlertItemDetails>
                    <ItemButtonsContainer>
                        <ItemDeleteBtn onPress={loading ? null : deleteHandler}>
                            <DeleteBtnText>{loading ? <ActivityIndicator /> : 'Delete'}</DeleteBtnText>
                        </ItemDeleteBtn>
                        {/* <ItemEditBtn onPress = {() => navigation.navigate("RateAlertForm")}>
                        <ItemBtnText>Edit</ItemBtnText>
                    </ItemEditBtn> */}
                    </ItemButtonsContainer>
                </MainContainer>
            </StyledContainer>
        </SafeAreaView>
    );
};


export default RateAlertDetails;
