/* tslint:disable await-promise */
import { QueryBuilder } from 'knex';

import { DataClient } from '../index';
import { Database } from '../../config';

export interface StakeholderChangeDriver {
  id?: string;
  stakeholder_id?: string;
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
  stakeholder_id?: string;
  key_change_id?: string;
  project_id?: string;
}

export const get = (stakeholderChangeDrivers: () => QueryBuilder) => async (input: GetInput) => {
  return stakeholderChangeDrivers().select().where(input).first();
}

export const getAll = (stakeholderChangeDrivers: () => QueryBuilder) => async (input: GetInput) => {
  return stakeholderChangeDrivers().select().where(input);
}

export const insert = (stakeholderChangeDrivers: () => QueryBuilder) => async (input: GetInput) => {
  return (await stakeholderChangeDrivers().insert(input, ['id']) as [{ id: string, name: string }])[0];
}

export const update = (stakeholderChangeDrivers: () => QueryBuilder) => async (input: GetInput) => {
  const { id, ...updateFields } = input;

  if (!id) {
    throw new Error("An ID must be provided to update a change driver.");
  }

  return (await stakeholderChangeDrivers().where({ id }).update(updateFields, ['id']) as [{ id: string }])[0];
}

export const deleteStakeholderChangeDriver = (stakeholderChangeDrivers: () => QueryBuilder) => async (input: GetInput) => {
  const { id } = input;

  if (!id) {
    throw new Error("An ID must be provided to delete a change driver.");
  }

  return (await stakeholderChangeDrivers().where({ id }).del() as number);
}

export async function create(data: DataClient): Promise<Data> {
  const stakeholderChangeDrivers = () => data.postgres.withSchema(Database.schema).table('StakeholderChangeDriver');

  return {
    get: get(stakeholderChangeDrivers),
    getAll: getAll(stakeholderChangeDrivers),
    update: update(stakeholderChangeDrivers),
    insert: insert(stakeholderChangeDrivers),
    deleteStakeholderChangeDriver: deleteStakeholderChangeDriver(stakeholderChangeDrivers),
  }
}

export default { create };
