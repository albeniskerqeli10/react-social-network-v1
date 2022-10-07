import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from '../../types/UserInterfaces';

interface SliceState {
  definedUser?: object;
  currentUser: IUser;
  usersList?: Array<IUser>;

}

type ResetState = {
  currentUser:any ;
}



const userInfoFromStorage = localStorage.getItem('userDetails')
  ? JSON.parse(localStorage.getItem('userDetails')!)
  : null;

const initialState: SliceState = {
    currentUser: userInfoFromStorage,

};
const resetState:ResetState = {
  currentUser:null
 }

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addNewUser: (state, { payload }: PayloadAction<IUser>) => {
    localStorage.setItem("userDetails", JSON.stringify(payload));

      state.currentUser = payload;
    },
    logoutUser: (state) => {
      localStorage.removeItem('userDetails');
      return {...resetState}
    },
    updateToken: (state , {payload}:PayloadAction<string>) => {
state.currentUser.accessToken = payload;
    },
    updateUsersList  : (state , {payload}:PayloadAction<IUser[]>) => {
    state.usersList = payload;
    }


  },
});

// Action creators are generated for each case reducer function
export const { addNewUser  , logoutUser , updateUsersList, updateToken  } = userSlice.actions;
// export const userSelector = (state: { state: SliceState }) => state;
export default userSlice.reducer;
