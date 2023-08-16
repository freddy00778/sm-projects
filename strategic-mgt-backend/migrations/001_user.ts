/* tslint:disable await-promise */
import Knex from 'knex'

import MigrationUtils from '../src/utils/MigrationUtils'
import {Database} from '../src/config'

export async function up (knex: Knex) {
  const schema = MigrationUtils.schema(knex)

  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
  // await knex.raw(`CREATE SCHEMA ${Database.schema};`)

  await knex.schema.withSchema(Database.schema).createTable('Organisation', table => {
    const columns = schema(table);
    columns.primaryUuid();
    table.string('name', 255);
    table.string('legal_name', 255);
    table.string('type', 255);
    table.string('industry', 255);
    table.integer('size');
    table.string('address', 255);
    table.string('city', 255);
    table.string('state_province', 255);
    table.string('zip_postal_code', 20);
    table.string('country', 255);
    table.string('website_url', 255);
    table.string('contact_email', 255);
    table.string('contact_phone_number', 20);
    table.date('date_of_establishment');
    table.string('tax_id_ein', 50);
    table.string('logo_url', 255);
    table.string('description', 255);
    table.string('status', 20);
  });

  await knex.schema.withSchema(Database.schema).createTable('User', table => {
    const columns = schema(table);
    columns.primaryUuid();
    table.string('first_name', 255);
    table.string('last_name', 255);
    table.string('username', 255);
    table.string('email', 255);
    table.string('password', 255);
    table.date('date_of_birth');
    table.string('phone_number', 20);
    table.string('address', 255);
    table.string('city', 255);
    table.string('state_province', 255);
    table.string('zip_postal_code', 20);
    table.string('country', 255);
    table.string('profile_picture_url', 255);
    table.timestamp('account_creation_date');
    table.timestamp('account_last_update_date');
    table.string('status', 20);
    table.timestamp('last_login_date');
    table.string('last_login_ip', 50);
    columns.foreignUuid('organisation_id', {column: 'id', table: `${Database.schema}.Organisation`}, true).nullable()
  });

}

export function down (_knex: Knex) {
  throw new Error('Downward migrations are not supported. Restore from backup.')
}
