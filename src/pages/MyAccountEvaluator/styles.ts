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

    mainContent: {
        alignItems: 'center',
        paddingVertical: 70
    },

    profileContainer: {
        backgroundColor: '#FFF',
        width: '80%',
        height: 200,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,

        alignItems: 'center'
    },

    profileImageContainer: {
        backgroundColor: '#FFF',
        width: 120,
        height: 120,
        borderRadius: 60,


        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,

        justifyContent: 'center',
        alignItems: 'center',

        transform: [{
            translateY: -30
        }]
    },

    profileImage: {
        backgroundColor: 'gray',
        width: 100,
        height: 100,
        borderRadius: 50
    },

    profileName: {
        fontFamily: 'BebasNeue',
        fontSize: 20,
        color: 'gray'
    },

    profilePosition: {
        fontFamily: 'BebasNeue',
        fontSize: 16,
        color: '#d6d2d6'
    },

    dataContainer: {
        backgroundColor: '#FFF',
        width: '80%',
        height: 90,
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

    footerText: {
        fontFamily: 'BebasNeue',
        fontSize: 24,
        color: '#FFF'
    }
})

export default styles;