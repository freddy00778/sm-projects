/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface LessonLearntLog {
  id: string
  type?: string
  date_logged?: string
  description?: string
  logged_by?: string
  project_id?: string
}


export interface Data {
  get: ReturnType<typeof get>,
  getAll: ReturnType<typeof getAll>,
  update: ReturnType<typeof update>,
  insert: ReturnType<typeof insert>,
  deleteLesson: ReturnType<typeof deleteLesson>,
}

export interface GetInput {
  id?: string
  type?: string
  date_logged?: string
  description?: string
  logged_by?: string
  project_id?: string
  type_name?: string
}

export const get = (lessons: () => QueryBuilder) => async (input: GetInput) => {
  return  lessons().select().where(input).first()
}

export const getAll = (lessons: () => QueryBuilder) => async (input: GetInput) => {
  // return  lessons().select().where(input)

  const query =  lessons().select("LessonsLog.*", "Category.name as type_name").from("LessonsLog")
      .leftJoin("Category", "LessonsLog.type", "Category.id")

  if (input){
    query.where(input)
  }

  return query.orderBy("created_at", "desc")

}

export const insert = (lessons: () => QueryBuilder) => async (input: GetInput) => {
  return  (await lessons().insert(input, ['id']) as [{id: string, name:string}])[0]
}

export const update = (lessons: () => QueryBuilder) => async (input: GetInput) => {
  const { id, ...updateFields } = input;

  if (!id) {
    throw new Error("An ID must be provided to update a lesson.");
  }

  return (await lessons().where({ id }).update(updateFields, ['id']) as [{id: string}])[0];
}

export const deleteLesson = (lessons: () => QueryBuilder) => async (input: GetInput) => {
  const { id } = input;

  if (!id) {
    throw new Error("An ID must be provided to delete a lesson.");
  }

  return (await lessons().where({ id }).del() as number);
}

export async function create (data: DataClient): Promise<Data> {
  const lessons = () => data.postgres.withSchema(Database.schema).table('LessonsLog')

  return {
    get:           get(lessons),
    getAll:        getAll(lessons),
    update:        update(lessons),
    insert:        insert(lessons),
    deleteLesson:  deleteLesson(lessons),
  }
}

export default {create}