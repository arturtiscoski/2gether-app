import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  TextInput,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Card, Checkbox, ActivityIndicator } from "react-native-paper";
import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DragSortableView } from "react-native-drag-sort";

const { width, height } = Dimensions.get('window')

const parentWidth = width
const childrenWidth = width
const childrenHeight = 48

const ARRAY_NUM = 15;
function getColor(i: any) {
  const multiplier = 255 / (ARRAY_NUM - 1);
  const colorVal = i * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}
const initialData = [...Array(ARRAY_NUM)].map((d, index) => {
  const backgroundColor = getColor(index);
  return {
    key: index + 1,
    label: String(index) + "",
    height: 100,
    width: 60 + Math.random() * 40,
    backgroundColor,
    checked: false,
  };
});

const ListaComprasComponent = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [organization, setOrganization] = useState("manual");
  const [scrollEnable, setScrollEnable] = useState(true);
  // const params = route.params;

  const loadListaCompras = async () => {
    const response = await AsyncStorage.getItem("@savelista:lista");

    setData(JSON.parse(response || ""));
  };

  const onChangeText = (value: any, indexField: any, field: any) => {
    const index = data.findIndex((item: any) => item.index == indexField);

    const obj = data[index] as any;

    obj[field] = value;

    (data[index] as any) = obj;

    setData([...data]);
  };

  const renderItem = (item: any, index: any) => {
    return (
      <View>
        <Card style={{ marginHorizontal: 10 }}>
          <Card.Content>
            <View
              style={{
                width: childrenWidth - 70,
                flexDirection: "row",
                alignContent: "space-between",
              }}
            >
              <Text style={styles.itemCircle}>
                {item.qtd}
              </Text>
              <Text style={[styles.input]}  >
                {item.name}
              </Text>
              <Checkbox
                status={
                  item.checked ? "checked" : "unchecked"
                }
                onPress={() => {
                  item.checked = !item.checked;
                  handleOrganization([...data], "a");
                }}
              />
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  };

  const handleOrganization = (toHandle: any, org: any) => {
    const newData = toHandle;

    if (org == "auto" || organization == "auto") {
      newData.sort(function (x: any, y: any) {
        return x.checked === y.checked ? 0 : x.checked ? 1 : -1;
      });

      onDataChange(newData);
    }

    setData(newData);
  };

  const onDataChange = async (data: any) => {
    await AsyncStorage.removeItem("@savelista:lista");
    await AsyncStorage.setItem("@savelista:lista", JSON.stringify(data));
  }

  useEffect(() => {
    loadListaCompras();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            const org =
              organization == "manual" ? "auto" : "manual";
            setOrganization(org);
            handleOrganization(data, org);
          }}
        >
          <Text style={styles.text}>
            Org.{" "}
            {organization == "manual" ? "manual" : "automática"}{" "}
            ativada
          </Text>
        </TouchableOpacity>
        <Link href={{ pathname: "/CadastroItem/cadastroItem", params: { type: "LISTACOMPRAS" } }} asChild>
          <Pressable
            style={styles.button}
          >
            <Text style={styles.textButton}>Cadastrar</Text>
          </Pressable>
        </Link>
        {/* <ScrollView>
          {data && data.map((item: any, index: any) => {
            return (
              renderItem({ key: index, item, onChangeText: (value: any, id: any) => onChangeText(value, id, "qtd") })
            )
          })}
        </ScrollView> */}
        <ScrollView scrollEnabled={scrollEnable} style={{ height: height - 192 }}>
          <DragSortableView
            dataSource={data}
            childrenHeight={80}
            parentWidth={parentWidth}
            childrenWidth={childrenWidth}
            keyExtractor={(item) => item.id}
            onDataChange={onDataChange}
            onDragStart={() => setScrollEnable(false)}
            onDragEnd={() => setScrollEnable(true)}
            renderItem={(item, index) => {
              return renderItem(item, index)
            }} />
        </ScrollView>
        {loading && (
          <ActivityIndicator
            style={{ marginTop: 20 }}
            color="#455471"
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  container: {
    width: "100%",
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    marginVertical: 10,
    marginLeft: 35,
    fontSize: 17,
  },
  textButton: {
    borderRadius: 5,
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
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: "#455471",
  },
  button: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    marginVertical: 7,
    marginRight: 30,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: "#455471",
  },
  saveButton: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    marginVertical: 7,
    // marginLeft: 77,
    marginRight: 30,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: "#455471",
  },
  input: {
    fontSize: 15,
    marginTop: 6,
    width: "70%",
  },
  itemCircle: {
    backgroundColor: "rgba(231, 224, 236, 1)",
    marginRight: 10,
    paddingVertical: 9,
    paddingHorizontal: 11,
    textAlign: "center",
    width: "16%",
    borderRadius: 11,
    overflow: "hidden",
  },
  check: {
    alignItems: "flex-end",
  },
  item: {
    width: childrenWidth,
    height: childrenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item_children: {
    width: childrenWidth,
    height: childrenHeight,
    backgroundColor: '#f00',
  },
  item_icon: {
    width: childrenHeight * 0.6,
    height: childrenHeight * 0.6,
    marginLeft: 15,
    resizeMode: 'contain',
  },
  item_text: {
    marginRight: 15,
    color: '#2ecc71'
  }
});

export default ListaComprasComponent;
