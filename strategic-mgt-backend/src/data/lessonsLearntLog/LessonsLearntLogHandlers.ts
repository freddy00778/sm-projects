import {DataClient} from '../index'
import LessonLearntLogController, {Controller} from './LessonLearntLogController'
import {GetInput} from "./LessonLearntLogData";


export const get = (lessons: Controller) => async (input: GetInput) => {
    return lessons.get(input)
}

export const getAll = (lessons: Controller) => async (input: GetInput) => {
    return lessons.getAll(input)
}

export const update = (lessons: Controller) => async (input: GetInput) => {
    return lessons.update(input)
}

export const insert = (lessons: Controller) => async (input: GetInput) => {
    return lessons.insert(input)
}

export const deleteLesson = (lessons: Controller) => async (input: GetInput) => {
    return lessons.deleteLesson(input)
}

export async function create (data: DataClient) {
    const lessons = await LessonLearntLogController.create(data)

    return {
        get: get(lessons),
        getAll: getAll(lessons),
        update: update(lessons),
        insert: insert(lessons),
        deleteLesson: deleteLesson(lessons)
    }
}

export default {create}