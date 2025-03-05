import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { PRODUCTSQUERY } from "@/sanity/lib/queries";
import ProductCard from "./ProductCard";
import { Author, Product } from "@/sanity/types";

export type ProductCardTypes = Omit<Product, "author"> & { author?: Author };

export default async function ProductCards({ query }: { query: string }) {
  const params = { search: query ?? "" };

  const response = await sanityFetch({ query: PRODUCTSQUERY, params });


  const products = response?.data ?? [];

  if (!products || !Array.isArray(products) || products.length === 0) {
    return <p className="text-center text-gray-400">No products found.</p>;
  }




  return (
    <>
      <section className="bg-black text-white py-10">
        <p className="text-30-semibold text-center">All Products</p>

        <div className="mt-7 space-y-10 px-4">
          

              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </ul>
        
        </div>
      </section>
      <SanityLive />
    </>
  );
}
