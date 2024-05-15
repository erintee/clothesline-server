exports.up = function(knex) {
    return knex.schema
        .createTable("friendships", (table) => {
            table.increments("id").primary();
            table
                .integer("user1_id")
                .unsigned()
                .references("users.id")
                .onUpdate("CASCADE")
                .onDelete("CASCADE")
            table
                .integer("user2_id")
                .unsigned()
                .references("users.id")
                .onUpdate("CASCADE")
                .onDelete("CASCADE")
            table.string("status").notNullable();
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable("friendships");
};