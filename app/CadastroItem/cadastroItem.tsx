import React, { useState, useEffect } from "react";
import { Text, TextInput, View, Pressable, ScrollView } from "react-native";
import styles from "./cadastroItem.style";
import { ActivityIndicator } from "react-native-paper";
import { MyQtdInput } from "@/components/MyQtdInput";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";

export default function cadastroItem() {
  const [linhas, setLinhas] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const params = useLocalSearchParams();

  const handleFetch = async () => {
    let response;
    if (params.type === "ESTOQUE") {
      response = await AsyncStorage.getItem("@saveestoque:estoques");
    } else {
      response = await AsyncStorage.getItem("@savelista:lista");
    }

    setLinhas(JSON.parse(response || ""));
  }

  useEffect(() => {
    handleFetch();
  }, [])

  const onSubmit = async () => {
    try {
      setLoading(true);
      const finalLinhas = linhas.filter((linha: any) => !(linha.name == ""));

      if (finalLinhas.length > 0) {
        for (let i = 0; i < finalLinhas.length; i++) {
          finalLinhas[i] = { ...finalLinhas[i], id: uuid.v4() };
        }

        console.log("params.type", params.type)

        if (params.type === "ESTOQUE") {
          AsyncStorage.setItem("@saveestoque:estoques", JSON.stringify(finalLinhas));
        } else {
          AsyncStorage.setItem("@savelista:lista", JSON.stringify(finalLinhas));
        }

        setLoading(false);
        if (params.type === "ESTOQUE") {
          router.replace("/estoqueScreen");
        } else {
          router.replace("/ListaCompras");
        }
      }
    } catch (error: any) {
      setLoading(false);
      alert("Erro: " + error.message);
    }
  };

  const onChangeText = (value: any, index: any, field: any) => {
    const obj = linhas[index];

    (obj[field] as any) = value;

    (linhas[index] as any) = { ...obj as object, remove: field === "qtd" ? (value == 0 ? true : undefined) : false };

    setLinhas([...linhas]);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <ScrollView>
          {linhas &&
            linhas.map((item: any, index: any) => {
              if (item.remove) {
                return;
              }
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TextInput
                    style={[styles.input]}
                    placeholder={"Digite uma breve descrição"}
                    onChangeText={(text) => {
                      return (
                        onChangeText(text, index, "name")
                      )
                    }
                    }
                    value={item.name}
                  />
                  <MyQtdInput
                    sty={{ backgroundColor: '#f4f4f4', paddingRight: 50 }}
                    onChange={(text: any) => {
                      return (
                        onChangeText(text, index, "qtd")
                      )
                    }}
                    value={item.qtd}
                  />
                </View>
              );
            })}
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Pressable
            style={styles.buttonNew}
            onPress={() =>
              setLinhas([...linhas, {
                id: undefined, name: "",
                qtd: 1,
                checked: false,
                ordination: linhas.length + 1
              }])
            }
          >
            <Text style={styles.text}>Nova linha</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={onSubmit}>
            <Text style={styles.text}>Atualizar</Text>
          </Pressable>
        </View>
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


// export default function cadastroItem() {
//   return (
//     <View><Text>Teste</Text></View>
//   )
// }