import { StatusBar } from 'expo-status-bar';
import {StyleSheet, View, Pressable, Text, TextInput, FlatList} from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {useEffect, useState} from "react";
import firestore from '@react-native-firebase/firestore';
import { SelectList } from 'react-native-dropdown-select-list'
import {useNavigation} from "@react-navigation/native";

export default function Calculator() {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [calc, setCalc] = useState([]);
    const [selected, setSelected] = useState("");
    const [grandTotal, setGrandTotal] = useState(0);

    let datas = Object.assign([], calc);
    let grandTotals = Object.assign(0, grandTotal);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = (id) => {
        let datas = [];
        let listCalc = Object.assign([], calc);
        setSelected("");
        if (id) {
            firestore()
                .collection('catalogs')
                .doc(id)
                .get()
                .then(querySnapshot => {
                    let isExist = listCalc.findIndex((val) => val.catalog_name === querySnapshot._data.catalog_name)
                    if (isExist < 0) listCalc.push({...querySnapshot._data, catalog_total: 1, catalog_amount: 1*querySnapshot._data.catalog_price});
                    else listCalc[isExist] = {...listCalc[isExist], catalog_total: (listCalc[isExist].catalog_total + 1), catalog_amount: (listCalc[isExist].catalog_total + 1) * listCalc[isExist].catalog_price}

                    listCalc.forEach(element => {
                        setGrandTotal(grandTotals += element.catalog_amount);
                    });
                    // querySnapshot.forEach(documentSnapshot => {
                    // });
                    setCalc(listCalc);
                });
        } else {
            firestore()
                .collection('catalogs')
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(documentSnapshot => {
                        datas.push({key: documentSnapshot.id, value: documentSnapshot.data().catalog_name.toUpperCase()})
                    });
                    setData(datas);
                });
        }
    }

    const handleData = async (index, type) => {
        setGrandTotal(0);
        setSelected("");
        switch (type) {
            case "delete":
                datas.splice(index, 1);
                break
            case "add":
                datas[index] = {...datas[index], catalog_total: (datas[index].catalog_total + 1), catalog_amount: (datas[index].catalog_total + 1) * datas[index].catalog_price}
                break
            case "reduce":
                datas[index] = {...datas[index], catalog_total: (datas[index].catalog_total - 1), catalog_amount: (datas[index].catalog_total - 1) * datas[index].catalog_price}
                break
            default:
                datas.splice(index, 1);
                break
        }
        datas.forEach(element => {
            setGrandTotal(grandTotals += element.catalog_amount);
        });
        setCalc(datas)
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonAdd}>
                <SelectList value={""} setSelected={(id) => {
                    setSelected(id)
                    fetchData(id)
                }} data={data} />
            </View>

            <FlatList
                data={calc}
                renderItem={({ item, index }) => (
                    <View style={{ flex: 1, alignItems: 'center', flexDirection: "row", margin: 5, marginLeft: 20, marginRight: 20, padding: 15, paddingLeft: 20, paddingRight: 20, borderWidth: 1, borderColor: "pink", borderRadius: 10 }}>
                        <View style={{width: "40%"}}>
                            <Text style={{fontSize: 14, fontWeight: "bold", textTransform: "uppercase", marginBottom: 5}}>{item.catalog_name}</Text>
                            <Text style={{fontSize: 14}}>@ {item?.catalog_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                        </View>
                        <View style={{width: "20%"}}>
                            <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                                {/*<Pressable*/}
                                {/*    style={{paddingRight: 10}}*/}
                                {/*    onPress={() => handleData(index, "reduce")}>*/}
                                {/*    <FontAwesome*/}
                                {/*        name={"minus"}*/}
                                {/*        size={12}*/}
                                {/*        color="#25292e"*/}
                                {/*        style={{textAlign: "center"}}*/}
                                {/*    />*/}
                                {/*</Pressable>*/}
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(value) => {
                                        datas[index] = {...item, catalog_total: value, catalog_amount: value * item.catalog_price}
                                        datas.forEach(element => {
                                            setGrandTotal(grandTotals += element.catalog_amount);
                                        });
                                        setCalc(datas)
                                    }}
                                    value={String(item.catalog_total)}
                                    keyboardType="numeric"
                                />
                                {/*<Pressable*/}
                                {/*    style={{paddingLeft: 10}}*/}
                                {/*    onPress={() => handleData(index, "add")}>*/}
                                {/*    <FontAwesome*/}
                                {/*        name={"plus"}*/}
                                {/*        size={12}*/}
                                {/*        color="#25292e"*/}
                                {/*        style={{textAlign: "center"}}*/}
                                {/*    />*/}
                                {/*</Pressable>*/}
                            </View>
                        </View>
                        <View style={{width: "30%"}}>
                            <Text style={{fontSize: 14, textAlign: "right", padding: 10}}>IDR {datas[index]?.catalog_amount ? datas[index]?.catalog_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 0}</Text>
                        </View>
                        <View style={{width: "10%"}}>
                            <Pressable
                                style={[styles.button, styles.buttonClose, {backgroundColor: "#FFF"}]}
                                onPress={() => handleData(index, "delete")}>
                                <FontAwesome
                                    name={"trash-o"}
                                    size={18}
                                    color="#25292e"
                                    style={{textAlign: "center", color: "red"}}
                                />
                            </Pressable>
                        </View>
                    </View>
                )}
            />
            <View style={styles.buttonAdd}>
                <View style={{paddingTop: 10, paddingBottom: 10, justifyContent: "center"}}>
                    <Pressable
                        style={[styles.button, styles.buttonClose, {backgroundColor: "yellow", borderRadius: 5}]}
                        onPress={() => navigation.navigate("Report", {data: calc, grandTotal})}>
                        <Text style={{color: "#000", textAlign: "center", fontWeight: "bold"}}>
                        <FontAwesome
                            name={"file-text"}
                            size={18}
                            color="#25292e"
                            style={{textAlign: "center", paddingRight: 5}}
                        /> Lihat Nota </Text>
                    </Pressable>
                </View>
                <View
                    style={{flexDirection: "row", alignItems: 'center', backgroundColor: "#FFD8D8", padding: 15, borderRadius: 10, justifyContent: "space-between"}}
                >
                    <Text style={{ color: "#25292e", textAlign: "right", fontWeight: "bold", fontSize: 16}}>{"Total"}</Text>
                    <Text style={[styles.buttonLabel, { color: "#25292e", textAlign: "right", fontWeight: "bold", fontSize: 16 }]}>IDR {grandTotal ? grandTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 0}</Text>
                </View>

            </View>
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
        justifyContent: "center",
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
    button: {
        // marginLeft: 5,
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
    input: {
        width: 45,
        height: 45,
        borderWidth: 1,
        // padding: 10,
        borderRadius: 5,
        textAlign: 'center',
    },
});
