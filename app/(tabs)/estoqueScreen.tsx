import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { ActivityIndicator } from 'react-native-paper';
import renderItem from '@/components/RenderItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from "react-native-uuid";
import { Link } from 'expo-router';
import { DragSortableView } from 'react-native-drag-sort';
// import ReorderableList, { ReorderableListReorderEvent } from 'react-native-reorderable-list';

const { width, height } = Dimensions.get('window')

const parentWidth = width
const childrenWidth = width
const childrenHeight = 48

export default function TabTwoScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scrollEnable, setScrollEnable] = useState(true);

  const onChangeText = (value: any, indexField: any, field: any) => {
    const index = data.findIndex((item: any) => item.id == indexField);

    const obj = data[index] as any;

    obj[field] = value;

    (data[index] as any) = { ...obj, remove: value == 0 ? true : undefined };

    setData([...data]);
  };

  const handleFetch = async () => {
    const response = await AsyncStorage.getItem("@saveestoque:estoques");

    setData(JSON.parse(response || ""));
  }

  useEffect(() => {
    handleFetch()
  }, [])

  const onSave = async () => {
    try {
      setLoading(true);
      const finaldata = data.filter((linha: any) => !(linha.name == ""));

      if (finaldata.length > 0) {
        for (let i = 0; i < finaldata.length; i++) {
          (finaldata[i] as any) = { ...finaldata[i] as object, id: uuid.v4() };
        }

        AsyncStorage.setItem("@saveestoque:estoques", JSON.stringify(finaldata));

        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      alert("Erro: " + error.message);
    }
  };

  const onDataChange = async (data: any) => {
    await AsyncStorage.removeItem("@saveestoque:estoques");
    await AsyncStorage.setItem("@saveestoque:estoques", JSON.stringify(data));
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ width: '67.7%' }} />
        <Link href={{ pathname: "/CadastroItem/cadastroItem", params: { type: "ESTOQUE" } }} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.textButton}>Cadastrar</Text>
          </Pressable>
        </Link>
      </View>
      {/* <ScrollView>
        {data && data.map((item: any, index: any) => {
          return (
            renderItem({ key: index, item, onChangeText: (value: any, id: any) => onChangeText(value, id, "qtd") })
          )
        })}
      </ScrollView> */}
      <ScrollView scrollEnabled={scrollEnable}>
        <DragSortableView
          dataSource={data}
          childrenHeight={80}
          parentWidth={parentWidth}
          childrenWidth={childrenWidth}
          keyExtractor={(item) => item.id}
          onDataChange={onDataChange}
          onDragStart={() => setScrollEnable(false)}
          onDragEnd={() => setScrollEnable(true)}
          renderItem={(item, key) => {
            return renderItem({ item, key, onChangeText: (value: any, id: any) => onChangeText(value, id, "qtd") }) as React.JSX.Element
          }} />
      </ScrollView>
      <Pressable style={styles.saveButton}
        onPress={onSave}
      >
        <Text style={styles.textButton}>Salvar</Text>
      </Pressable>
      {loading && (
        <ActivityIndicator
          style={{ marginTop: 20 }}
          color="#455471"
        />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: '100%',
  },
  item: {
    flex: 1,
    borderRadius: 5,
    paddingVertical: 5,
    marginHorizontal: 25
  },
  text: {
    marginVertical: 10,
    marginLeft: 35,
    fontSize: 17
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  buttonNew: {
    alignSelf: "flex-start",
    marginTop: 15,
    marginLeft: 30,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#455471",
  },
  button: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    marginVertical: 7,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#455471",
  },
  saveButton: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    marginRight: 34,
    marginVertical: 7,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#455471",
  },
  input: {
    fontSize: 15,
    marginTop: 6,
    width: '69.5%'
  },
  itemCircle: {
    backgroundColor: "rgba(231, 224, 236, 1)",
    marginRight: 10,
    paddingVertical: 9,
    paddingHorizontal: 11,
    textAlign: "center",
    width: '16%',
    borderRadius: 11,
    overflow: "hidden",
  },
  check: {
    alignItems: 'flex-end'
  }
});
