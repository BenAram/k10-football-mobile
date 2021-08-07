import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';

import Header from '../components/GrayHeader';

import About from '../pages/About';
import AddMatch from '../pages/AddMatch';
import HomeEvaluator from '../pages/HomeEvaluator';
import HomePlayer from '../pages/HomePlayer';
import History from '../pages/History';
import MyAccountEvaluator from '../pages/MyAccountEvaluator';
import MyAccountPlayer from '../pages/MyAccountPlayer';
import PlayerAnalysis from '../pages/PlayerAnalysis';
import PlayerAnalysisGoalKeeper from '../pages/PlayerAnalysisGoalKeeper';
import PlayerAnalysisPdf from '../pages/PlayerAnalysisPdf';
import PlayerAnalysisGoalkeeperPdf from '../pages/PlayerAnalysisGoalkeeperPdf';
import Wallet from '../pages/Wallet';

function Drawer() {
    const { Navigator, Screen } = createDrawerNavigator();

    const analysisPdf = useSelector((store: any) => store.drawerAnalysisPdf);

    function CustomDrawerContent(props: any) {
        const { state, ...rest } = props;
        const newState = { ...state};
        
        if (!analysisPdf) {
            newState.routes = newState.routes.filter((item: any) => item.name !== 'player-analysis-pdf' && item.name !== 'player-analysis-goalkeeper-pdf');
        }

        return (
            <DrawerContentScrollView {...props}>
                <DrawerItemList state={newState} {...rest} />
            </DrawerContentScrollView>
        )
    }

    return <View style={styles.container}>
        <Header/>
        <Navigator
            initialRouteName="home-evaluator"
            drawerStyle={{
                width: '60%',
                height: '100%',
                backgroundColor: '#292C2F',

                padding: 0
            }}
            drawerContent={CustomDrawerContent}
            drawerContentOptions={{
                activeTintColor: '#fff',
                activeBackgroundColor: '#821911',
                inactiveTintColor: '#d6d2d6',
                inactiveBackgroundColor: 'transparent',
                itemStyle: {
                    width: '100%',
                    transform: [{
                        translateX: -10
                    }],
                    paddingHorizontal: 20,
                    borderRadius: 0
                },
                labelStyle: {
                    fontFamily: 'BebasNeue',
                    fontSize: 24
                }
            }}
        >
            <Screen
                name="home-evaluator"
                component={HomeEvaluator}
                options={{
                    drawerLabel: 'Home Evaluator'
                }}
            />
            <Screen
                name="home-player"
                component={HomePlayer}
                options={{
                    drawerLabel: 'Home Player'
                }}
            />
            <Screen
                name="add-match"
                component={AddMatch}
                options={{
                    drawerLabel: 'Add Match'
                }}
            />
            <Screen
                name="history"
                component={History}
                options={{
                    drawerLabel: 'History'
                }}
            />
            <Screen
                name="my-account-evaluator"
                component={MyAccountEvaluator}
                options={{
                    drawerLabel: 'My Account (Evaluator)'
                }}
            />
            <Screen
                name="my-account-player"
                component={MyAccountPlayer}
                options={{
                    drawerLabel: 'My Account (Player)'
                }}
            />
            <Screen
                name="wallet"
                component={Wallet}
                options={{
                    drawerLabel: 'Wallet'
                }}
            />
            <Screen
                name="about"
                component={About}
                options={{
                    drawerLabel: 'About'
                }}
            />
            <Screen
                name="player-analysis"
                component={PlayerAnalysis}
                options={{
                    drawerLabel: 'Player Analysis'
                }}
            />
            <Screen
                name="player-analysis-goal-keeper"
                component={PlayerAnalysisGoalKeeper}
                options={{
                    drawerLabel: 'Player Analysis Goleiro'
                }}
            />
            <Screen
                name="player-analysis-pdf"
                component={PlayerAnalysisPdf}
                options={{
                    drawerLabel: 'Player Analysis (PDF)'
                }}
            />
            <Screen
                name="player-analysis-goalkeeper-pdf"
                component={PlayerAnalysisGoalkeeperPdf}
                options={{
                    drawerLabel: 'Player Analysis Goalkeeper (PDF)'
                }}
            />
        </Navigator>
    </View>
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    }
})

export default Drawer;