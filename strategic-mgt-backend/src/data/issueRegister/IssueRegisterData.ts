/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface IssueRegister {
  id?: string
  date_reported?: string;
  risk?: string;
  responsible_manager?: string
  mitigating_actions?: string
  mitigating_actions_captured?: string
  assigned_mitigator?: string
  risk_category?: string
  category_value?: string
  impact_level_risk_category?: string
  risk_assessment_value?: string
  note_id?: string
  key_change_id?: string
  project_id?: string
}


export interface Data {
  get: ReturnType<typeof get>,
  getAll: ReturnType<typeof getAll>,
  update: ReturnType<typeof update>,
  insert: ReturnType<typeof insert>,
  deleteIssueRegister: ReturnType<typeof deleteIssueRegister>,
}

export interface GetInput {
  id?: string
  date_reported?: string;
  risk?: string
  responsible_manager?: string
  mitigating_actions?: string
  mitigating_actions_captured?: string
  assigned_mitigator?: string
  risk_category?: string
  category_value?: string
  impact_level_risk_category?: string
  risk_assessment_value?: string
  note_id?: string
  key_change_id?: string
  project_id?: string
}

export const get = (query: () => QueryBuilder) => async (input: GetInput) => {
  return  query().select().where(input).first()
}

export const getAll = (query: () => QueryBuilder) => async (input?: GetInput) => {
  const queries =  query().select()

  if (input){
    queries.where(input)
  }

  return queries.orderBy("created_at", "DESC")
}

export const insert = (query: () => QueryBuilder) => async (input: GetInput) => {
  return  (await query().insert(input, ['id']) as [{id: string}])[0]
}

export const update = (query: () => QueryBuilder) => async (input: GetInput) => {
  const { id, ...updateFields } = input;

  if (!id) {
    throw new Error("An ID must be provided to update an issue register.");
  }

  return (await query().where({ id }).update(updateFields, ['id']) as [{id: string}])[0];
}

export const deleteIssueRegister = (query: () => QueryBuilder) => async (input: GetInput) => {
  const { id } = input;

  if (!id) {
    throw new Error("An ID must be provided to delete an issue register.");
  }

  return (await query().where({ id }).del() as number);
}

export async function create (data: DataClient): Promise<Data> {
  const issueRegister = () => data.postgres.withSchema(Database.schema).table('IssueRegister')

  return {
    get:          get(issueRegister),
    getAll:       getAll(issueRegister),
    update:       update(issueRegister),
    insert:       insert(issueRegister),
    deleteIssueRegister:  deleteIssueRegister(issueRegister),
  }
}

export default {create}
