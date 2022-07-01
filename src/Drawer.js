import * as React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  useDrawerProgress,
} from '@react-navigation/drawer';
import Home from './Home';
import Profile from './Profile';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import {setEmail} from './redux/actions';

const Drawer = createDrawerNavigator();

function Feed() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={styles.sectionTitle}>Feed Screen</Text>
    </View>
  );
}

function Article() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={styles.sectionTitle}>Article Screen</Text>
    </View>
  );
}

function CustomDrawerContent(props) {
  const progress = useDrawerProgress();

  const translateX = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  const {email} = useSelector(state=>state.userReducer);
  const dispatch = useDispatch();

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <Text style={styles.sectionTitle}>Main screen</Text>
          <View style={{flexDirection: 'row', paddingVertical: 30}}>
            <Image style={styles.image} source={require('./assets/VL_1.jpg')} />
            <View
              style={{
                flexDirection: 'column',
                marginLeft: 10,
                paddingVertical: 15,
              }}>
              <Text style={styles.title}> Nguyen viet luu</Text>
              <Text style={styles.caption}> i'm developer react</Text>
            </View>
          </View>
        </View>
        <Animated.View style={{transform: [{translateX}]}}>
          <DrawerItemList {...props} />
          {/* <DrawerItem
            icon={({color, size}) => (
              <Icon name="home-outline" color={color} size={size} />
            )}
            style={styles.drawerSection}
            label="Home"
            onPress={() => {
              props.navigation.navigate('Home');
            }}></DrawerItem>
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="home-outline" color={color} size={size} />
            )}
            style={styles.drawerSection}
            label="Profile"
            onPress={() => {
              props.navigation.navigate('Profile');
            }}></DrawerItem>
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="home-outline" color={color} size={size} />
            )}
            style={styles.drawerSection}
            label="Feed"
            onPress={() => {
              props.navigation.navigate('Feed');
            }}></DrawerItem>
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="home-outline" color={color} size={size} />
            )}
            style={styles.drawerSection}
            label="Article"
            onPress={() => {
              props.navigation.navigate('Article');
            }}></DrawerItem> */}
        </Animated.View>

        <DrawerItem
          icon={({color, size}) => (
            <Icon name="home-outline" color={color} size={size} />
          )}
          style={styles.bottomDrawerSection}
          label="Sign out"
          onPress={() => {}}></DrawerItem>
      </DrawerContentScrollView>
    </View>
  );
}

function MyDrawer(props) {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Article" component={Article} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
    alignItems: 'center',
    marginLeft: 20,
  },
  image: {
    width: 70,
    height: 70,
    margin: 10,
    borderWidth: 2,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerSection: {
    marginTop: 0,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 2,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
    color: '#000',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: '#999',
  },
});
