import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import { Text, View } from '@/components/Themed';
import { Card } from 'react-native-paper';
import { MyQtdInput } from '@/components/MyQtdInput';

const { width } = Dimensions.get('window')

const childrenWidth = width

export default function renderItem({ key, item, onChangeText }: any) {
  if (item.remove) {
    return;
  }

  return (
    <View>
      <Card style={{ marginHorizontal: 15, marginVertical: 5, backgroundColor: '#fff' }}
        key={key}>
        <Card.Content>
          <View style={{ flexDirection: "row", alignContent: 'space-between', width: childrenWidth - 80, }}>
            <Text
              style={[styles.input]}
            >{item.name}</Text>
            <MyQtdInput
              onChange={(value: any) =>
                onChangeText(value, item.id)
              }
              value={item.qtd}
            />
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    borderRadius: 5,
    paddingVertical: 25,
    marginHorizontal: 25
  },
  input: {
    fontSize: 15,
    marginTop: 6,
    width: '69.5%'
  },
});