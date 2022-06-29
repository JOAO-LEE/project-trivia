export const ADD_PLAYER = 'ADD_PLAYER';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const SET_COLOR = 'SET_COLOR';
export const NEXT_BTN_ENABLE = 'NEXT_BTN_ENABLE';

export const nextBtnEnable = () => ({
  type: NEXT_BTN_ENABLE,
});

export const nextQuestion = () => ({
  type: NEXT_QUESTION,
});

export const setColor = () => ({
  type: SET_COLOR,
});

export const addPlayer = (player) => ({
  type: ADD_PLAYER,
  payload: {
    player,
  },
});
