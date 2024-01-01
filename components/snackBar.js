import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Snackbar() {
  useEffect(() => {
    // Create a function that will be executed after 2 minutes

    const runForTwoMinutes = () => {
      console.log("This function ran after 2 minutes.");
      // You can perform any desired actions here
    };

    // Set a timeout for 2 minutes
    const timeoutId = setTimeout(runForTwoMinutes, 120000);

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="checkbox-marked-circle-outline"
        size={24}
        color="green"
      />
      <Text style={styles.text}>sucessfuly updated</Text>
    </View>
  );
}

export default Snackbar;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginLeft: "25%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 4,
    gap: 5,
    // height: 50,
    position: "absolute",
    top: 20,
    backgroundColor: "white",
    // borderColor: "blue",
    // borderWidth: 2,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 10,
  },
  text: {
    color: "green",
    fontSize: 20,
  },
});
