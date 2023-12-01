import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Image, View, Text} from 'react-native';
const logoImage = require('../assets/logo.png');
import Button from './Button';
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function AppIndex() {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={logoImage} style={styles.image} />
                {/*<Text style={{textAlign: "center", fontSize: 20, fontWeight: "bold"}}>Jumputan Merak Solo</Text>*/}
                {/*<Text style={{textAlign: "center", fontSize: 20, fontWeight: "bold", textTransform: "uppercase"}}>Ibu Wiwik Sugihadi</Text>*/}
            {/*<View style={{borderWidth: 2, borderColor: "red"}}></View>*/}
            </View>
            <View style={styles.menuContainer}>
                <View style={{margin: 5}}>
                    <Button url={"Catalogs"} icon={"database"} theme="primary" label="Catalogs" />
                </View>
                <View style={{margin: 5}}>
                    <Button url={"Calculator"} icon={"calculator"} theme="primary" label="Calculator" />
                </View>
            </View>

            <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", padding: 10}}>
                <Text style={{fontSize: 10, color: "#FFD3D3"}}> AIL.TECH </Text>
                <FontAwesome
                    name={"copyright"}
                    size={10}
                    color="#FFD3D3"
                    // color="#25292e"
                />
                <Text style={{fontSize: 10, color: "#FFD3D3"}}>2023</Text>
            </View>
            <StatusBar style="dark" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        // flex: 1,
        padding: 150,
        paddingBottom: 100,
        borderBottomLeftRadius: 280,
        borderBottomRightRadius: 280,
        // borderBottomWidth: 3,
        borderBottomColor: "#FFF",
        elevation: 10,
        backgroundColor: "#FFF"
    },
    menuContainer: {
        flex: 1,
        // flexDirection: "row",
        // backgroundColor: "#FFD3D3",
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 0,
        borderColor: "#000",
        // borderBottomColor: "#000",
        // borderTopColor: "none",
        // borderLeftColor: "none",
        // width: "100%",
        borderBottomWidth: 2,
        // elevation: 10
        // borderBottomLeftRadius: 100,
        // borderBottomRightRadius: 200
    },
    image: {
        width: 240,
        height: 200,
        // borderWidth: 1,
        // borderTopLeftRadius: 100,
        // borderBottomRightRadius: 100,
        borderColor: "#25292e",
        objectFit: "contain"
    },
});
