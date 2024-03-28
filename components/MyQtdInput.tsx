// @flow
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "../styles/MyQtdInput.style";

interface qtdInput {
  onChange: Function,
  value: number,
  sty?: object
}

export function MyQtdInput({ onChange, value = 1, sty }: qtdInput) {
  return (
    <View style={{ ...styles.formQtdInput, ...sty, }}>
      <View style={styles.rowCenter}>
        <TouchableOpacity
          onPress={() => onChange(value - 1)}
          style={styles.formQtdAction}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>-</Text>
        </TouchableOpacity>
        <Text style={styles.formQtdShadow}>{value}</Text>
        <TouchableOpacity
          onPress={() => onChange(value + 1)}
          style={styles.formQtdAction}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}