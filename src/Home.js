import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
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
  ListItem,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Task from './components/Task';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({navigation, props}) {

  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    getData();
  }, []);

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

  const handleAddTask = () => {
    if (task.length == 0) {
      Alert.alert('Warning', 'Please write your data');
    } else {
      setTaskItems([...taskItems, task]);
    }
    //setTask(null);
  };

  const removeTask = index => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.sectionTitle}>Welcome {email}</Text>
        {/* <TouchableOpacity
          style={{marginBottom: 16}}
          onPress={() => navigation.navigate('TodoList')}>
          <Text style={{fontSize: 22, color: 'black'}}>Go to FoodList</Text>
        </TouchableOpacity> */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's task</Text>
          <TouchableOpacity>
            <View style={styles.personalItem}>
              <AntDesign
                name="user"
                size={20}
                color="#666"
                onPress={() => navigation.navigate('Profile')}></AntDesign>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.items}>
          {taskItems.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => removeTask(index)}>
                <Task text={item} />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <KeyboardAvoidingView style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder="write a task"
          value={task}
          onChangeText={text => setTask(text)}></TextInput>
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    alignItems: 'flex-start',
    marginLeft: 15,
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    //position: 'absolute',
    //alignItems: 'center',
  },
  items: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#000',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    fontSize: 25,
  },
  personalItem: {
    width: 40,
    height: 40,
    color: '#999',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
