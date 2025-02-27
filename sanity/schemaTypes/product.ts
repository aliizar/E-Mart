import { defineField, defineType } from "sanity";

export const product = defineType({
    name : "product",
    title : "Products",
    type : "document",
    fields : [
        defineField({
            name : "title",
            type : "string"
        }),
        defineField({
            name : "slug",
            type : "slug",
            options : {
                source : "title"
            }
        }),
       
        defineField({
            name : "author",
            type : "reference",
            to : {type : "author"}
        }),
        defineField({
            name : "price",
            type : "string",
            validation : (R)=>R.required().error("Must Input the price of the Product") 
        }),
        defineField({
            name : "description",
            type : "text"
        }),
        defineField({
            name : "category",
            type : "string",
            validation : (Rule)=> Rule.min(1).max(20).required().error("Please Enter the Category") 
        }),
        defineField({
            name : "image",
            type : "url",
            validation : (Rule)=> Rule.required().error("Image is Required")
        })
    ],
    
})