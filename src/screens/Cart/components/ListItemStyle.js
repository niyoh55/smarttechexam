import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#ffffff',
    width: '100%',
    height: 120,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  item: {
    aspectRatio: 1,
    height: '100%',
  },
  textAndButtonsContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  productName: {
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'left',
    marginTop: 10,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#FF5757',
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
  addAndMinusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  minusBtn: {justifyContent: 'center', alignContent: 'center'},
  removeBtn: {
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#FF5757',
    borderRadius: 5,
    marginLeft: 15,
  },
});

export default styles;
