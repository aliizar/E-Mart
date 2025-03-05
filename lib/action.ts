"use server";
import { parseServerActionResponse } from "@/lib/utils";
import { Writeclient } from "@/sanity/lib/write-Client";
import slugify from "slugify";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createProduct = async (state: any, form: FormData) => {
  const session = await getServerSession(authOptions);
  console.log("Server Session:", session); 

  if (!session || !session.user) {
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  }

  const title = form.get("title") as string;
  const description = form.get("description") as string;
  const category = form.get("category") as string;
  const link = form.get("link") as string;
  const price = form.get("price") as string;

  const slug = slugify(title, { lower: true, strict: true });

  try {
    const product = {
      _type: "product",
      title,
      description,
      category,
      price: parseFloat(price),
      image: link,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session.user.id, 
      },
    };

    const result = await Writeclient.create(product);

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return parseServerActionResponse({
      error: error instanceof Error ? error.message : "An unexpected error occurred",
      status: "ERROR",
    });
  }
};