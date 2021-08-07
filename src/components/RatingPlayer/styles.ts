import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 120,
        borderRadius: 20,
        backgroundColor: '#FFF',

        marginVertical: 10,

        flexDirection: 'row'
    },

    playerImage: {
        width: '25%',
        height: '100%',

        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20
    },

    main: {
        width: '50%',
        height: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,

        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },

    nameContainer: {
        width: 'auto',
        height: 50
    },

    name: {
        fontFamily: 'BebasNeue',
        fontSize: 20,
        color: '#000'
    },

    matchType: {
        fontFamily: 'BebasNeue',
        fontSize: 16,
        color: '#000'
    },

    ratingContainer: {
        width: '80%',
        height: 20,
        
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    ratingTitle: {
        fontFamily: 'BebasNeue',
        fontSize: 16,
        color: '#d6d2d6'
    },

    coinContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },

    coinText: {
        fontFamily: 'BebasNeue',
        fontSize: 18,
        color: '#ffcc01'
    },

    coinImage: {
        width: 18,
        height: 18,
        marginLeft: 5
    },

    rightButtonContainer: {
        width: '25%',
        height: '100%',

        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default styles;