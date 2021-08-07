function DrawerAnalysisPdfReducer(state = false, actions: any) {
    switch (actions.type) {
        case 'active-drawer-analysis-pdf':
            return true;
        default:
            return state;
    }
}

export default DrawerAnalysisPdfReducer;