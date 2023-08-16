import {QueryBuilder} from 'knex'
import {DataClient} from '../index'
import {Database} from '../../config'

export interface CaseForChange {
  id?: string
  stakeholder_benefits?: string
  stakeholder_concerns?: string
  concerns_addressal?: string
  stakeholder_personal_expectations?: string
  expectations_management_response?: string
  major_risks_info?: string
  additional_info_source?: string
  project_id?: string
}

export interface Data {
  get: ReturnType<typeof get>,
  getAll: ReturnType<typeof getAll>,
  update: ReturnType<typeof update>,
  insert: ReturnType<typeof insert>,
  deleteCaseForChange: ReturnType<typeof deleteCaseForChange>,
}

export interface GetInput {
  id?: string
  stakeholder_benefits?: string
  stakeholder_concerns?: string
  concerns_addressal?: string
  stakeholder_personal_expectations?: string
  expectations_management_response?: string
  major_risks_info?: string
  additional_info_source?: string
  project_id?: string
}

export const get = (caseForChange: () => QueryBuilder) => async (input: GetInput) => {
  return caseForChange().select().where(input).first()
}

export const getAll = (caseForChange: () => QueryBuilder) => async (input: GetInput) => {
  return caseForChange().select().where(input)
}

export const insert = (caseForChange: () => QueryBuilder) => async (input: GetInput) => {
  return (await caseForChange().insert(input, ['id']) as [{id: string, name:string}])[0]
}

export const update = (caseForChange: () => QueryBuilder) => async (input: GetInput) => {
  const { project_id, ...updateFields } = input;

  if (!project_id) {
    throw new Error("An ID must be provided to update a case for change.");
  }

  return (await caseForChange().where({ project_id }).update(updateFields, ['id']) as [{id: string}])[0];
}

export const deleteCaseForChange = (caseForChange: () => QueryBuilder) => async (input: GetInput) => {
  const { id } = input;

  if (!id) {
    throw new Error("An ID must be provided to delete a case for change.");
  }

  return (await caseForChange().where({ id }).del() as number);
}

export async function create (data: DataClient): Promise<Data> {
  const caseForChange = () => data.postgres.withSchema(Database.schema).table('CaseForChange')

  return {
    get: get(caseForChange),
    getAll: getAll(caseForChange),
    update: update(caseForChange),
    insert: insert(caseForChange),
    deleteCaseForChange: deleteCaseForChange(caseForChange),
  }
}

export default {create}
