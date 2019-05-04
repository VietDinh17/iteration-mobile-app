import { RESET_TOKEN } from './types';

// Okta 
import TokenClient from '@okta/okta-react-native';
import okta from '../constants/config';

const tokenClient = new TokenClient({
	issuer: okta.oidc.issuer,
	client_id: okta.oidc.clientId,
	scope: okta.oidc.scope,
	redirect_uri: okta.oidc.redirectUri
});

const initialState = {
    token: tokenClient,
};

// Helper Functions 
function applyResetToken(state) {
    return{
        ...state
    };
}

// Reducer Function
function reducer(state = initialState, action) {
    switch(action.type){
        case RESET_TOKEN:
            return applyResetToken(state);
        default:
            return state;
    }
}

export default reducer;