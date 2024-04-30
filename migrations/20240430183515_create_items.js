
exports.up = function(knex) {
    return knex.schema
        .createTable("items", (table) => {
            table.increments("id").primary();
            table
                .integer("user_id")
                .unsigned()
                .references("users.id")
                .onUpdate("CASCADE")
                .onDelete("CASCADE")
            table.string("title").notNullable();
            table.string("type").notNullable();
            table.string("colour").notNullable();
            table.string("size").notNullable();
            table.string("image");
        })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable("items")
};