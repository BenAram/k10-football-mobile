declare module '*.png';
declare interface Match {
    scoutName: string
    date: Date
    location: string
    type: string
    weather: string
    evaluator: string
}
declare interface Player {
    name: string,
    club: string,
    nationality: string
    gender: string
    position: string
    DOB: Date
    weight: number
    height: number
    foot: string
    characteristics: Array<{
        label: string
        id: string
    }>
}