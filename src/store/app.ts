import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export enum AppModes {
  Loaging = 'loading',
  Default = 'default'
}
export interface AppState {
  mode: AppModes
  loadingProgress: number
}

const initialState: AppState = {
  mode: AppModes.Loaging,
  loadingProgress: 0
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<AppModes>) => {
      state.mode = action.payload
    },
    setLoadingProgress: (state, action: PayloadAction<number>) => {
      state.loadingProgress = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setMode, setLoadingProgress } = appSlice.actions

export default appSlice.reducer