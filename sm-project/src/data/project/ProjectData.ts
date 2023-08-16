/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface Project {
  id?: string
  category_id?: string;
  project_name?: string;
  initiating_dept?: string;
  main_objective?: string;
  project_sponsor_id?: string;
  project_manager_id?: string;
  initiative_date?: Date;
  project_champion_id?: string;
  technical_initiative_end_date?: string;
  change_initiative_end_date?: string;
  change_manager_id?: string;
  initiative_state?: 'Strategic-Change' | 'Start-Up' | 'Implementation' | 'Anchoring' | 'Benefits';
  final_benefits_realization_date?: Date;
  description_of_change?: string;
  why_change?: string;
  forces_driving_the_change?: string;
  forces_restraining_change?: string;
  change_implementation_data?: Date;
  who_will_be_impacted_by_change?: string;
  who_will_help?: string;
  effect_of_the_change?: string;
}


export interface Data {
  get: ReturnType<typeof get>,
  getAll: ReturnType<typeof getAll>,
  update: ReturnType<typeof update>,
  insert: ReturnType<typeof insert>,
  deleteProject: ReturnType<typeof deleteProject>,
}

export interface GetInput {
  id?: string
  category_id?: string;
  project_name?: string;
  initiating_dept?: string;
  main_objective?: string;
  project_sponsor_id?: string;
  project_manager_id?: string;
  initiative_date?: Date;
  project_champion_id?: string;
  technical_initiative_end_date?: string;
  change_initiative_end_date?: string
  change_manager_id?: string;
  initiative_state?: 'Strategic-Change' | 'Start-Up' | 'Implementation' | 'Anchoring' | 'Benefits';
  final_benefits_realization_date?: Date;
  description_of_change?: string;
  why_change?: string;
  forces_driving_the_change?: string;
  forces_restraining_change?: string;
  change_implementation_data?: Date;
  who_will_be_impacted_by_change?: string;
  who_will_help?: string;
  effect_of_the_change?: string;
}

export const get = (projects: () => QueryBuilder) => async (input: GetInput) => {
  // return  projects().select().where(input).first()
  const query = projects().select("Project.*", "ChangeApproach.type", "ChangeApproach.complexity_of_change")
      .from('Project')
      .leftJoin('ChangeApproach', 'Project.id', 'ChangeApproach.project_id');

  if (input) {
    // @ts-ignore
    query.where('Project.id', input.id);
  }

  return query.first();

}

export const getAll = (projects: () => QueryBuilder) => async (input: GetInput) => {
  // return  projects().select().where(input)
  const query = projects().select("Project.*", "ChangeApproach.type", "ChangeApproach.complexity_of_change")
      .from('Project')
      .leftJoin('ChangeApproach', 'Project.id', 'ChangeApproach.project_id');

  if (input && input.id) {
    // @ts-ignore
    query.where('Project.id', input.id);
  }else{
    query.where(input)
  }

  return query.orderBy("created_at", "DESC")

}

export const insert = (projects: () => QueryBuilder) => async (input: GetInput) => {
  return  (await projects().insert(input, ['id']) as [{id: string}])[0]
}

export const update = (projects: () => QueryBuilder) => async (input: GetInput) => {
  const { id, ...updateFields } = input;

  if (!id) {
    throw new Error("An ID must be provided to update a project.");
  }

  return (await projects().where({ id }).update(updateFields, ['id']) as [{id: string}])[0];
}

export const deleteProject = (projects: () => QueryBuilder) => async (input: GetInput) => {
  const { id } = input;

  if (!id) {
    throw new Error("An ID must be provided to delete a project.");
  }

  return (await projects().where({ id }).del() as number);
}

export async function create (data: DataClient): Promise<Data> {
  const projects = () => data.postgres.withSchema(Database.schema).table('Project')

  return {
    get:           get(projects),
    getAll:        getAll(projects),
    update:        update(projects),
    insert:        insert(projects),
    deleteProject: deleteProject(projects),
  }
}

export default {create}