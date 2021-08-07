import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F7F7F7'
    },

    main: {
        width: '100%',
        height: '90%'
    },
    
    mainContent: {
        alignItems: 'center'
    },

    logo: {
        width,
        resizeMode: 'contain',
        marginTop: 10
    },

    title: {
        fontFamily: 'BebasNeue',
        fontSize: width * 0.05,
        color: '#000'
    },

    inputContainer: {
        width: '80%',
        height: 55,
        marginVertical: 15,

        flexDirection: 'row',
        alignItems: 'flex-end'
    },

    inputIcon: {
        marginBottom: 5,
        marginRight: 15
    },

    inputView: {
        flex: 1
    },

    inputTitle: {
        fontFamily: 'BebasNeue',
        fontSize: 18,
        color: '#292C2F'
    },

    input: {
        flex: 1,
        height: 24,

        borderBottomWidth: 1,
        borderBottomColor: '#292C2F',

        fontFamily: 'BebasNeue',
        fontSize: 18
    },

    buttonLogin: {
        width: '70%',
        height: 70,
        backgroundColor: '#292C2F',
        borderRadius: 35,
        marginBottom: 15,

        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonLoginText: {
        fontFamily: 'BebasNeue',
        fontSize: 26,
        color: '#d6d2d6'
    },

    text: {
        fontFamily: 'BebasNeue',
        fontSize: 20,
        color: '#000'
    },

    textButton: {
        fontFamily: 'BebasNeue',
        fontSize: 20,
        fontWeight: '700',
        color: '#000'
    },
})

export default styles;