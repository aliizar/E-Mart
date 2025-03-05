import { defineQuery } from "next-sanity";

export const PRODUCTSQUERY = defineQuery(`
  *[_type == "product" && ( !defined($search) || $search == "" || title match $search || category match $search || description match $search )] 
  | order(category desc) {
    _id, 
    title, 
    price,
    description,
    category,
    "image": image  
  }
`);


export const AUTHOR_BY_GOOGLE_ID_QUERY = defineQuery(`
  *[_type == "author" && id == $id][0]{
      _id,
      id,
      name,
      username,
      email,
      image
  }
`);

export const PRODUCTS_BY_AUTHOR_QUERY =
  defineQuery(`*[_type == "product" && author._ref == $id] | order(category desc) {
  _id, 
  title, 
  slug,
  author -> {
    _id, name, image,
  }, 
  description,
  category,
  image,
}`);