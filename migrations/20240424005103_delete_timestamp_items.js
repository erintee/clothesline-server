exports.up = function(knex) {
    return knex.schema.alterTable('items', function (table) {
        table.dropColumn('created_at');
  });
}
  
  
  exports.down = function(knex) {
      return knex.schema.table("items", table => {
        table.string("image");
    })
  };