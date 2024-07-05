import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

import fakeAPI from '../fakeAPI'

//Async thunk action for fetching books
export const fetchBooks = createAsyncThunk('books/fetchBooks',async()=>{
  try {
    const data = await fakeAPI.fetchBooks()
    return data
  } catch (error) {
    console.error('failed to fetch books',error)
  }
})

const bookSlice = createSlice({
  name:'books',
  initialState:[],
  reducers:{
    addBook:(state,action)=>{
      state.push({id:Date.now(),...action.payload})
    },
    deleteBook:(state,action)=>{
      return state.filter(book=>book.id !==action.payload.id)
    },
    updateBook:(state,action)=>{
      const index = state.findIndex(book=>book.id === action.payload.id)
      if(index !== -1){
        state[index]=action.payload
      }
    }
  },
  extraReducers:(builder)=>{
    builder
        .addCase(fetchBooks.fulfilled,(state,action)=>{
          return[...action.payload]
        })
        .addCase(fetchBooks.rejected,(state,action)=>{
          console.error('failed to fetch books in reducer',action.error)
        })
  }
})
export const {addBook,deleteBook,updateBook} = bookSlice.actions
export default bookSlice.reducer