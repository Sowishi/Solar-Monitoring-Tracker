import { View, Text, Dimensions, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { LineChart, ProgressChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

export default function Energy() {
  const [info, setInfo] = useState();

  function SolarLineGraph() {
    return (
      <LineChart
        verticalLabelRotation={30}
        bezier
        data={{
          labels: handleTime(),
          datasets: [
            {
              data: handlePowerPV(),
            },
          ],
        }}
        width={Dimensions.get("screen").width - 20} // from react-native
        height={300}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#6AD0F5",
          backgroundGradientFrom: "#fefefe",
          backgroundGradientTo: "#fefefe",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 232, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "green",
          },
        }}
        style={{
          marginVertical: 5,
          borderRadius: 16,
          padding: 10,
        }}
      />
    );
  }

  const getData = async () => {
    const response = await fetch("https://sowishi.pythonanywhere.com/info");
    const data = await response.json();
    setInfo(data);
  };

  const handlePowerPV = () => {
    if (info !== undefined) {
      const toReturn = info.map((i) => {
        return i.pv_power;
      });
      return toReturn;
    } else {
      console.log("underfin info");
      return [0];
    }
  };

  const handleTime = () => {
    if (info !== undefined) {
      const toReturn = info.map((i) => {
        const split = i.timeHours.split(":");
        const newHour = parseInt(split[0]) - 4;
        const time = `${newHour}:${split[1]}`;
        return time;
      });
      return toReturn;
    } else {
      console.log("underfin info");
      return ["There's no data"];
    }
  };

  const refreshLoop = () => {
    setTimeout(() => {
      console.log("refreshed");
      getData();
      refreshLoop();
    }, 3000);
  };

  useEffect(() => {
    getData();
    refreshLoop();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: 20,
          textAlign: "center",
        }}
      >
        Total Energy Usage:{" "}
        <Text style={{ fontWeight: "bold", color: "#6AD0F5" }}>
          83.33K kWh <Feather name="sun" size={24} color="black" />
        </Text>
      </Text>
      <ScrollView>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View>{SolarLineGraph(info)}</View>
          <View>
            <ProgressChart
              data={{
                labels: ["Swim", "Bike", "Run"], // optional
                data: [0.4, 0.6, 0.8],
              }}
              width={Dimensions.get("window").width - 20}
              height={220}
              strokeWidth={16}
              radius={32}
              hideLegend={false}
              chartConfig={{
                backgroundColor: "#6AD0F5",
                backgroundGradientFrom: "#6AD0F5",
                backgroundGradientTo: "#BF212F",
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
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
      </ScrollView>
    </SafeAreaView>
  );
}
