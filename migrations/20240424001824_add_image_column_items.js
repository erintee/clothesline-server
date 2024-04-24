exports.up = function(knex) {
  return knex.schema.table("items", table => {
    table.string("image");
  })
};


exports.down = function(knex) {
    return knex.schema.table("items", table => {
        table.dropColumn("image");
    })
};
