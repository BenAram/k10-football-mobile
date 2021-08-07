import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    dataContainer: {
        backgroundColor: '#FFF',
        width: '80%',
        marginTop: 40,
        padding: 20,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },

    dataTitleContainer: {
        width: '100%',
        height: 'auto',

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    dataTitle: {
        fontFamily: 'BebasNeue',
        fontSize: 16,
        color: '#d6d2d6'
    },

    dataInput: {
        width: '100%',
        
        fontFamily: 'BebasNeue',
        fontSize: 16,
        color: '#000'
    },

    dataTextForInput: {
        fontFamily: 'BebasNeue',
        fontSize: 16,
        color: '#000'
    },

    dataCheckboxItem: {
        width: width * 0.7,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    dataCheckboxText: {
        fontFamily: 'BebasNeue',
        fontSize: 20,
        color: '#d6d2d6'
    },

    dataCheckboxCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderColor: '#d6d2d6',
        borderWidth: 1
    }
})

export default styles