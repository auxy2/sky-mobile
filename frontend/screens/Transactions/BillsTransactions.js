import React from "react";
import { NoRecordReceiptContainer, ReceiptImage, ReceiptText } from "../../styles/styles"; // Assuming you have styles defined for ScreenTitles

const BillsTransaction = () => {
  return (
    <NoRecordReceiptContainer>
    <ReceiptImage source={require("../../assets/icons/receipt.png")} />
    <ReceiptText>No withdrawal record found</ReceiptText>
  </NoRecordReceiptContainer>
  );
};

export default BillsTransaction;
