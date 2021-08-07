function CoinsReducer(state = 40, actions: any) {
    switch (actions.type) {
        case 'add-coins':
            return state + actions.value;
        case 'remove-coins':
            return state - actions.value;
        case 'change-coins':
            return actions.value;
        default:
            return state;
    }
}

export default CoinsReducer;