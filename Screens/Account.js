import { Button, Card, ListItem } from "react-native-elements";
import {
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { db, firebase } from "../Screens/firebase";
import { doc, getDoc } from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "../Screens/styles/icons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";
import { auth } from "../Screens/firebase";
import { useNavigation } from "@react-navigation/native";

//import {Dropdown} from 'react-native-material-dropdown'
const AccountScreen = ({ navigation }) => {
  const [productData, setProductData] = useState();
  const [asyncKey, setAsyncKey] = useState();
  const [userDetails, setUserDetails] = useState("");

  useEffect(() => {
    getAsyncData();
  }, []);

  const getAsyncData = async () => {
    await AsyncStorage.getItem("@signUpData").then((res) => {
      setAsyncKey(JSON.parse(res));

      db.collection("users")
        .doc(JSON.parse(res))
        .get()
        .then((snapshot) => setUserDetails(snapshot.data()));
    });
  };

  const getItems = async () => {
    let arrayOfProducts = [];
    let data1 = await db.collection("users").get();

    data1.forEach(function (doc) {
      if (doc.exists) {
        arrayOfProducts.push(doc.data());
      } else {
        console.log("No document found!");
      }
    });
    return arrayOfProducts;
  };

  const handleSignOut = () => {
    // auth
    //   .signOut()
    //   .then(() => {
    AsyncStorage.removeItem("@signUpData");
    navigation.navigate("Login");
    //   navigation.replace('Login');
    // })
    // .catch(error => alert(error.message));
  };

  const [pickervalue, setpickervalue] = useState("User Detail");
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.2, padding: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{ width: 70, height: 70 }}
            source={require("../pictures/images/profileEr.png")}
          />
          <View style={{ justifyContent: "center", marginLeft: 10 }}>
            <Text style={{ color: "#000" }}>
              {userDetails ? userDetails.fullName : null}
            </Text>
            <Text style={{ color: "#000" }}>
              {userDetails ? userDetails.email : null}
            </Text>
            <Text style={{ color: "#000" }}>
              {userDetails ? userDetails.mobileNumber : null}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 0.1,
          width: "90%",
          padding: 5,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.15,
          shadowRadius: 1.84,
          elevation: 2,
          borderRadius: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 20, color: "#000", marginLeft: 10 }}>
          My Cart
        </Text>
        <Icon
          name="arrowright"
          type="ant"
          size={23}
          color="#000"
          style={{ marginRight: 10 }}
          onPress={() => {
            navigation.navigate("Cart", {
              prod: "data",
              datesS: { startD: "12/12/12", endD: "12/12/12" },
            });
          }}
        />
      </View>
      <View style={{ flex: 0.02 }}></View>

      <View
        style={{
          flex: 0.1,
          width: "90%",
          padding: 5,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.15,
          shadowRadius: 1.84,
          elevation: 2,
          borderRadius: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 20, color: "#000", marginLeft: 10 }}>
          My Orders
        </Text>
        <Icon
          name="arrowright"
          type="ant"
          size={23}
          color="#000"
          style={{ marginRight: 10 }}
          onPress={() => {
            navigation.navigate("MyOrders");
          }}
        />
      </View>
      <View style={{ flex: 0.3 }}></View>

      <View
        style={{
          alignItems: "center",
          width: "80%",
          alignSelf: "center",
          backgroundColor: "#F45465",
          height: 45,
          borderRadius: 10,
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            handleSignOut();
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20 }}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  button: {
    backgroundColor: "white",
    width: "60%",
    height: 60,
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    marginRight: 90,
    color: "black",
    fontSize: 16,
  },
  pickers: {
    width: 410,
    height: 45,
    fontSize: 16,
    backgroundColor: "red",
  },
  icon: {
    paddingLeft: 340,
  },
});

{
  /* <View style={styles.Card}>
        <Picker
          style={styles.pickers}
          selectedValue={pickervalue}
          onValueChange={itemValue => setpickervalue(itemValue)}>
          <Picker.item label="User Name" value="User Name" />
          <Picker.item label="Email" value="Email" />
          <Picker.item label="user Profile" value="user Profile" />
        </Picker>
      </View> */
}
