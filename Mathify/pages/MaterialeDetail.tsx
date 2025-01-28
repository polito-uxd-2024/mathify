import { MaterialeStackParamList } from "../Component/navigation";
import {RouteProp, useNavigation} from "@react-navigation/native";
import {View, Image, StyleSheet, ScrollView, SafeAreaView, ImageBackground} from "react-native";
import {Text, Card, Button, IconButton} from "react-native-paper";
import {styles} from "../Component/style";
import React from "react";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";

export default function MaterialeDetail({ route }: { route: RouteProp<MaterialeStackParamList, 'MaterialeDetail'> }) {
    const { Materiale } = route.params;
    const navigation= useNavigation<NativeStackNavigationProp<MaterialeStackParamList>>();
    return (

                <View style={styles.content}>
                    <SafeAreaView style={styles.section}>
                        <View style={[styles.header, { flexDirection: "row", alignItems: "center", justifyContent: "center" }]}>
                            {/* Back Icon */}
                            <View style={{ flex: 1 }}>
                                <IconButton
                                    icon="arrow-left"
                                    size={24}
                                    color="black"
                                    onPress={() => navigation.goBack()}
                                    style={{ marginRight: 10 }}
                                />
                            </View>
                            {/* Title */}
                            <Text style={[styles.welcomeText, { flex: 1, textAlign: "center" }]}>Dettaglio Materiale</Text>
                            <View style={{ flex: 1 }} />
                        </View>


                        <View style={styles.section}>
                        <Card style={[styles.card, {marginHorizontal:10}]}>

                            <Card.Content>

                                    <ImageBackground
                                        source={require("../assets/Logaritmi.png")}
                                        style={{ height:180, width:180, borderRadius:10, borderWidth:2, position:"relative", top:0, left:70, right:0, bottom:0}}
                                        imageStyle={{ height: 170, width: 170, position:"absolute", top:0, left:0, right:0, bottom:0, borderRadius:10}}
                                    />

                                <View style={styles.article}>
                                <Text style={styles.bigWelcomeText}>{Materiale.title}</Text>
                                </View>
                                <View style={styles.article}>
                                <Text style={styles.calloutText}>{Materiale.description}</Text>
                                </View>

                                <View style={styles.article}>
                                <Text style={styles.smallText}>{Materiale.longDescription}</Text>
                                </View>
                            </Card.Content>
                        </Card>
                        </View>


                    </SafeAreaView>
                </View>



    );
}

