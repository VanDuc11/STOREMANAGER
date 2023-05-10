import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Image,Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import about from './src/screen/manhinh/about'
import QLCH from './src/screen/manhinh/QLych'
import newCh from './src/screen/manhinh/newCh'



const Stack = createNativeStackNavigator();
const home = (props) => {
  const nav = props.navigation;
  const nextAbout = () => {
    nav.navigate('About', { name: 'Dương Văn Đức', mssv: 'PH19780', img: './assets/icon.png' });
  }
  const nextQLy = () => {
    nav.navigate('Quanly');
  }
  return (
    <View >
      <Image style ={{alignSelf:'center',width:150, height: 150, margin: 10, borderRadius:50}}
        source={
          require('./assets/logo.png')
        }
      />
      <Button 
        title='Thông tin cá nhân'
        onPress={nextAbout} />
      <Button style={styles.button1}
        title='Quản lý của hàng'
        onPress={nextQLy}
      />
      <StatusBar style="auto" />
    </View>
  );
}
export default function App() {

  return (
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home' component={home} />
        <Stack.Screen
          name='About' component={about} />
        <Stack.Screen
          name='Quanly' component={QLCH} />
        <Stack.Screen
          name='newCh' component={newCh} />
       

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
