import {SafeAreaView, View} from "react-native";
import {Button} from "react-native-paper";
import {registraVerifica} from "../Component/writeOnDb";
import {StateContext} from "../Reducer";
import {useContext} from "react";
import {useSetCurrentUser} from "../Component/setUser";

export default function Verifica() {
    const [state] = useContext(StateContext);
    useSetCurrentUser("Utente1");

    return (
        <SafeAreaView>
            {state.utente.livello.numero >= 10 && !state.utente.verifica && (
                <Button onPress={()=>{


                    registraVerifica("Utente1")

                }}>Verifica</Button>)
            }
            {
                state.utente.livello.numero < 10 && (
                    <View>
                        <Button>
                            Non hai il livello sufficiente per la verifica
                        </Button>
                    </View>
                )
            }

        </SafeAreaView>
    );
}