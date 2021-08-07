import { StyleSheet } from 'react-native';

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

    footerDownload: {
        width: '70%',
        height: '100%',

        justifyContent: 'center',
        alignItems: 'flex-end',
        
        paddingHorizontal: 40
    },

    footerText: {
        fontFamily: 'BebasNeue',
        fontSize: 26,
        color: '#F7F7F7'
    },

    footerCoin: {
        width:  '30%',
        height: '100%',

        justifyContent: 'center',
        alignItems: 'flex-start'
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