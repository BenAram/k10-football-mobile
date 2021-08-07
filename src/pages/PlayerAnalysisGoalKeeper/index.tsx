import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    ScrollView,
    KeyboardAvoidingView,
    Dimensions,
    TouchableWithoutFeedback as TWF,

    GestureResponderEvent
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import { leftInputs, rightInputs } from './inputs';

import AnalysisInput from '../../components/AnalysisInput';
import RedFooter from '../../components/RedFooter';

import logoText from '../../images/logo-text.png';
import bg from '../../images/background-analysis.png';
import player from '../../images/goal-keeper.png';
import verticalFieldHitmap from '../../images/vertical-field-hitmap-90degree.png';
import goal from '../../images/goal.png';
import hand from '../../images/hand.png';
import goldenHand from  '../../images/golden-hand.png';

interface InputsValue {
    [index: string]: number
}

interface PositionHitmap {
    x: number
    y: number
    mode: number
}

interface PositionBall {
    x: number
    y: number
    golden: boolean
}

interface AccurateAssists {
    beginning: {
        x: number
        y: number
    }
    final: {
        x: number
        y: number
    }
    ready: boolean
    width: number
    angle: number
    translateX: number
    translateY: number
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function PlayerAnalysis() {

    const colorsHitmap = ['#FFE500', '#E27B1D', '#E6322E'];
    const sizesHitmap = [{
        begin: 22,
        final: 15
    }, {
        begin: 32,
        final: 25
    }, {
        begin: 40,
        final: 35
    }]

    const dispatch = useDispatch();

    const [ready, setReady] = useState<boolean>(false);
    const [inputsValue, setInputsValue] = useState<InputsValue>({});
    const [positionHitmaps, setPositionHitmaps] = useState<Array<PositionHitmap>>([]);
    const [positionHands, setPositionHands] = useState<Array<PositionBall>>([]);

    const navigation = useNavigation();

    function handleChangeValue(id: string, value: string) {
        const newInputsValue = {...inputsValue};
        if (value === '') {
            newInputsValue[id] = 0
            setInputsValue(newInputsValue);
            return
        }
        if (isNaN(value as any)) {
            return;
        }
        newInputsValue[id] = parseFloat(value);
        setInputsValue(newInputsValue);
    }

    function handleAddValue(id: string) {
        const newInputsValue = {...inputsValue};
        newInputsValue[id] = newInputsValue[id] + 1;
        setInputsValue(newInputsValue);
    }

    function handleHands(evt: GestureResponderEvent) {
        const { locationX, locationY: y } = evt.nativeEvent;
        const newPositionHands = [...positionHands];

        const width = (Dimensions.get('window').width * 0.45);

        let x = 0;
        x = locationX + 10;
        if (locationX > (width * 0.9) || locationX < (width * 0.1)) {
            x = locationX;
        }

        newPositionHands.push({
            x,
            y,
            golden: false
        })
        setPositionHands(newPositionHands);
    }

    function handlePressHand(index: number) {
        const newPositionHands = [...positionHands]
        if (!newPositionHands[index].golden) {
            newPositionHands[index].golden = true;
        } else {
            newPositionHands.splice(index, 1);
        }
        setPositionHands(newPositionHands);
    }

    function handleHitmap(evt: GestureResponderEvent) {
        const { locationX: x, locationY: y } = evt.nativeEvent;
        const newPositionHitmaps = [...positionHitmaps];
        newPositionHitmaps.push({
            x,
            y,
            mode: 0
        })
        setPositionHitmaps(newPositionHitmaps);
    }

    function handleHitmapBall(index: number) {
        const newPositionHitmaps = [...positionHitmaps];
        if (newPositionHitmaps[index].mode < 2) {
            newPositionHitmaps[index].mode += 1;
        } else {
            return;
        }
        setPositionHitmaps(newPositionHitmaps);
    }

    async function handleSubmit() {
        try {
            const playerJSON = await AsyncStorage.getItem('player');
            const matchJSON = await AsyncStorage.getItem('match');
            if (!playerJSON || !matchJSON) {
                return alert('Please, register a player and match');
            }
            const player: Player = JSON.parse(playerJSON)
            const match: Match = JSON.parse(matchJSON);
            navigation.navigate('player-analysis-goalkeeper-pdf', {
                positionHitmaps,
                positionHands,
                playerStats: inputsValue,
                player,
                match
            })
        } catch(err) {
            console.log(err);
            alert('Error to catch player and match');
        }
    }

    useEffect(() => {
        leftInputs.map(leftInput => {
            inputsValue[leftInput.id] = 0;
        })
        rightInputs.map(rightInput => {
            inputsValue[rightInput.id] = 0;
        })
        setReady(true);
        dispatch({
            type: 'change-drawer-title',
            value: 'Player Analysis'
        })
        navigation.addListener('focus', () => {
            dispatch({
                type: 'change-drawer-title',
                value: 'Player Analysis'
            })
        })
    }, [])

    return <KeyboardAvoidingView style={styles.container}>
        <ScrollView style={styles.main} contentContainerStyle={styles.mainContent}>
            <View style={styles.mainHeader}>
                <Image style={styles.mainHeaderIcon} source={logoText}/>
                <View style={styles.mainHeaderTitleContainer}>
                    <Image
                        style={styles.mainHeaderTitleImage}
                        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/275px-Flag_of_Brazil.svg.png' }}
                    />
                    <View style={styles.mainHeaderTitle}>
                        <Text style={styles.mainHeaderTitleH1}>NAME (AGE)</Text>
                        <Text style={styles.mainHeaderSubtitle}>POSITION</Text>
                    </View>
                </View>
                <Image style={styles.mainHeaderIcon} source={logoText}/>
            </View>
            <ImageBackground style={styles.mainNumberInputsContainer} imageStyle={{ resizeMode: 'contain' }} source={bg}>
                <ImageBackground source={player} style={styles.mainPlayer} imageStyle={{ resizeMode: 'contain', width: '80%',  transform: [{translateX:width*0.1}] }}>
                    <View style={styles.inputsContainer}>
                        {ready ? leftInputs.map(leftInput => {
                            return <AnalysisInput
                                key={leftInput.id}
                                id={leftInput.id}
                                input={leftInput}
                                value={inputsValue[leftInput.id].toString()}
                                setValue={handleAddValue}
                                onChangeText={handleChangeValue}
                            />
                        }) : null}
                    </View>
                    <View style={[styles.inputsContainer, { alignItems: 'flex-end' }]}>
                        {ready ? rightInputs.map(rightInput => {
                            return <AnalysisInput
                                key={rightInput.id}
                                id={rightInput.id}
                                input={rightInput}
                                value={inputsValue[rightInput.id].toString()}
                                setValue={handleAddValue}
                                onChangeText={handleChangeValue}
                                right
                            />
                        }) : null}
                    </View>
                </ImageBackground>
            </ImageBackground>
            <View style={styles.mainFieldContainer}>
                <View style={styles.fieldView}>
                    <TWF onPress={handleHitmap}>
                        <ImageBackground style={styles.fieldImageContainer} imageStyle={styles.fieldImage} source={verticalFieldHitmap}>
                            {positionHitmaps.map((positionHitmap, index) => {
                                const size =  sizesHitmap[positionHitmap.mode];
                                return <TWF key={index} onPress={() => handleHitmapBall(index)}>
                                <View
                                style={[
                                    styles.fieldHitmapBallContainer,
                                    {
                                        width: size.begin,
                                        height: size.begin,
                                        borderRadius: size.begin / 2,
                                        backgroundColor: colorsHitmap[positionHitmap.mode],
                                        transform: [{
                                            translateX: positionHitmap.x - (size.begin / 2)
                                        }, {
                                            translateY: positionHitmap.y - (size.begin / 2)
                                        }]
                                    }
                                ]}>
                                    <View style={[
                                        styles.fieldHitmapBall,
                                        {
                                            width: size.final,
                                            height: size.final,
                                            borderRadius: size.final / 2,
                                            backgroundColor: colorsHitmap[positionHitmap.mode]
                                        }
                                        ]}>
                                            {positionHitmap.mode > 0 ? <View
                                                style={[
                                                    styles.fieldHitmapBall,
                                                    {
                                                        opacity: 0.9,
                                                        width: sizesHitmap[positionHitmap.mode - 1].begin,
                                                        height: sizesHitmap[positionHitmap.mode - 1].begin,
                                                        borderRadius: sizesHitmap[positionHitmap.mode - 1].begin / 2,
                                                        backgroundColor: colorsHitmap[positionHitmap.mode - 1]
                                                    }
                                                ]}
                                            >
                                                <View style={[
                                                    styles.fieldHitmapBall,
                                                    {
                                                        width: sizesHitmap[positionHitmap.mode - 1].final,
                                                        height: sizesHitmap[positionHitmap.mode - 1].final,
                                                        borderRadius: sizesHitmap[positionHitmap.mode - 1].final / 2,
                                                        backgroundColor: colorsHitmap[positionHitmap.mode - 1]
                                                    }
                                                ]}>
                                                    {positionHitmap.mode > 1 ? <View
                                                        style={[
                                                            styles.fieldHitmapBall,
                                                            {
                                                                width: sizesHitmap[positionHitmap.mode - 2].begin,
                                                                height: sizesHitmap[positionHitmap.mode - 2].begin,
                                                                borderRadius: sizesHitmap[positionHitmap.mode - 2].begin / 2,
                                                                backgroundColor: colorsHitmap[positionHitmap.mode - 2]
                                                            }
                                                        ]}
                                                    >
                                                        <View
                                                            style={[
                                                                styles.fieldHitmapBall,
                                                                {
                                                                    width: sizesHitmap[positionHitmap.mode - 2].final,
                                                                    height: sizesHitmap[positionHitmap.mode - 2].final,
                                                                    borderRadius: sizesHitmap[positionHitmap.mode - 2].final / 2,
                                                                    backgroundColor: colorsHitmap[positionHitmap.mode - 2]
                                                                }
                                                            ]}
                                                        />
                                                    </View> : null}
                                                </View>
                                            </View> : null}
                                        </View>
                                </View>
                                </TWF>
                            })}
                        </ImageBackground>
                    </TWF>
                </View>
                <View style={styles.goalViewContainer}>
                    <Text style={styles.goalTitle}>ACCURATE SAVES</Text>
                    <View style={styles.goalView}>
                    {positionHands.map((position, index) => {
                        return <RectButton
                            style={[
                                styles.goalBall,
                                {
                                    transform: [
                                        {
                                            translateX: position.x
                                        },
                                        {
                                            translateY: position.y
                                        }
                                    ]
                                }
                            ]}
                            key={index}
                            onPress={() => handlePressHand(index)}
                        >
                            <Image
                                source={position.golden ? goldenHand : hand}
                                style={position.golden ? styles.goalGoldenBallImage : styles.goalBallImage}
                            />
                        </RectButton>
                    })}
                        <TWF onPress={handleHands}>
                            <View style={styles.goalContainer}>
                                <Image source={goal} style={{ width: '85%', height: '80%', resizeMode: 'contain' }}/>
                            </View>
                        </TWF>
                    </View>
                </View>
            </View>
            <View style={styles.cleanButtonContainer}>
                <TWF onPress={() => setPositionHitmaps([])}>
                    <View style={styles.cleanButton}>
                        <Text style={styles.cleanButtonText}>Clean</Text>
                    </View>
                </TWF>
            </View>
        </ScrollView>
        <RedFooter>
            <RectButton style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitText}>Submit</Text>
                <Feather
                    name="arrow-right"
                    size={20}
                    color="#F7F7F7"
                />
            </RectButton>
        </RedFooter>
    </KeyboardAvoidingView>
}

export default PlayerAnalysis;