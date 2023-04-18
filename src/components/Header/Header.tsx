import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Header as RNHeader} from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Header = () => {
  return (
    <RNHeader
      leftComponent={
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => console.log('hello')}>
            <Icon name="bars" color="red" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => console.log('hello')}>
            <Icon type="antdesign" name="rocket1" color="red" />
          </TouchableOpacity>
        </View>
      }
      rightComponent={
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => console.log('hello')}>
            <Icon name="description" color="red" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => console.log('hello')}>
            <Icon type="antdesign" name="rocket1" color="red" />
          </TouchableOpacity>
        </View>
      }
      centerComponent={{text: 'Header', style: styles.heading}}
    />
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#397af8',
    marginBottom: 20,
    width: '100%',
    paddingVertical: 15,
  },
  heading: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  subheaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Header;
