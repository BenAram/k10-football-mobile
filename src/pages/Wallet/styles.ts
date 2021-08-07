import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F7F7F7'
    },

    containerContent: {
        paddingVertical: 20,

        alignItems: 'center'
    },

    coinsContainer: {
        width: 'auto',
        height: 120,
        backgroundColor: '#FFF',
        borderRadius: 20,

        flexDirection: 'row',
        alignItems: 'center'
    },

    coinsText: {
        fontFamily: 'BebasNeue',
        fontSize: 90,
        color: '#ffcc01',

        marginHorizontal: 15
    },

    coinsImage: {
        width: 90,
        height: 90,

        marginHorizontal: 15
    },

    warnText: {
        fontFamily: 'BebasNeue',
        fontSize: 20,
        color: '#000',
        marginTop: 10
    },

    purchaseContainer: {
        width: '90%',
        height: 120,
        marginTop: 30,
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 5,

        flexDirection: 'row',
        alignItems: 'center'
    },

    purchaseIcon: {
        width: 100,
        height: 100
    },

    purchaseContent: {
        flexGrow: 1,
        height: '100%',

        paddingVertical: 5,
        paddingHorizontal: 10,

        justifyContent: 'space-between'
    },

    purchaseContentTitle: {
        fontFamily: 'BebasNeue',
        fontSize: 18,
        color: '#000'
    },

    purchaseContentValue: {
        width: '100%',
        height: 34,

        flexDirection: 'row',
        alignItems: 'center'
    },

    purchaseContentValueCoinContainer: {
        width: 45,
        height: 24,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'lightgray',

        marginRight: 10,

        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    purchaseContentValueCoinText: {
        fontFamily: 'BebasNeue',
        fontSize: 16,
        color: '#ffcc01'
    },

    purchaseContentValueCoinImage: {
        width: 16,
        height: 16
    },

    purchaseContentValueText: {
        fontFamily: 'BebasNeue',
        fontSize: 20,
        color: '#000'
    },

    purchaseFooter: {
        width: '20%',
        height: '100%',

        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default styles;