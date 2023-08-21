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
  getFinalDraft: ReturnType<typeof getFinalDraft>,
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

export const getFinalDraft = (caseForChange: () => QueryBuilder) => async (input: GetInput) => {
  const query = caseForChange()
      .select("Project.id as project_id",
          "Project.project_name",
          "Project.description_of_change",
          "Project.why_change",
          "Project.change_implementation_data as when_will_change_be_implemented",
          "Project.who_will_be_impacted_by_change",
          "Project.who_will_help",
          "Project.effect_of_the_change as who_will_be_most_affected_by_the_change",
          "CaseForChange.stakeholder_benefits as what_is_in_it_for_the_affected_stakeholders",
          "CaseForChange.stakeholder_concerns as what_may_affected_stakeholders_be_concerned_about",
          "CaseForChange.concerns_addressal as what_would_you_like_to_say_address_these_concerns",
          "CaseForChange.stakeholder_personal_expectations as what_would_you_like_to_manage_these_expectations",
          "CaseForChange.major_risks_or_info as any_major_risk",
          "CaseForChange.expectations_management_response as future_communication",
      )
      .from('CaseForChange')
      .leftJoin('Project', 'Project.id', 'CaseForChange.project_id')
      .where(input)

  return query.first();
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
    getFinalDraft: getFinalDraft(caseForChange),
    getAll: getAll(caseForChange),
    update: update(caseForChange),
    insert: insert(caseForChange),
    deleteCaseForChange: deleteCaseForChange(caseForChange),
  }
}

export default {create}
