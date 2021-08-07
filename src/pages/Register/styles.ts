import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F7F7F7'
    },

    main: {
        width: '100%',
        height: '65%',

        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    footer: {
        width: '100%',
        height: '25%',

        justifyContent: 'center',
        alignItems: 'center'
    },

    inputContainer: {
        width: '80%',
        height: 65,
        borderBottomColor: 'black',
        borderBottomWidth: 1,

        marginVertical: 7.5
    },

    inputTitle: {
        fontFamily: 'BebasNeue',
        fontSize: 20,
        color: '#d6d2d6'
    },

    input: {
        flex: 1
    },

    agreementsContainer: {
        width: '80%',
        height: 'auto',
        marginTop: 50,

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },

    agreements: {
        fontFamily: 'BebasNeue',
        fontSize: 18,
        color: 'black',
        marginLeft: 10,

        width: '90%'
    },

    buttonRegister: {
        width: '80%',
        height: 80,
        borderRadius: 40,
        marginTop: 20,
        backgroundColor: '#840000',

        justifyContent: 'center',
        alignItems: 'center'
    },
    
    buttonRegisterText: {
        fontFamily: 'BebasNeue',
        fontSize: 24,
        color: '#FFF'
    },

    footerText: {
        fontFamily: 'BebasNeue',
        fontSize: 20,
        color: '#000',

        marginTop: 20
    },

    footerTextButton: {
        fontFamily: 'BebasNeue',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000'
    }
})

export default styles;