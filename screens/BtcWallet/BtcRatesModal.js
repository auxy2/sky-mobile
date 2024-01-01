import React from 'react';
import { FlatList, Image, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

//////components--------
import {
    ButtonText,
    Colors,
    CardRateInner,
    BottomTextContent,
    ShortModalContainer,
    ShortModal,
    ShortModalHeading,
    ShortModalTitle,
    CloseButton,
    ShortModalItemContainer,
    ShortModalItemName,
} from '../../styles/styles';

// ======icon==============
import { Octicons } from '@expo/vector-icons';


export const cardCategoryData = [
    { id: 1, LessThan: "Less than 100",    BtcRate: "890"},
    { id: 2, LessThan: "Less than 500",    BtcRate: "890"},
    { id: 3, LessThan: "Above 700",    BtcRate: "990"},
    { id: 4, LessThan: "Less than 300",    BtcRate: "890"},
];


const BtcRatesModal = ({ isModalVisible, toggleModal, handleCategorySelection, cartegories}) => {
    return (
        <Modal
            isVisible={isModalVisible}
            style={{ margin: 0 }}
            onBackdropPress={toggleModal}
            backdropOpacity={0.5}
            animationIn="slideInUp"
            animationOut="slideOutDown"
        >
            <ShortModalContainer>
                <ShortModal>
                        <ShortModalHeading>
                    <ShortModalTitle>Select a Category</ShortModalTitle>
                    <CloseButton onPress={toggleModal}>
                        <Octicons name="x" size={24} color="white" />
                    </CloseButton>
                    </ShortModalHeading>
                    <FlatList
                        data={cartegories}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                                <ShortModalItemContainer>
                                    <ShortModalItemName>{item.LessThan}</ShortModalItemName>
                                    <ShortModalItemName>{item.name}</ShortModalItemName>
                                </ShortModalItemContainer>
                        )}
                    />
                </ShortModal>
            </ShortModalContainer>
        </Modal>
    );
}

export default BtcRatesModal;
