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

    contentContainer: {
        width: '100%',
        height: '50%',

        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonsContainer: {
        width: '85%',
        height: '38%',
        marginBottom: 20,

        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    
    button: {
        width: '47%',
        height: '100%'
    },

    buttonView: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,

        justifyContent: 'center'
    },

    buttonValueContainer: {
        width: '43%',
        height: 40,
        marginLeft: 20,

        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    buttonValue: {
        fontFamily: 'BebasNeue',
        fontSize: 30,
        color: '#000',
    },

    buttonTitle: {
        fontFamily: 'BebasNeue',
        fontSize: 20,
        color: '#d6d2d6',
        textAlign: 'center'
    },
    
    buttonWallet: {
        width: '70%',
        height: 60,
        marginTop: 20,
        backgroundColor: '#821911',

        borderRadius: 30,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonWalletText: {
        fontFamily: 'BebasNeue',
        fontSize: 30,
        color: '#FFF'
    },

    historyTitleContainer: {
        width: '100%',
        height: '15%',
        paddingHorizontal: 20,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },

    historyTitle: {
        fontFamily: 'BebasNeue',
        fontSize: 30,
        color: '#000'
    },

    historySeeAll: {
        fontFamily: 'BebasNeue',
        fontSize: 18,
        color: '#000'
    },

    historyContainer: {
        width: '100%',
        height: '85%'
    },

    footer: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 20,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    footerText: {
        fontFamily: 'BebasNeue',
        fontSize: 24,
        color: '#FFF'
    }
})

export default styles;