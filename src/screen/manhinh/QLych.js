import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, Pressable, TouchableOpacity } from 'react-native';
import { API_PROFILE } from '../../help/API';
import { useIsFocused } from '@react-navigation/native';

export default function App(props) {
    const nav = props.navigation;
    const [list, setList] = useState([]);
    const isFocused = useIsFocused();

    const nextNew = () => {
        nav.navigate('newCh');
    }


    const getUser = () => {
        fetch(API_PROFILE)
            .then(res => res.json())
            .then(data => {
                setList(data);
                setLoading(false);
            });

    }

    useEffect(() => {
        getUser();
    }, isFocused);

    const onDelete = (deleteId) => {
        fetch(`${API_PROFILE}/${deleteId}`,
            { method: 'DELETE' })
            .then(res => getUser());
    }

    // const onEdit = (editID) => {
    //     // lấy ra bản ghi chi tiết của phần tử
    //     fetch(`${API_PROFILE}/${editID}`,)
    //         .then(res => res.json())
    //         .then(data => nav.navigate(
    //             'newCh',
    //             { editData: data }));

    // }
    const onCheckStatus = (itemStatus) => {
        if (itemStatus == 1) {
            return "Hoạt động"
        } else {
            return "Đóng cửa"

        }

    }
    const onCheckImage = (itemImage)=>{
        if(itemImage){
            return itemImage;
        }else{
            alert('Không thấy ảnh')
        }
    }

    return (
        <View>
            <Image style={styles.image}
                source={
                    { uri: 'https://d1nxzqpcg2bym0.cloudfront.net/google_play/com.paytm.merchants/06c658d6-823e-11e7-96c5-3ffed8916636/128x128' }
                }
            />



            <TouchableOpacity onPress={nextNew}>
                <View style={styles.button}>
                    <Text style={styles.text} >Thêm mới</Text>
                </View>
            </TouchableOpacity>

            <FlatList
                data={list}
                renderItem={({ item }) =>
                    <TouchableOpacity>

                        <View style={{flexDirection: 'row'}}>

                            
                            {/* <Text> Logo: {item.logo}</Text> */}
                            <View style={styles.list}>
                                <Image
                                    style={styles.imageItem}
                                    source={
                                        { uri: onCheckImage(item.logo) }
                                    } />
                            </View>

                            <View style={styles.list}>
                                <Text> Id: {item.id}</Text>
                                <Text> Name: {item.name}</Text>
                                <Text> Address: {item.address}</Text>
                                <Text> Phone: {item.phone}</Text>

                                <Text> Status: {onCheckStatus(item.status)}</Text>
                                <Pressable onPress={() => nav.navigate('newCh',{editData: item})}
                                style={{
                                    backgroundColor: '#CCFFFF',
                                    width: 50, height: 20,
                                    borderRadius: 20, alignItems: 'center',
                                    margin: 10

                                }}>

                                <Text>Sửa</Text>
                            </Pressable>
                            <Pressable onPress={() => onDelete(item.id)}
                                style={{
                                    backgroundColor: '#CCFFFF',
                                    width: 50, height: 20,
                                    borderRadius: 20, alignItems: 'center',
                                    marginLeft: 10

                                }}>
                                <Text>Xóa</Text>
                            </Pressable>
                            </View>


                            

                        </View>
                    </TouchableOpacity>
                }

            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    text: {
        fontSize: 18,
        marginTop: 10
    },
    button: {
        alignSelf: 'flex-end',
        width: 120,
        height: 50,
        backgroundColor: '#3366CC',
        borderRadius: 5,
        margin: 10

    },
    list: {
        // alignItems:'flex-end',
        flex: 1,
        margin: 10,
        alignItems:'flex-start'
    },
    image: {
        width: 50,
        height: 50,
        alignSelf: 'center'
    },
    imageItem: {
        width: 150,
        height: 150,
        alignSelf: 'flex-start',
        borderRadius:10
    }

});
