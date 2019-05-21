const initialState = {
    filterAction: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHEAPEST':
            return {
                filterAction: action.pageNumber
            };
        case 'FASTEST':
            return {
                filterAction: state.currentPage - 1
            };
        default:
            return state;
    }
}

export default reducer;