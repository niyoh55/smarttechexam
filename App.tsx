import React, {useRef, useState} from 'react';
import {DrawerLayoutAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Header from './src/components/Header/Header';
import CartScreen from './src/screens/Cart/CartScreen';
import MainScreen from './src/screens/MainScreen/MainScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import DrawerContent from './src/components/DrawerContent/DrawerContent';
import {Provider} from 'react-redux';
import {store} from './src/reducers';
import Toast from 'react-native-toast-message';

const App = () => {
  const Stack = createNativeStackNavigator();
  const drawer = useRef<DrawerLayoutAndroid>(null);

  const [drawerPosition, setDrawerPosition] = useState<'left' | 'right'>(
    'left',
  );

  const closeDrawer = () => {
    drawer.current?.closeDrawer();
  };

  const openCategoryDrawer = () => {
    setDrawerPosition('left');
    drawer.current?.openDrawer();
  };

  const openFilterDrawer = () => {
    setDrawerPosition('right');
    drawer.current?.openDrawer();
  };

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <DrawerLayoutAndroid
          ref={drawer}
          drawerWidth={200}
          drawerPosition={drawerPosition}
          renderNavigationView={() => (
            <DrawerContent closeDrawer={closeDrawer} />
          )}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                header: props => {
                  const {name} = props.route;
                  return (
                    <Header
                      headerTitle={name}
                      leftComponentOnPress={openCategoryDrawer}
                      filterOnPress={openFilterDrawer}
                    />
                  );
                },
                animation: 'slide_from_right',
              }}>
              <Stack.Screen name="Products" component={MainScreen} />
              <Stack.Screen name="Cart" component={CartScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </DrawerLayoutAndroid>
      </Provider>
      <Toast />
    </SafeAreaProvider>
  );
};

export default App;
