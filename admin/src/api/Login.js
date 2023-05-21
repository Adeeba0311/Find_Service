import {processFailure, processStart, processSuccess} from "../redux/userRedux";
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../firebase"

/**
 * Call firebase login user and does redux actions
 * @param dispatch
 * @param user
 * @returns {Promise<void>}
 */
export const login = async (dispatch, user) => {
    dispatch(processStart());
    try {
        const response = await signInWithEmailAndPassword(auth, user.email, user.password)
        dispatch(processSuccess({
            uid : response.user.uid,
            email : response.user.email,
            username : response.user.displayName
        }));
    } catch (error) {
        dispatch(processFailure(error.code))
    }
}