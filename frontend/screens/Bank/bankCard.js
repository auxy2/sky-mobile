import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import {
    StyledContainer,
    Colors,
    MainContainer,
    ScreenTitles,
    ContentMarginTop,
    BankCardContainer,
    CardIcon,
    AccountNoContent,
    AccountNumber,
    AcctNumberText,
    AccountNameContent,
    AcctName,
    BankName,
    CardDetailsContainer,
    DetailsTextContainer,
    CardDetailsLeftText,
    CardDetailsRightText,
    DeleteBankInfoBtn,
    DeleteBankText,
    BankIcon,
} from '../../styles/styles';


const BankCard = ({ navigation, route: { params } }) => {
    const [isCardDetailsOpen, setCardDetailsOpen] = React.useState(false);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StyledContainer>
                <StatusBar style="light" backgroundColor={Colors.backgroundColor} />
                <MainContainer>
                    <ScreenTitles>My Bank Account</ScreenTitles>
                    <ContentMarginTop />

                    {/* =====bank card container (clickable)========= */}

                    <BankCardContainer onPress={() => setCardDetailsOpen(prev => !prev)}>
                        <CardIcon>
                            <BankIcon source={require("../../assets/icons/white-bank.png")} />
                        </CardIcon>
                        <AccountNoContent>
                            <AccountNumber>{params?.AccountNumber}</AccountNumber>
                            <AcctNumberText>Account Number</AcctNumberText>
                        </AccountNoContent>
                        <AccountNameContent style={{ alignItem: 'center' }}>
                            <AcctName>{params?.AccountName}</AcctName>
                        </AccountNameContent>
                        <AccountNameContent style={{ alignItem: 'center' }}>
                            <BankName>{params?.BankName}</BankName>
                        </AccountNameContent>
                    </BankCardContainer>


                    {/* =====bank details (conditionally rendered)========= */}
                    {isCardDetailsOpen && (
                        <CardDetailsContainer>
                            <DetailsTextContainer>
                                <CardDetailsLeftText>Bank name</CardDetailsLeftText>
                                <CardDetailsRightText>{params?.bankName}</CardDetailsRightText>
                            </DetailsTextContainer>
                            <DetailsTextContainer>
                                <CardDetailsLeftText>Account name</CardDetailsLeftText>
                                <CardDetailsRightText>{params?.accountName}</CardDetailsRightText>
                            </DetailsTextContainer>
                            <DetailsTextContainer>
                                <CardDetailsLeftText>Account number</CardDetailsLeftText>
                                <CardDetailsRightText>{params?.accountNumber}</CardDetailsRightText>
                            </DetailsTextContainer>
                            <DeleteBankInfoBtn>
                                <DeleteBankText>Delete account</DeleteBankText>
                            </DeleteBankInfoBtn>
                        </CardDetailsContainer>
                    )}
                </MainContainer>
            </StyledContainer>
        </SafeAreaView>
    );
};

export default BankCard;
