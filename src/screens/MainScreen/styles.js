import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EDF6FF',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContainer: {flex: 1, paddingHorizontal: 10, width: '100%'},
  flatListContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 30,
    width: '100%',
  },
});

export default styles;
