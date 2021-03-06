import { StyleSheet } from 'react-native';

import globalStyles from '~global/constants.style';

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    borderRadius: 10,
    shadowColor: '#000',
    shadowRadius: 2,
    shadowOpacity: 0.2,
    marginTop: 15,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    zIndex: -6,
    elevation: -5,
  },
  headerText: {
    fontSize: globalStyles.SM_FS,
    fontWeight: 'bold',
  },
  id: {
    width: 40,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  complete: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default styles;
