import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import ShopItems from './src/assets/data/items.json';
import Header from './src/components/Header/Header';
import CartScreen from './src/screens/Cart/CartScreen';
import MainScreen from './src/screens/MainScreen/MainScreen';

const App = () => {
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const [drawerPosition, setDrawerPosition] = useState<'left' | 'right'>(
    'left',
  );
  const changeDrawerPosition = () => {
    if (drawerPosition === 'left') {
      setDrawerPosition('right');
    } else {
      setDrawerPosition('left');
    }
  };

  const loadData = async () => {
    try {
      console.log('res', ShopItems);
      let categories: any[] = [];
      const shopItemsNew = ShopItems.map(item => {
        if (!categories.includes(item.category)) {
          categories.push(item.category);
        }
      });

      console.log({
        categories,
        shopItemsNew,
      });
    } catch (e) {
      console.log('error', e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>I'm in the Drawer!</Text>
      <Button
        title="Close drawer"
        onPress={() => drawer.current?.closeDrawer()}
      />
    </View>
  );

  const Stack = createNativeStackNavigator();

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={200}
      drawerPosition={drawerPosition}
      renderNavigationView={navigationView}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            header: props => {
              const {name} = props.route;
              return <Header />;
            },
          }}>
          <Stack.Screen name="Products" component={MainScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default App;
