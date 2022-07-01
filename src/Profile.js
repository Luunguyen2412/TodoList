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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {getCities} from './redux/actions';
import Task from './components/Task';
import {color} from 'react-native-reanimated';
import * as ImagePicker from 'react-native-image-picker';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {infomations} from './database/database';

export default function Profile({navigation, route}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const {cities} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getData();
    dispatch(getCities());
    getDataFromDB();
  }, []);

  const getDataFromDB = () => {
    let itemInfomationList = [];
    for (let index = 0; index < infomations.length; index++) {
      itemInfomationList.push(infomations[index]);
    }
    setItems(itemInfomationList);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibrary({
      mediaType: ImagePicker.mediaType,
      quality: 1,
    });
    console.log(result);

    if (!result.didCancel) {
      setImage(result);
    }
  };

  const getData = () => {
    try {
      AsyncStorage.getItem('UserData').then(value => {
        if (value != null) {
          let user = JSON.parse(value);
          setEmail(user.Email);
          setPassword(user.Password);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}>
          <Text style={styles.text}>Hello wword</Text>
          <TextInput
            style={styles.textInputStyle}
            underlineColorAndroid="transparent"
            placeholder="Change Here"
            value={name}
            onChangeText={value => setName(value)}></TextInput>
          <Button
            style={{
              paddingTop: 15,
              height: 20,
              width: '40%',
              backgroundColor: '#55BCF6',
              opacity: 0.4,
              borderRadius: 5,
            }}
            onPress={() => setModalVisible(!modalVisible)}
            title="Save"></Button>
        </View>
      </Modal>
      <View style={{flexDirection: 'row'}}>
        <Image style={styles.image} source={require('./assets/VL_1.jpg')} />
        <Button
          style={styles.button}
          title="Upload photo"
          onPress={pickImage}></Button>
        {image && <Image source={{uri: image}} style={styles.image} />}
      </View>

      <Text style={styles.sectionTitle}>{email}</Text>
      <View style={styles.items}>
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <TouchableOpacity style={styles.square}></TouchableOpacity>
            <Text style={styles.text}>Name: {name}</Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text
              style={{
                color: '#888',
                marginLeft: 100,
                fontWeight: 'bold',
              }}>
              Edit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {items.map(data => {
        return (
          <TouchableOpacity
            key={data.id}
            onPress={() =>
              navigation.navigate('ProfileDetail', {infomationID: data.id})
            }>
            <View style={styles.profileItems}>
              <Text style={styles.text}>{data.name}</Text>
              <Text style={{color: '#000'}}>edit</Text>
            </View>
          </TouchableOpacity>
        );
      })}
      <FlatList
        data={cities}
        renderItem={({item}) => (
          <View style={styles.items}>
            <Task text={item.conntry} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}></FlatList>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#E8EAED',
    //alignItems: 'center',
    paddingTop: 50,
  },
  profileItems: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 26,
    paddingHorizontal: 24,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '90%',
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
    color: '#000',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
    alignItems: 'center',
    marginLeft: 20,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
    borderWidth: 2,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000',
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 40,
    paddingHorizontal: 20,
  },
  items: {
    paddingHorizontal: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  button: {
    width: 50,
    height: 20,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
});
