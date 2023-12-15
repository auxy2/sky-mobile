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
    { id: 1, image: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg", name: "AMAZON CARD",
    subcategories: [
        { id: 11, name: "Amazon Subcategory 1",  image: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg", minimumAmount: '50', rate: '600'},
        { id: 12, name: "Amazon Subcategory 2",  image: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg", minimumAmount: '100', rate: '600'},
        { id: 13, name: "Amazon Subcategory 3",  image: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg", minimumAmount: '30', rate: '500'},
    ],
    cardForms: [
        {id: 15, name: 'Pysical card',  description: "The giftcard is bought from a physical store and you have the card image" },
        {id: 20, name: 'Ecode',  description: "The giftcard is bought online and you have the code or the code is on a paper, or it's scanned" },
        {id: 33, name: 'All Forms', description: "The giftcard is bought from a physical store and you have the card image"},
     ]
    },
    { id: 2, image: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg", name: "ITUNES CARD",
        subcategories: [
            { id: 10, name: "Itunes Subcategory 1",  image: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg", minimumAmount: '50-100', rate: '600'},
            { id: 12, name: "Itunes Subcategory 2",  image: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg", minimumAmount: '30-100', rate: '600'},
        ],
        cardForms: [
            {id: 50, name: 'Pysical card', description: "The giftcard is bought from a physical store and you have the card image"},
            {id: 61, name: 'Ecode', description: "The giftcard is bought from a physical store and you have the card image"},
         ]
    },
];


const CardCategory = ({ isModalVisible, toggleModal, handleCategorySelection, cartegories}) => {
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
                            <TouchableOpacity onPress={() => {handleCategorySelection(item.name); toggleModal()}}>
                                <ShortModalItemContainer>
                                    {item.image && (
                                        <Image
                                            source={{ uri: item.image }}
                                            style={{ width: 20, height: 20, marginRight: 10, borderRadius: 50 }}
                                        />
                                    )}
                                    <ShortModalItemName>{item.name}</ShortModalItemName>
                                </ShortModalItemContainer>
                            </TouchableOpacity>
                        )}
                    />
                </ShortModal>
            </ShortModalContainer>
        </Modal>
    );
}

export default CardCategory;
