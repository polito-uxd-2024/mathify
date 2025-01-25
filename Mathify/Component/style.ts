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
        paddingHorizontal: 40,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderWidth: 0,
        backgroundColor: myTheme.colors.primary,
    },
    lightCover: {
        padding: 20,
        paddingHorizontal: 40,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderWidth: 0,
        backgroundColor: myTheme.colors.cardBorder,
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
    questionBody: {
        flex: 1,
        //flexDirection: 'column',
        paddingHorizontal: 20,
        marginVertical: 15,
    },
    challengeHeader: {
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: myTheme.colors.cardBorder,
    },

    //Text
    bigWelcomeText: {
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'Itim', // Nome del font
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Itim', // Nome del font
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Itim', // Nome del font
    },
    sectionText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 0,
        flexShrink: 1,
        fontFamily: 'Itim', // Nome del font
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 0,
        fontFamily: 'Itim', // Nome del font
    },
    secondary: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'gray',
        fontFamily: 'Itim', // Nome del font
    },
    primary: {
        fontSize: 14,
        fontWeight: 'bold',
        color: myTheme.colors.primary,
        fontFamily: 'Itim', // Nome del font
    },
    smallText: {
        fontSize: 12,
        fontFamily: 'Itim',
        textAlign: 'center'
    },


    calloutText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: myTheme.colors.primary,
        marginBottom: 0,
        fontFamily: 'Itim', // Nome del font
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
        paddingLeft: 2,
        paddingTop: 2,
        paddingBottom: 5,
        paddingRight: 4,
        borderRadius: 20,

    },
    miniWhiteCardBase: {
        minHeight: 120,
        flex: 1,
        marginHorizontal: 3,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,

    },
    answerCardBase: {
        flex: 1,
        width: '100%',
        backgroundColor: 'black',
        paddingLeft: 2,
        paddingTop: 2,
        paddingBottom: 5,
        paddingRight: 4,
        borderRadius: 18,
        marginHorizontal: 25,
        marginVertical: 5,
    },
    questionCardBase: {
        flex: 1,
        width: '100%',
        backgroundColor: 'black',
        paddingLeft: 2,
        paddingTop: 2,
        paddingBottom: 5,
        paddingRight: 4,
        borderRadius: 20,

    },

    card: {
        margin: 0,
        borderRadius: 20,
        borderColor: myTheme.colors.cardBorder,
        borderWidth: 10,
        backgroundColor: 'rgb(255,255,255)',
    },
    randomCard: {
        margin: 0,
        borderRadius: 20,
        borderColor: myTheme.colors.cardBorder,
        borderWidth: 10,
        backgroundColor: myTheme.colors.cardBorder,
        shadowOpacity: 0,
    },
    questionCard: {
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 150,
        padding: 10,
        borderRadius: 20,
        borderColor: myTheme.colors.cardBorder,
        borderWidth: 10,
        backgroundColor: 'rgb(255,255,255)',
    },
    miniCard: {
        margin: 0,
        borderRadius: 18,
        borderColor: 'black',
        borderWidth: 0,
        backgroundColor: 'white',
        paddingVertical: 'auto'
    },
    insideCard: {
        backgroundColor: myTheme.colors.gray,
        padding: 6,
        margin: 5,
        marginTop: 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    answerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
        marginBottom: 8,
        borderRadius: 10,
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
    answerButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        borderColor: myTheme.colors.cardBorder,
        borderWidth: 0,
        paddingHorizontal: 5,
        paddingVertical: 1,

        flex: 1,
        flexDirection: 'column'
    },

    expandButton: {
        flex: 1,
        marginHorizontal: 5,
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 3,
    },
    iconButton: {
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 3,
    },

    coverImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginVertical: 15,
        borderRadius: 30,
        borderWidth: 2,
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
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: myTheme.colors.cardBorder,
        padding: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignSelf: 'flex-start',
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
        paddingVertical: 3,
        backgroundColor: myTheme.colors.cardBorder,
        width: '60%',
        borderWidth: 0,
        borderTopWidth: 0,
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
        fontFamily: 'Itim', // Nome del font
    },
    questionText: {
        fontSize: 20,
        marginBottom: 20,
        fontFamily: 'Itim', // Nome del font
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
        backgroundColor: 'rgba(255,255,255,0.7)',
    },
    modalBase: {
        height: 400,
        width: 300,
    },
    drawerModalBase: {
        width: '100%',

        position: 'absolute',
        paddingBottom: 30,
        bottom: 0,
        flex: 1,
        borderWidth: 2,
        borderBottomWidth: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    modalContent: {
        height: '100%',
        padding: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Itim', // Nome del font
    },
    modalSubtitle: {
        fontSize: 16,
        marginTop: 4,
        fontFamily: 'Itim', // Nome del font
    },
});
