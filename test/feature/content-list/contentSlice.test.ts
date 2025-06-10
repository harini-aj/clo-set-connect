import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { contentSlice, fetchContent } from "../../../src/feature/content-list/contentSlice";
import type { Content } from "../../../src/types/content.types";

const mock = new MockAdapter(axios);

const createTestStore = () =>
  configureStore({
    reducer: {
      content: contentSlice.reducer,
    },
  });

describe("contentSlice", () => {
  afterEach(() => {
    mock.reset();
  });

  const mockData: Content[] = [
    {
      id: "1",
      title: "Mock Title",
      creator: "Jane Doe",
      imagePath: "/image.jpg",
      price: 10,
      pricingOption: 0,
    },
  ];

  it("should have initial state", () => {
    const store = createTestStore();
    const state = store.getState().content;

    expect(state).toEqual({
      items: [],
      loading: false,
      error: null,
      hasMore: false,
      page: 1
    });
  });

  it("should handle fetchContent.pending", async () => {
    const store = createTestStore();

    const action = { type: fetchContent.pending.type };
    store.dispatch(action);

    const state = store.getState().content;
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it("should handle fetchContent.fulfilled", async () => {
    mock.onGet("https://closet-recruiting-api.azurewebsites.net/api/data").reply(200, mockData);

    const store = createTestStore();
    await store.dispatch(fetchContent({page: 1, limit: 100}));

    const state = store.getState().content;
    expect(state.loading).toBe(false);
    expect(state.items).toEqual(mockData);
    expect(state.error).toBe(null);
  });

  it("should handle fetchContent.rejected", async () => {
    mock.onGet("https://closet-recruiting-api.azurewebsites.net/api/data").networkError();

    const store = createTestStore();
    await store.dispatch(fetchContent({page: 1, limit: 100}));

    const state = store.getState().content;
    expect(state.loading).toBe(false);
    expect(state.items).toEqual([]);
    expect(state.error).toBe("Network Error");
  });
});
