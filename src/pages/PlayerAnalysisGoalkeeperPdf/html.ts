import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import splitArray from './splitArray';

interface Input {
    name: string
    image: any
    id: string
    distance: number
    distanceInput: number
    count: number
    abbreviation: string
}

interface InputsValue {
    [index: string]: number
}

interface InputData {
    name: string
    image: any
    id: string
    distance: number
    distanceInput: number
    count: number
    abbreviation: string
    value: number
}

interface PositionHitmap {
    x: number
    y: number
    mode: number
}

interface PositionHand {
    x: number
    y: number
    golden: boolean
}

function treatWeather(weather: string) {
    switch (weather) {
        case 'rainy':
            return 'Rainy 19°C';
        case 'cloudy':
            return 'Cloudy 25°C';
        case 'sunny':
            return 'Sunny 28°C';
        default:
            return '';
    }
}

function treatDateValue(value: number): string {
    if (value > 9) {
        return `${value}`;
    } else {
        return `0${value}`;
    }
}

function treatDate(date: Date, match?: boolean) {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    if (match) {
        return `${treatDateValue(day)}/${treatDateValue(month + 1)}/${year}`;
    }

    return `${treatDateValue(day)}-${treatDateValue(month + 1)}-${year}`;
}

function createHtml(inputs: Array<Input>, values: InputsValue, positionHands: Array<PositionHand>, positionHitmaps: Array<PositionHitmap>, player: Player, match: Match): string {
    const tables = splitArray(5, inputs);
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Player Analysis</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        * {
            margin: 0;
            padding: 0;
            font-family: Bebas Neue;
        }
        body {
            width: 89vw;
            height: 95vh;

            overflow: auto;

            background-image: url(https://cdn.discordapp.com/attachments/856988081364926515/857796775837696020/background-analysis.png);
            background-size: ${width * 1.6}px ${height * 0.8}px;
            background-position: center;
            background-repeat: no-repeat;
        }
        ul {
            list-style: none;
        }
        header {
            width: 110%;
            height: 12%;
            margin-top: ${width * 0.05}px;
            margin-bottom: 10px;

            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
        .header-logo {
            width: 40px;
            height: 40px;
        }
        header > img {
            width: ${width * 0.22}px;
            height: ${width * 0.22}px;
        }
        header > div {
            text-align: center;
        }
        header > div > h2 {
            font-size: ${width * 0.048}px;
            color: #821911;
        }
        header > div > p {
            font-size: ${width * 0.042}px;
        }
        main {
            width: 100%;
            height: 72%;
            padding: 5px 15px;
        }
        .player-information-container {
            margin-top: ${height * 0.015}px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
        .player-information-container > img {
            width: ${width * 0.18}px;
            border-radius: 10px;
        }
        .player-characteristic > div {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        .player-characteristic > div > div {
            font-size: ${width * 0.034}px;

            display: flex;
            flex-direction: row;
            align-items: center;

            margin-right: ${width * 0.05}px;
        }
        .player-characteristic > div > div > img {
            width: ${width * 0.065}px;
            height: ${width * 0.065}px;
        }
        section {
            margin: 5px;
            margin-top: 15px;
        }
        section > p {
            font-size: ${width * 0.034}px;
        }
        .section-title {
            font-size: ${width * 0.042}px;
            color: #821911;

            text-align: center;
        }
        .list-container {
            width: 100%;
            height: auto;

            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
        #match-info {
            list-style: none;
        }
        #match-info > li {
            font-size: ${width * 0.034}px;
            margin: 4px;
        }
        li.match-static {
            width: ${width * 0.208}px;
            font-size: ${width * 0.035}px;

            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
        #match-info > li > ul {
            text-align: right;
        }
        #footer {
            width: 112%;
            height: 16%;
            margin-top: ${height * 0.9 * 0.25 * 1.4}px;

            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
        #footer > h2 {
            font-size: ${width * 0.05}px;
        }
        #footer > img {
            width: ${width * 0.25}px;
            height: ${width * 0.25}px;
        }
        #chart {
            width: 150px;
            height: 150px;
            margin-top: 20px;

            display: flex;
            justify-content: center;
            align-items: center;
        }
        #chart > img {
            width: ${width * 0.4}px;
            height: ${width * 0.27}px;

            background-image: url(https://cdn.discordapp.com/attachments/856988081364926515/861090564027449344/Radar_Prancheta_1.png);
            background-size: ${width * 0.26}px ${width * 0.29}px;
            background-position: 50% 24.5%;
            background-repeat: no-repeat;
        }
        #section-footer {
            width: 106%;
            height: ${height * 0.9 * 0.25}px;

            margin-bottom: 200px;

            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
        .field-container {
            width: 25%;
            height: 100%;

            display: flex;
            flex-direction: column;
            justify-content: center;

            text-align: center;
        }
        .field-container {
            width: ${width * 0.5}px;
            height: 100%;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            text-align: center;
        }
        .field-container > p {
            font-size: 12px;
        }
        #field-container1 {
            align-items: flex-start;
        }
        #field-container2 {
            align-items: flex-end;
        }
        .field {
            width: ${width * 0.38}px;
            height: ${height * 0.13}px;

            background-image: url(https://cdn.discordapp.com/attachments/870691600672645171/870691683476586496/field-90degrees.png);
            background-size: 100% 100%;

            background-repeat: no-repeat;

            display: flex;
            justify-content: center;
        }
        .field-hitmap-ball-container {
            position: absolute;

            display: flex;
            justify-content: center;
            align-items: center;
        }
        .field-hitmap-ball {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        #goal-container {
            width: ${width * 0.5}px;
            height: 100%;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            font-size: ${width * 0.04}px;
        }
        #goal {
            width: ${width * 0.45}px;
            height: ${height * 0.9 * 0.13}px;

            background-color: blue;
            background-image: url(https://cdn.discordapp.com/attachments/856988081364926515/857933093872336936/goal.png);
            background-size: 85% 80%;
            background-repeat: no-repeat;
            background-position: center;
            position: relative;
        }
        .hand {
            width: 30px;
            height: 30px;
            position: absolute;
            
        }
        .golden-hand {
            width: 30px;
            height: 30px;
            position: absolute;
        }
        .match-statics > .match-info {
            width: 100%;
            padding: 0 5px;
            margin-bottom: 10px;

            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            font-size: ${width * 0.035}px;
        }
        #after-footer {
            list-style: none;
            margin-left: ${width * 0.025}px;
            margin-top: ${height * 0.03}px;
            width: ${width}px;
            font-size: ${width * 0.03}px;

            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
        }
        #after-footer > li {
            width: 25%;
        }
    </style>
