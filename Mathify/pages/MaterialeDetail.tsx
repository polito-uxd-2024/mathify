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
        <ScrollView style={styles.mainContent}>
            <SafeAreaView>
                <View style={styles.content}>
                    <View style={styles.section}>
                        <View style={styles.header}>
                            
                            <IconButton icon={'arrow-left'} size={20} color={'black'} onPress={()=>navigation.goBack()}/>
                        </View>

                        <Card style={styles.card}>

                            <Card.Content>
                                {Materiale.image && (
                                    <Image
                                        source={{ uri: Materiale.image }}
                                        style={styles.coverImage}
                                    />
                                )}
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
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

