import {processFailure, processStart, processSuccess} from "../redux/userRedux";
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {updateProfile} from 'firebase/auth';
import {auth} from "../firebase"

/**
 * Call firebase create user and does redux actions
 * @param dispatch
 * @param user
 * @returns {Promise<void>}
 */
export const register = async (dispatch, user) => {
    dispatch(processStart());
    try {
        await createUserWithEmailAndPassword(auth, user.email, user.password)
            .then(createdUser => {
                updateProfile(createdUser.user, {
                    displayName: user.username
                }).then(() => {
                    dispatch(processSuccess({
                        uid: createdUser.user.uid,
                        email: createdUser.user.email,
                        username: user.username
                    }));
                })
            })
    } catch (error) {
        dispatch(processFailure(error.code))
    }
}