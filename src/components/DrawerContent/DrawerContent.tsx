import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {categories, redColor} from '../../constants';
import {Divider} from '@rneui/themed';
import {useDispatch, useSelector} from 'react-redux';
import {
  setCategory,
  sortByPriceAsc,
  sortByPriceDesc,
} from '../../reducers/products/productsSlice';
import Dropdown from '../Dropdown/Dropdown';
import {RootState} from '../../reducers';

interface DrawerContentProps {
  closeDrawer: () => void;
}

const DrawerContent = ({closeDrawer}: DrawerContentProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Price: Low to High', value: 'asc'},
    {label: 'Price: High to Low', value: 'desc'},
  ]);

  const dispatch = useDispatch();
  const {searchKeyWord, isSearching, filter, isFilteringByCategory} =
    useSelector((state: RootState) => state.products);

  const handleChangeCategory = (categoryName: string): void => {
    dispatch(setCategory(categoryName));
    closeDrawer();
  };

  useEffect(() => {
    if (value === 'asc') {
      dispatch(sortByPriceAsc());
    } else if (value === 'desc') {
      dispatch(sortByPriceDesc());
    }
  }, [value]);

  useEffect(() => {
    setValue(null);
  }, [searchKeyWord, isSearching, filter, isFilteringByCategory]);

  return (
    <SafeAreaView style={[styles.container]}>
      {categories.map((category, index) => (
        <View key={`${category}-${index}`}>
          <TouchableOpacity
            onPress={() => handleChangeCategory(category)}
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingLeft: 10,
              height: 60,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                letterSpacing: 1.5,
              }}>
              {category}
            </Text>
          </TouchableOpacity>
          <Divider
            style={{marginVertical: 1}}
            insetType="middle"
            width={1}
            orientation="horizontal"
          />
        </View>
      ))}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingLeft: 10,
          marginVertical: 10,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            letterSpacing: 1.5,
          }}>
          Sort By:
        </Text>
        <Dropdown
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Sort By..."
        />
      </View>
    </SafeAreaView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 16,
    backgroundColor: redColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});
