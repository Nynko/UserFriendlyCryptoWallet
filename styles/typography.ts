import { StyleSheet } from "react-native";
import { material, systemWeights } from "react-native-typography";

export const typography = StyleSheet.create({
    thinTitle: {
      ...material.display2Object,
      ...systemWeights.thin,
    },
    thinSmaller: {
        ... {...material.display1Object, fontSize:25},
        // ...material.display1Object,
        ...systemWeights.thin,
    },
    smallText: {
        ...material.body1Object,
        ...systemWeights.thin
    }
  });
  