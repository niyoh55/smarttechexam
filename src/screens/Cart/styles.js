import {StyleSheet} from 'react-native';
import {redColor} from '../../constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EDF6FF',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    marginTop: 20,
    backgroundColor: redColor,
    alignSelf: 'stretch',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginVertical: 15,
    textAlign: 'center',
    fontSize: 24,
  },
  modalSubText: {
    textAlign: 'center',
    fontSize: 16,
  },
  flatListContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 30,
    width: '100%',
  },
  bottomContainer: {
    backgroundColor: 'white',
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  checkOutBtn: {
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: redColor,
    borderRadius: 5,
  },
  clearCartBtn: {
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 5,
    marginLeft: 15,
  },
});

export default styles;
