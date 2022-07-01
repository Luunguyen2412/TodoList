import React from 'react';
import {Pressable, Text, StyleSheet, TouchableOpacity, View} from 'react-native';

const MashButton = ({
  buttonTitle,
  btnType,
  color,
  backgroundColor,
  ...rest
}) => {
  let bgColor = backgroundColor;
  return (
    // <TouchableOpacity
    //   onPress={props.onPressFunction}
    //   hitSlop={{top: 10, bottom: 10, right: 10, left: 10}}
    //   android_ripple={{color: '#00f'}}
    //   style={({pressed}) => [
    //     {backgroundColor: pressed ? '#dddddd' : props.color},
    //     styles.buttonContainer,
    //     {...props.style},
    //   ]}>
    //   <Text style={styles.text}>{props.title}</Text>
    // </TouchableOpacity>
    <TouchableOpacity
      style={[styles.buttonContainer, {backgroundColor: bgColor}]}
      {...rest}>
      <View style={styles.btnTxtWrapper}>
        <Text style={[styles.buttonText, {color: color}]}>{buttonTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: 60,
    padding: 10,
    flexDirection: 'row',
    borderRadius: 3,
  },
  iconWrapper: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontWeight: 'bold',
  },
  btnTxtWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MashButton;
