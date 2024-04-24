
exports.seed = async function(knex) {
  await knex('items').del()
  await knex('items').insert([
    {
      // id: 1,
      user_id: "599e382f-dfec-469a-8ff5-342f5b2767b1",
      type: "dress",
      colour: "black",
      size: "M/8/29",
      image: "/black-dress.png"
    },
    {
      // id: 2,
      user_id: "599e382f-dfec-469a-8ff5-342f5b2767b1",
      type: "shoes",
      colour: "black",
      size: "9/42",
      image: "/black-dress.png"
    },
    {
      // id: 3,
      user_id: "e6272fe0-94ef-416e-bc6c-be38317754f8",
      type: "shoes",
      colour: "brown",
      size: "10/43",
      image: "/boots.jpg"
    },
    {
      // id: 4,
      user_id: "5cc3463f-42fc-44b2-86b8-33016eacfa5d",
      type: "dress",
      colour: "green",
      size: "M/6/27",
      image: "/green-dress.png"
    },
    {
      // id: 5,
      user_id: "5cc3463f-42fc-44b2-86b8-33016eacfa5d",
      type: "outerwear",
      colour: "brown",
      size: "M/6/27",
      image: "/wool-coat.png"
    },
    {
      // id: 6,
      user_id: "78397302-5c72-42e4-a0f4-0337433cb5c7",
      type: "top",
      colour: "white",
      size: "XS/2/25",
      image: "/blouse.png"
    },
    {
      // id: 7,
      user_id: "c1e22735-e900-41a2-af95-4fcf4dfd3225",
      type: "dress",
      colour: "blue",
      size: "M/10/30",
      image: "/sari.jpg"
    },
    {
      // id: 8,
      user_id: "c1e22735-e900-41a2-af95-4fcf4dfd3225",
      type: "jewellery",
      colour: "necklace",
      size: "OSFA",
      image: "/necklace.jpg"
    },
  ]);
};
