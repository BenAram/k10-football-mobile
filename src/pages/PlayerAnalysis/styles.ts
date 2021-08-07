import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width * 0.45;
const height = Dimensions.get('window').height;

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
        justifyContent: 'space-between'
    },

    mainHeader: {
        width: '100%',
        height: '12%',

        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    mainHeaderIcon: {
        width: width * 0.4,
        height: width * 0.4
    },

    mainHeaderTitleContainer: {
        width: '50%',
        height: '100%',

        flexDirection: 'row',
        alignItems: 'center'
    },

    mainHeaderTitleImage: {
        width: width * 0.3,
        height: width * 0.18,
        resizeMode: 'contain'
    },

    mainHeaderTitle: {
        alignItems: 'flex-start'
    },

    mainHeaderTitleH1: {
        fontFamily: 'BebasNeue',
        fontSize: width * 0.1,
        fontWeight: '700',
        color: '#000',

        marginTop: 5
    },

    mainHeaderSubtitle: {
        fontFamily: 'BebasNeue',
        fontSize: width * 0.08,
        fontWeight: '700',
        color: '#821911'
    },

    mainNumberInputsContainer: {
        width: '100%',
        height: (Dimensions.get('window').height * 0.9) * 0.55,
        marginTop: 10,

        flexDirection: 'row'
    },

    mainPlayer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    inputsContainer: {
        width: '40%',
        height: '100%',

        alignItems: 'center'
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',

        marginVertical: 5
    },

    inputDesign: {
        width: 35,
        height: 25,

        fontSize: 18,
        fontFamily: 'BebasNeue',

        textAlign: 'right'
    },

    inputTitleContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end'
    },

    inputTitle: {
        fontFamily: 'BebasNeue',
        fontSize: 16,
        fontWeight: '400',
        color: '#821911',

        textAlign: 'center'
    },

    mainFieldContainer: {
        width: '100%',
        height: (Dimensions.get('window').height * 0.9) * 0.25,

        flexDirection: 'row',
        alignItems: 'center'
    },

    fieldView: {
        width: '25%',
        height: '100%',

        justifyContent: 'center',
        alignItems: 'center'
    },

    fieldButton: {
        width: '80%',
        height: '80%'
    },

    fieldImageContainer: {
        width: '80%',
        height: '85%',

        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },

    fieldImage: {
        width: '100%',
        height: '100%',

        resizeMode: 'cover'
    },

    fieldHitmapBallContainer: {
        opacity: 0.2,
        position: 'absolute',

        justifyContent: 'center',
        alignItems: 'center'
    },

    fieldHitmapBall: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    fieldArrow: {
        width: 60,
        height: 2.5,
        backgroundColor: '#000',

        position: 'absolute',

        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },

    fieldArrowBall: {
        width: 30,
        height: 30,
        position: 'absolute',

        transform: [{
            translateX: 15
        }]
    },

    goalViewContainer: {
        width: '50%',
        height: '50%',

        justifyContent: 'center',
        alignItems: 'center'
    },

    goalView: {
        width: '50%',
        height: '100%',
        position: 'relative',

        justifyContent: 'center',
        alignItems: 'center'
    },

    goalTitle: {
        fontFamily: 'BebasNeue',
        fontSize: width * 0.083
    },

    goalBall: {
        width: 15,
        height: 15,

        position: 'absolute',
        zIndex: 9999,

        right: width / 1.4,
        top: 0,

        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 7
    },

    goalContainer: {
        width,
        height: '100%',
        backgroundColor: 'blue',

        justifyContent: 'center',
        alignItems: 'center'
    },

    goalBallImage: {
        width: 30,
        height: 30
    },

    goalGoldenBallImage: {
        width: 16,
        height: 16
    },

    cleanButtonContainer: {
        width: '100%',
        marginTop: 10,

        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    cleanButton: {
        width: width * 0.4,
        height: height * 0.04,
        backgroundColor: '#292C2F',
        borderRadius: 10,

        justifyContent: 'center',
        alignItems: 'center',

        transform: [{
            translateY: -(height * 0.025)
        }]
    },

    cleanButtonText: {
        fontFamily: 'BebasNeue',
        fontSize: width * 0.1,
        color: '#FFF'
    },

    submitButton: {
        alignItems: 'center',
        flexDirection: 'row'
    },

    submitText: {
        fontFamily: 'BebasNeue',
        fontSize: 20,
        fontWeight: '700',
        color: '#F7F7F7'
    }
});

export default styles;