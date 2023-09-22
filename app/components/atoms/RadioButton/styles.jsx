import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  option: {
    fontSize: 20,
    color: 'white',
    backgroundColor:'red',
    textAlign: 'center',
  },
  unselected: {
    backgroundColor: 'red',
    margin: 5,
    
  },
  selected: {
    backgroundColor: 'blue',
    margin: 6,
    padding: 10,
    borderRadius: 10,
    
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
 
});
export default styles;
