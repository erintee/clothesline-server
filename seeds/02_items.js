
exports.seed = async function(knex) {
  await knex('items').del()
  await knex('items').insert([
    {
      user_id: "599e382f-dfec-469a-8ff5-342f5b2767b1",
      title: "Sleeveless black dress",
      type: "dress",
      colour: "black",
      size: "M/8/29",
      image: "black-dress.png"
    },
    {
      user_id: "599e382f-dfec-469a-8ff5-342f5b2767b1",
      title: "Simple heels",
      type: "shoes",
      colour: "black",
      size: "9/42",
      image: "black-shoes.png"
    },
    {
      user_id: "e6272fe0-94ef-416e-bc6c-be38317754f8",
      title: "Winter boots",
      type: "shoes",
      colour: "brown",
      size: "10/43",
      image: "boots.jpg"
    },
    {
      user_id: "5cc3463f-42fc-44b2-86b8-33016eacfa5d",
      title: "Light green slip dress",
      type: "dress",
      colour: "green",
      size: "M/6/27",
      image: "green-dress.png"
    },
    {
      user_id: "5cc3463f-42fc-44b2-86b8-33016eacfa5d",
      title: "Long wool dresscoat",
      type: "outerwear",
      colour: "brown",
      size: "M/6/27",
      image: "wool-coat.png"
    },
    {
      user_id: "78397302-5c72-42e4-a0f4-0337433cb5c7",
      title: "White lace blouse",
      type: "top",
      colour: "white",
      size: "XS/2/25",
      image: "blouse.png"
    },
    {
      user_id: "c1e22735-e900-41a2-af95-4fcf4dfd3225",
      title: "Turquoise and pink sari",
      type: "dress",
      colour: "blue",
      size: "M/10/30",
      image: "sari.jpg"
    },
    {
      user_id: "c1e22735-e900-41a2-af95-4fcf4dfd3225",
      title: "Gold ring necklace",
      type: "jewellery",
      colour: "necklace",
      size: "OSFA",
      image: "necklace.jpg"
    },
  ]);
};
