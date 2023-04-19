import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Button, Icon, Image} from '@rneui/themed';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {capitalizeFirstLetter} from '../../../utils';
import styles from './ListItemStyle';
import {useDispatch} from 'react-redux';
import {addToCart} from '../../../reducers/cart/cartSlice';
import {Product} from '../../../reducers/products/productsSlice';
import Toast from 'react-native-toast-message';

interface ListItemProps {
  item: Product;
}

const ListItem = ({item}: ListItemProps) => {
  const dispatch = useDispatch();
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
    <View
      style={{
        backgroundColor: '#ffffff',
        width: '49%',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
      }}>
      <Image
        source={{uri: item.imageUrl}}
        containerStyle={styles.item}
        PlaceholderContent={
          <View
            style={
              (styles.item, {justifyContent: 'center', alignItems: 'center'})
            }>
            <ActivityIndicator />
          </View>
        }
      />
      <Text style={{fontSize: 16, fontWeight: '700'}} numberOfLines={1}>
        {item.productName}
      </Text>
      <View style={{alignSelf: 'flex-start'}}>
        <Text
          style={{
            fontSize: 12,
            marginTop: 10,
            fontWeight: 'bold',
            textAlign: 'left',
          }}
          numberOfLines={1}>
          Category:{' '}
          <Text style={{color: '#FF5757'}}>
            {capitalizeFirstLetter(item.category)}
          </Text>
        </Text>
      </View>
      <Text style={{fontSize: 12}} numberOfLines={3}>
        {item.description}
      </Text>
      <View
        style={{alignSelf: 'flex-start', marginTop: 10, paddingHorizontal: 5}}>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'left',
            color: '#FF5757',
            fontWeight: 'bold',
          }}
          numberOfLines={1}>
          {'\u20B1' + item.unitPrice.toFixed(2)}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'stretch',
          flex: 1,
          justifyContent: 'space-between',
          marginTop: 10,
          paddingHorizontal: 2,
          paddingBottom: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={handleMinus}
            style={{
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <MaterialIcon
              name="minus-circle"
              size={20}
              style={{textAlign: 'center'}}
            />
          </TouchableOpacity>
          <View style={{marginHorizontal: 3}}>
            <Text style={{fontSize: 14}}>{quantity}</Text>
          </View>
          <TouchableOpacity
            onPress={handleAdd}
            style={{
              justifyContent: 'center',
              alignContent: 'center',
            }}>
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
          buttonStyle={{
            justifyContent: 'center',
            alignContent: 'center',
            backgroundColor: '#FF5757',
            borderRadius: 5,
            marginLeft: 15,
          }}
        />
      </View>
    </View>
  );
};

export default ListItem;
