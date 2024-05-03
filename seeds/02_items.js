
exports.seed = async function(knex) {
  await knex('items').del()
  await knex('items').insert([
    {
      user_id: 1,
      title: "Sleeveless black dress",
      type: "dress",
      colour: "black",
      size: "M/8/29",
      image: "black-dress.png"
    },
    {
      user_id: 1,
      title: "Simple heels",
      type: "shoes",
      colour: "black",
      size: "9",
      image: "black-shoes.png"
    },
    {
      user_id: 2,
      title: "Winter boots",
      type: "shoes",
      colour: "brown",
      size: "10",
      image: "boots.jpg"
    },
    {
      user_id: 3,
      title: "Light green slip dress",
      type: "dress",
      colour: "green",
      size: "M/6/28",
      image: "green-dress.png"
    },
    {
      user_id: 3,
      title: "Long wool dresscoat",
      type: "outerwear",
      colour: "brown",
      size: "M/6/28",
      image: "wool-coat.png"
    },
    {
      user_id: 4,
      title: "White lace blouse",
      type: "shirt",
      colour: "white",
      size: "XS/2/26",
      image: "blouse.png"
    },
    {
      user_id: 5,
      title: "Turquoise and pink sari",
      type: "dress",
      colour: "blue",
      size: "L/10/30",
      image: "sari.jpg"
    },
    {
      user_id: 5,
      title: "Gold ring necklace",
      type: "accessory",
      colour: "gold",
      size: "N/A",
      image: "necklace.jpg"
    },
  ]);
};
