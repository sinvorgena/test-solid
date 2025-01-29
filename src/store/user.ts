import { createSlice } from '@reduxjs/toolkit'

export interface UserState {
  name: string
  avatar: string
}

const initialState: UserState = {
  name: 'MaxMaxMaxMaxMaxMaxMaxMaxMaxMaxMaxMaxMaxMaxMaxMaxMaxMaxMaxMaxMax',
  avatar: '123',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers:{}
})

export default userSlice.reducer