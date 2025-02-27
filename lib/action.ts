"use server";

import NextAuth from "next-auth";
import { authOptions } from "@/auth";
 
const auth = NextAuth(authOptions);
import { parseServerActionResponse } from "@/lib/utils";
import { Writeclient } from "@/sanity/lib/write-Client";
import slugify from "slugify";

export const createProduct = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: any,
  form: FormData,
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, description, category, image , price } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch"),
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const product = {
      title,
      description,
      category,
      image,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      price,
    };

    const result = await Writeclient.create({ _type: "product", ...product });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};