/* tslint:disable await-promise */
import Knex from 'knex'

import MigrationUtils from '../src/utils/MigrationUtils'
import {Database} from '../src/config'

export async function up (knex: Knex) {
  const schema = MigrationUtils.schema(knex)

  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
  // await knex.raw(`CREATE SCHEMA ${Database.schema};`)

  await knex.schema.withSchema(Database.schema).createTable('Scope', table => {
    const columns = schema(table)
    columns.primaryUuid()
    table.timestamps(true, true)
    table.text('description').nullable()
  })

  await knex.schema.withSchema(Database.schema).createTable('Division', table => {
    const columns = schema(table)
    columns.primaryUuid()
    table.timestamps(true, true)
    table.text('name').nullable()
    table.text('description').nullable()
    columns.foreignUuid('organisation_id', {column: 'id', table: `${Database.schema}.Organisation`}, true).nullable()
  })

  await knex.schema.withSchema(Database.schema).createTable('HighLevelPlan', table => {
    const columns = schema(table)
    columns.primaryUuid()
    table.timestamps(true, true)
    table.text('description').nullable()
    table.string('project_id').nullable()
    table.integer('order').nullable()
  })

  await knex.schema.withSchema(Database.schema).createTable('Project', table => {
    const columns = schema(table)
    columns.primaryUuid()
    table.timestamps(true, true)
    table.string('category_id').nullable()
    table.string('project_name').nullable()
    table.string('initiating_dept').nullable()
    table.text('main_objective').nullable()
    table.string('project_sponsor_id').nullable()
    table.string('project_manager_id').nullable()
    table.date('initiative_date').nullable()
    table.string('project_champion_id').nullable()
    table.string('technical_initiative_end_date').nullable()
    table.string('change_manager_id').nullable()
    table.enum('initiative_state',["Strategic-Change", "Start-Up", "Implementation", "Anchoring","Benefits"]).nullable()
    table.date('final_benefits_realization_date').nullable()
    table.text('description_of_change').nullable()
    table.text('why_change').nullable()
    table.text('forces_driving_the_change').nullable()
    table.text('forces_restraining_change').nullable()
    table.date('change_implementation_data').nullable()
    table.text('who_will_be_impacted_by_change').nullable()
    table.text('who_will_help').nullable()
    table.text('effect_of_the_change').nullable()
    columns.foreignUuid('organisation_id', {column: 'id', table: `${Database.schema}.Organisation`}, true).nullable()
  })

  await knex.schema.withSchema(Database.schema).createTable('Objective', table => {
    const columns = schema(table)
    columns.primaryUuid()
    table.timestamps(true, true)
    table.text('desired_out_come').comment("What do you want to see?").nullable()
    table.text('implementation_risk').comment("Risk of not implementing the change").nullable()
    table.text('change_benefits').comment("Benefits of the change").nullable()
    table.text('benefit_measurement').comment("How will the benefit be measured?").nullable()
    columns.foreignUuid('project_id', {column: 'id', table: `${Database.schema}.Project`}, true).nullable()
  })

  await knex.schema.withSchema(Database.schema).createTable('Stakeholder', table => {
    const columns = schema(table)
    columns.primaryUuid()
    table.timestamps(true, true)
    table.text('impacted_parties').comment("Who will be impacted/affected by this key change?").nullable()
    table.text('department_unit').comment("Division/Department/Unit").nullable()
    table.string('technology').comment("Technology").nullable()
    table.string('technology_department_unit').comment("Technology department unit").nullable()
    table.string('organisation').comment("Organisation").nullable()
    table.string('organisation_department_unit').comment("Organisation department unit").nullable()
    table.string('governance_reporting').comment("Governance_Reporting").nullable()
    table.string('governance_reporting_department_unit').comment("Governance_Reporting").nullable()
    table.string('asset_type').nullable()
    columns
        .foreignUuid('project_id', {column: 'id', table: `${Database.schema}.Project`}, true)
        .nullable()
  })

  await knex.schema.withSchema(Database.schema).createTable('DecisionRegister', table => {
    const columns = schema(table)
    columns.primaryUuid()
    table.timestamps(true, true);
    table.text('decision_description').nullable();
    table.date('date1').nullable();
    table.string('topic').nullable();
    table.string('context');
    table.string('forum');
    table.string('department');
    table.date('date2');
    table.string('approved_by');
    table.string('nextStep');
    table.string('comments');
    table.string('actioned_by');
    columns
        .foreignUuid('project_id', {column: 'id', table: `${Database.schema}.Project`}, true)
        .nullable()
  });

  await knex.schema.withSchema(Database.schema).createTable('LessonsLog', table => {
    const columns = schema(table)
    columns.primaryUuid()
    table.timestamps(true, true);
    table.text('type').nullable();
    table.date('date_logged').nullable();
    table.string('description').nullable();
    table.string('logged_by');
    columns
        .foreignUuid('project_id', {column: 'id', table: `${Database.schema}.Project`}, true)
        .nullable()
  });

  await knex.schema.withSchema(Database.schema).createTable('KeyChange', table => {
    const columns = schema(table)
    columns.primaryUuid()
    table.timestamps(true, true);
    table.string('title').nullable();
    table.string('value').nullable();
    table.text('as_is').nullable();
    table.text('to_be');
    columns
        .foreignUuid('project_id', {column: 'id', table: `${Database.schema}.Project`}, true)
        .nullable()
  });

  await knex.schema.withSchema(Database.schema).createTable('ChangeApproach', table => {
    const columns = schema(table)
    columns.primaryUuid()
    table.timestamps(true, true);
    table.string('type').nullable();
    table.string('complexity_of_change').nullable();
    table.string('change_readiness_start_up').nullable();
    table.string('change_readiness_implementation').nullable();
    table.string('change_readiness_anchoring').nullable();
    columns
        .foreignUuid('project_id', {column: 'id', table: `${Database.schema}.Project`}, true)
        .nullable()
  });

  await knex.schema.withSchema(Database.schema).createTable('BudgetItem', table => {
    const columns = schema(table)
    columns.primaryUuid()
    table.timestamps(true, true);
    table.string('name').nullable();
  });

  await knex.schema.withSchema(Database.schema).createTable('Budget', table => {
    const columns = schema(table)
    columns.primaryUuid()
    table.timestamps(true, true);
    table.string('budget_item_id').nullable();
    table.boolean('do_we_need_it').defaultTo(false);
    table.integer('how_many_people');
    table.decimal('what_do_we_expect_it_to_cost').nullable();
    table.decimal('allocated_budget_requirement').defaultTo(0);
    table.decimal('allocated_budget').defaultTo(0);
    table.decimal('actual_spend').defaultTo(0);
    columns
        .foreignUuid('project_id', {column: 'id', table: `${Database.schema}.Project`}, true)
        .nullable()
  });

  await knex.schema.withSchema(Database.schema).createTable('CaseForChange', table => {
    const columns = schema(table)
    columns.primaryUuid()
    table.timestamps(true, true);
    table.text('stakeholder_benefits')
        .comment("What is in it for the affected stakeholders? What would the benefits be to the affected stakeholders?").nullable();
    table.text('stakeholder_concerns')
        .comment("What may affected stakeholders be concerned about ( that will affect them personally?)")
        .nullable();
    table.text('concerns_addressal')
        .comment("What would you like to say to address these concerns.")
        .nullable();
    table.text('stakeholder_personal_expectations')
        .comment("Only complete this if relevant- What may affected stakeholders be expecting (that will benefit them personally? )")
        .nullable()
    table.text('expectations_management_response')
        .comment("What would you like to say to manage these expectations?").nullable()

    table.text('major_risks_or_info')
        .comment("Any major risk or information stakeholders should take not of?").nullable()
    table.text('additional_info_source')
        .comment("Where can they find more information? / Who will be providing more information and when in future?").nullable()
    columns.foreignUuid('project_id', {column: 'id', table: `${Database.schema}.Project`}, true).nullable()

  });

  await knex.schema.withSchema(Database.schema).createTable('Note', table => {
    const columns = schema(table)
    columns.primaryUuid()
    table.timestamps(true, true)
    table.date("date_reported").nullable()
    table.text("risk").nullable()
    table.text("details")
    table.string("previous_risk_severity").nullable()
    table.string("previous_rating").nullable()
    table.string('risk_assessment_value').nullable()
    table.date('date').nullable()
    columns
        .foreignUuid('project_id', {column: 'id', table: `${Database.schema}.Project`}, true)
        .nullable()
  });

  await knex.schema.withSchema(Database.schema).createTable('RiskRegister', table => {
    const columns = schema(table)
    columns.primaryUuid()
    table.timestamps(true, true)
    table.date("date_reported").nullable()
    table.text("risk").nullable()
    table.string("responsible_manager").nullable()
    table.text("mitigating_actions")
    table.string("mitigating_actions_captured").nullable()
    table.string("assigned_mitigator").comment("Responsible person to action mitigating action").nullable()
    table.string('risk_category').nullable()
    table.string('category_value').nullable()
    table.string("impact_level").nullable()
    table.string("impact_level_risk_category").nullable()
    table.string('risk_assessment_value').nullable()
    table.string('note_id').nullable()
    table.string('key_change_id').nullable()
    columns.foreignUuid('project_id', {column: 'id', table: `${Database.schema}.Project`}, true).nullable()
  });

}

export function down (_knex: Knex) {
  throw new Error('Downward migrations are not supported. Restore from backup.')
}
