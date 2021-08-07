function DrawerTitleReducer(state = null, actions: any) {
    switch (actions.type) {
        case 'change-drawer-title':
            return actions.value;
        default:
            return state;
    }
}

export default DrawerTitleReducer;