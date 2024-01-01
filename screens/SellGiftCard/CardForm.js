import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
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
    ShortModalItemList,
    CardFormOptions,
    CardFormOptionsContainer,
    CardOptionTitle,
    CardOptionSmallText,
    AllCarddFormTitle,
    NothingToshowText,
} from '../../styles/styles';

// ======icon==============
import { Octicons } from '@expo/vector-icons';




const CardForm = ({ isModalVisible, toggleModal, handleCardFormSelection, filteredCardForms }) => {
    const selectCardForm = (cardForm) => {
        handleCardFormSelection(cardForm.name);
        toggleModal(); // Close the modal
    };


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
                        <ShortModalTitle>Gift card form</ShortModalTitle>
                        <CloseButton onPress={toggleModal}>
                            <Octicons name="x" size={24} color="white" />
                        </CloseButton>
                    </ShortModalHeading>
                    {filteredCardForms.length > 0 ? ( // Use filteredCardForms here
                        <View>
                            <AllCarddFormTitle>
                                Kindly select gift card form below. If you don't know which one
                                to choose, select ALL FORMS.
                            </AllCarddFormTitle>
                            <FlatList
                                data={filteredCardForms} // Use filteredCardForms here
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => selectCardForm(item)}
                                    >
                                        <CardFormOptionsContainer>
                                            <CardFormOptions>
                                                <CardOptionTitle>{item.name}</CardOptionTitle>
                                                <CardOptionSmallText>{item.description}</CardOptionSmallText>
                                            </CardFormOptions>
                                        </CardFormOptionsContainer>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    ) : (
                        // Render an empty screen when there are no card forms
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <NothingToshowText>No card forms available for this category.</NothingToshowText>
                        </View>
                    )}
                </ShortModal>
            </ShortModalContainer>
        </Modal>
    );
}

export default CardForm;
