import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  Image,
  FlatList,
  Modal,
  Pressable,
  Button,
} from 'react-native';
import {infomations} from './database/database';

const ProfileDetail = ({route, navigation}) => {
  const {infomationID} = route.params;
  const [infomation, setInfomation] = useState({});

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromFB();
    });
    return unsubscribe;
  }, [navigation]);

  const getDataFromFB = async () => {
    for (let index = 0; index < infomations.length; index++) {
      if (infomations[index].id == infomationID) {
        await setInfomation(infomations[index]);
        return;
      }
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Text style={{color: '#000'}}>{infomation.name}</Text>
    </View>
  );
};

export default ProfileDetail;
