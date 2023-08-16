/* tslint:disable await-promise */
import Knex from 'knex'

import MigrationUtils from '../src/utils/MigrationUtils'
import {Database} from '../src/config'

export async function up (knex: Knex) {
    const schema = MigrationUtils.schema(knex)
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

    await knex.schema.withSchema(Database.schema).createTable('Department', table => {
        const columns = schema(table)
        columns.primaryUuid()
        columns.foreignUuid('organisation_id', {column: 'id', table: `${Database.schema}.Organisation`}, false).nullable()
        table.string('name')
    })
}

export function down (_knex: Knex) {
    throw new Error('Downward migrations are not supported. Restore from backup.')
}
