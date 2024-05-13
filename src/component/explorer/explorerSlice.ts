import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import type { AppThunk } from "../../app/store"

export interface ExplorerState {
  lastSelectedDb: any
  queryEditor: any
}

const initialState: ExplorerState = {
  lastSelectedDb: null,
  queryEditor: {
    currentTab: null,
    queries: [],
    savedQueries: [],
  },
}

const isQueryPresent = (state: any, tabId: string) => {
  if (
    state.queryEditor.queries.findIndex(query => query.tabId === tabId) === -1
  ) {
    return false
  }
  return true
}

const targetQuery = (state: any, tabId: string) => {
  return state.queryEditor.queries.filter(query => {
    if (query.tabId === tabId) {
      return true
    }
    return false
  })[0]
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const explorerSlice = createAppSlice({
  name: "explorer",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    // Use the `PayloadAction` type to declare the contents of `action.payload`
    setCurrentDb: create.reducer((state, action: PayloadAction<any>) => {
      const { selectedDb, tabId } = action.payload
      if (!isQueryPresent(state, tabId)) {
        const newState = [
          ...state.queryEditor.queries,
          { selectedDb, tabId, selectedSchema: null },
        ]
        state.queryEditor.queries = newState
        state.lastSelectedDb = selectedDb
      } else {
        const target = targetQuery(state, tabId)
        target.selectedDb = selectedDb
        target.selectedSchema = null
        state.queryEditor.currentTab = target
        state.lastSelectedDb = selectedDb
      }
    }),
    setCurrentSchema: create.reducer((state, action: PayloadAction<any>) => {
      const { selectedSchema, tabId } = action.payload
      if (!isQueryPresent(state, tabId)) {
        const newState = [
          ...state.queryEditor.queries,
          { selectedSchema, tabId, selectedDb: null },
        ]
        state.queryEditor.queries = newState
      } else {
        const target = targetQuery(state, tabId)
        target.selectedSchema = selectedSchema
        state.queryEditor.currentTab = target
      }
    }),
    setCurrentTab: create.reducer((state, action: PayloadAction<any>) => {
      const { tabId } = action.payload
      if (!isQueryPresent(state, tabId)) {
        const newState = [
          ...state.queryEditor.queries,
          { selectedSchema: null, tabId, selectedDb: state.lastSelectedDb },
        ]
        state.queryEditor.queries = newState
        const target = targetQuery(state, tabId)
        state.queryEditor.currentTab = target
      } else {
        const target = targetQuery(state, tabId)
        state.queryEditor.currentTab = target
      }
    }),
    setSavedQueries: create.reducer((state, action: PayloadAction<any>) => {
      const { tabId, queryName } = action.payload
      const target = targetQuery(state, tabId)
      state.queryEditor.savedQueries = [
        ...state.queryEditor.savedQueries,
        { ...target, queryName },
      ]
    }),
    // The function below is called a thunk and allows us to perform async logic. It
    // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
    // will call the thunk with the `dispatch` function as the first argument. Async
    // code can then be executed and other actions can be dispatched. Thunks are
    // typically used to make async requests.
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    getSelectedTab: explorer => explorer.queryEditor.currentTab,
    getSavedQueries: explorer => explorer.queryEditor.savedQueries,
  },
})

// Action creators are generated for each case reducer function.
export const {
  setCurrentDb,
  setCurrentSchema,
  setCurrentTab,
  setSavedQueries,
} = explorerSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { getSelectedTab, getSavedQueries } = explorerSlice.selectors