</head>
<body>
    <header>
        <img src="https://cdn.discordapp.com/attachments/856988081364926515/868001954482233424/full_logo_Prancheta_1.png" />
        <div>
            <h2>Player Analysis Profile</h2>
            <p>Position: ${player.position}</p>
        </div>
        <img src="https://cdn.discordapp.com/attachments/856988081364926515/868001954482233424/full_logo_Prancheta_1.png" />
    </header>
    <main>
        <div class="player-information-container">
            <section>
                <p>Player Name: ${player.name}</p>
                <p>DOB: ${treatDate(new Date(player.DOB))}</p>
                <p>Weight: ${player.weight}kg</p>
                <p>Height: ${player.height}M</p>
                <p>Foot: ${player.foot}</p>
                <p>Clube: ${player.club}</p>
            </section>
            <img src="https://cdn.discordapp.com/attachments/856988081364926515/868006442760822814/jogador.png" />
        </div>
        <section class="player-characteristic">
            <p class="section-title" style="text-align: left">Player Characteristic</p>
            <div>
                ${player.characteristics.map(characteristic => {
                    return `
                    <div>
                        <img src="https://cdn.discordapp.com/attachments/856988081364926515/857799304794210334/ball.png"/>
                        <span>${characteristic.label}</span>
                    </div>
                    `
                }).join('')}
            </div>
        </section>
        <section>
            <p class="section-title">Match Information</p>
            <div class="list-container">
                <ul id="match-info">
                    <li>Scout Name: ${match.scoutName}</li>
                    <li>Match Day: Cheelsea FC x Arsenal</li>
                    <li>Weather/Temperature: 
                        <ul>
                            <li>${treatWeather(match.weather)}</li>
                        </ul>
                    </li>
                </ul>
                <ul style="text-align: right; font-size: ${width * 0.034}px">
                    <li>Game Date: ${treatDate(new Date(match.date), true)}</li>
                    <li>Game Location: ${match.location}</li>
                    <li>Game Type: ${match.type}</li>
                </ul>
            </div>
        </section>
        <section class="match-statics">
            <p class="section-title">Match Statics</p>
            <div class="match-info">
                <span>Matches Played: 1</span>
                <span>Minutes Played: 94min</span>
                <span>Man of the match: 1</span>
            </div>
            <div class="list-container">
                {list}
            </div>
        </section>
        <section id="section-footer">
            <div class="field-container" id="field-container1">
                <p>Hit Map</p>
                <div class="field" style="justify-content: flex-start">
                    {hit-map}
                </div>
            </div>
            <div id="goal-container">
                <p>Accurate Shots</p>
                <div id="goal">
                    {hands}
                </div>
            </div>
        </section>
    </main>
    <div id="footer">
        <div id="chart">
            <img src="{chart}"/>
        </div>
        {overall}
        <img src="https://cdn.discordapp.com/attachments/851085431042998293/858515706738638888/unknown.png" />
    </div>
    <ul id="after-footer">
        {abbreviations}
    </ul>
