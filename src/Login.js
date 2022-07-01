import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import FormInput from './components/FormInput';
import MashButton from './components/MashButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {setEmail} from './redux/actions';

export default function Login({navigation}) {
  const onPressHandler = () => {
    navigation.navigate('Home');
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const {email, password} = useSelector(state => state.userReducer);
  // const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem('UserData').then(value => {
        if (value != null) {
          navigation.navigate('Drawer');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setData = async () => {
    if (email.length == 0) {
      Alert.alert('Warning!', 'Please write your data.');
    } else {
      try {
        // dispatch(setEmail(email));
        // dispatch(setPassword(password));
        var user = {
          Email: email,
          Password: password,
        };
        await AsyncStorage.setItem('UserData', JSON.stringify(user));
        navigation.navigate('Drawer');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.body}>
      <Text style={styles.text}>Login screen</Text>
      <FormInput
        placeholderText="Email"
        onChangeText={value => setEmail(value)}
        //onChangeText={value => dispatch(setEmail(value))}
      />
      <FormInput
        placeholderText="Password"
        onChangeText={value => setPassword(value)}
        //onChangeText={value => dispatch(setPassword(value))}
      />
      <MashButton
        buttonTitle="Sign In"
        color="#999"
        backgroundColor="#000"
        onPress={setData}
      />
      <TouchableOpacity style={styles.forgotButton}>
        <Text style={styles.navButtonText}> Forgot Password?</Text>
      </TouchableOpacity>
      <MashButton
        buttonTitle="Sign In with Facebook"
        color="#999"
        backgroundColor="#e6eaf4"
      />
      <MashButton
        buttonTitle="Sign In with Google"
        color="#999"
        backgroundColor="#f5e7ea"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    margin: 10,
    color: '#000',
  },
  forgotButton: {
    marginBottom: 30,
    marginTop: 15,
  },
  navButtonText: {
    color: '#000',
    fontWeight: '500',
    fontSize: 15,
  },
});
