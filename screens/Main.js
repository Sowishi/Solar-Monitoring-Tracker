import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Main() {
  return (
    <SafeAreaView>
      <View style={{ flex: 1 }}>
        <View
          style={{ width: "100%", height: 200, backgroundColor: "#6DD7FD" }}
        >
          <Text>hello</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  svgCurve: {
    position: 'absolute',
    width: "100%"
  },
})
