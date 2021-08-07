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
        alignItems: 'center',
        paddingBottom: 20
    },

    footerText: {
        fontFamily: 'BebasNeue',
        fontSize: width * 0.05,
        color: '#FFF'
    }
})

export default styles;