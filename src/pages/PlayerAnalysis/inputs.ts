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
        name: 'Goals Scored',
        image: inputBlue,
        id: 'goals-scored',
        distance: width * 0.2,
        distanceInput: -36,
        count: 1.00,
        negative: false,
        abbreviation: 'GS'
    },
    {
        name: 'Interception',
        image: inputLightGreen,
        id: 'interception',
        distance: 25,
        distanceInput: -38,
        count: 0.35,
        negative: false,
        abbreviation: 'IN'
    },
    {
        name: 'Red Card',
        image: inputGreen,
        id: 'red-card',
        distance: -10,
        distanceInput: -36,
        count: 0.90,
        negative: true,
        abbreviation: 'RC'
    },
    {
        name: 'Yellow Card',
        image: inputDarkGreen,
        id: 'yellow-card',
        distance: -10,
        distanceInput: -34,
        count: 0.40,
        negative: true,
        abbreviation: 'YC'
    },
    {
        name: 'Stand Tackle',
        image: inputBlue,
        id: 'stand-tackle',
        distance: -10,
        distanceInput: -33,
        count: 0.15,
        negative: false,
        abbreviation: 'ST'
    },
    {
        name: 'Free Kicking',
        image: inputGreen,
        id: 'free-kicking',
        distance: 5,
        distanceInput: -36,
        count: 0.02,
        negative: false,
        abbreviation: 'FK'
    },
    {
        name: 'Shooting Goal',
        image: inputDarkGreen,
        id: 'shooting-goal',
        distance: 5,
        distanceInput: -40,
        count: 0.10,
        negative: false,
        abbreviation: 'SG'
    }
]

const rightInputs: Array<Input> = [
    {
        name: 'Heading',
        image: inputDarkBlue,
        id: 'heading',
        distance: -(width * 0.2),
        distanceInput: -(width * 0.24),
        count: 0.15,
        negative: false,
        abbreviation: 'HD'
    },
    {
        name: 'Penalty Scored',
        image: inputRed,
        id: 'penalty-scored',
        distance: -(width * 0.12),
        distanceInput: -(width * 0.24),
        count: 0.25,
        negative: false,
        abbreviation: 'PS'
    },
    {
        name: 'Sliding Tackle',
        image: inputOrange,
        id: 'sliding-tackle',
        distance: -(width * 0.09),
        distanceInput: -(width * 0.24),
        count: 0.15,
        negative: false,
        abbreviation: 'SA'
    },
    {
        name: 'Pass Accurate',
        image: inputRed,
        id: 'pass-accurate',
        distance: -(width * 0.09),
        distanceInput: -(width * 0.24),
        count: 0.05,
        negative: false,
        abbreviation: 'PA'
    },
    {
        name: 'Wrong Pass',
        image: inputGray,
        id: 'wrong-pass',
        distance: -(width * 0.09),
        distanceInput: -(width * 0.24),
        count: 0.02,
        negative: true,
        abbreviation: 'WP'
    },
    {
        name: 'Appearances',
        image: inputOrange,
        id: 'appearances',
        distance: -(width * 0.09),
        distanceInput: -(width * 0.24),
        count: 0.05,
        negative: false,
        abbreviation: 'AP'
    },
    {
        name: 'Fault',
        image: inputDarkBlue,
        id: 'fault',
        distance: -(width * 0.09),
        distanceInput: -(width * 0.24),
        count: 0.05,
        negative: true,
        abbreviation: 'FT'
    },
    {
        name: 'Assists',
        image: inputRed,
        id: 'assists',
        distance: -(width * 0.05),
        distanceInput: -(width * 0.24),
        count: 0.90,
        negative: false,
        abbreviation: 'AS'
    }
]

export {
    leftInputs,
    rightInputs
};