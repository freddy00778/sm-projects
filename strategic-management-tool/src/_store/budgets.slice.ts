import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWrapper } from "../_helpers/fetch-wrapper";

interface Budget {
    id: string
}

interface BudgetState {
    budget: Budget | null;
    budgets: Budget[]
    isLoading: boolean
    error: any;
}

const budgetName = 'budgets';
const baseUrl = import.meta.env.VITE_API_ENDPOINT;


const initialState: BudgetState = {
    budget: null,
    budgets: null,
    isLoading: false,
    error: null
};

const getBudgets = createAsyncThunk(`${budgetName}/getBudgets`, async () => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/budgets`);
});

const getBudgetsByProjectId = createAsyncThunk(`${budgetName}/getBudgetsByProjectId`, async ({id}) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/budgets?id=${id}&type=project`);
});

const getBudgetById = createAsyncThunk(`${budgetName}/getBudgetById`, async ({ id }: { id: string }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/budgets/${id}`);
});

const getBudgetByBudgetItemId = createAsyncThunk(`${budgetName}/getBudgetByBudgetItemId`, async ({ id }: { id: string }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/budgets/${id}?type=budget_item_id`);
});

const createBudget = createAsyncThunk(`${budgetName}/createBudget`, async (budget: Budget) => {
    return await fetchWrapper.post(`${baseUrl}/api/v1/budgets`, budget);
});

const deleteBudget = createAsyncThunk(`${budgetName}/deleteBudget`, async ({ id }: { id: string }) => {
    return await fetchWrapper.delete(`${baseUrl}/api/v1/budgets/${id}`);
});

const updateBudget = createAsyncThunk(`${budgetName}/updateBudget`, async (budget: Budget) => {
    return await fetchWrapper.patch(`${baseUrl}/api/v1/budgets`, budget);
});

const budgetSlice = createSlice({
    name: budgetName,
    initialState,
    reducers: {
        clearBudgets: (state) => {
            state.budgets = null;
            localStorage.removeItem('sm-budgets');
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(getBudgets.fulfilled, (state, action) => {
                state.budgets = action.payload;
                state.error = null;
            })
            .addCase(getBudgets.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(getBudgetById.fulfilled, (state, action) => {
                state.budget = action.payload;
                state.error = null;
            })

            .addCase(getBudgetById.rejected, (state, action) => {
                state.error = action.payload;
            })


            .addCase(getBudgetsByProjectId.fulfilled, (state, action) => {
                state.budgets = action.payload;
                state.error = null;
            })

            .addCase(getBudgetsByProjectId.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(getBudgetByBudgetItemId.fulfilled, (state, action) => {
                state.budget = action.payload;
                state.error = null;
            })
            .addCase(getBudgetByBudgetItemId.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(createBudget.fulfilled, (state, action) => {
                const budget = action.payload;
                state.budget = budget;
                state.error = null;
            })
            .addCase(createBudget.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteBudget.fulfilled, (state, action) => {
                state.budget = action.payload;
                state.error = null;
            })
            .addCase(deleteBudget.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateBudget.fulfilled, (state, action) => {
                state.budget = action.payload;
            })
            .addCase(updateBudget.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearBudgets } = budgetSlice.actions;
export const budgetActions = {
    getBudgets,
    getBudgetById,
    getBudgetByBudgetItemId,
    getBudgetsByProjectId,
    createBudget,
    deleteBudget,
    updateBudget,
};
export const budgetReducer = budgetSlice.reducer;
