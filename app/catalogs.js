import { StatusBar } from 'expo-status-bar';
import {StyleSheet, View, Pressable, Text, Modal, TextInput, FlatList} from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {useEffect, useState} from "react";
import firestore from '@react-native-firebase/firestore';

const defaultPayload = {catalog_name: "", catalog_price: 0};

export default function Catalogs() {
    const [modalVisible, setModalVisible] = useState(false);
    const [payload, setPayload] = useState(defaultPayload);
    const [data, setData] = useState([]);
    const [type, setType] = useState(null);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        let datas = [];
        setPayload(defaultPayload);
        firestore()
            .collection('catalogs')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    datas.push({...documentSnapshot.data(), catalog_id: documentSnapshot.id})
                });
                // console.log('datas: ', datas);
                setData(datas);
            });
    }

    const handleSubmit = async (type, id) => {
        switch (type) {
            case "create":
                firestore()
                    .collection('catalogs')
                    .add(payload)
                    .then(() => {
                        // console.log('catalog added!', payload);
                        setModalVisible(false);
                        fetchData();
                    });
                break
            case "update":
                firestore()
                    .collection('catalogs')
                    .doc(id)
                    .update({...payload, catalog_price: Number(payload.catalog_price)})
                    .then(() => {
                        // console.log('catalog updated!', payload);
                        setModalVisible(false);
                        fetchData();
                    });
                break
            case "delete":
                firestore()
                    .collection('catalogs')
                    .doc(id)
                    .delete()
                    .then(() => {
                        // console.log('catalogs deleted!');
                        fetchData();
                    });
                break
            default:
                firestore()
                    .collection('catalogs')
                    .add(payload)
                    .then(() => {
                        // console.log('catalog added!', payload);
                        setModalVisible(false);
                        fetchData();
                    });
                break
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.buttonAdd}>
                <Pressable
                    style={{flexDirection: "row", alignItems: 'center', backgroundColor: "#FFD8D8", padding: 15, borderRadius: 10}}
                    onPress={() => {
                        setModalVisible(true);
                        setType("create");
                    }}
                >
                    <FontAwesome
                        name={"plus-square-o"}
                        size={24}
                        color="#25292e"
                        style={{textAlign: "right", marginRight: 5}}
                    />
                    <Text style={[styles.buttonLabel, { color: "#25292e", textAlign: "right" }]}>{"Add Catalog"}</Text>
                </Pressable>
            </View>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View style={{ flex: 1, alignItems: 'center', flexDirection: "row", margin: 5, marginLeft: 20, marginRight: 20, padding: 20, paddingLeft: 25, paddingRight: 25, borderWidth: 1, borderColor: "pink", borderRadius: 10 }}>
                        <View style={{width: "80%"}}>
                            <Text style={{fontSize: 16, fontWeight: "bold", textTransform: "uppercase", marginBottom: 5}}>{item.catalog_name}</Text>
                            <Text style={{fontSize: 16}}>IDR {item?.catalog_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                        </View>
                        <View style={{width: "20%"}}>
                            <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose, {marginRight: 10}]}
                                    onPress={() => {
                                        setModalVisible(true);
                                        setPayload({...item, catalog_price: item.catalog_price.toString()});
                                        setType("update");
                                    }}>
                                    <FontAwesome
                                        name={"pencil"}
                                        size={20}
                                        color="#25292e"
                                        style={{textAlign: "right"}}
                                    />
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonClose, {backgroundColor: "#FFF"}]}
                                    onPress={() => handleSubmit("delete", item.catalog_id)}>
                                    <FontAwesome
                                        name={"trash-o"}
                                        size={20}
                                        color="#25292e"
                                        style={{textAlign: "right", color: "red"}}
                                    />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                )}
            />
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Pressable
                            style={{flexDirection: "row", alignItems: 'center', borderRadius: 10, marginBottom: 10}}
                            onPress={() => setModalVisible(false)}
                        >
                            <FontAwesome
                                name={"close"}
                                size={22}
                                color="#25292e"
                                style={{marginRight: 10}}
                            />
                            <Text style={styles.modalText}>Add Catalog</Text>
                        </Pressable>
                        <Text style={{marginTop: 15, marginBottom: 5}}>Catalog Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="example: Kain"
                            onChangeText={(value) => setPayload({...payload, catalog_name: value})}
                            value={payload.catalog_name}
                        />

                        <Text style={{marginTop: 15, marginBottom: 5}}>Catalog Price</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(value) => setPayload({...payload, catalog_price: value})}
                            value={payload.catalog_price}
                            placeholder="example: 1000"
                            keyboardType="numeric"
                        />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => handleSubmit(type, payload.catalog_id)}>
                            <Text style={styles.textStyle}>Save</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    menuContainer: {
        flex: 1,
        flexDirection: "row",
        marginTop: 50
    },
    buttonAdd: {
        margin: 20,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    image: {
        width: 300,
        height: 200
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
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
        marginTop: 20,
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#FFD8D8',
    },
    textStyle: {
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 20
    },
    input: {
        width: 300,
        height: 44,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        textAlign: 'left',
    },
});
