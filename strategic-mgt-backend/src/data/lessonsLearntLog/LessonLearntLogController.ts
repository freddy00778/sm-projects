import LessonLearntLogData , {Data, GetInput} from './LessonLearntLogData'
import {DataClient} from '../index'

export interface Controller {
    get: ReturnType<typeof get>,
    getAll: ReturnType<typeof getAll>,
    update: ReturnType<typeof update>,
    insert: ReturnType<typeof insert>,
    deleteLesson: ReturnType<typeof deleteLesson>,
}

export const get = (lessons: Data) => async (input: GetInput) => {
    return lessons.get(input)
}

export const getAll = (lessons: Data) => async (input: GetInput) => {
    return lessons.getAll(input)
}

export const update = (lessons: Data) => async (input: GetInput) => {
    return lessons.update(input)
}

export const insert = (lessons: Data) => async (input: GetInput) => {
    return lessons.insert(input)
}

export const deleteLesson = (scopes: Data) => async (input: GetInput) => {
    return scopes.deleteLesson(input)
}

export async function create (data: DataClient): Promise<Controller> {
    const lessons = await LessonLearntLogData.create(data)

    return {
        get: get(lessons),
        getAll: getAll(lessons),
        update: update(lessons),
        insert: insert(lessons),
        deleteLesson: deleteLesson(lessons),
    }
}

export default {create}