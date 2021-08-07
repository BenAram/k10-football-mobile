import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '10%',
        backgroundColor: '#292C2F',

        flexDirection: 'row'
    },

    buttonMenuContainer: {
        width: '30%',
        height: '100%',

        justifyContent: 'flex-end',
        alignItems: 'flex-start',

        padding: 10
    },

    titleContainer: {
        width: '40%',
        height: '100%',

        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    title: {
        fontFamily: 'BebasNeue',
        fontSize: 22,
        fontWeight: '700',
        color: '#F7F7F7',

        marginBottom: 10
    },

    coinContainer: {
        width: 'auto',
        height: 26,
        paddingHorizontal: 10,
        backgroundColor: '#F7F7F7',

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 10
    },

    coinText: {
        fontFamily: 'BebasNeue',
        fontSize: 20,
        color: '#ffcc01',
        
        marginRight: 7
    },

    coinImage:  {
        width: 20,
        height: 20
    }
})

export default styles;