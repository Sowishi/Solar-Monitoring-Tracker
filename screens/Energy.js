import { View, Text, Dimensions, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { LineChart, ProgressChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

export default function Energy() {
  const [lineGraph, setLineGraph] = useState();
  const [circleGraph, setCircleGraph] = useState();


  const date = new Date();
  const today =  date.toLocaleString('default', { month: 'short' });
  const split = today.split(" ");
  const currentTime = split[1] + " " + split[2] + " " + split[4]

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
    const lineRespond = await fetch("https://sowishi.pythonanywhere.com/lineGraph");
    const lineData = await lineRespond.json();
    const circleRespond = await fetch("https://sowishi.pythonanywhere.com/circleGraph");
    const circleData = await circleRespond.json();

    const lineDataFiltered = lineData.filter(i => {
      const split = i.time.split(" ");
      const time = split[1] + " " + split[2] + " " + split[4]
      if (time === currentTime){
        return i
      }
    })
    
    setLineGraph(lineDataFiltered);
    setCircleGraph(circleData)

  };

  const handlePowerPV = () => {
    if (lineGraph !== undefined) {
      const toReturn = lineGraph.map((i) => {
        return i.pv_power;
      });
      return toReturn;
    } else {
      console.log("underfin info");
      return [0];
    }
  };

  const handleTime = () => {
    if (lineGraph !== undefined) {
      const toReturn = lineGraph.map((i) => {
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
      console.log("refreshed  Energy");
      getData();
      refreshLoop();
    }, 5000);
  };


  const handleProgressRingData = () => {
    
    if (circleGraph.length !== 0) {
      console.log('yes')
      return [circleGraph.pv_voltage, circleGraph.pv_current, circleGraph.pv_power ]
    }
    else{

      return [0,0,0]
    }
  }


  const getEnergyUsage = () => {

    if (lineGraph !== undefined){
      let sum = 0;
       lineGraph.map(i => {
        sum = sum + i.pv_power;
      } )
      
      const output = (sum * 0.50 * lineGraph.length) / 1000
      return output;
      
    }
    
  }

  useEffect(() => {
    getData();
    refreshLoop()
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
        {circleGraph &&  <Text style={{ fontWeight: "bold", color: "#6AD0F5" }}>
         {getEnergyUsage()} kWh <Feather name="sun" size={24} color="black" />
        </Text>}
       
      </Text>
        <View style={{marginVertical: 10, marginHorizontal: 10}}>
          <Text style={{fontWeight: "bold", fontSize: 15}}>{currentTime}</Text>
        </View>


      <ScrollView>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View>{SolarLineGraph()}</View>
          <View>
            {circleGraph &&  <ProgressChart
              data={{
                labels: ["Voltage", "Current", "Power"], // optional
                data: handleProgressRingData(),
              }}
              width={Dimensions.get("screen").width - 18}
              height={220}
              strokeWidth={16}
              radius={32}
              hideLegend={false}
              chartConfig={{
                backgroundColor: "#6AD0F5",
                backgroundGradientFrom: "#fefefe",
                backgroundGradientTo: "#fefefe",
                color: (opacity = 1) => `rgba(0, 233, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0
                  
                  , ${opacity})`,
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
            />}
           
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