</body>
</html>`
let inputsTogether: Array<any> = [];
let $list = '';
tables.map((inputs2: any) => {
    inputsTogether = inputsTogether.concat(inputs2);
    let ul = '<ul>';
    let lis = '';
    inputs2.map((input2: any) => {
        lis += `<li class="match-static">
            <span>${input2.name}:</span>
            <span>${values[input2.id]}</span>
        </li>`;
    })
    ul += `${lis}</ul>`;
    $list += ul;
})

let overall = 0;

const inputsData: Array<InputData> = [];

inputsTogether.map(input => {
    const math = (input.count * values[input.id]) / 90 * 100;
    if (input.negative) {
        overall -= math;
    } else {
        overall += math;
    }
    inputsData.push({
        ...input,
        value: Math.abs(values[input.id])
    })
})
let $overall = `<h2>Overall: ${(overall * 10).toFixed(1)}%</h2>`;
let $hands = '';

positionHands.map(positionHand => {
    const hand = 'https://cdn.discordapp.com/attachments/856988081364926515/869256819992825896/Goalie_Gloves.O11.2k.png';
    const goldenHand = 'https://cdn.discordapp.com/attachments/856988081364926515/869256824338120824/Goalie_Gloves.O11.2kO.png';
    let calc = 0.03;
    if (positionHand.x > (width * 0.45) / 2) {
        calc = 0;
    }
    $hands += `
        <img
            src="${positionHand.golden ? goldenHand : hand}"
            class="${positionHand.golden ? 'golden-hand' : 'hand'}"
            style="transform: translate(${positionHand.x - (width * calc)}px, ${positionHand.y}px)"
        />
    `
})

const valuesInputs: Array<number> = [];
const abbreviations: Array<string> = [];
const namesInputs: Array<string> = [];

inputsData.map(inputData => {
    valuesInputs.push(inputData.value);
    abbreviations.push(inputData.abbreviation);
    namesInputs.push(inputData.name);
})

const finalObject: any = {
    type: 'radar',
    data: {
      labels: [],
      datasets: [{
        label: 'K10 Football',
        data: [],
        backgroundColor: 'rgba(162, 166, 233, 0.5)'
      }]
    },
    options: {
        legend: {
            display: false
        },
        // plugins: {
        //     backgroundImageUrl: 'https://cdn.discordapp.com/attachments/856988081364926515/861090564027449344/Radar_Prancheta_1.png'
        // }
    }
}

let $abbreviationsUL = '';

abbreviations.forEach((abbreviation, index) => {
    finalObject.data.labels.push(abbreviation);
    $abbreviationsUL += `<li>${abbreviation}: ${namesInputs[index]}</li>`
})
valuesInputs.forEach(valueInput => {
    finalObject.data.datasets[0].data.push(valueInput);
})

let $hitmap = '';
const colorsHitmap = [
    'rgba(255, 229, 0, opacity)',
    'rgba(226, 123, 29, opacity)',
    'rgba(230, 50, 46, opacity)'
]
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
positionHitmaps.forEach(positionHitmap => {
    const size = sizesHitmap[positionHitmap.mode];
    let style = `
    width: ${size.begin}px;
    height: ${size.begin}px;
    border-radius: ${size.begin / 2}px;
    background-color: ${colorsHitmap[positionHitmap.mode].replace('opacity', '0.3')};
    transform: translate(${positionHitmap.x - (size.begin / 2)}px, ${positionHitmap.y - (size.begin / 2)}px);
    `;
    let styleBall = `
