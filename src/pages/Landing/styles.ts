import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F7F7F7'
    },

    imageContainer: {
        flex: 1
    },

    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },

    buttonsContainer: {
        width: '100%',
        height: '8%',

        flexDirection: 'row'
    },

    loginButton: {
        backgroundColor: '#840000',
        width: '50%',
        height: '100%',
        paddingHorizontal: 10,

        justifyContent: 'center',
        alignItems: 'flex-end'
    },

    loginText: {
        fontFamily: 'BebasNeue',
        fontSize: 34,
        color: '#d6d2d6'
    },

    registerButton: {
        backgroundColor: '#d6d2d6',
        width: '50%',
        height: '100%',
        paddingHorizontal: 10,

        justifyContent: 'center',
        alignItems: 'flex-start'
    },

    registerText: {
        fontFamily: 'BebasNeue',
        fontSize: 34,
        color: '#840000'
    }
})

export default styles