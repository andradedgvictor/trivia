import { SAVE_EMAIL_AND_NAME, SUM_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_EMAIL_AND_NAME:
    return {
      ...state,
      gravatarEmail: action.email,
      name: action.name,
    };
  case SUM_SCORE:
    return {
      ...state,
      score: state.score + action.totalPoints,
      assertions: state.assertions + 1,
      // score: player.score + action.totalPoints,
    };
  default: return state;
  }
};

export default player;
