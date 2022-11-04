import { View, Text, Dimensions } from "react-native";
import React from "react";
import { LineChart, ProgressChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

export default function Energy() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: 20,
          textAlign: "center",
          marginTop: 30,
          marginBottom: 20,
        }}
      >
        Total Energy Usage:{" "}
        <Text style={{ fontWeight: "bold", color: "#6AD0F5" }}>
          83.33K kWh <Feather name="sun" size={24} color="black" />
        </Text>
      </Text>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <View>
          <LineChart
            data={{
              labels: ["January", "February", "March", "April", "May", "June"],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={Dimensions.get("window").width - 20} // from react-native
            height={300}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#6AD0F5",
              backgroundGradientFrom: "#6AD0F5",
              backgroundGradientTo: "#27B376",
              decimalPlaces: 2, // optional, defaults to 2dp
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
    </SafeAreaView>
  );
}
