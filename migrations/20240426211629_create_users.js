exports.up = function(knex) {
    return knex.schema
        .createTable("users", (table) => {
            table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
            table.string("first_name").notNullable();
            table.string("last_name").notNullable();
            table.string("email").notNullable();
            table.string("password").notNullable();
        })
    };

exports.down = function(knex) {
    return knex.schema
    .dropTable("users");
};