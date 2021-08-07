import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = (Dimensions.get('window').height * 0.9) * 0.55

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',

        width: '60%',
        height: height * 0.09,
        marginVertical: height * 0.02
    },

    inputDesign: {
        width: 35,

        fontSize: width * 0.045,
        fontFamily: 'BebasNeue',

        textAlign: 'right'
    },

    inputTitle: {
        fontFamily: 'BebasNeue',
        fontSize: width * 0.038,
        fontWeight: '400',
        color: '#821911',

        textAlign: 'center',
        transform: [{
            translateY: 5
        }]
    },

    inputImage: {
        width: (Dimensions.get('window').width * 0.4) * 0.6,
        height: '90%',
        resizeMode: 'contain'
    },

    inputImageRight: {
    },
})

export default styles;