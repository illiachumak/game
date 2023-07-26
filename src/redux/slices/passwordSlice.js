import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    password: '',
    strength: 'EMPTY',
    text: ''

};

export const passwordSlice = createSlice({
  name: 'productItems',
  initialState,
  reducers: {

    setPassword: (state, action) => {
        state.password = action.payload;

        const password = action.payload;
  
        if (password.length === 0) {
            state.text = ''
            state.strength = 'EMPTY'
        return
        } else if (password.length < 8) {
            state.text = 'password must be at least 8 charachters!'
            state.strength = 'TOO SHORT'
        return
        }
    
        const hasLetters = /[a-z]/i.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSymbols = /[^a-z\d]/i.test(password);
    
        if (hasLetters && hasNumbers && hasSymbols) {
            state.text = 'strong'
            state.strength = 'STRONG'
        return
        } else if ((hasLetters && hasSymbols) || (hasLetters && hasNumbers) || (hasNumbers && hasSymbols)) {
            state.text = 'medium'
            state.strength = 'MEDIUM'
        return
        
        } else {
            state.text = 'easy'
            state.strength ='EASY'
        return
        }

    }

  },
});



export const { setPassword} = passwordSlice.actions;

export default passwordSlice.reducer;
