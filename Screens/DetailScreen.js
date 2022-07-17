import { Button, Card, ListItem } from "react-native-elements";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

import { Component } from "react/cjs/react.production.min";
import DatePicker from "react-native-date-picker";
import Feath from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/Ionicons";
import MC from "react-native-vector-icons/MaterialIcons";
import Mat from "react-native-vector-icons/MaterialCommunityIcons";
import { color } from "react-native-reanimated";

// import { useNavigation } from '@react-navigation/native';

function DetailScreen(props) {
  const navigation = useNavigation();
  console.log("Proppssp-==--=>" + JSON.stringify(props.route.params));
  const [pro, setPro] = useState(props.route.params);
  const [checkcolor, setCheckColor] = useState(false);
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [openForEnd, setOpenForEnd] = useState(false);
  const [checkStatus, setCheckStatus] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", borderRadius: 15 }}>
      <ImageBackground
        imageStyle={{ borderRadius: 10 }}
        source={{ uri: pro ? pro.pordcuts.pictureURL : null }}
        resizeMode="cover"
        style={{ flex: 0.45, width: "100%", alignSelf: "center" }}
      >
        <TouchableOpacity
          onPress={() => {
            // Toggleshowbox()
            navigation.navigate("Home");
          }}
          style={{
            width: "13%",
            height: "15%",
            backgroundColor: "#C8C8C8",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            margin: 5,
          }}
        >
          <Icon name="chevron-back" size={23} color={"#000"} />
        </TouchableOpacity>
      </ImageBackground>
      <View style={{ marginLeft: 15, marginTop: 5 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Mat
            name="clipboard-play"
            size={23}
            color={"#000"}
            style={{ marginTop: 5 }}
          />
          <Text
            style={{ marginLeft: 5, marginTop: 5, color: "#000", fontSize: 18 }}
          >
            {pro ? pro.pordcuts.name : null}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 0.1,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="people" size={23} color="#54697C" />
          <Text style={{ marginLeft: 10, color: "#54697C" }}>3000+</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="briefcase" size={23} color="#54697C" />
          <Text style={{ marginLeft: 10, color: "#54697C" }}></Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MC name="star" size={23} color={"#FFB342"} />
          <Text style={{ marginLeft: 10, color: "#54697C" }}>7.5</Text>
        </View>
      </View>
      <View style={{ flex: 0.15 }}>
        <Text
          style={{
            marginLeft: 15,
            fontSize: 16,
            fontWeight: "600",
            color: "#000",
          }}
        >
          Description
        </Text>
        <Text
          style={{
            marginLeft: 15,
            fontSize: 14,
            width: "90%",
            marginTop: 5,
            color: "#000",
          }}
          numberOfLines={7}
        >
          {pro ? pro.pordcuts.description : null}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          flex: 0.15,
          paddingHorizontal: "8%",
          justifyContent: "space-between",
          alignItems: "center",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "#000", fontSize: 18 }}>Daily</Text>
          <Text style={{ color: "#000", marginTop: 5 }}>
            Rs. {pro ? pro.pordcuts.day : null}
          </Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "#000", fontSize: 18 }}>Weekly</Text>
          <Text style={{ color: "#000", marginTop: 5 }}>
            Rs. {pro ? pro.pordcuts.week : null}
          </Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "#000", fontSize: 18 }}>Monthly</Text>
          <Text style={{ color: "#000", marginTop: 5 }}>
            Rs. {pro ? pro.pordcuts.monthly : null}
          </Text>
        </View>
      </View>
      <Text style={{ color: "#000", marginTop: 10, alignSelf: "center" }}>
        Refundable security deposit : Rs 999 hint-icon
      </Text>
      <View
        style={{
          flex: 0.15,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{ borderWidth: 0.5, padding: 10 }}
          onPress={() => {
            setOpen(true);
          }}
        >
          <Text style={{ color: "#000" }}>
            {startdate ? startdate : "Choose a start date"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ borderWidth: 0.5, padding: 10 }}
          onPress={() => {
            setOpenForEnd(true);
          }}
        >
          <Text style={{ color: "#000" }}>
            {" "}
            {enddate ? enddate : "Choose a end date"}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 0.1,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          style={{
            width: "40%",
            backgroundColor: checkcolor ? "#F75666" : "#54697C",
            alignSelf: "center",
            padding: 8,
            borderRadius: 10,
            marginTop: 10,
          }}
          onPress={() => {
            checkcolor
              ? navigation.navigate("MyCart", {
                  prod: pro.pordcuts,
                  datesS: { startD: startdate, endD: enddate },
                })
              : alert("Make Sure you selected the start and end date!");
          }}
        >
          <Text style={{ fontSize: 17, alignSelf: "center", color: "#F1F1F1" }}>
            Proceed to checkout
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "40%",
            backgroundColor: "#4FAB15",
            alignSelf: "center",
            padding: 8,
            borderRadius: 10,
            marginTop: 10,
            flexDirection: "row",
          }}
          onPress={() => {
            navigation.navigate("Cart", {
              prod: pro.pordcuts,
              datesS: { startD: startdate, endD: enddate },
            });
          }}
        >
          <Icon name="cart" size={23} />
          <Text
            style={{
              fontSize: 17,
              alignSelf: "center",
              color: "#F1F1F1",
              marginLeft: 10,
              alignSelf: "center",
            }}
          >
            Add to cart
          </Text>
        </TouchableOpacity>
      </View>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false);
          const month = date.getMonth() + 1;
          const datePic =
            date.getDate() + "/" + month + "/" + date.getFullYear();
          setStartdate(datePic);
          // setDate(JSON.parse(datePic))
        }}
        onCancel={() => {
          setOpen(false);
        }}
        mode={"date"}
        onDateChange={(res) => {}}
      />
      {/* Copyyyyyyyyyyy */}
      <DatePicker
        modal
        open={openForEnd}
        date={date}
        onConfirm={(date) => {
          setOpenForEnd(false);
          const month = date.getMonth() + 1;
          const datePic =
            date.getDate() + "/" + month + "/" + date.getFullYear();
          setEnddate(datePic);
          setCheckColor(true);
        }}
        onCancel={() => {
          setOpenForEnd(false);
        }}
        mode={"date"}
        onDateChange={(res) => {}}
      />
    </View>
  );
}

export default DetailScreen;
