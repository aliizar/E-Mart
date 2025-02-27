import { defineQuery } from "next-sanity";

export const PRODUCTSQUERY = defineQuery(`
  *[_type == "product" 
  
  ] | order(category asc) {
    _id, 
    title, 
    price,
    description,
    category,
    "image": image,  
  }
`);
