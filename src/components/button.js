import {  StyleSheet, TouchableOpacity, View, Text } from "react-native";
import {Audio} from "expo-av";

export default Button = ({activo, setActivo}) => {

    const handleCambio = () => {
        setActivo(!activo);
        playSonido();
    };

    const playSonido = async () => {
        const { sound } = await Audio.Sound.createAsync(
        require("../../assets/fart-83471.mp3")
        );
        await sound.playAsync();
    };

    return (
        <View>
            <TouchableOpacity onPress={()=> handleCambio()} style={styles.boton}>
                <Text stylr={styles.texto}>{activo ? "Parar" : "Comenzar"}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    boton: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        margin: 15,
        padding: 15,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
    },
    texto:{
        fontSize: 20,
        fontWeight: "bold",

    },
})