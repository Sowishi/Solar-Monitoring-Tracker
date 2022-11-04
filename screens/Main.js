import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Modal,
  StyleSheet,
  Switch,
} from "react-native";

import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import AllConnected from "./AllConnected";

export default function Main() {
  const [button1_state, setButton1_state] = useState();
  const [loading, setLoading] = useState(false);

  const getButton1_State = async () => {
    const response = await fetch("https://sowishi.pythonanywhere.com/state");
    const json = await response.json();
    setButton1_state(json.state);
  };

  const handleButton1_State = async () => {
    setLoading(true);
    if (button1_state === "False" || button1_state === "false") {
      state = "true";
    } else {
      state = "false";
    }
    await fetch(`https://sowishi.pythonanywhere.com/state/${state}`);
    getButton1_State();
    setLoading(false);
  };

  useEffect(() => {
    getButton1_State();
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          button1_state === "true" || button1_state === "True"
            ? "#27B376"
            : "#BF212F",
      }}
    >
      <Modal animationType="fade" transparent={true} visible={loading}>
        <View style={styles.centeredView}>
          <ActivityIndicator size="large" color="#6AD0F5" />
        </View>
      </Modal>
      <View
        style={{
          flex: 1,
          backgroundColor:
            button1_state === "true" || button1_state === "True"
              ? "#27B376"
              : "#BF212F",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 30, color: "white", fontWeight: "bold" }}>
            Welcome, Aboard!
          </Text>
          <Text style={{ fontSize: 15, color: "white" }}>
            "Make the sun work for you"
          </Text>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Pressable
              onPress={handleButton1_State}
              style={{
                marginTop: 20,
                backgroundColor: "white,",
                padding: 20,
                paddingBottom: 0,
              }}
            >
              <Switch
                style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
                trackColor={{ false: "white", true: "white" }}
                thumbColor="#6AD0F5"
                onValueChange={handleButton1_State}
                value={button1_state === "true" || button1_state === "True"}
              />
            </Pressable>

            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
              {button1_state === "true" || button1_state === "True"
                ? "ACTIVE"
                : "INACTIVE"}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 2,
          backgroundColor: "white",
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View>
          <Text
            style={{
              color: "gray",
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              flexDirection: "row",
            }}
          >
            SYSTEM STATUS {""}
            <Ionicons name="settings" size={20} color="gray" />
          </Text>

          <AllConnected />
        </View>
      </View>
      <StatusBar
        backgroundColor={
          button1_state === "true" || button1_state === "True"
            ? "#27B376"
            : "#BF212F"
        }
        style="light"
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  modalView: {
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    height: "80%",
    borderRadius: 20,
    paddingVertical: 20,
  },
});
