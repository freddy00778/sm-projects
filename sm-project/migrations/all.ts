/* tslint:disable await-promise */
import Knex from 'knex'

import MigrationUtils from '../src/utils/MigrationUtils'
import {Database} from '../src/config'

export async function up (knex: Knex) {
    const schema = MigrationUtils.schema(knex)

    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    // await knex.raw(`CREATE SCHEMA ${Database.schema};`)

    // Roles Table
    await knex.schema.withSchema(Database.schema).createTable('Role', table => {
        const columns = schema(table)
        columns.primaryUuid()

        table.string('name')
        table.string('display_name', 255)
        table.string('description', 255)
        table.timestamp('created_at')
        table.timestamp('updated_at')
    })

    // Locales Table
    await knex.schema.withSchema(Database.schema).createTable('Locale', table => {
        const columns = schema(table)
        columns.primaryUuid()
        table.string('locale', 2)
        table.string('value', 255)
        table.string('flag')
    })

// Sites Table
    await knex.schema.withSchema(Database.schema).createTable('Site', table => {
        const columns = schema(table)
        columns.primaryUuid()
        table.string('domain')
        columns.foreignUuid('locale_id', {column: 'id', table: `${Database.schema}.Locale`}, true)
            .nullable()
    })

// Role_User Table
    await knex.schema.withSchema(Database.schema).createTable('RoleUser', table => {
        const columns = schema(table)
        columns.primaryUuid()
        columns.foreignUuid('user_id', {column: 'id', table: `${Database.schema}.User`}, true).nullable()
        columns.foreignUuid('role_id', {column: 'id', table: `${Database.schema}.Role`}, true).nullable()
    })

// Permissions Table
    await knex.schema.withSchema(Database.schema).createTable('Permission', table => {
        const columns = schema(table)
        columns.primaryUuid()
        table.string('name', 255)
        table.string('display_name', 255)
        table.string('description', 255)
        table.timestamp('created_at')
        table.timestamp('updated_at')
    })

// Permissions_Role Table
    await knex.schema.withSchema(Database.schema).createTable('PermissionsRole', table => {
        const columns = schema(table)
        columns.primaryUuid()
        columns.foreignUuid('permissions_id', {column: 'id', table: `${Database.schema}.Permission`}, true).nullable()
        columns.foreignUuid('role_id', {column: 'id', table: `${Database.schema}.Role`}, true).nullable()
    })

// Options Table
    await knex.schema.withSchema(Database.schema).createTable('Option', table => {
        const columns = schema(table)
        columns.primaryUuid()
        columns.foreignUuid('site_id', {column: 'id', table: `${Database.schema}.Site`}, true).nullable()
        table.string('option')
        table.text('value', 'longtext')
    })

// Password_Resets Table
    await knex.schema.withSchema(Database.schema).createTable('PasswordReset', table => {
        const columns = schema(table)
        columns.primaryUuid()
        columns.foreignUuid('user_id', {column: 'id', table: `${Database.schema}.User`}, true).nullable()
        table.string('token', 32)
    })

// Category Table
    await knex.schema.withSchema(Database.schema).createTable('Category', table => {
        const columns = schema(table)
        columns.primaryUuid()
        table.string('name')
    })
}

export function down (_knex: Knex) {
    throw new Error('Downward migrations are not supported. Restore from backup.')
}
