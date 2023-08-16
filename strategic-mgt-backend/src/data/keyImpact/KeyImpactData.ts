/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface KeyImpact {
  id?: string
  asset_type?: string
  asset_type_department_id?: string
  process_type?: string
  process_type_department_id?: string
  barriers_obstacles?: string
  levers?: string
  meta?: string
  key_change_id?: string
  technology?: any
  organisation?: any
  governance_reporting?: any
  employees?: any
  customers?: any
  suppliers?: any
  training?: any
  project_id?: string
}

export interface Data {
  get: ReturnType<typeof get>,
  getAll: ReturnType<typeof getAll>,
  update: ReturnType<typeof update>,
  insert: ReturnType<typeof insert>,
  deleteKeyImpact: ReturnType<typeof deleteKeyImpact>,
}

export interface GetInput {
  id?: string
  asset_type?: string
  asset_type_department_id?: string
  process_type?: string
  process_type_department_id?: string
  barriers_obstacles?: string
  levers?: string
  meta?: string
  key_change_id?: string
  technology?: any
  organisation?: any
  governance_reporting?: any
  employees?: any
  customers?: any
  suppliers?: any
  training?: any
  project_id?: string
}

export const get = (keyImpact: () => QueryBuilder) => async (input: GetInput) => {
  return keyImpact().select().where(input).first()
}

export const getAll = (stakeholderImpacts: () => QueryBuilder) => async (input: GetInput) => {
  return stakeholderImpacts().select('KeyImpact.*')
      .from('KeyImpact')
      // .leftJoin('Department', 'Department.id', 'KeyImpact.department_id')
      .where(input)
}

export const insert = (stakeholderImpacts: () => QueryBuilder) => async (input: GetInput) => {
  return (await stakeholderImpacts().insert(input, ['id']) as [{id: string, name:string}])[0]
}

export const update = (stakeholderImpacts: () => QueryBuilder) => async (input: GetInput) => {
  const { id, ...updateFields } = input;

  if (!id) {
    throw new Error("An ID must be provided to update a key impact.");
  }

  return (await stakeholderImpacts().where({ id }).update(updateFields, ['id']) as [{id: string}])[0];
}

export const deleteKeyImpact = (stakeholderImpacts: () => QueryBuilder) => async (input: GetInput) => {
  const { key_change_id, project_id } = input;

  if (!key_change_id && !project_id) {
    throw new Error("At least one criteria (key_impact_id, project_id) must be provided to delete a key impact.");
  }

  const deleteCriteria: any = {};

  if (key_change_id) {
    deleteCriteria.key_impact_id = key_change_id;
  }

  if (project_id) {
    deleteCriteria.project_id = project_id;
  }

  console.log("Deleting with criteria:", deleteCriteria);
  return (await stakeholderImpacts().where(deleteCriteria).del() as number);
}

export async function create (data: DataClient): Promise<Data> {
  const keyImpact = () => data.postgres.withSchema(Database.schema).table('KeyImpact')

  return {
    get:              get(keyImpact),
    getAll:           getAll(keyImpact),
    update:           update(keyImpact),
    insert:           insert(keyImpact),
    deleteKeyImpact:  deleteKeyImpact(keyImpact),
  }
}

export default {create}
