import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {useNavigation} from "@react-navigation/native";

export default function Button({ label, theme, icon, url }) {
    const navigation = useNavigation();
    if (theme === "primary") {
        return (
            <View
                style={[styles.buttonContainer, { borderWidth: 2, width: 150, height: 150, borderColor: "#000", borderRadius: 100, backgroundColor: "#FFD3D3", elevation: 5, justifyContent: "center"}]}
            >
                {/*<Link href={url} asChild>*/}
                    <Pressable
                        style={[{ padding: 20, justifyContent: "center" }]}
                        onPress={() => navigation.navigate(url)}
                    >
                        <FontAwesome
                            name={icon}
                            size={30}
                            // color="#FFD3D3"
                            color="#25292e"
                            style={styles.buttonIcon}
                        />
                        <Text style={[styles.buttonLabel, { color: "#25292e", textAlign: "center", fontSize: 16 }]}>{label}</Text>
                    </Pressable>
                {/*</Link>*/}
            </View>
        );
    }

    return (
        <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={() => alert('You pressed a button.')}>
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonIcon: {
        textAlign: "center",
        padding: 10
    }
    // Styles from previous step remain unchanged.
});
