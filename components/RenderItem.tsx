import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '@/components/Themed';
import { Card } from 'react-native-paper';
import { MyQtdInput } from '@/components/MyQtdInput';

export default function renderItem({ key, item, onChangeText }: any) {
  if (item.remove) {
    return;
  }

  return (
    <Card style={{ marginHorizontal: 15, marginVertical: 5, backgroundColor: '#fff' }}
      key={key}>
      <Card.Content>
        <View style={{ flexDirection: "row", alignContent: 'space-between' }}>
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