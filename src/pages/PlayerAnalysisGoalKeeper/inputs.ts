import { Dimensions } from 'react-native';

import inputBlue from '../../images/inputs/blue.png';
import inputLightGreen from  '../../images/inputs/light-green.png';
import inputGreen from '../../images/inputs/green.png';
import inputDarkGreen from '../../images/inputs/dark-green.png';
import inputDarkBlue from '../../images/inputs/dark-blue.png';
import inputRed from '../../images/inputs/red.png';
import inputOrange from '../../images/inputs/orange.png';
import inputGray from '../../images/inputs/gray.png';

interface Input {
    name: string
    image: any
    id: string
    distance: number
    distanceInput: number
    count: number
    negative: boolean
    abbreviation: string
}

const width = Dimensions.get('window').width;

const leftInputs: Array<Input> = [
    {
        name: 'Punching',
        image: inputBlue,
        id: 'punching',
        distance: width * 0.2,
        distanceInput: -36,
        count: 1.00,
        negative: false,
        abbreviation: 'PU'
    },
    {
        name: 'Throwing',
        image: inputLightGreen,
        id: 'throwing',
        distance: 0,
        distanceInput: -38,
        count: 0.35,
        negative: false,
        abbreviation: 'TR'
    },
    {
        name: 'Red Card',
        image: inputGreen,
        id: 'red-card',
        distance: -(width * 0.09),
        distanceInput: -36,
        count: 0.90,
        negative: true,
        abbreviation: 'RC'
    },
    {
        name: 'Yellow Card',
        image: inputDarkGreen,
        id: 'yellow-card',
        distance: -(width * 0.16),
        distanceInput: -34,
        count: 0.40,
        negative: true,
        abbreviation: 'RF'
    },
    {
        name: 'Kicking',
        image: inputBlue,
        id: 'kicking',
        distance: -(width * 0.1),
        distanceInput: -33,
        count: 0.15,
        negative: false,
        abbreviation: 'KC'
    },
    {
        name: 'Free Kicking',
        image: inputGreen,
        id: 'free-kicking',
        distance: -(width * 0.05),
        distanceInput: -36,
        count: 0.02,
        negative: false,
        abbreviation: 'FK'
    },
    {
        name: 'Wrong Pass',
        image: inputDarkGreen,
        id: 'wrong-pass',
        distance: 5,
        distanceInput: -40,
        count: 0.10,
        negative: true,
        abbreviation: 'WP'
    }
]

const rightInputs: Array<Input> = [
    {
        name: 'Handling',
        image: inputDarkBlue,
        id: 'handling',
        distance: -(width * 0.2),
        distanceInput: -(width * 0.24),
        count: 0.15,
        negative: false,
        abbreviation: 'HD'
    },
    {
        name: 'Reflexes',
        image: inputRed,
        id: 'reflexes',
        distance: -(width * 0.08),
        distanceInput: -(width * 0.24),
        count: 0.25,
        negative: false,
        abbreviation: 'RS'
    },
    {
        name: 'Aerial Ability',
        image: inputOrange,
        id: 'aerial-ability',
        distance: -(width * 0.02),
        distanceInput: -(width * 0.24),
        count: 0.15,
        negative: false,
        abbreviation: 'AA'
    },
    {
        name: 'Pass Accurate',
        image: inputRed,
        id: 'pass-accurate',
        distance: -(width * 0.0),
        distanceInput: -(width * 0.24),
        count: 0.05,
        negative: false,
        abbreviation: 'PA'
    },
    {
        name: 'Goal Scored',
        image: inputGray,
        id: 'goal-scored',
        distance: -(width * 0.02),
        distanceInput: -(width * 0.24),
        count: 0.02,
        negative: false,
        abbreviation: 'GS'
    },
    {
        name: 'Penalty Saves',
        image: inputOrange,
        id: 'penalty-saves',
        distance: -(width * 0.06),
        distanceInput: -(width * 0.24),
        count: 0.05,
        negative: false,
        abbreviation: 'PS'
    },
    {
        name: 'Goals Unsave',
        image: inputDarkBlue,
        id: 'goals-unsave',
        distance: -(width * 0.06),
        distanceInput: -(width * 0.24),
        count: 0.05,
        negative: true,
        abbreviation: 'GU'
    },
    {
        name: 'Saves',
        image: inputRed,
        id: 'saves',
        distance: -(width * 0.07),
        distanceInput: -(width * 0.24),
        count: 0.90,
        negative: false,
        abbreviation: 'SV'
    }
]

export {
    leftInputs,
    rightInputs
};