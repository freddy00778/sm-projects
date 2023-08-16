import {DataProvider} from "../src/data";
import {Database} from "../src/config";
import * as bcrypt from  "bcrypt";
import * as faker from "faker";

exports.seed = async function() {
    const provider = await DataProvider.create()
    const permissionsRole = () => provider.postgres.withSchema(Database.schema).table('PermissionsRole')
    const roleUser        = () => provider.postgres.withSchema(Database.schema).table('RoleUser')
    const permission      = () => provider.postgres.withSchema(Database.schema).table('Permission')
    const role =            () => provider.postgres.withSchema(Database.schema).table('Role')
    const organisation =    () => provider.postgres.withSchema(Database.schema).table('Organisation')
    const user =            () => provider.postgres.withSchema(Database.schema).table('User')
    const project =         () => provider.postgres.withSchema(Database.schema).table('Project')
// Deletes all existing entries
    await permissionsRole().del()
    await roleUser().del()
    await permission().del()
    await role().del()
    await user().del()
    await project().del()
    await organisation().del()

    // Inserts seed entries for Organisation
    const organisations = await organisation().insert([
        {
            name: 'Test Organisation',
            legal_name: 'Test Legal Name',
            type: 'Public',
            industry: 'Software',
            size: 500,
            address: '123 Test St',
            city: 'Test City',
            state_province: 'Test State',
            zip_postal_code: '12345',
            country: 'Test Country',
            website_url: 'https://test.com',
            contact_email: 'test@test.com',
            contact_phone_number: '1234567890',
            date_of_establishment: new Date('2000-01-01'),
            tax_id_ein: '123456789',
            logo_url: 'https://test.com/logo.png',
            description: 'Test Organisation Description',
            status: 'active'
        },
        {
            name: 'Test Organisation 2',
            legal_name: 'Test Organisation 2 Legal Name',
            type: 'Public',
            industry: 'Human Resource',
            size: 500,
            address: '123 Test St',
            city: 'Test City',
            state_province: 'Test State',
            zip_postal_code: '12345',
            country: 'Test Country',
            website_url: 'https://test.com',
            contact_email: 'test@test.com',
            contact_phone_number: '123456789102',
            date_of_establishment: new Date('2000-01-01'),
            tax_id_ein: '123456789',
            logo_url: 'https://test.com/logo.png',
            description: 'Test Organisation Description',
            status: 'active'
        },
    ]).returning('*')

    // Inserts seed entries for Users
    const users = await user().insert([
        {
            first_name: 'Frederick',
            last_name: 'Ankamah',
            username: 'freddy',
            email: 'frederickankamah988@gmail.com',
            password: bcrypt.hashSync("password", 10),
            date_of_birth: new Date('1990-01-01'),
            phone_number: '0987654321',
            address: '456 User St',
            city: 'User City',
            state_province: 'User State',
            zip_postal_code: '54321',
            country: 'User Country',
            profile_picture_url: 'https://test.com/user.png',
            account_creation_date: new Date('1990-01-01'),
            account_last_update_date: new Date('1990-01-01'),
            status: 'active',
            last_login_date:new Date('1990-01-01'),
            last_login_ip: '192.168.1.1',
            organisation_id: organisations[0].id,},
        {
            first_name: 'Monique',
            last_name: 'Monique',
            password: bcrypt.hashSync("password", 10),
            username: 'monique',
            email: 'monique@changeverve.co.za',
            organisation_id: organisations[1].id,},
    ]).returning('*')

    // Inserts seed entries for Role
    const roles = await role().insert([
        {name: 'Administrator',},
        {name: 'Project Sponsor'},
        {name: 'Project Champion'},
        {name: 'Project Manager'},
        {name: 'Change Manager'},
        // Add more roles as needed
    ]).returning('*')

    // Inserts seed entries for Permission
    const permissions = await permission().insert([
        {name: 'Permission 1'},
        {name: 'Permission 2'},
        {name: 'Permission 3'},
        {name: 'Permission 4'},
    ]).returning('*')

    // Inserts seed entries for RoleUser
    await roleUser().insert([
        {user_id: users[0].id, role_id: roles[0].id},
        {user_id: users[1].id, role_id: roles[1].id},
    ])

    // Inserts seed entries for PermissionsRole
    await permissionsRole().insert([
        {permissions_id: permissions[0].id, role_id: roles[0].id},
        {permissions_id: permissions[1].id, role_id: roles[1].id},
        {permissions_id: permissions[2].id, role_id: roles[2].id},
        {permissions_id: permissions[3].id, role_id: roles[3].id},
    ])

    await project().insert([
            {
                id: faker.datatype.uuid(),
                category_id: faker.datatype.uuid(),
                project_name: faker.commerce.productName(),
                initiating_dept: faker.commerce.department(),
                main_objective: faker.lorem.sentence(),
                project_sponsor_id: faker.datatype.uuid(),
                project_manager_id: faker.datatype.uuid(),
                initiative_date: faker.date.past(),
                project_champion_id: faker.datatype.uuid(),
                technical_initiative_end_date: faker.date.future(),
                change_manager_id: faker.datatype.uuid(),
                initiative_state: faker.random.arrayElement(["Strategic-Change", "Start-Up", "Implementation", "Anchoring","Benefits"]),
                final_benefits_realization_date: faker.date.future(),
                description_of_change: faker.lorem.paragraph(),
                why_change: faker.lorem.paragraph(),
                forces_driving_the_change: faker.lorem.paragraph(),
                forces_restraining_change: faker.lorem.paragraph(),
                change_implementation_data: faker.date.future(),
                who_will_be_impacted_by_change: faker.name.findName(),
                who_will_help: faker.name.findName(),
                effect_of_the_change: faker.lorem.paragraph(),
                organisation_id: organisations[1].id,
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
};

