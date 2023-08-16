/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface KeyImpactDepartment {
  id?: string
  key_impact_id?: string
  key_change_id?: string
  department_id?: string
  project_id?: string
}

export interface Data {
  get: ReturnType<typeof get>,
  getAll: ReturnType<typeof getAll>,
  update: ReturnType<typeof update>,
  insert: ReturnType<typeof insert>,
  deleteKeyImpactDepartment: ReturnType<typeof deleteKeyImpactDepartment>,
}

export interface GetInput {
  id?: string
  key_impact_id?: string
  key_change_id?: string
  department_id?: string
  project_id?: string
}

export const get = (keyImpactDepartments: () => QueryBuilder) => async (input: GetInput) => {
  return keyImpactDepartments().select().where(input).first()
}

export const getAll = (keyImpactDepartments: () => QueryBuilder) => async (input: GetInput) => {
  return keyImpactDepartments().select('KeyImpactDepartment.*', "Department.name")
      .from('KeyImpactDepartment')
      .leftJoin('Department', 'Department.id', 'KeyImpactDepartment.department_id')
      .where(input)
}

export const insert = (keyImpactDepartments: () => QueryBuilder) => async (input: GetInput) => {
  return (await keyImpactDepartments().insert(input, ['id']) as [{id: string, name:string}])[0]
}

export const update = (keyImpactDepartments: () => QueryBuilder) => async (input: GetInput) => {
  const { id, ...updateFields } = input;

  if (!id) {
    throw new Error("An ID must be provided to update a key change.");
  }

  return (await keyImpactDepartments().where({ id }).update(updateFields, ['id']) as [{id: string}])[0];
}

export const deleteKeyImpactDepartment = (keyImpactDepartments: () => QueryBuilder) => async (input: GetInput) => {
  const { key_change_id, project_id, department_id } = input;

  if (!key_change_id && !project_id && !department_id) {
    throw new Error("At least one criteria (key_change_id, project_id, or department_id) must be provided to delete a key change.");
  }

  const deleteCriteria: any = {};

  if (key_change_id) {
    deleteCriteria.key_change_id = key_change_id;
  }

  if (project_id) {
    deleteCriteria.project_id = project_id;
  }

  if (department_id) {
    deleteCriteria.department_id = department_id;
  }

  console.log("Deleting with criteria:", deleteCriteria);
  return (await keyImpactDepartments().where(deleteCriteria).del() as number);
}


export async function create (data: DataClient): Promise<Data> {
  const keyImpactDepartments = () => data.postgres.withSchema(Database.schema).table('KeyImpactDepartment')

  return {
    get: get(keyImpactDepartments),
    getAll: getAll(keyImpactDepartments),
    update: update(keyImpactDepartments),
    insert: insert(keyImpactDepartments),
    deleteKeyImpactDepartment: deleteKeyImpactDepartment(keyImpactDepartments),
  }
}

export default {create}
