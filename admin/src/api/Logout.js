import {signOut} from "firebase/auth";
import {auth} from "../firebase";
import {persistor} from "../redux/store";
import {processLogout} from "../redux/userRedux";

export const logout = async (dispatch) => {

    try {
        await signOut(auth).then(() => {
            dispatch(processLogout());
            persistor.purge();
        })
    } catch (error) {
        console.log("Error while logging out: ", error);
    }
}