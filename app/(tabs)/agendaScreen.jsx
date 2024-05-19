import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useSegments,  } from 'expo-router';
import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Card, Avatar, Text, Button} from 'react-native-paper';

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const formatDate = (time) => {
  const date = new Date(time);
  let day = (date.getDate() + 1).toString().length === 1 ? '0' + (date.getDate() + 1) : date.getDate() + 1;

  let month = (date.getMonth() + 1).toString().length === 1 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;

  let year = date.getFullYear();

  return day + '/' + month + '/' + year
}

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState(timeToString(Date.now()));
  const [items, setItems] = useState({});

  const segments = useSegments()

  useEffect(() => {
    createNewItems();
  }, [segments])

  const createNewItems = async () => {
    const getItem = await AsyncStorage.getItem("@saveagenda:agendas");
    setItems(JSON.parse(getItem || ""));
  }

  const renderItem = (reservation, isFirst) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';
    
    return (
      <>
        {isFirst && <View style={{ backgroundColor: '#b3b3b3', width: '95%', height: 1, marginTop: 10 }} />}
        <TouchableOpacity
          style={[styles.item, {height: reservation.height}]}
        >
          <Text style={{fontSize, color}}>{reservation.name}</Text>
        </TouchableOpacity>
      </>
    )
  }

  const renderEmptyData = () => {
    return (
      <>
        <View style={{flex:0.5}}/>
        <View style={{
          alignSelf: "center", 
          alignItems: 'center',
          justifyContent: 'center',
          width: '70%',
          borderWidth: 2,
          borderColor: '#e6e6e6',
          borderRadius: 15,
          padding: 15
        }}> 
          <Link href={{ pathname: "/CadastroItem/cadastroAgenda", params: { date: selectedDay } }} asChild>
            <Text style={{ fontSize: 20, textAlign: 'center' }}>Aperte aqui para cadastrar um novo evento na data {formatDate(selectedDay)}</Text> 
          </Link>
        </View>
      </>
    )
  }

  return (
    <View style={{flex: 1}}>
      <Link href={{ pathname: "/CadastroItem/cadastroAgenda", params: { date: selectedDay } }} asChild>
        <Button onPress={() => setItems({})}>Cadastrar nova data</Button>
      </Link>
      <Agenda
        items={items}
        selected={selectedDay}
        renderItem={renderItem}
        onDayPress={(data) => setSelectedDay(data.dateString)}
        renderEmptyData={renderEmptyData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  customDay: {
    margin: 10,
    fontSize: 24,
    color: 'green'
  },
  dayItem: {
    marginLeft: 34
  }
});

export default Schedule;