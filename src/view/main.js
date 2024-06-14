import { SafeAreaView,  View, Platform } from "react-native";
import Tabs from "../components/tabs";
import Timer from "../components/timer";
import Button from  "../components/button";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {Audio} from "expo-av";


export default Main = () => {
    const colores = ["#5170d5","#5CAFF2","#5CDEF2" ];

    const [seleccion, setSeleccion] = useState("POMO" | "SHORT" | "LONG");
    const [activo, setActivo] = useState(false);
    const [tiempo, setTiempo] = useState(25 * 60);

    const playSonido = async () => {
        const { sound } = await Audio.Sound.createAsync(
        require("../../assets/police-6007.mp3")
        );
        await sound.playAsync();
    };

    useEffect(() => {
        let interval = null;
    
        if (activo) {
          interval = setInterval(() => {
            setTiempo(tiempo - 1);
          }, 10);
        } else {
          clearInterval(interval);
        }
    
        if (tiempo === 0) {
          setActivo(false);
          setTiempo(seleccion === 0 ? 1500 : seleccion === 1 ? 300 : 600);
          playSonido();
        }
    
        return () => clearInterval(interval);
    }, [tiempo, activo]);

    return (
        <SafeAreaView style={[{ flex: 1 },{backgroundColor:colores[seleccion]}]}>
            <StatusBar style="light" />
        <View style={{marginTop: Platform.OS =='android' && 30}}>
            <Tabs seleccion={seleccion} setSeleccion={setSeleccion} tiempo={tiempo} setTiempo={setTiempo} />
            <Timer tiempo={tiempo}/>
            <Button activo={activo} setActivo={setActivo}/>
        </View>
        </SafeAreaView>
    );
}