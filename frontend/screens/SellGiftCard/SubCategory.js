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
    RateItemsContent,
    RateItemContainer,
    RateContainer,
} from '../../styles/styles';

// ======icon==============
import { Octicons } from '@expo/vector-icons';


// const cardSubCategoryData = [
//     { id: 1, image: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg", name: "AMAZON CARD" },
//     { id: 2, image: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg", name: "ITUNES CARD" },
//     { id: 3, image: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg", name: "EBAY CARD" },
//     { id: 4, image: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg", name: "GOOGLE PLAY CARD" },
//     { id: 5, image: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg", name: "SPOTIFY CARD" },
//     { id: 6, image: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg", name: "AMAZON CARD" },
//     { id: 7, image: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg", name: "AMAZON CARD" },
//     { id: 8, image: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg", name: "AMAZON CARD" },
//     { id: 9, image: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg", name: "AMAZON CARD" },
//     { id: 10, image: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg", name: "AMAZON CARD" },
// ];





const SubCategoryModal = ({ isModalVisible, toggleModal, subcategories, handleSubCategorySelection }) => {
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
                        <ShortModalTitle>Select Subcategory</ShortModalTitle>
                        <CloseButton onPress={toggleModal}>
                            <Octicons name="x" size={24} color="white" />
                        </CloseButton>
                    </ShortModalHeading>
                    <FlatList
                        data={subcategories} // Use the passed subcategories
                        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => { handleSubCategorySelection(item.name); toggleModal() }}>
                                <RateItemsContent>
                                    <RateItemContainer>
                                        {item.image && (
                                            <Image
                                                source={{ uri: item.image }}
                                                style={{
                                                    width: 25,
                                                    height: 25,
                                                    marginRight: 10,
                                                    borderRadius: 50,
                                                }}
                                            />
                                        )}
                                        <ShortModalItemName>{item.name}</ShortModalItemName>
                                    </RateItemContainer>
                                    <RateContainer>
                                        <ShortModalItemName>{item.minimumAmount}</ShortModalItemName>
                                    </RateContainer>
                                </RateItemsContent>
                            </TouchableOpacity>
                        )}
                    />
                </ShortModal>
            </ShortModalContainer>
        </Modal>
    );
}

export default SubCategoryModal;

