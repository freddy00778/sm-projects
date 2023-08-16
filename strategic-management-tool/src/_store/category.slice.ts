// Slice and Thunks for Categories API
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWrapper } from "../_helpers/fetch-wrapper";

interface Category {
    // your category properties
}

interface CategoryState {
    category: Category | null;
    categories: Category[]
    isLoading: boolean;
    error: any;
}

// create slice
const categoryName = 'categories';
const initialCategoryState = createCategoryInitialState();
const categoryReducers = createCategoryReducers();
const extraCategoryActions = createCategoryExtraActions();
const extraCategoryReducers = createCategoryExtraReducers();
const categorySlice = createSlice({
    name: categoryName,
    initialState: initialCategoryState,
    reducers: categoryReducers,
    extraReducers: extraCategoryReducers
});

// exports
export const categoryActions = { ...categorySlice.actions, ...extraCategoryActions };
export const categoryReducer = categorySlice.reducer;

// implementation
function createCategoryInitialState(): CategoryState {
    return {
        category: {},
        categories: null,
        isLoading: false,
        error: null
    }
}

function createCategoryReducers() {
    return {
        clearCategories,
    };

    function clearCategories(state: CategoryState) {
        state.category = null;
        localStorage.removeItem('sm-categories');
    }
}

function createCategoryExtraActions() {
    const baseUrl = import.meta.env.VITE_API_ENDPOINT;

    return {
        getCategories: createAsyncThunk(
            `${categoryName}/getCategories`,
            async () => {
                return await fetchWrapper.get(`${baseUrl}/api/v1/categories`);
            }
        ),

        getCategoryById: createAsyncThunk(
            `${categoryName}/getCategoryById`,
            async ({ id }: { id: string }) => {
                return await fetchWrapper.get(`${baseUrl}/api/v1/categories/${id}`);
            }
        ),
        createCategory: createAsyncThunk(
            `${categoryName}/createCategory`,
            async (category: Category) => {
                return await fetchWrapper.post(`${baseUrl}/api/v1/categories`, category);
            }
        ),
        deleteCategory: createAsyncThunk(
            `${categoryName}/deleteCategory`,
            async ({ id }: { id: string }) => {
                return await fetchWrapper.delete(`${baseUrl}/api/v1/categories/${id}`);
            }
        ),
        updateCategory: createAsyncThunk(
            `${categoryName}/updateCategory`,
            async (category: Category) => {
                return await fetchWrapper.patch(`${baseUrl}/api/v1/categories`, category);
            }
        )
    };
}

function createCategoryExtraReducers() {
    return {

        [extraCategoryActions.getCategories.fulfilled.toString()]: (state: CategoryState, action: PayloadAction<Category[]>) => {
            state.categories = action.payload;
            state.error = null;
        },
        [extraCategoryActions.getCategories.rejected.toString()]: (state: CategoryState, action: PayloadAction<any>) => {
            state.error = action.payload;
        },
        [extraCategoryActions.getCategoryById.fulfilled.toString()]: (state: CategoryState, action: PayloadAction<Category>) => {
            state.category = action.payload;
            state.error = null;
        },
        [extraCategoryActions.getCategoryById.rejected.toString()]: (state: CategoryState, action: PayloadAction<any>) => {
            state.error = action.payload;
        },
        [extraCategoryActions.createCategory.fulfilled.toString()]: (state: CategoryState, action: PayloadAction<Category>) => {
            const category = action.payload;
            if (state.category) {
                state.category = category;
            } else {
                state.category = category;
            }
            state.error = null;
        },
        [extraCategoryActions.createCategory.rejected.toString()]: (state: CategoryState, action: PayloadAction<any>) => {
            state.error = action.payload;
        },
        [extraCategoryActions.deleteCategory.fulfilled.toString()]: (state: CategoryState, action: PayloadAction<{ id: string }>) => {
            if (state.category) {
                state.category = action.payload;
            }
            state.error = null;
        },
        [extraCategoryActions.deleteCategory.rejected.toString()]: (state: CategoryState, action: PayloadAction<any>) => {
            state.error = action.payload;
        },
        [extraCategoryActions.updateCategory.fulfilled.toString()]: (state: CategoryState, action: PayloadAction<Category>) => {
            state.category = action.payload;
        },
        [extraCategoryActions.updateCategory.rejected.toString()]: (state: CategoryState, action: PayloadAction<any>) => {
            state.error = action.payload;
        }
    };
}
