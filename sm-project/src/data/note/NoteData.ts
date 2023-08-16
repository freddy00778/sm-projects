/* tslint:disable await-promise */
import { QueryBuilder } from 'knex';

import { DataClient } from '../index';
import { Database } from '../../config';

export interface Note {
  id?: string;
  date_reported?: string;
  details?: string;
  previous_risk_severity?: string;
  previous_rating?: string;
  risk_assessment_value?: string;
  key_change_id?: string;
  project_id?: string;
}

export interface Data {
  get: ReturnType<typeof get>,
  getAll: ReturnType<typeof getAll>,
  update: ReturnType<typeof update>,
  insert: ReturnType<typeof insert>,
  deleteNote: ReturnType<typeof deleteNote>,
}

export interface GetInput {
  id?: string;
  date_reported?: string;
  details?: string;
  previous_risk_severity?: string;
  previous_rating?: string;
  risk_assessment_value?: string;
  key_change_id?: string;
  project_id?: string;
}

export const get = (notes: () => QueryBuilder) => async (input: GetInput) => {
  return notes().select().where(input).first();
};

export const getAll = (notes: () => QueryBuilder) => async (input: GetInput) => {
  return notes().select().where(input);
};

export const insert = (notes: () => QueryBuilder) => async (input: GetInput) => {
  return (await notes().insert(input, ['id']) as [{ id: string, name: string }])[0];
};

export const update = (notes: () => QueryBuilder) => async (input: GetInput) => {
  const { id, ...updateFields } = input;

  if (!id) {
    throw new Error("An ID must be provided to update a note.");
  }

  return (await notes().where({ id }).update(updateFields, ['id']) as [{ id: string }])[0];
};

export const deleteNote = (notes: () => QueryBuilder) => async (input: GetInput) => {
  const { id } = input;

  if (!id) {
    throw new Error("An ID must be provided to delete a note.");
  }

  return (await notes().where({ id }).del() as number);
};

export async function create(data: DataClient): Promise<Data> {
  const notes = () => data.postgres.withSchema(Database.schema).table('Note');

  return {
    get: get(notes),
    getAll: getAll(notes),
    update: update(notes),
    insert: insert(notes),
    deleteNote: deleteNote(notes),
  };
}

export default { create };
