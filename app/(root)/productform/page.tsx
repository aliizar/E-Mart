"use client";
import React, { useActionState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { createProduct } from "@/lib/action";
import { useRouter } from "next/navigation"; // ✅ Correct import for App Router
import { formSchema } from "@/lib/Validation";

const Page = () => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        image: formData.get("image") as string, // ✅ Corrected key
        price: formData.get("price") as string, // ✅ Corrected key
      };

      await formSchema.parseAsync(formValues);
      const result = await createProduct(prevState, formData);

      if (result.status === "SUCCESS") {
        router.push("/");
      }

      return result;
    } catch (error) {
      console.log(error);
      
      return { ...prevState, error: "Validation failed", status: "ERROR" };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <form action={formAction} ref={formRef} className="w-full max-w-3xl p-8">
        <h2 className="text-3xl font-semibold text-white text-center mb-8">
          Submit Your Product Details
        </h2>

        {["title", "description", "category", "image", "price"].map((field) => (
          <div key={field} className="relative mb-8">
            <input
              id={field}
              name={field}
              type="text"
              className="w-full bg-black border border-gray-600 text-white p-5 text-lg focus:outline-none focus:ring-2 focus:ring-gray-600 peer transition-all duration-300"
              required
              placeholder={`Enter Product ${field}`}
            />
          </div>
        ))}

        <div className="text-center">
          <button
            type="submit"
            className="w-full text-white bg-gray-600 hover:bg-gray-500 transition-all duration-300 px-6 py-4 text-lg rounded-lg shadow-md hover:shadow-gray-600/50"
            disabled={isPending}
          >
            {isPending ? "Uploading..." : "Upload Your Product"}
          </button>
        </div>

        {state.error && (
          <p className="text-red-500 text-center mt-4">{state.error}</p>
        )}
      </form>
    </div>
  );
};

export default Page;
