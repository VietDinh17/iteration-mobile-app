import { RESET_TOKEN } from './types';

function resetToken(){
    return {
        type: RESET_TOKEN
    }
}

export const actionCreators = {
    resetToken
}