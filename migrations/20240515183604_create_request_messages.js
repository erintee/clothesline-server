exports.up = function(knex) {
    return knex.schema
        .createTable("request_messages", (table) => {
            table.increments("id").primary();
            table
                .integer("request_id")
                .unsigned()
                .references("requests.id")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table
                .integer("user_id")
                .unsigned()
                .references("users.id")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table
                .string("message");
            table
                .timestamp("sent_at")
                .defaultTo(knex.fn.now());
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable("request_messages");
};