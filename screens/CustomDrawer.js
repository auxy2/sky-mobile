import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { ImageBackground } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { useAuthentication } from "../contexts/auth.context";
import { DrawerContentScrollView, DrawerItem, } from "@react-navigation/drawer";
import { Colors, UserInfo, UserName, UserEmail, BottomNav, SideBarNav, ProfileImage, BottomNavText } from "../styles/styles";


const { backgroundColor, inputPlaceholder, inputBg, danger } = Colors;
const CustomDrawer = (props) => {
  const navigation = props.navigation;
  const { user, signout } = useAuthentication();

  return (
    <SideBarNav>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: backgroundColor }}
      >
        <ImageBackground
          source={require("../assets/images/Profilebg-image.png")}
          style={{
            padding: 20,
            paddingTop: 50,
            height: 150,
            JustifyContent: "center",
            display: "flex",
            flexDirection: "row",
            gap: 10,
          }}
        >
          {user?.image ? (
            //user profile image
            <ProfileImage source={require("../assets/images/nopicture.png")} />
          ) : (
            <ProfileImage source={require("../assets/images/nopicture.png")} />
          )}
          <UserInfo>
            <UserName>{user?.name}</UserName>
            <UserEmail>{user?.email}</UserEmail>
          </UserInfo>
        </ImageBackground>
        {/* <DrawerItemList {...props} /> */}
        <DrawerItem
          icon={() => (
            <Ionicons
              name="person-outline"
              size={20}
              color={inputPlaceholder}
            />
          )}
          label="My Profile"
          labelStyle={{ fontSize: 16, color: inputPlaceholder }}
          onPress={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  {
                    name: "MainContent",
                    state: {
                      routes: [
                        {
                          name: "Settings",
                        },
                      ],
                      index: 0,
                    },
                  },
                  {
                    name: "ProfileSettings",
                  },
                ],
              })
            );
          }}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 5,
            borderBottomWidth: 1,
            borderBottomColor: inputBg,
          }}
        ></DrawerItem>
        <DrawerItem
          icon={() => (
            <Ionicons
              name="calculator-outline"
              size={20}
              color={inputPlaceholder}
            />
          )}
          label="Rate Calculator"
          labelStyle={{ fontSize: 16, color: inputPlaceholder }}
          onPress={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  {
                    name: "MainContent",
                  },
                  {
                    name: "RateCalculator",
                  },
                ],
              })
            );
          }}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 5,
            borderBottomWidth: 1,
            borderBottomColor: inputBg,
          }}
        ></DrawerItem>
        <DrawerItem
          icon={() => (
            <Ionicons
              name="wallet-outline"
              size={20}
              color={inputPlaceholder}
            />
          )}
          label="My Bank Account"
          labelStyle={{ fontSize: 16, color: inputPlaceholder }}
          onPress={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  {
                    name: "MainContent",
                    state: {
                      routes: [
                        {
                          name: "Wallet",
                        },
                      ],
                      index: 0,
                    },
                  },
                  {
                    name: "AddBankAccount",
                  },
                ],
              })
            );
          }}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 5,
            borderBottomWidth: 1,
            borderBottomColor: inputBg,
          }}
        ></DrawerItem>
        <DrawerItem
          icon={() => (
            <Ionicons name="share-outline" size={20} color={inputPlaceholder} />
          )}
          label="Referral"
          labelStyle={{ fontSize: 16, color: inputPlaceholder }}
          onPress={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  {
                    name: "MainContent",
                  },
                  {
                    name: "Referral",
                  },
                ],
              })
            );
          }}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 5,
            borderBottomWidth: 1,
            borderBottomColor: inputBg,
          }}
        ></DrawerItem>
        <DrawerItem
          icon={() => (
            <Ionicons
              name="help-circle-outline"
              size={20}
              color={inputPlaceholder}
            />
          )}
          label="Help & Support"
          labelStyle={{ fontSize: 16, color: inputPlaceholder }}
          onPress={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  {
                    name: "MainContent",
                  },
                  {
                    name: "Support",
                  },
                ],
              })
            );
          }}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 5,
            borderBottomWidth: 1,
            borderBottomColor: inputBg,
          }}
        ></DrawerItem>
        <DrawerItem
          icon={() => (
            <Ionicons name="log-out-outline" size={20} color={danger} />
          )}
          label="Logout"
          onPress={() => signout()}
          labelStyle={{ fontSize: 16, color: danger }}
          // onPress={() => {
          //   navigation.dispatch(
          //     CommonActions.reset({
          //       index: 1,
          //       routes: [
          //         {
          //           name: "AuthStack",
          //         },
          //         {
          //           name: "Login",
          //         },
          //       ],
          //     })
          //   );
          // }}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 5,
            paddingBottom: 20,
          }}
        ></DrawerItem>

        {/* <DrawerItem
          style={{
            backgroundColor: "red",
          }}
          label="Help"
          onPress={() => Linking.openURL("https://mywebsite.com/help")}
        /> */}
      </DrawerContentScrollView>
      <BottomNav>
        <BottomNavText>Rate App</BottomNavText>
        <BottomNavText>App version: 1.0</BottomNavText>
      </BottomNav>
    </SideBarNav>
  );
};

export default CustomDrawer;
