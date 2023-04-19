import {FlatList, StyleSheet, View, Text} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import ListItem from './components/ListItem';
import {EmojiSad} from 'iconsax-react-native';
import styles from './styles';
import {redColor} from '../../constants';

const MainScreen = () => {
  const flatlistRef = useRef<FlatList>(null);

  const {products, filteredProducts, isFilteringByCategory, isSearching} =
    useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (
      (filteredProducts.length !== 0 &&
        (isFilteringByCategory || isSearching)) ||
      (products.length !== 0 && !(isFilteringByCategory || isSearching))
    ) {
      flatlistRef.current?.scrollToIndex({index: 0, viewPosition: 0});
    }
  }, [filteredProducts, isFilteringByCategory]);

  return (
    <View style={styles.container}>
      <View style={styles.flatListContainer}>
        <FlatList
          ref={flatlistRef}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          data={
            isFilteringByCategory || isSearching ? filteredProducts : products
          }
          contentContainerStyle={styles.flatListContentContainer}
          numColumns={2}
          keyExtractor={data => data.id}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          renderItem={({item}) => <ListItem item={item} />}
          ItemSeparatorComponent={() => <View style={{height: 10, width: 5}} />}
          ListEmptyComponent={() => (
            <View
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <EmojiSad size="100" color={redColor} />
              <Text style={{color: redColor, fontSize: 32}}>
                No Results Found.
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default MainScreen;
