import React, {useMemo} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import {Badge, Header as RNHeader} from '@rneui/themed';
import {useDispatch, useSelector} from 'react-redux';
import {
  searchProduct,
  toggleSearch,
} from '../../reducers/products/productsSlice';
import {useNavigation, ParamListBase, useRoute} from '@react-navigation/native';
import {RootState} from '../../reducers';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  SearchNormal1,
  ShoppingCart,
  HambergerMenu,
  Back,
} from 'iconsax-react-native';
import {redColor} from '../../constants';

interface HeaderProps {
  headerTitle: string;
  leftComponentOnPress: () => void;
  filterOnPress: () => void;
}

const Header = ({
  headerTitle,
  leftComponentOnPress,
  filterOnPress,
}: HeaderProps) => {
  const dispatch = useDispatch();
  const route = useRoute();

  const isCartScreen = route.name === 'Cart';
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const {searchKeyWord, isSearching, filter, isFilteringByCategory} =
    useSelector((state: RootState) => state.products);

  const {cart} = useSelector((state: RootState) => state.cart);

  const onChangeInput = (text: string) => {
    dispatch(searchProduct(text));
  };

  const searchHandler = () => {
    dispatch(toggleSearch());
  };

  const totalItems: number = useMemo(() => {
    let items: number = 0;
    cart.forEach(item => {
      items += Number(item.quantity);
    });

    return items;
  }, [cart]);

  return (
    <RNHeader
      leftComponent={
        !isCartScreen ? (
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={leftComponentOnPress}>
              <HambergerMenu color="#EDF6FF" size={24} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Back size="24" color="white" />
          </TouchableOpacity>
        )
      }
      rightComponent={
        !isCartScreen ? (
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={searchHandler}>
              <SearchNormal1 color="#EDF6FF" size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={() => navigation.navigate('Cart')}>
              <ShoppingCart color="#EDF6FF" size={24} />
              <Badge
                value={String(totalItems > 99 ? '99+' : totalItems)}
                status="error"
                containerStyle={{position: 'absolute', top: -10, right: -12}}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View></View>
        )
      }
      centerComponent={
        isSearching && !isCartScreen ? (
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 3,
              alignSelf: 'stretch',
              fontSize: 14,
              paddingVertical: 0,
              paddingHorizontal: 5,
              borderColor: 'white',
              color: 'white',
            }}
            onChangeText={onChangeInput}
            value={searchKeyWord}
          />
        ) : (
          <Text style={styles.heading}>
            {isFilteringByCategory ? filter : 'Products'}
          </Text>
        )
      }
      backgroundColor={redColor}
      barStyle="default"
    />
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#39395f',
    marginBottom: 20,
    width: '100%',
    paddingVertical: 15,
  },
  heading: {
    color: '#EDF6FF',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 3,
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
