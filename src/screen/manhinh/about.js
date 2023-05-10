import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

export default function App(props) {

    const nav = props.navigation;
    // const { id } = props.route.params.Profile;
    const { name } = props.route.params;
    const { mssv } = props.route.params;
    const nextQLy = () => {
        nav.navigate('Quanly');
    }
    return (
        <View style = {styles.container}>
            <Image style={{alignSelf:'center', height: 100, width: 100, borderRadius:10, margin:10 }}
                source={
                    { uri: 'https://picsum.photos/200/300' }
                }
            />
            <Text style ={styles.text}>Họ tên:{name}</Text>
            <Text>Mã SV:{mssv}</Text>

            <Button 
                title='Quản lý của hàng'
                onPress={nextQLy} />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
    text:{
        fontSize: 18,
    }
});
