import {StyleSheet} from "react-native";
import {myTheme} from "./theme";


export const styles = StyleSheet.create({


    header: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'white',
        borderBottomColor: 'black',
        borderBottomWidth: 3,
    },

    content: {
        flex: 1,
        flexDirection: 'column',
    },
    mainContent: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 20,
    },
    section: {
        paddingTop: 20,
        //borderColor: 'yellow',
        //borderWidth: 3,
    },
    article: {
        paddingTop: 10,
        //borderColor: 'red',
        //borderWidth: 3,
    },
    cover: {
        padding: 20,
        borderColor: 'yellow',
        borderWidth: 3,
        backgroundColor: 'lightgray',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        //borderColor: 'green',
        //borderWidth: 3,
    },
    column: {
        flexDirection: 'column',
        justifyContent: 'center',
        //borderColor: 'green',
        //borderWidth: 3,
    },
    cardLeft: {
        marginLeft: 20,
        marginTop: 10,
    },

    //Text
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    sectionText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 0,
        flexShrink: 1,
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 0,
    },


    calloutText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 0,
    },

    cardBase: {
        flex: 1,
        width: '100%',
        backgroundColor: 'black',
        paddingLeft: 2,
        paddingTop: 2,
        paddingBottom: 5,
        paddingRight: 4,
        borderRadius: 22,
    },
    miniCardBase: {
        flex: 1,
        marginHorizontal: 10,
        width: '100%',
        backgroundColor: 'black',
        paddingLeft: 0,
        paddingTop: 0,
        paddingBottom: 5,
        paddingRight: 4,
        borderRadius: 10,
    },
    answerCardBase: {
        flex: 1,
        width: '100%',
        backgroundColor: 'black',
        paddingLeft: 0,
        paddingTop: 0,
        paddingBottom: 5,
        paddingRight: 4,
        borderRadius: 6,
        marginVertical: 7,
    },

    card: {
        margin: 0,
        borderRadius: 20,
        borderColor: myTheme.colors.cardBorder,
        borderWidth: 10,
        backgroundColor: 'rgb(255,255,255)',
    },
    miniCard: {
        margin: 0,
        height: 80,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 3,
        backgroundColor: 'rgb(192,227,195)',
    },
    answerCard: {
        padding: 10,
        margin: 0,
        borderRadius: 6,
        borderColor: 'black',
        borderWidth: 2,
        backgroundColor: 'rgb(192,227,195)',
    },
    input: {
        marginBottom: 10,
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 3,
    },

    //Buttons
    button: {
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 3,
        paddingHorizontal: 20,
    },
    iconButton: {
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 3,
    },
    answerButton: {
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 3,
        marginHorizontal: 0,
        paddingHorizontal: 60,
        marginVertical: 5,


    },
    coverImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'black',
    },
    cardImage: {
        width: 80,
        height: 80,
        marginRight: 10,
        borderRadius: 20
    },

    callout: {
        backgroundColor: 'gray',
        padding: 2,
        borderRadius: 20,
        width: 100,
    },
    stars: {
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: myTheme.colors.cardBorder,
    },
    bookmark: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 0,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        paddingVertical: 8,
        backgroundColor: 'lightgray',
        width: '40%',
    },

    footer: {
        padding: 20,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        marginVertical: 5,
    },
    questionText: {
        fontSize: 20,
        marginBottom: 20,
    },
    progressBar: {
        height: 20,
        borderRadius: 10,
        width: '100%',
        borderWidth: 1,
        borderColor: 'black',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },

    //Modal
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalSubtitle: {
        fontSize: 16,
        marginTop: 10,
    },
});
