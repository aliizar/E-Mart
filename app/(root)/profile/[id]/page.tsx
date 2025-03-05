import React from 'react'
import { PRODUCTS_BY_AUTHOR_QUERY } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';

import NextAuth from "next-auth";
import { authOptions } from "@/auth";
import ProductCard from '@/Components/ProductCard';
import { ProductCardTypes } from '@/Components/CardsGrid';
const UserProfile = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    const session = NextAuth(authOptions);
    console.log(session?._id)
    const Author_Products = await client.fetch(PRODUCTS_BY_AUTHOR_QUERY , session?.id)
    console.log(id);
  return (
    <>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Author_Products.map((product : ProductCardTypes) => (
                  <>
                      <ProductCard key={product._id} product={product} />
                  </>
                ))}
    </ul>
    
    </>
  )
}

export default UserProfile
