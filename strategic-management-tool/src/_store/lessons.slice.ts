import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWrapper } from "../_helpers/fetch-wrapper";

interface Lesson {
    // your lesson properties
}

interface LessonState {
    lesson: Lesson | null;
    lessons: Lesson[] | null;
    isLoading: boolean;
    error: any;
}

const lessonName = 'lessons';
const baseUrl = import.meta.env.VITE_API_ENDPOINT;


const initialState: LessonState = {
    lesson: null,
    lessons: null,
    isLoading: false,
    error: null
};

const getLessons = createAsyncThunk(`${lessonName}/getLessons`, async () => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/lessons`);
});

const getLessonsByProjectId = createAsyncThunk(`${lessonName}/getLessons`, async ({project_id}) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/lessons?id=${project_id}&type=project`);
});

const getLessonById = createAsyncThunk(`${lessonName}/getLessonById`, async ({ id }: { id: string }) => {
    return await fetchWrapper.get(`${baseUrl}/api/v1/lessons/${id}`);
});

const createLesson = createAsyncThunk(`${lessonName}/createLesson`, async (lesson: Lesson) => {
    return await fetchWrapper.post(`${baseUrl}/api/v1/lessons`, lesson);
});

const deleteLesson = createAsyncThunk(`${lessonName}/deleteLesson`, async ({ id }: { id: string }) => {
    return await fetchWrapper.delete(`${baseUrl}/api/v1/lessons/${id}`);
});

const updateLesson = createAsyncThunk(`${lessonName}/updateLesson`, async (lesson: Lesson) => {
    return await fetchWrapper.patch(`${baseUrl}/api/v1/lessons`, lesson);
});

const lessonSlice = createSlice({
    name: lessonName,
    initialState,
    reducers: {
        clearLessons: (state) => {
            state.lesson = null;
            localStorage.removeItem('sm-lessons');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLessonById.fulfilled, (state, action) => {
                state.lesson = action.payload;
                state.error = null;
            })
            .addCase(getLessonById.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(getLessonsByProjectId.fulfilled, (state, action) => {
                state.lessons = action.payload;
                state.error = null;
            })
            .addCase(getLessonsByProjectId.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(createLesson.fulfilled, (state, action) => {
                const lesson = action.payload;
                state.lesson = lesson;
                state.error = null;
            })
            .addCase(createLesson.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteLesson.fulfilled, (state, action) => {
                state.lesson = action.payload;
                state.error = null;
            })
            .addCase(deleteLesson.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateLesson.fulfilled, (state, action) => {
                state.lesson = action.payload;
            })
            .addCase(updateLesson.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearLessons } = lessonSlice.actions;
export const lessonActions = {
    getLessons,
    getLessonById,
    getLessonsByProjectId,
    createLesson,
    deleteLesson,
    updateLesson,
};
export const lessonReducer = lessonSlice.reducer;
