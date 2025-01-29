import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface GameState {
  isInProccess: boolean
  seconds: number
  energy: number
  activeRobots: number
  maxEnergy: number
  maxRobots: number
  earned: {
    key: string
    value: number
  }[]
}

const initialState: GameState = {
  isInProccess: false,
  seconds: 776,
  energy: 1100,
  activeRobots: 3,
  maxEnergy: 3500,
  maxRobots: 12,
  earned: [
    {
      key: 'asteroid-1',
      value: 4200,
    },
    {
      key: 'asteroid-2',
      value: 6700,
    },
    {
      key: 'asteroid-3',
      value: 5100,
    },
    {
      key: 'coin',
      value: 2200000,
    },
  ]
}

export const gameSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInProccess: (state, action: PayloadAction<boolean>) => {
      state.isInProccess = action.payload
    },
    setSeconds: (state, action: PayloadAction<number>) => {
      state.seconds = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setInProccess, setSeconds } = gameSlice.actions

export default gameSlice.reducer