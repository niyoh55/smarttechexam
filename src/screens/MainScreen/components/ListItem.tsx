import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Button, Icon, Image} from '@rneui/themed';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {capitalizeFirstLetter} from '../../../utils';
import styles from './ListItemStyle';
import {useDispatch} from 'react-redux';

import {Product} from '../../../reducers/products/productsSlice';
import Toast from 'react-native-toast-message';
import {redColor} from '../../../constants';
import {addToCart} from '../../../reducers/cart/cartSlice';
import {AppDispatch} from '../../../reducers';

interface ListItemProps {
  item: Product;
}

const ListItem = ({item}: ListItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    if (quantity < 10) {
      setQuantity(state => state + 1);
    }
  };
  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(state => state - 1);
    }
  };

  const handleAddToCartButton = () => {
    dispatch(addToCart({product: item, quantity: quantity}));
    setQuantity(1);
    Toast.show({
      type: 'success',
      text1: 'Cart Updated.',
      text2: `${item.productName} added to cart.`,
      visibilityTime: 2000,
    });
  };
  return (
    <View style={styles.container}>
      <Image
        source={{uri: item.imageUrl}}
        containerStyle={styles.item}
        PlaceholderContent={
          <View style={(styles.item, styles.activityIndicator)}>
            <ActivityIndicator />
          </View>
        }
      />
      <Text style={styles.productName} numberOfLines={1}>
        {item.productName}
      </Text>
      <View style={{alignSelf: 'flex-start'}}>
        <Text style={styles.category} numberOfLines={1}>
          Category:{' '}
          <Text style={{color: redColor}}>
            {capitalizeFirstLetter(item.category)}
          </Text>
        </Text>
      </View>
      <Text style={{fontSize: 12}} numberOfLines={3}>
        {item.description}
      </Text>
      <View
        style={{alignSelf: 'flex-start', marginTop: 10, paddingHorizontal: 5}}>
        <Text style={styles.unitPrice} numberOfLines={1}>
          {'\u20B1' + item.unitPrice.toFixed(2)}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.addAndMinusBtnsContainer}>
          <TouchableOpacity onPress={handleMinus} style={styles.minusBtn}>
            <MaterialIcon
              name="minus-circle"
              size={20}
              style={{textAlign: 'center'}}
            />
          </TouchableOpacity>
          <View style={{marginHorizontal: 3}}>
            <Text style={{fontSize: 14}}>{quantity}</Text>
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
          onPress={handleAddToCartButton}
          icon={
            <Icon
              type="material"
              name="add-shopping-cart"
              size={14}
              color="white"
            />
          }
          title="Add"
          titleStyle={{fontSize: 14, marginLeft: 5}}
          buttonStyle={styles.addToCartBtn}
        />
      </View>
    </View>
  );
};

export default ListItem;
