import { View, Text, ScrollView } from "react-native";
import React from "react";

export default function Settings() {
  return (
    <ScrollView
      style={{
        marginTop: 50,
        marginBottom: 20,
        marginHorizontal: 15,
        backgroundColor: "white",
        paddingHorizontal: 20,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}
    >
      <Text
        style={{
          marginVertical: 10,
          textAlign: "center",
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        Design and Development of an IoT-based Solar Charge Controller and
        Android Application using Raspberry Pi
      </Text>
      <Text style={{ textAlign: "justify", fontSize: 15 }}>
        This study aims to design an IOT-based charge controller that can
        remotely monitor the status of batteries and solar panels using
        Raspberry Pi, and to develop an Android application that can receive
        real-time data from the solar charge controller.
      </Text>
      <Text
        style={{
          textAlign: "left",
          fontSize: 15,
          marginTop: 10,
          marginBottom: 5,
        }}
      >
        Moreover, this study intends explicitly to attain the following
        objectives:
      </Text>
      <Text style={{ textAlign: "left", fontSize: 15, marginVertical: 10 }}>
        1. To propose a design for the solar charge controller and Android
        application enabled by IoT using Raspberry Pi. {"\n"}2. Consider both
        overcharging and over-discharging to determine the reliability of the
        battery's protection system. {"\n"}3. Consider both manual and remote
        switching control to determine the reliability of the device's switching
        control function on the terminals. {"\n"}4. To determine the android
        application's accuracy in monitoring the charging process in terms of
        voltage and current.{"\n"}5. To determine the general acceptability of
        the IoT-Based Solar Charge Controller and Android Application using
        Raspberry Pi based on ISO/IEC 25010 – Software Product Quality Standards
        in terms of Functional Suitability, Compatibility, Usability,
        Reliability, Security, and Portability.
      </Text>
      <Text style={{ textAlign: "left", fontSize: 15, marginVertical: 5 }}>
        Nicole B. Caitum {"\n"}Den Christopher A. Ebones {"\n"}Joanas P. Quilas
      </Text>
      <Text style={{ textAlign: "left", fontSize: 15, marginVertical: 5 }}>
        Camarines Norte State College {"\n"}
        College of Engineering
      </Text>
    </ScrollView>
  );
}
