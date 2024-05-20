import React, { useState, useEffect } from "react";
import { Text, TextInput, View, Pressable, ScrollView } from "react-native";
import styles from "./cadastroItem.style";
import { ActivityIndicator } from "react-native-paper";
import { MyQtdInput } from "@/components/MyQtdInput";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

export default function cadastroAgenda() {
  const params = useLocalSearchParams();

  const [linhas, setLinhas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [textDate, setTextDate] = useState(params.date);
  const [desc, setDesc] = useState("");

  const handleFetch = async () => {
    const response = await AsyncStorage.getItem("@saveagenda:agendas");

    const JSONresponse = JSON.parse(response || "{}");

    let useDate = timeToString(textDate);

    console.log('JSONresponse[useDate] -> ', JSONresponse[useDate]);

    setLinhas(JSONresponse[useDate]);
  }

  useEffect(() => {
    handleFetch();
  }, [textDate])

  const onSubmit = async () => {
    try {
      setLoading(true);
      const nonRemoveLinhas = linhas.filter((linha) => linha.name != "");
      let result = null;

      if (nonRemoveLinhas.length > 0) {
        const response =  await AsyncStorage.getItem("@saveagenda:agendas")
        const json = JSON.parse(response || "{}");

        json[timeToString(textDate)] = nonRemoveLinhas; 
        
        result = json
      }

      await AsyncStorage.setItem("@saveagenda:agendas", JSON.stringify(result));

      setLoading(false);
      router.replace("/agendaScreen");
    } catch (error) {
      setLoading(false);
      alert("Erro: " + error.message);
    }
  };

  const onChangeDate = ({ type }, selectedDate) => {
    if (type == "set") {
      selectedDate.setHours(4, 0, 0);
      const currentDate = selectedDate;

      setDate(currentDate);

      setTextDate(currentDate);
    }

    setVisible(false);
  }

  const formatDate = (time, toShow = false) => {
    const date = new Date(time);
    date.setTime(date.getTime() + (4*60*60*1000))
    let day = null;

    if (toShow) {
      day = (date.getDate() + 1).toString().length === 1 ? '0' + (date.getDate() + 1) : date.getDate() + 1;
    } else {
      day = (date.getDate()).toString().length === 1 ? '0' + (date.getDate()) : date.getDate();
    }

    let month = (date.getMonth() + 1).toString().length === 1 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;

    let year = date.getFullYear();

    return day + '/' + month + '/' + year
  }

  const onChangeText = (value, index, field) => {
    const obj = linhas[index];

    obj[field] = value;

    linhas[index] = { ...obj };

    setLinhas([...linhas]);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View>
          <Text style={{...styles.text, color: '#111', fontSize: 14}}>
            Data do evento
          </Text>

          {visible &&
            <DateTimePicker 
              mode="date" 
              display="spinner" 
              value={date}
              onChange={onChangeDate}
            />
          }

          {!visible &&
            <Pressable onPress={() => setVisible(true)}>
              <TextInput style={{...styles.input, width: '100%'}}
                value={formatDate(textDate)}
                onChangeText={setTextDate}
                placeholder="Aperte para escolher a data"
                editable={false}/>
            </Pressable>
          }
        </View>
        <ScrollView>
          {linhas &&
            linhas.map((item, index) => {
              return (
                <View key={index}>
                  <Text style={{...styles.text, color: '#111', fontSize: 14}}>
                    Descrição do evento
                  </Text>
                  <TextInput style={{...styles.input, width: '100%'}}
                    value={item.name}
                    onChangeText={(text) => {
                        return (
                          onChangeText(text, index, "name")
                        )
                      }
                    }
                    placeholder="Digite a descrição"/>
                </View>
              )
            })
          }
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
              setLinhas(linhas ? [...linhas, {
                name: "",
              }] : [{name: ""}])
            }
          >
            <Text style={styles.text}>Nova linha</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={onSubmit}>
            <Text style={styles.text}>Atualizar</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => {
            AsyncStorage.removeItem("@saveagenda:agendas");
          }}>
            <Text style={styles.text}>ZERAR TUDO</Text>
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