import {StyleSheet} from "react-native";


export const styles = StyleSheet.create({

    content: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgb(255,255,255)',
        justifyContent: 'center',
        paddingHorizontal: 25,
        paddingTop: 30,
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
    welcomeText: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingLeft: 10,
    },
    sectionText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 0,
        paddingLeft: 10,
    },
    cardBase: {
        flex: 1,
        width: '100%',
        backgroundColor: 'black',
        paddingLeft: 0,
        paddingTop: 0,
        paddingBottom: 5,
        paddingRight: 4,
        borderRadius: 20,
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
    card: {
        margin: 0,
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 3,
        backgroundColor: 'rgb(250,230,185)',
    },
    mainCard: {
        margin: 0,
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 3,
        backgroundColor: 'rgb(208,242,246)',
    },
    miniCard: {
        margin: 0,
        height: 80,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 3,
        backgroundColor: 'rgb(192,227,195)',
    },
    input: {
        marginBottom: 10,
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 3,
    },
    button: {
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 3,
        marginHorizontal: 0,
        paddingHorizontal: 60,
    },
    answerButton: {
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 3,
        marginHorizontal: 0,
        paddingHorizontal: 60,
        marginVertical: 5,
    },





    callout: {
        backgroundColor: 'gray',
        padding: 2,
        borderRadius: 10,
        width: 100,
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
        flex: 1,
        marginHorizontal: 10,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});