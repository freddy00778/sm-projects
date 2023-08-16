/* tslint:disable await-promise */
import { QueryBuilder } from 'knex';

import { DataClient } from '../index';
import { Database } from '../../config';

export interface KeyImpactBarrier {
  id?: string;
  key_impact_id?: string;
  key_change_id?: string;
  obstacle?: string;
}

export interface Data {
  get: ReturnType<typeof get>;
  getAll: ReturnType<typeof getAll>;
  update: ReturnType<typeof update>;
  insert: ReturnType<typeof insert>;
  deleteKeyImpactBarrier: ReturnType<typeof deleteKeyImpactBarrier>;
}

export interface GetInput {
  id?: string;
  key_impact_id?: string;
  key_change_id?: string;
  obstacle?: string;
}

export const get = (query: () => QueryBuilder) => async (input: GetInput) => {
  return query().select().where(input).first();
};

export const getAll = (query: () => QueryBuilder) => async (input?: GetInput) => {
  const queries = query().select();

  if (input) {
    queries.where(input);
  }

  return queries.orderBy('created_at', 'DESC');
};

export const insert = (query: () => QueryBuilder) => async (input: GetInput) => {
  return (await query().insert(input, ['id']) as [{ id: string }])[0];
};

export const update = (query: () => QueryBuilder) => async (input: GetInput) => {
  const { id, ...updateFields } = input;

  if (!id) {
    throw new Error('An ID must be provided to update a key impact barrier.');
  }

  return (await query().where({ id }).update(updateFields, ['id']) as [{ id: string }])[0];
};

export const deleteKeyImpactBarrier = (query: () => QueryBuilder) => async (input: GetInput) => {
  const { id } = input;

  if (!id) {
    throw new Error('An ID must be provided to delete a key impact barrier.');
  }

  return (await query().where({ id }).del() as number);
};

export async function create(data: DataClient): Promise<Data> {
  const keyImpactBarrier = () => data.postgres.withSchema(Database.schema).table('KeyImpactBarrier');

  return {
    get: get(keyImpactBarrier),
    getAll: getAll(keyImpactBarrier),
    update: update(keyImpactBarrier),
    insert: insert(keyImpactBarrier),
    deleteKeyImpactBarrier: deleteKeyImpactBarrier(keyImpactBarrier),
  };
}

export default { create };
