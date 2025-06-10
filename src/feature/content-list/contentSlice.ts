import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { type Content } from "../../types/content.types";
import axios from "axios";
import { constants } from "../../utils/constants";

type ContentState = {
    items: Content[]
    loading: boolean
    error: string | null
    page: number
    hasMore: boolean
}

const initialState: ContentState = {
    items: [],
    loading: false,
    error: null,
    page: 1,
    hasMore: true
} satisfies ContentState as ContentState

export const fetchContent = createAsyncThunk(
  "content/fetchContent",
  async ({ page = 1, limit = constants.CONTENT_LIST_PAGE_LIMIT }: { page: number; limit: number }) => {
    const response = await axios.get("https://closet-recruiting-api.azurewebsites.net/api/data");
    const allData = response.data;

    // Simulate pagination
    const start = (page - 1) * limit;
    const end = start + limit;
    const pagedData = allData.slice(start, end);

    return { data: pagedData, page, hasMore: end < allData.length };
  }
);

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
            state.items = action.payload.data
        }).
        addCase(fetchContent.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Something went wrong retry"
        })
    }
})