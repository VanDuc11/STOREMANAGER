import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, TouchableOpacity } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { API_PROFILE } from '../../help/API';
export default function App(props) {
  const { navigation: nav, route } = props;

  // nhận dữ liệu edit
  const editData = route.params?.editData;

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [logo, setLogo] = useState(null);
  const [status, setStatus] = useState('');


  const pickImage = async () => {

    // Đọc ảnh từ thư viện thì không cần khai báo quyền
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3], // khung view cắt ảnh 
      quality: 1,
    });


    console.log(result);


    if (!result.canceled) {
      setLogo(result.assets[0].uri);
      // chuyển ảnh thành base64 để upload lên json
      let _uri = result.assets[0].uri;  // địa chỉ file ảnh đã chọn
      let file_ext = _uri.substring(_uri.lastIndexOf('.') + 1); // lấy đuôi file


      FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' })
        .then((res) => {
          // phải nối chuỗi với tiền tố data image
          setLogo("data:image/" + file_ext + ";base64," + res);
          console.log(logo);
          // upload ảnh lên api thì dùng PUT có thể viết ở đây
        });


    }
  }


  const onSave = () => {
    const newObj = { name, address, phone, logo, status };
    fetch(
      !editData ? API_PROFILE : `${API_PROFILE}/${editData.id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        method: !editData ? 'POST' : 'PUT',
        body: JSON.stringify(newObj)

      })
      .then(res => nav.goBack());
  };

  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setAddress(editData.address);
      setPhone(editData.phone);
      setLogo(editData.logo);
      setStatus(editData.status);
    }
  }, [editData?.id]);




  return (
    <View >
      <Text style={{ fontSize: 22, alignSelf: 'center', padding: 50 }}>Thông tin </Text>





      <TextInput placeholder='name'
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)} />

      <TextInput placeholder='address'
        style={styles.input}
        value={address}
        onChangeText={(text) => setAddress(text)} />

      <TextInput placeholder='phone'
        style={styles.input}
        value={phone}
        onChangeText={(text) => setPhone(text)} />


      <TextInput placeholder='status'
        style={styles.input}
        value={status}
        keyboardType='numeric'
        onChangeText={(text) => setStatus(text)} />
      <TouchableOpacity
        onPress={pickImage}
      >
        <View>
          <Image style={{ width: 50, height: 50, alignSelf: 'center', borderRadius: 10, alignSelf:'flex-start'}}
            source={
              { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsT1pm7APYGLP3EI6ecmnUDRSI9KiOEBf5fA&usqp=CAU' }
            }
          />
        </View>
      </TouchableOpacity>
      {logo &&
        <Image source={
          { uri: logo }

        }
          style={{ width: 150, height: 150 , margin:10}}
        />}



      <Button title='Lưu'
        onPress={onSave}
        style={styles.boxbtn} />
      {/* <Button title='sửa'
        onPress={nextQLy} /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff'
  },
  button: {
    backgroundColor: '#ccc',
    padding: 10,
    backgroundColor: '#4DB6AC',
    borderRadius: 10,
    marginLeft: 12

  },
  boxbtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: 12
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 'bold'
  },
  boxAll: {
    borderRadius: 10,
    backgroundColor: '#80DEEA',
    padding: 12,
  },
  container: {
    flex: 2,
    justifyContent: 'center',
    padding: 8
  }
})