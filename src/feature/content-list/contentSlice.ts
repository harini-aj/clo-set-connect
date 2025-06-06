import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { type Content } from "../../types/content.types";
import axios from "axios";

type ContentState = {
    items: Content[]
    loading: boolean
    error: string | null
}

const initialState: ContentState = {
    items: [],
    loading: false,
    error: null
} satisfies ContentState as ContentState

export const fetchContent = createAsyncThunk(
    "content/fetchContent",
    async () => {
        const respose = await axios.get("https://closet-recruiting-api.azurewebsites.net/api/data")
        return respose.data
    }
)

export const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.
        addCase(fetchContent.pending, (state) => {
            state.loading = true
            state.error = null
        }).
        addCase(fetchContent.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.items = action.payload
        }).
        addCase(fetchContent.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Something went wrong retry"
        })
    }
})