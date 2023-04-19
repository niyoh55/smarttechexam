import {StyleSheet} from 'react-native';
import {redColor} from '../../../constants';

const styles = StyleSheet.create({
  container: {
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
  },
  item: {
    aspectRatio: 1,
    width: '80%',
    marginTop: 5,
  },
  activityIndicator: {justifyContent: 'center', alignItems: 'center'},
  productName: {fontSize: 16, fontWeight: '700'},
  category: {
    fontSize: 12,
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  unitPrice: {
    fontSize: 20,
    textAlign: 'left',
    color: redColor,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 2,
    paddingBottom: 10,
  },
  addAndMinusBtnsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  minusBtn: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  addToCartBtn: {
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: redColor,
    borderRadius: 5,
    marginLeft: 15,
  },
});

export default styles;
