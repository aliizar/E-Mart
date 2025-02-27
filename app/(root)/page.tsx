import Section from "@/Components/Section";
import { SearchBar } from "@/Components/Search";
import ProductCards from "@/Components/CardsGrid";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {
  const search = (await searchParams).query || ""; 

  return (
    <>
      <Section />
      <SearchBar query={search} />
      <ProductCards query={search} /> 
    </>
  );
}

