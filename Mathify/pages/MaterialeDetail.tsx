import { MaterialeStackParamList } from "../Component/navigation";
import {RouteProp, useNavigation} from "@react-navigation/native";
import {View, Image, StyleSheet, ScrollView, SafeAreaView} from "react-native";
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
                                {Materiale.image ? (
                                    <Image
                                        source={{ uri: Materiale.image }}
                                        style={styles.coverImage}
                                    />
                                ): (<Image source={{uri: 'https://i.sstatic.net/y9DpT.jpg'}} style={styles.coverImage}/> )}
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

