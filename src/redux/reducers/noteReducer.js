const initialState = [
    { id: 0, title: "Vlog", note: "120Km Ride"},
    { id: 1, title: "Cover Song", note:"Rafta Rafta" },
  ];
  
  export const noteReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_NOTE":
        state = [...state, action.payload];
        return state;
      case "DELETE_NOTE":
        const NOTEFilter = state.filter((NOTE) =>
          NOTE.id === action.payload ? null : NOTE
        );
        state = NOTEFilter;
        return state;
      case "UPDATE_NOTE":
        const NOTEUpdate = state.filter((NOTE) =>
          NOTE.id === action.payload.id
            ? Object.assign(NOTE, action.payload)
            : NOTE
        );
        state = NOTEUpdate;
        return state;
      case "RESET_NOTE":
        state = [{ title: null, note: null }];
        return state;
      default:
        return state;
    }
  };