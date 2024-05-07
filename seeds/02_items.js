
exports.seed = async function(knex) {
  await knex('items').del()
  await knex('items').insert([
    {
      user_id: 1,
      title: "Sleeveless black dress",
      type: "dress",
      colour: "black",
      size: "L/12/31",
      image: "black-dress.png"
    },
    {
      user_id: 1,
      title: "Black pumps",
      type: "shoes",
      colour: "black",
      size: "9",
      image: "black-shoes.png"
    },
    {
      user_id: 1,
      title: "Parka",
      type: "outerwear",
      colour: "grey",
      size: "L/10/30",
      image: "parka.jpg"
    },
    {
      user_id: 2,
      title: "Winter boots",
      type: "shoes",
      colour: "brown",
      size: "9",
      image: "boots.jpg"
    },
    {
      user_id: 2,
      title: "Lace blouse",
      type: "shirt",
      colour: "white",
      size: "S/4/27",
      image: "blouse.png"
    },
    {
      user_id: 2,
      title: "MEC Rain jacket",
      type: "outerwear",
      colour: "black",
      size: "S/4/27",
      image: "rain-jacket.jpg"
    },
    {
      user_id: 3,
      title: "Light green slip dress",
      type: "dress",
      colour: "green",
      size: "M/8/29",
      image: "green-dress.png"
    },
    {
      user_id: 3,
      title: "Long wool dresscoat",
      type: "outerwear",
      colour: "brown",
      size: "L/10/30",
      image: "wool-coat.png"
    },
    {
      user_id: 4,
      title: "Pleated skirt",
      type: "skirt",
      colour: "green",
      size: "XS/2/26",
      image: "pleat-skirt.png"
    },
    {
      user_id: 4,
      title: "DW Watch",
      type: "accessory",
      colour: "gold",
      size: "N/A",
      image: "dw-watch.png"
    },
    {
      user_id: 4,
      title: "Patterned skirt",
      type: "skirt",
      colour: "white",
      size: "XS/2/26",
      image: "pattern-skirt.jpg"
    },
    {
      user_id: 5,
      title: "Shirt dress",
      type: "dress",
      colour: "grey",
      size: "L/10/30",
      image: "fo-dress.png"
    },
    {
      user_id: 5,
      title: "Velvet Heels",
      type: "shoes",
      colour: "white",
      size: "8",
      image: "se-heels.png"
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
