import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Button, Image} from '@rneui/themed';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './ListItemStyle';
import {useDispatch} from 'react-redux';
import {
  decreaseQuantity,
  increaseQuantity,
  removeItemFromCart,
} from '../../../reducers/cart/cartSlice';
import {CartProduct} from '../../../reducers/cart/types';
import Toast from 'react-native-toast-message';
import {AppDispatch} from '../../../reducers';

interface ListItemProps {
  item: CartProduct;
}

const ListItem = ({item}: ListItemProps): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAdd = () => {
    dispatch(increaseQuantity({product: item}));
  };
  const handleMinus = () => {
    dispatch(decreaseQuantity({product: item}));
  };

  const handleRemoveButton = () => {
    dispatch(removeItemFromCart({product: item}));
    Toast.show({
      type: 'success',
      text1: 'Cart Updated.',
      text2: `${item.productName} removed from cart.`,
    });
  };
  return (
    <View style={styles.container}>
      <Image
        source={{uri: item.imageUrl}}
        containerStyle={styles.item}
        PlaceholderContent={
          <View style={styles.item}>
            <ActivityIndicator />
          </View>
        }
      />
      <View style={styles.textAndButtonsContainer}>
        <View style={{flexDirection: 'column', justifyContent: 'center'}}>
          <Text style={styles.productName} numberOfLines={1}>
            {item.productName}
          </Text>
          <Text style={styles.price} numberOfLines={1}>
            {'\u20B1' + item.unitPrice.toFixed(2)}
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <View style={styles.addAndMinusContainer}>
            <TouchableOpacity onPress={handleMinus} style={styles.minusBtn}>
              <MaterialIcon
                name="minus-circle"
                size={20}
                style={{textAlign: 'center'}}
              />
            </TouchableOpacity>
            <View style={{marginHorizontal: 3}}>
              <Text style={{fontSize: 14}}>{item.quantity}</Text>
            </View>
            <TouchableOpacity onPress={handleAdd} style={styles.minusBtn}>
              <MaterialIcon
                name="plus-circle"
                size={20}
                style={{textAlign: 'center'}}
              />
            </TouchableOpacity>
          </View>
          <Button
            onPress={handleRemoveButton}
            title="Remove"
            titleStyle={{fontSize: 14}}
            buttonStyle={styles.removeBtn}
          />
        </View>
      </View>
    </View>
  );
};

export default ListItem;
