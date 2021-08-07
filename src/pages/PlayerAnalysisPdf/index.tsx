import React, { useEffect, useState } from 'react';
import { View, Text, Image, Platform, Alert, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { printToFileAsync } from 'expo-print';
import { requestPermissionsAsync, createAssetAsync } from 'expo-media-library';
import { shareAsync } from 'expo-sharing';
import { presentNotificationAsync, scheduleNotificationAsync } from 'expo-notifications';

// import { open as openFile } from 'react-native-file-viewer';
// import { openURL } from 'expo-linking';

import createHtml from './html';

import { leftInputs, rightInputs } from '../PlayerAnalysis/inputs';
import styles from './styles';

import RedFooter from '../../components/RedFooter';

import coin from '../../images/coin.png';

interface Random {
    params: {
        playerStats: any,
        positionBalls: any
        accurateAssists: Array<AccurateAssists>
        positionHitmaps: Array<PositionHitmap>
        player: Player
        match: Match
    }
}

interface PositionHitmap {
    x: number
    y: number
    mode: number
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

const height = Dimensions.get('window').height;

function PlayerAnalysisPdf() {

    const dispatch = useDispatch();
    const coins = useSelector((store: any) => store.coins);

    const navigation = useNavigation();

    const inputs = leftInputs.concat(rightInputs);

    const [html, setHtml] = useState<string>('');
    const [htmlPdf, setHtmlPdf] = useState<string>('');
    const [ready, setReady] = useState<boolean>(false);
    const [pdfFolder, setPdfFolder] = useState<string>('');

    const { params } = useRoute() as Random;

    function handleBuyCoins() {
        navigation.navigate('wallet');
    }

    async function handleDownload() {
        try  {
            if (coins < 10) {
                Alert.alert('Você não possui moedas o suficiente', 'Compre mais', [
                    {
                        text: 'Comprar',
                        onPress: handleBuyCoins
                    },
                    {
                        text: 'Ok'
                    }
                ])
                return;
            }
            const width = Dimensions.get('window').width;
            const height = Dimensions.get('window').height;
            let html = htmlPdf;
            html = html.replace('{margin-bottom-arrow}', `${height * 0.435}`);

            const { uri } = await printToFileAsync({ 
                html, 
                width, 
                height 
            });
            if (Platform.OS === 'ios') {
                await shareAsync(uri);
            } else {
                const permission = await requestPermissionsAsync();
                if (permission.granted) {
                    const assetFile = await createAssetAsync(uri);
                    setPdfFolder(assetFile.uri);
                    const localSaved = assetFile.uri.replace('file:///storage/emulated/0/', '');
                    Alert.alert('PDF Salvo Com Sucesso', localSaved, [
                        {
                            text: 'Abrir',
                            onPress: handleOpenPDF
                        },
                        {
                            text: 'Ok'
                        }
                    ]);
                    // scheduleNotificationAsync({
                    //     content: {
                    //         title: 'PDF Salvo',
                    //         body: localSaved,
                    //         sound: false,
                    //         vibrate: [200]
                    //     },
                    //     trigger: {
                    //         hour: date.getHours(),
                    //         minute: date.getMinutes(),
                    //         repeats: true
                    //     }
                    // })
                    presentNotificationAsync({
                        title: 'PDF Salvo',
                        body: localSaved,
                        sound: false,
                        vibrate: [200]
                    })
                    dispatch({
                        type: 'remove-coins',
                        value: 10
                    })
                } else {
                    alert('Voce precisa permitir o acesso a arquivos');
                }
            }
        } catch(err) {
            alert(err);
        }
    }

    function handleOpenPDF() {
        // openURL(pdfFolder.replace('/', ''));
        // openFile(pdfFolder, { showOpenWithDialog: true })
        //     .catch(err => {
        //         Alert.alert('Erro ao abrir pdf', err);
        //     })
    }

    useEffect(()  => {
        async function getUri() {
            try {
                const height = Dimensions.get('screen').height;
                let pixelsDistance = 0;

                for (let i = 930; height < i; i -= 50) {
                    pixelsDistance += 37.5;
                }
                let newHtml = createHtml(inputs, params.playerStats, params.positionBalls, params.positionHitmaps, params.accurateAssists, params.player, params.match);
                setHtml(newHtml.replace('{margin-bottom-arrow}', `${height * 0.075}`));
                setHtmlPdf(newHtml);
                setReady(true);
            } catch(err) {
                alert(err);
            }
        }
        getUri();
        dispatch({
            type: 'change-drawer-title',
            value: 'Player Analysis'
        })
        dispatch({ type: 'active-drawer-analysis-pdf' });
        navigation.addListener('focus', () => {
            dispatch({
                type: 'change-drawer-title',
                value: 'Player Analysis'
            })
        })
    }, [params])

    return <View style={styles.container}>
        {ready ? <WebView
            style={styles.main}
            source={{ html: html }}
        />
        : <View style={styles.main}/>}
        <RedFooter>
            <View style={styles.footerDownload}>
                <RectButton onPress={handleDownload}>
                    <Text style={styles.footerText}>Download</Text>
                </RectButton>
            </View>
            <View style={styles.footerCoin}>
                <View style={styles.coinContainer}>
                    <Text style={styles.coinText}>10</Text>
                    <Image source={coin} style={styles.coinImage}/>
                </View>
            </View>
        </RedFooter>
    </View>
}

export default PlayerAnalysisPdf;