import {
  View,
  Text,
  ActivityIndicator,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Image,
} from "react-native";

import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

import SvgComponent from "./StatusMap";

import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Signika_300Light,
  Signika_400Regular,
  Signika_500Medium,
  Signika_600SemiBold,
  Signika_700Bold,
} from '@expo-google-fonts/signika';


export default function Main() {
  const [button1_state, setButton1_state] = useState();
  const [button2_state, setButton2_state] = useState();
  const [info, setInfo] = useState();
  const [loading, setLoading] = useState(false);

  const getButton1_State = async () => {
    const response = await fetch(
      "https://sowishi.pythonanywhere.com/button_state/button_bat"
    );
    const json = await response.json();
    setButton1_state(parseInt(json.state));
  };

  const handleButton1_State = async () => {
    let state =  0;
    if (button1_state === 0) {
      state = 1;
    }
    await fetch(
      `https://sowishi.pythonanywhere.com/button_state/button_bat/${state}`
    );
    getButton1_State();
  };

  const getButton2_State = async () => {
    const response = await fetch(
      "https://sowishi.pythonanywhere.com/button_state/button_sol"
    );
    const json = await response.json();
    setButton2_state(parseInt(json.state));
  };

  const handleButton2_State = async () => {
    let state = 0;
    if (button2_state === 0) {
      state = 1;
    }
    await fetch(
      `https://sowishi.pythonanywhere.com/button_state/button_sol/${state}`
    );
    getButton2_State();
  };

  const getInfoData = async () => {
    const res = await fetch("https://sowishi.pythonanywhere.com/info")
    const json = await res.json();
    setInfo(json);
  }

  const greetUser = () => {
    const today = new Date();
    const currentHour = today.getHours();
    if (currentHour < 12) {
      return "Hello, Good Morning! 🌞";
    } else if (currentHour < 18) {
      return "Good Afternoon! ☀️ ";
    } else {
      return "Good Evening! 🌙";
    }
  };

  const refreshLoop = () => {
    setTimeout(() => {
      console.log("refreshed Main");
      getButton1_State();
      getButton2_State();
      getInfoData()
      refreshLoop();
    }, 3000);
  };

  useEffect(() => {
    getButton1_State();
    getButton2_State();
    getInfoData()
    refreshLoop()
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          button1_state === 1 && button2_state == 1
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
            button1_state === 1 && button2_state == 1
              ? "#27B376"
              : "#BF212F",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center",    fontFamily: 'Signika_300Light',}}>
          <Text
            style={{
              fontSize: 30,
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {greetUser()}
          </Text>
          <Text style={{ fontSize: 15, color: "white" }}>
            "Make the sun work for you"
          </Text>
          <Text
            style={{
              fontSize: 20,
              marginTop: 20,
              color: "white",
            }}
          >
            Solar State:{" "}
            <Text style={{ fontWeight: "bold" }}>
              {button1_state === 1 && button2_state == 1
                ? "ACTIVE"
                : "INACTIVE"}
            </Text>
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 4,
          backgroundColor: "white",
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <View style={{ marginTop: 30 }}>
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

          {/* Icons Button */}

          <View style={{ position: "relative" }}>
            <View style={{position: "absolute", zIndex: 2, left: "44%", top: "6.5%"}}>
              <Image source={require("../assets/controller.png")} style={{width: 50, height: 50, }}/>
            </View>
            <TouchableOpacity
              style={{
                height: 70,
                width: 70,
                position: "absolute",
                zIndex: 999,
                left: "17%",
                bottom: "29%",
              }}
              onPress={handleButton1_State}
            >
              <View></View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                height: 70,
                width: 70,
                position: "absolute",
                zIndex: 999,
                right: "17%",
                bottom: "29%",
              }}
              onPress={handleButton2_State}
            >
              <View></View>
            </TouchableOpacity>

            {/* Icons Status  */}

            <View
              style={[{
                position: "absolute",
                bottom: "23%",
                left: "19.5%",
                zIndex: 99,
              }, button1_state === -1 ? {left: "15%"} : {}]}
            >
              <Text style={{ color: "#6AD0F5", fontWeight: "bold" }}>
                {button1_state !== -1 && (button1_state === 1 ? "Active" : "Inactive" )}
                {button1_state === -1 && <Text style={{color: "orange"}}> Low Battery </Text>}
              </Text>
            </View>

            <View
              style={[{
                position: "absolute",
                bottom: "23%",
                right: "19.5%",
                zIndex: 99,
              }, button2_state === -1 ? {right: "15%"} : {}]}
            >
              <Text style={{ color: "#6AD0F5", fontWeight: "bold" }}>
                {button2_state !== -1 && (button2_state === 1 ? "Active" : "Inactive" )}
                {button2_state === -1 && <Text style={{color: "orange"}}> Low Battery </Text>}
              </Text>
            </View>

            <View
              style={{
                position: "absolute",
                bottom: "7%",
                left: "11%",
                zIndex: 99,
                borderWidth: 2,
                paddingHorizontal: 8,
                paddingVertical: 5,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                borderColor: "#6AD0F5",
              }}
            >
              <Text style={{ color: "black", fontWeight: "bold" }}>
                Voltage:{" "}
                <Text style={{ fontWeight: "bold", color: "#27B376" }}>
                  {info ? `${info.bat_voltage}V` : "loading"}
                </Text>{" "}
                {"\n"}
                Current:{" "}
                <Text style={{ fontWeight: "bold", color: "#27B376" }}>
                  {info ? `${info.bat_current}A` : "loading"}

                </Text>{" "}
                {"\n"}
                Power:{" "}
                <Text style={{ fontWeight: "bold", color: "#27B376" }}>
                {info ? `${info.bat_power}W` : "loading"}

                </Text>
              </Text>
            </View>
            <View
              style={{
                position: "absolute",
                bottom: "7%",
                right: "11%",
                zIndex: 99,
                borderWidth: 2,
                paddingHorizontal: 8,
                paddingVertical: 5,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                borderColor: "#6AD0F5",
              }}
            >
              <Text style={{ color: "black", fontWeight: "bold" }}>
                Voltage:{" "}
                <Text style={{ fontWeight: "bold", color: "#BF212F" }}>
                {info ?`${info.pv_voltage}V` : "loading"}
                </Text>{" "}
                {"\n"}
                Current:{" "}
                <Text style={{ fontWeight: "bold", color: "#BF212F" }}>
                {info ?`${info.pv_current}A` : "loading"}
                </Text>{" "}
                {"\n"}
                Power:{" "}
                <Text style={{ fontWeight: "bold", color: "#BF212F" }}>
                {info ?`${info.pv_power}W` : "loading"}
                </Text>
              </Text>
            </View>

            <SvgComponent
              button1_color={
                button1_state === 1 || button1_state === 1
                  ? "#27B376"
                  : "#BF212F"
              }
              button2_color={
                button2_state === 1 || button2_state === 1
                  ? "#27B376"
                  : "#BF212F"
              }
            />
          </View>
        </View>
      </View>
      <StatusBar
        backgroundColor={
          button1_state === 1 && button2_state == 1
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
