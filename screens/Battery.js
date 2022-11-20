import { View, Text, Image, ImageBackground, Dimensions } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";

import React, { useEffect, useState } from "react";

export default function Battery() {
  const [batt, setBatt] = useState();

  const getBatt = async () => {
    const res = await fetch("https://sowishi.pythonanywhere.com/battery");
    const json = await res.json();

    setBatt(json);
  };

  const refreshLoop = () => {
    setTimeout(() => {
      console.log("refreshed");
      getBatt();
      refreshLoop();
    }, 3000);
  };

  const handleBattData = () => {
    if (batt === undefined) {
      return [0];
    }
    return [batt.bat_percentage / 100];
  };

  useEffect(() => {
    getBatt();
    refreshLoop();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          borderColor: "rgb(0,233,0)",
          margin: 10,
          padding: 15,
          borderWidth: 10,
          borderRadius: 50,
        }}
      >
        <View style={{ position: "relative" }}>
          <Text
            style={{
              position: "absolute",
              top: "40%",
              left: "35%",
              zIndex: 2,

              fontWeight: "bold",
              fontSize: 50,
              color: "black",
            }}
          >
            {/* {batt ? batt.bat_percentage : "Loading"} */}
            {batt && `${batt.bat_percentage}%`}
          </Text>
          <ProgressChart
            data={{
              data: handleBattData(),
            }}
            width={250}
            height={300}
            strokeWidth={16}
            radius={100}
            hideLegend={true}
            chartConfig={{
              backgroundColor: "#27B376",
              backgroundGradientFrom: "#fefefe",
              backgroundGradientTo: "#fefefe",
              color: (opacity = 1) => `rgba(0, 233, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "10",
                strokeWidth: "20",
                stroke: "green",
              },
            }}
            style={{
              marginVertical: 5,
              borderRadius: 16,
            }}
          />
        </View>
      </View>
    </View>
  );
}
