function DrawerNavigationReducer(state = null, actions: any) {
    switch (actions.type) {
        case 'change-drawer-navigation':
            return actions.value;
        default:
            return state;
    }
}

export default DrawerNavigationReducer;