
exports.up = function(knex) {
    return knex.schema
        .createTable("items", (table) => {
            table.increments("id").primary();
            table
                .uuid("user_id")
                .references("users.id")
                .onUpdate("CASCADE")
                .onDelete("CASCADE")
                .defaultTo(knex.raw("(UUID())"));
            table.string("type").notNullable();
            table.string("colour").notNullable();
            table.string("size").notNullable();
            table.timestamp("created_at").defaultTo(knex.fn.now());
        })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable("items")
};
