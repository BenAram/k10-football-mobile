import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F7F7F7'
    },

    logoContainer: {
        width: '100%',
        height: '30%',

        justifyContent: 'center',
        alignItems: 'center'
    },

    logo: {
        width: 260,
        height: '100%',
        resizeMode: 'contain'
    },

    interfaceInputs: {
        width: '100%',
        height: 200,

        paddingHorizontal: 40,

        justifyContent: 'space-around'
    },

    inputContainer: {
        width: '100%',
        height: 55,

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

    buttonsContainer: {
        paddingHorizontal: 40,
        paddingVertical: 20,

        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    buttonLogin: {
        width: '100%',
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

    textForgotPassword: {
        fontFamily: 'BebasNeue',
        fontSize: 20,
        color: '#840000'
    }
})

export default styles;