/* tslint:disable await-promise */
import { QueryBuilder } from 'knex';

import { DataClient } from '../index';
import { Database } from '../../config';

export interface AffectedStakeholderDepartment {
  id?: string;
  department_id?: string;
  key_change_id?: string;
  project_id?: string;
}

export interface Data {
  get: ReturnType<typeof get>;
  getAll: ReturnType<typeof getAll>;
  update: ReturnType<typeof update>;
  insert: ReturnType<typeof insert>;
  deleteStakeholderChangeDriver: ReturnType<typeof deleteStakeholderChangeDriver>;
}

export interface GetInput {
  id?: string;
  department_id?: string;
  key_change_id?: string;
  project_id?: string;
}

export const get = (stakeholderChangeDrivers: () => QueryBuilder) => async (input: GetInput) => {
  return stakeholderChangeDrivers().select().where(input).first();
}

export const getAll = (stakeholderChangeDrivers: () => QueryBuilder) => async (input: GetInput) => {
  const qb = stakeholderChangeDrivers().select('StakeholderChangeDriversDepartment.*','Department.name as department_name')
      .from('StakeholderChangeDriversDepartment')
      .leftJoin('Department', 'Department.id', 'StakeholderChangeDriversDepartment.department_id')
      .where(input)

  return qb.orderBy("created_at", "DESC")
}

export const insert = (stakeholderChangeDrivers: () => QueryBuilder) => async (input: GetInput) => {
  return (await stakeholderChangeDrivers().insert(input, ['id']) as [{ id: string }])[0];
}

export const update = (stakeholderChangeDrivers: () => QueryBuilder) => async (input: GetInput) => {
  const { id, ...updateFields } = input;

  if (!id) {
    throw new Error("An ID must be provided to update a change driver.");
  }

  return (await stakeholderChangeDrivers().where({ id }).update(updateFields, ['id']) as [{ id: string }])[0];
}

export const deleteStakeholderChangeDriver = (stakeholderChangeDrivers: () => QueryBuilder) => async (input: GetInput) => {
  const { key_change_id } = input;

  if (!key_change_id) {
    throw new Error("An ID must be provided to delete a change driver.");
  }

  return (await stakeholderChangeDrivers().where({ key_change_id }).del() as number);
}

export async function create(data: DataClient): Promise<Data> {
  const stakeholderChangeDrivers = () => data.postgres.withSchema(Database.schema).table('AffectedStakeholderDepartment');

  return {
    get: get(stakeholderChangeDrivers),
    getAll: getAll(stakeholderChangeDrivers),
    update: update(stakeholderChangeDrivers),
    insert: insert(stakeholderChangeDrivers),
    deleteStakeholderChangeDriver: deleteStakeholderChangeDriver(stakeholderChangeDrivers),
  }
}

export default { create };
