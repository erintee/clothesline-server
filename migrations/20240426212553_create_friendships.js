exports.up = function(knex) {
    return knex.schema
        .createTable("friendships", (table) => {
            table.increments("id").primary();
            table
                .uuid("user1_id")
                .references("users.id")
                .onUpdate("CASCADE")
                .onDelete("CASCADE")
                .defaultTo(knex.raw("(UUID())"));
            table
                .uuid("user2_id")
                .references("users.id")
                .onUpdate("CASCADE")
                .onDelete("CASCADE")
                .defaultTo(knex.raw("(UUID())"));
            table.string("status").notNullable();
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable("friendships");
};