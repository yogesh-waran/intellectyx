import { reactLocalStorage } from 'reactjs-localstorage';

export const isValid = () => {
    const decoded = reactLocalStorage.getObject('_decoded');

    if(decoded && decoded.exp && decoded.exp > Date.now() / 1000) {
        return true;
    }

    return false;
}