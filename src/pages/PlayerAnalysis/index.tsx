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
import player from '../../images/player.png';
import verticalFieldHitmap from '../../images/vertical-field-hitmap.png';
import verticalFieldAccurate from '../../images/vertical-field-accurate.png';
import goal from '../../images/goal.png';
import ball from '../../images/ball.png';
import goldenBall from '../../images/golden-ball.png';

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
    const [positionBalls, setPositionBalls] = useState<Array<PositionBall>>([]);
    const [positionsAssists, setPositionsAssists] = useState<Array<AccurateAssists>>([]);
    const [finalPosition, setFinalPosition] = useState<boolean>(false);

    const navigation = useNavigation();

    function calculateAngle(beginX: number, beginY: number, finalX: number, finalY: number) {

        const dx = finalX - beginX;
        // Minus to correct for coord re-mapping
        const dy = -(finalY - beginY);

        let inRads = Math.atan2(dy, dx);

        // We need to map to coord system when 0 degree is at 3 O'clock, 270 at 12 O'clock
        if (inRads < 0) {
            inRads = Math.abs(inRads);
        } else {
            inRads = 2 * Math.PI - inRads;
        }
        return inRads * (180 / Math.PI);
    }

    function calculateWidth(beginX: number, beginY: number, finalX: number, finalY: number) {
        function toRad(Value: number) {
            return Value * Math.PI / 180;
        }

        const R = 60;
        const dLat = toRad(beginX-finalX);
        const dLon = toRad(beginY-finalY);
        const lat1 = toRad(finalX);
        const lat2 = toRad(beginX);

        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        const d = R * c;
        if (beginX > width * 0.14 && finalX > width * 0.14) {
            let difference = 0;
            if (beginY > finalY) {
                difference = beginY - finalY
            } else {
                difference = finalY - beginY;
            }
            return d + (difference - (width * 0.08));
        }
        return d;
    }

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

    function handleBalls(evt: GestureResponderEvent) {
        const { locationX, locationY: y } = evt.nativeEvent;
        const newPositionBalls = [...positionBalls];

        const width = (Dimensions.get('window').width * 0.45);

        let x = 0;
        x = locationX + 10;
        if (locationX > (width * 0.9) || locationX < (width * 0.1)) {
            x = locationX;
        }

        newPositionBalls.push({
            x,
            y,
            golden: false
        })
        setPositionBalls(newPositionBalls);
    }

    function handlePressBall(index: number) {
        const newPositionBalls = [...positionBalls]
        if (!newPositionBalls[index].golden) {
            newPositionBalls[index].golden = true;
        } else {
            newPositionBalls.splice(index, 1);
        }
        setPositionBalls(newPositionBalls);
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
        if (newPositionHitmaps[index].mode !== 2) {
            newPositionHitmaps[index].mode += 1;
        } else {
            return;
        }
        setPositionHitmaps(newPositionHitmaps);
    }

    function handleAccurateAssists(evt: GestureResponderEvent) {
        const { locationX, locationY } = evt.nativeEvent;
        const x = locationX;
        const y = locationY;
        const newPositionsAssists = [...positionsAssists];
        const index = newPositionsAssists.length - 1;
        if (finalPosition) {
            const positionAssist = newPositionsAssists[newPositionsAssists.length - 1];
            let arrowWidth = calculateWidth(positionAssist.beginning.x, positionAssist.beginning.y, x, y);
            let angle = calculateAngle(positionAssist.beginning.x, positionAssist.beginning.y, x, y);

            const calc = (width * 0.25 * 0.8) - arrowWidth;
            let translateX = -(calc / 2) + positionAssist.beginning.x;
            let translateY = positionAssist.beginning.y;
            translateX -= (arrowWidth / 2);

            newPositionsAssists[index].ready = true;
            newPositionsAssists[index].final = {
                x,
                y
            }
            newPositionsAssists[index].angle = angle;
            newPositionsAssists[index].width = arrowWidth;
            newPositionsAssists[index].translateX = translateX;
            newPositionsAssists[index].translateY = translateY;
        } else {
            newPositionsAssists.push({
                beginning: {
                    x,
                    y: y - (height * 0.01)
                },
                final: {
                    x,
                    y
                },
                ready: false,
                angle: 0,
                translateX: 0,
                translateY: 0,
                width: 0
            })
        }
        setPositionsAssists(newPositionsAssists);
        setFinalPosition(!finalPosition);
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
            navigation.navigate('player-analysis-pdf', {
                positionHitmaps,
                positionBalls,
                playerStats: inputsValue,
                accurateAssists: positionsAssists,
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
                <ImageBackground source={player} style={styles.mainPlayer} imageStyle={{ resizeMode: 'contain', transform:[{translateX:5}]}}>
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
                    <Text style={styles.goalTitle}>ACCURATE SHOTS</Text>
                    <View style={styles.goalView}>
                    {positionBalls.map((position, index) => {
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
                            onPress={() => handlePressBall(index)}
                        >
                            <Image
                                source={position.golden ? goldenBall : ball}
                                style={position.golden ? styles.goalGoldenBallImage : styles.goalBallImage}
                            />
                        </RectButton>
                    })}
                        <TWF onPress={handleBalls}>
                            <View style={styles.goalContainer}>
                                <Image source={goal} style={{ width: '85%', height: '80%', resizeMode: 'contain' }}/>
                            </View>
                        </TWF>
                    </View>
                </View>
                <View style={styles.fieldView}>
                    <TWF style={styles.fieldButton} onPress={handleAccurateAssists}>
                        <ImageBackground style={styles.fieldImageContainer} imageStyle={styles.fieldImage} source={verticalFieldAccurate}>
                            {positionsAssists.map((positionAssist, index) => {
                                if (positionAssist.ready) {
                                    
                                    return <View
                                    key={index}
                                    style={[
                                        styles.fieldArrow,
                                        {
                                            width: positionAssist.width,
                                            transform: [
                                                {
                                                    translateX: positionAssist.translateX
                                                },
                                                {
                                                    translateY: positionAssist.translateY
                                                },
                                                {
                                                    rotateZ: `${positionAssist.angle}deg`
                                                },
                                                {
                                                    translateX: positionAssist.width / 2
                                                }
                                            ]
                                        }
                                    ]}>
                                        <Image style={styles.fieldArrowBall} source={ball}/>
                                    </View>
                                } else {
                                    return <Image
                                        key={index}
                                        style={[
                                            styles.fieldArrowBall,
                                            {
                                                transform: [
                                                    {
                                                        translateX: positionAssist.beginning.x - (width * 0.45 * 0.04)
                                                        
                                                    },
                                                    {
                                                        translateY: positionAssist.beginning.y
                                                    }
                                                ]
                                            }
                                        ]}
                                        source={ball}
                                    />
                                }
                            })}
                        </ImageBackground>
                    </TWF>
                </View>
            </View>
            <View style={styles.cleanButtonContainer}>
                <TWF onPress={() => setPositionHitmaps([])}>
                    <View style={[
                        styles.cleanButton,
                        {
                            translateX: width * 0.035
                        }
                        ]}>
                        <Text style={styles.cleanButtonText}>Clean</Text>
                    </View>
                </TWF>
                <TWF onPress={() => {setPositionsAssists([]); setFinalPosition(false)}}>
                    <View style={[
                        styles.cleanButton,
                        {
                            translateX: -(width * 0.035)
                        }
                        ]}>
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