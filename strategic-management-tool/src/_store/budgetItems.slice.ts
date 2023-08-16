import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWrapper } from "../_helpers/fetch-wrapper";

interface BudgetItem {
    // your budgetItem properties
}

interface BudgetItemState {
    budgetItem: BudgetItem | null;
    budgetItems: BudgetItem[];
    isLoading: boolean;
    error: any;
}

const budgetItemName = 'budgetItems';
const baseUrl = import.meta.env.VITE_API_ENDPOINT;

const initialState: BudgetItemState = {
    budgetItem: null,
    budgetItems: null,
    isLoading: false,
    error: null
};

const getBudgetItems = createAsyncThunk(`${budgetItemName}/getBudgetItems`, async () => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/budget-items`);
});

const getBudgetItemById = createAsyncThunk(`${budgetItemName}/getBudgetItemById`, async ({ id }: { id: string }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/budget-items/${id}`);
});

const createBudgetItem = createAsyncThunk(`${budgetItemName}/createBudgetItem`, async (budgetItem: BudgetItem) => {
    return await fetchWrapper.post(`${baseUrl}/api/v1/budget-items`, budgetItem);
});

const deleteBudgetItem = createAsyncThunk(`${budgetItemName}/deleteBudgetItem`, async ({ id }: { id: string }) => {
    return await fetchWrapper.delete(`${baseUrl}/api/v1/budget-items/${id}`);
});

const updateBudgetItem = createAsyncThunk(`${budgetItemName}/updateBudgetItem`, async (budgetItem: BudgetItem) => {
    return await fetchWrapper.patch(`${baseUrl}/api/v1/budget-items`, budgetItem);
});

const budgetItemSlice = createSlice({
    name: budgetItemName,
    initialState,
    reducers: {
        clearBudgetItems: (state) => {
            state.budgetItems = null;
            localStorage.removeItem('sm-budgetItems');
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(getBudgetItems.fulfilled, (state, action) => {
                state.budgetItems = action.payload;
                state.error = null;
            })
            .addCase(getBudgetItems.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(getBudgetItemById.fulfilled, (state, action) => {
                state.budgetItem = action.payload;
                state.error = null;
            })
            .addCase(getBudgetItemById.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(createBudgetItem.fulfilled, (state, action) => {
                const budgetItem = action.payload;
                state.budgetItem = budgetItem;
                state.error = null;
            })
            .addCase(createBudgetItem.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteBudgetItem.fulfilled, (state, action) => {
                state.budgetItem = action.payload;
                state.error = null;
            })
            .addCase(deleteBudgetItem.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateBudgetItem.fulfilled, (state, action) => {
                state.budgetItem = action.payload;
            })
            .addCase(updateBudgetItem.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearBudgetItems } = budgetItemSlice.actions;
export const budgetItemActions = {
    getBudgetItems,
    getBudgetItemById,
    createBudgetItem,
    deleteBudgetItem,
    updateBudgetItem,
};
export const budgetItemReducer = budgetItemSlice.reducer;
