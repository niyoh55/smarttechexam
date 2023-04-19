import {FlatList, View, Text, Modal, Pressable} from 'react-native';
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
import {redColor} from '../../constants';
import styles from './styles';

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
            <Happyemoji size="100" color={redColor} />
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
          contentContainerStyle={styles.flatListContentContainer}
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
              <Bag size="100" color={redColor} />
              <Text style={{color: redColor, fontSize: 32}}>
                Cart is currently empty.
              </Text>
            </View>
          )}
        />
      </View>
      <View style={styles.bottomContainer}>
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
            buttonStyle={styles.clearCartBtn}
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
              buttonStyle={styles.checkOutBtn}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartScreen;
