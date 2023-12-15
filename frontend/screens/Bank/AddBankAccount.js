import React from "react";
import { StatusBar } from "expo-status-bar";
//////components--------
import {
    StyledContainer,
    Colors,
    MainContainer,
    ScreenTitles,
    ContentMarginTop,
    NoBankAlert,
    NoBankAlertImage,
    NoBankAlertText,
    StyledButton,
    ButtonText,
    BankCardContainer,
    CardIcon,
    BankIcon,
    AccountNoContent,
    AccountNumber,
    AcctNumberText,
    AccountNameContent,
    AcctName,
    BankName,
    CardDetailsLeftText,
    CardDetailsRightText,
    DetailsTextContainer,
    CardDetailsContainer,
    DeleteBankText,
    DeleteBankInfoBtn

} from '../../styles/styles';
import { useBank } from "../../contexts/bank.context";
import { ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddBankAccount = ({ navigation: { replace, navigate } }) => {
    const { get, bank, remove, loading } = useBank();
    const [visible, SetVisible] = React.useState(false);

    React.useEffect(() => {
        if (!bank) get();
    }, []);

    const handleDelete = () => {
        Alert.alert('Delete account', "Are you sure you want to delete your account?", [
            { isPreferred: true, text: 'Yes', onPress: () => remove(() => replace('AddBankAccount')) },
            { isPreferred: false, text: 'No', onPress: null },
        ]);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StyledContainer>
                <StatusBar style="light" backgroundColor={Colors.backgroundColor} />
                <MainContainer>
                    <ScreenTitles>My Bank Account</ScreenTitles>
                    <ContentMarginTop />

                    {loading ? <ActivityIndicator /> : bank === null ? <NoBankAlert>
                        <NoBankAlertImage source={require("../../assets/icons/bank.png")} />
                        <NoBankAlertText>No account added yet</NoBankAlertText>
                        <StyledButton onPress={() => navigate("ChooseBank")}>
                            <ButtonText>Add Bank</ButtonText>
                        </StyledButton>
                    </NoBankAlert> : <>
                        <BankCardContainer onPress={() => SetVisible(prev => !prev)}>
                            <CardIcon>
                                <BankIcon source={require("../../assets/icons/white-bank.png")} />
                            </CardIcon>

                            <AccountNoContent>
                                <AccountNumber>{bank?.AccountNumber}</AccountNumber>
                                <AcctNumberText>Account Number</AcctNumberText>
                            </AccountNoContent>

                            <AccountNameContent style={{ alignItem: 'center' }}>
                                <AcctName>{bank?.AccountName}</AcctName>
                            </AccountNameContent>

                            <AccountNameContent style={{ alignItem: 'center' }}>
                                <BankName>{bank?.BankName}</BankName>
                            </AccountNameContent>
                        </BankCardContainer>
                    </>}

                    {visible && !loading ?
                        <CardDetailsContainer>
                            <DetailsTextContainer>
                                <CardDetailsLeftText>Bank name</CardDetailsLeftText>
                                <CardDetailsRightText>{bank?.BankName}</CardDetailsRightText>
                            </DetailsTextContainer>

                            <DetailsTextContainer>
                                <CardDetailsLeftText>Account name</CardDetailsLeftText>
                                <CardDetailsRightText>{bank?.AccountName}</CardDetailsRightText>
                            </DetailsTextContainer>

                            <DetailsTextContainer>
                                <CardDetailsLeftText>Account numbers</CardDetailsLeftText>
                                <CardDetailsRightText>{bank?.AccountNumber}</CardDetailsRightText>
                            </DetailsTextContainer>

                            <DeleteBankInfoBtn onPress={handleDelete}>
                                <DeleteBankText>Delete account</DeleteBankText>
                            </DeleteBankInfoBtn>
                        </CardDetailsContainer> :
                        null
                    }
                </MainContainer>
            </StyledContainer>
        </SafeAreaView>
    );
};


export default AddBankAccount;