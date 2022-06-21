const DueTypeReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE': {
            return {
                currentDueType: action.payload
            };
        }
        default: {
            return state
        }
    }
}

export default DueTypeReducer;