width: ${size.final}px;
height: ${size.final}px;
border-radius: ${size.final / 2}px;
background-color: ${colorsHitmap[positionHitmap.mode].replace('opacity', '0.5')};
    `;
    let style1 = '';
    let style1Ball = '';
    let style2 = '';
    let style2Ball = '';
    switch (positionHitmap.mode) {
        case 0:
            $hitmap += `
<div class="field-hitmap-ball-container" style="${style.split('\n').join(' ')}">
    <div class="field-hitmap-ball" style="${styleBall.split('\n').join(' ')}"></div>
</div>
            `
            return;
        case 1:
            const size1 = sizesHitmap[positionHitmap.mode - 1];
            style1 = `
width: ${size1.begin}px;
height: ${size1.begin}px;
border-radius: ${size1.begin / 2}px;
background-color: ${colorsHitmap[positionHitmap.mode - 1].replace('opacity', '0.3')};
            `
            style1Ball = `
width: ${size1.final}px;
height: ${size1.final}px;
border-radius: ${size1.final / 2}px;
background-color: ${colorsHitmap[positionHitmap.mode - 1].replace('opacity', '0.4')};
            `
            $hitmap += `
<div class="field-hitmap-ball-container" style="${style.split('\n').join(' ')}">
    <div class="field-hitmap-ball" style="${styleBall.split('\n').join(' ')}">
        <div class="field-hitmap-ball" style="${style1.split('\n').join(' ')}">
            <div class="field-hitmap-ball" style="${style1Ball.split('\n').join(' ')}"></div>
        </div>
    </div>
</div>
            `
            return;
        case 2:
            const sizeBefore = sizesHitmap[positionHitmap.mode - 1];
            const size2 = sizesHitmap[positionHitmap.mode - 2];
            style1 = `
width: ${sizeBefore.begin}px;
height: ${sizeBefore.begin}px;
border-radius: ${sizeBefore.begin / 2}px;
background-color: ${colorsHitmap[positionHitmap.mode - 1].replace('opacity', '0.3')};
            `
            style1Ball = `
width: ${sizeBefore.final}px;
height: ${sizeBefore.final}px;
border-radius: ${sizeBefore.final / 2}px;
background-color: ${colorsHitmap[positionHitmap.mode - 1].replace('opacity', '0.4')};
            `
            style2 = `
width: ${size2.begin}px;
height: ${size2.begin}px;
border-radius: ${size2.begin / 2}px;
background-color: ${colorsHitmap[positionHitmap.mode - 2].replace('opacity', '0.2')};
            `
            style2Ball = `
width: ${size2.final}px;
height: ${size2.final}px;
border-radius: ${size2.final / 2}px;
background-color: ${colorsHitmap[positionHitmap.mode - 2].replace('opacity', '0.3')};
            `
            $hitmap += `
<div class="field-hitmap-ball-container" style="${style.split('\n').join(' ')}">
    <div class="field-hitmap-ball" style="${styleBall.split('\n').join(' ')}">
        <div class="field-hitmap-ball" style="${style1.split('\n').join(' ')}">
            <div class="field-hitmap-ball" style="${style1Ball.split('\n').join(' ')}">
                <div class="field-hitmap-ball" style="${style2.split('\n').join(' ')}">
                    <div class="field-hitmap-ball" style="${style2Ball.split('\n').join(' ')}">
                
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
            `
            return;
        default:
            return;
    }
})

const urlChart = `https://quickchart.io/chart?bkg=transparent&c=${JSON.stringify(finalObject)}`

    html = html.replace('{list}', $list);
    html = html.replace('{overall}', $overall);
    html = html.replace('{hands}', $hands);
    html = html.replace('{chart}', encodeURI(urlChart));
    html = html.replace('{hit-map}', $hitmap);
    html = html.replace('{abbreviations}', $abbreviationsUL)
    return html;
}

export default createHtml;