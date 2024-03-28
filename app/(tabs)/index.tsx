import React from "react";
import { StyleSheet, Text as NormalText, Dimensions } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { View } from '@/components/Themed';

import { PieChart } from 'react-native-svg-charts';
import { Text } from 'react-native-svg';

export default function TabOneScreen() {

  const data = [30, 10, 25, 18, 17]
  const pieData = data.map((value, index) => ({
    value,
    key: `${index}-${value}`,
    svg: {
      fill: '#FF0000'
    }
  }))

  const Label = ({ slices }: any) => {
    return slices.map((slice: any, index: number) => {
      const { pieCentroid, data } = slice;

      return (
        <Text key={`label-${index}`}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill="white"
          textAnchor='middle'
          alignmentBaseline='middle'
          fontSize={20} >
          {data.value}
        </Text>
      )
    })
  }

  //TODO tenta fazer cards responsivos :D

  return (
    <View style={styles.container}>
      <View style={{ ...styles.card, flex: 1, marginLeft: 20, marginRight: 10 }} />
      <View style={{ ...styles.card, flex: 1, marginRight: 20, marginLeft: 10 }} />
      {/* <NormalText style={{
        marginBottom: 20,
        marginLeft: 20,
        fontSize: 18,
        fontWeight: "500"
      }}>
        Atividades a fazer
      </NormalText>
      <PieChart data={pieData} style={{ height: 300 }} >
        <Label />
      </PieChart> */}
      {/* <Text style={styles.title}>Tab UMmmmmm</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row"
  },
  card: {
    backgroundColor: 'green',
    height: Dimensions.get('window').height / 4,
    borderRadius: 17,
  }
});
