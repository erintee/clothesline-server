exports.up = function(knex) {
    return knex.schema
        .createTable("requests", (table) => {
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
            table
                .integer("item_id")
                .unsigned()
                .references("items.id")
                .onUpdate("CASCADE")
                .onDelete("CASCADE")
            table.string("message").notNullable();
            table.string("status").notNullable();
            table.string("date").notNullable();
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable("requests");
};