import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import ListItem from './components/ListItem';
import {Button, Icon} from '@rneui/themed';
import {clearCart} from '../../reducers/cart/cartSlice';
import Toast from 'react-native-toast-message';
import {Happyemoji, Bag} from 'iconsax-react-native';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const CartScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {cart} = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const totalAmount: number = useMemo(() => {
    let amount: number = 0;
    cart.forEach(item => {
      amount += Number(item.unitPrice) * Number(item.quantity);
    });

    return Number(amount.toFixed(2));
  }, [cart]);

  const totalItems: number = useMemo(() => {
    let items: number = 0;
    cart.forEach(item => {
      items += Number(item.quantity);
    });

    return items;
  }, [cart]);

  const handleClearCart = () => {
    Toast.show({
      type: 'success',
      text1: `${
        cart.length !== 0 ? 'Cart Cleared.' : 'Cart is already empty.'
      }`,
      visibilityTime: 2000,
    });
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    setModalVisible(true);
    dispatch(clearCart());
  };
  const modalCloseHandler = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={modalCloseHandler}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Happyemoji size="100" color="#FF5757" />
            <Text style={styles.modalText}>Order Placed!</Text>
            <Text style={styles.modalSubText}>
              Your order was placed successfully. Thank you for shopping.
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={modalCloseHandler}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={{paddingHorizontal: 10, width: '100%', flex: 1}}>
        <FlatList
          data={cart}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            paddingVertical: 30,
            width: '100%',
          }}
          numColumns={1}
          keyExtractor={data => data.id}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          renderItem={({item}) => <ListItem item={item} />}
          ItemSeparatorComponent={() => <View style={{height: 5, width: 5}} />}
          ListEmptyComponent={() => (
            <View
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <Bag size="100" color="#FF5757" />
              <Text style={{color: '#FF5757', fontSize: 32}}>
                Cart is currently empty.
              </Text>
            </View>
          )}
        />
      </View>
      <View
        style={{
          backgroundColor: 'white',
          height: 120,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignSelf: 'stretch',
        }}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Button
            onPress={handleClearCart}
            icon={
              <Icon
                type="material"
                name="remove-shopping-cart"
                size={20}
                color="black"
              />
            }
            title="Clear Cart"
            titleStyle={{fontSize: 14, marginLeft: 5, color: 'black'}}
            buttonStyle={{
              justifyContent: 'center',
              alignContent: 'center',
              backgroundColor: 'transparent',
              borderRadius: 5,
              marginLeft: 15,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'stretch',
            paddingHorizontal: 10,
          }}>
          <View>
            <Text style={{fontSize: 12}}>
              Total Items:{' '}
              <Text style={{fontWeight: 'bold'}}>{totalItems}</Text>
            </Text>
            <Text style={{fontSize: 14}}>
              Total:{' '}
              <Text style={{fontWeight: 'bold', fontSize: 20}}>
                {'\u20B1' + totalAmount}
              </Text>
            </Text>
            <Button
              onPress={handleCheckout}
              disabled={cart.length === 0}
              title="Checkout"
              titleStyle={{fontSize: 14}}
              buttonStyle={{
                justifyContent: 'center',
                alignSelf: 'stretch',
                backgroundColor: '#FF5757',
                borderRadius: 5,
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EDF6FF',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
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
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    marginTop: 20,
    backgroundColor: '#FF5757',
    alignSelf: 'stretch',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginVertical: 15,
    textAlign: 'center',
    fontSize: 24,
  },
  modalSubText: {
    textAlign: 'center',
    fontSize: 16,
  },
});
