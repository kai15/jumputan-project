import { StatusBar } from 'expo-status-bar';
import {StyleSheet, View, Text, TextInput, FlatList, Image} from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {useEffect, useState} from "react";
import logoImage from "../assets/logo.png";
const ttdImage = require('../assets/ttd.png');

export default function Report({route}) {
    const [grandTotal, setGrandTotal] = useState(0);
    const [nota, setNota] = useState([])

    useEffect(() => {
        if (route && route.params) {
            setNota(route.params.data);
            setGrandTotal(route.params.grandTotal);
        }
    }, []);

    return (
        <View style={styles.container}>
            {/*Header*/}
            <View style={{paddingBottom: 10, paddingTop: 10, marginRight: 20, marginLeft: 20, borderBottomWidth: 2, borderBottomColor: "#000"}}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Image source={logoImage} style={styles.image} />
                    <View>
                        <Text style={{textAlign: "left", fontWeight: "bold", fontSize: 20}}>KERAJINAN KAIN JUMPUTAN</Text>
                        <Text style={{textAlign: "left", fontWeight: "bold", fontSize: 24}}>IBU WIWIK SUGIHADI</Text>
                    </View>
                </View>
                <Text style={{textAlign: "left",  fontSize: 14, marginTop: -15}}>Jln. Ki Ageng Mangir No. 3 RT. 03/06, Penumping, Solo 57141</Text>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-start", paddingTop: 5}}>
                    <Text style={{textAlign: "center", paddingRight: 5}}>
                        <FontAwesome
                            name={"whatsapp"}
                            size={16}
                            color="green"
                        /> 081325486157 </Text>
                    <Text style={{textAlign: "center", paddingLeft: 5, paddingRight: 5}}>
                        <FontAwesome
                            name={"instagram"}
                            size={16}
                            color="red"
                        /> @jumputanmerak </Text>
                </View>
            </View>

            {/*Kepada*/}
            <View style={{flexDirection: "row", marginLeft: 20, marginRight: 20, alignItems: "center", justifyContent: "flex-end", marginTop: 10}}>
                <Text style={{textAlign: "right"}}>Kepada Yth. </Text>
                <TextInput style={{fontWeight: "bold", textTransform: "uppercase", borderBottomWidth: 1, borderBottomColor: "#CCC", padding: 0}} />
            </View>

            {/*Table*/}
            <View style={{flexDirection: "row", marginLeft: 10, marginRight: 10, marginTop: 20, padding: 10, alignItems: "center", backgroundColor: "#EAEAEA"}}>
                <View style={{width: "15%"}}>
                    <Text style={{fontWeight: "bold", textAlign: "left", fontSize: 12}}>Banyak</Text>
                </View>
                <View style={{width: "40%"}}>
                    <Text style={{fontWeight: "bold", textAlign: "left", fontSize: 12}}>Nama Barang</Text>
                </View>
                <View style={{width: "20%"}}>
                    <Text style={{fontWeight: "bold", textAlign: "center", fontSize: 12}}>Harga Satuan</Text>
                </View>
                <View style={{width: "25%"}}>
                    <Text style={{fontWeight: "bold", textAlign: "right", fontSize: 12}}>Jumlah</Text>
                </View>
            </View>

            {/*List Nota*/}
            <View>
                <FlatList
                    data={nota}
                    renderItem={({ item, index }) => (
                        <View style={{ flex: 1, alignItems: 'center', flexDirection: "row", marginLeft: 10, marginRight: 10, paddingLeft: 5, paddingRight: 5, borderBottomWidth: 1, borderBottomColor: "#CCC", paddingTop: 5, paddingBottom: 5 }}>
                            <View style={{width: "15%"}}>
                                <Text style={{fontSize: 14, textAlign: "center", fontWeight: "normal", marginBottom: 5}}>{item.catalog_total}</Text>
                            </View>
                            <View style={{width: "40%"}}>
                                <Text style={{fontSize: 14, fontWeight: "normal", textTransform: "uppercase", marginBottom: 5}}>{item.catalog_name}</Text>
                            </View>
                            <View style={{width: "20%"}}>
                                <Text style={{fontSize: 14, fontWeight: "normal", textAlign: "center", marginBottom: 5}}>@ {item?.catalog_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                            </View>
                            <View style={{width: "25%"}}>
                                <Text style={{fontSize: 14, fontWeight: "normal", textAlign: "right", marginBottom: 5}}>{item?.catalog_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                            </View>
                        </View>
                    )}
                />

                {/*Grand Total*/}
                <View style={{flexDirection: "row", alignItems: 'center', backgroundColor: "#EAEAEA", justifyContent: "flex-end", marginLeft: 10, marginRight: 10, paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5}}>
                    <Text style={{ color: "#25292e", textAlign: "right", fontWeight: "bold", fontSize: 15}}>{"Jumlah Rp."} {grandTotal ? grandTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 0}</Text>
                </View>

                {/*TTD*/}
                <View style={{marginLeft: 10, marginRight: 10, paddingTop: 50, paddingBottom: 10, paddingLeft: 5, paddingRight: 5}}>
                    <Text style={{ color: "#25292e", textAlign: "right", fontSize: 15}}>Hormat kami,</Text>
                    <View style={{alignItems: "flex-end"}}>
                        <Image source={ttdImage} style={styles.image} />
                    </View>
                </View>
            </View>

            <View style={{flex: 1, marginLeft: 10, marginRight: 10, paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5, justifyContent: "flex-end"}}>
                <View style={{borderWidth: 1, padding: 10}}>
                    <Text style={{ color: "#25292e", textAlign: "center", fontWeight: "bold", fontSize: 12}}>Barang-barang yang sudah dibeli tidak bisa ditukar / kembalikan</Text>
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
        width: 120,
        height: 100,
        objectFit: "contain",
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
