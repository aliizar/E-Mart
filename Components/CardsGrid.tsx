import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { PRODUCTSQUERY } from "@/sanity/lib/queries";
import ProductCard from "./ProductCard";
import { Author, Product } from "@/sanity/types";

export type ProductCardTypes = Omit<Product, "author"> & { author?: Author };

export default async function ProductCards({ query }: { query : string }) {
  
  const params = { search: query || null }
  

  const response = await sanityFetch({ query: PRODUCTSQUERY, params });
  console.log(params);
  
  const products = response ?? [];
  if (!Array.isArray(products)) {
    return <p className="text-center text-gray-400">No products found.</p>;
  }

  const groupedProducts: Record<string, ProductCardTypes[]> = products.reduce((acc, product) => {
    const category = product.category || "Uncategorized"; 
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {} as Record<string, ProductCardTypes[]>); 

  console.log(products);
  console.log(groupedProducts);
  


  return (
    <>
      <section className="bg-black text-white py-10">
        <p className="text-30-semibold text-center">All Products</p>

        <div className="mt-7 space-y-10 px-4">
          {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
            <div key={category} className="mb-8">
              <h2 className="text-3xl font-bold mb-4 text-gray-300">{category}</h2>

              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <SanityLive />
    </>
  );
}
