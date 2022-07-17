import { Text, TouchableOpacity } from "react-native";

import Icon from "../../../styles/icons";
import React from "react";
import { colors } from "../../../styles/colors";
import { useNavigation } from "@react-navigation/native";

const Smallbox = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        if (props.text == "Completed Orders") {
          navigation.navigate("OrdersHistory");
        } else if (props.text == "Total Users") {
          navigation.navigate("UserHistory");
        }
      }}
      style={{
        height: 140,
        width: 140,
        elevation: 5,
        padding: "2.5%",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: colors.WHITE,
        borderRadius: 10,
      }}
    >
      <Icon
        type={props.icontype}
        name={props.iconname}
        size={props.iconsize}
        color={props.iconcolor}
      />
      <Text
        style={{
          textAlign: "center",
          fontSize: 16,
          fontWeight: "700",
          color: "#000",
        }}
      >
        {props.text}
      </Text>
      <Text
        style={{ fontWeight: "bold", color: props.numbercolor, fontSize: 35 }}
      >
        {props.number}
      </Text>
    </TouchableOpacity>
  );
};
export default Smallbox;
