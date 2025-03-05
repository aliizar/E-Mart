"use client";
import React, { useState, useActionState, useRef, useEffect } from "react";
import { formSchema } from "@/lib/Validation";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createProduct } from "@/lib/action";
import gsap from "gsap";
import { toast } from "react-hot-toast";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
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
        link: formData.get("link") as string,
        price: formData.get("price") as string,
      };

      await formSchema.parseAsync(formValues);

      const result = await createProduct(prevState, formData);

      if (result.status === "SUCCESS") {
        toast.success("Product uploaded successfully!");
        router.push(`/`);
      } else {
        toast.error(result.error || "Failed to upload product");
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        toast.error("Validation failed. Please check your inputs.");
        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast.error(`An unexpected error occurred ${error}`);
      return {
        ...prevState,
        error: "An unexpected error occurred",
        status: "ERROR",
      };
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

        <div className="relative mb-8">
          <input
            id="title"
            name="title"
            type="text"
            className="w-full mb-2 bg-black border border-gray-600 text-white p-5 text-lg focus:outline-none focus:ring-2 focus:ring-gray-600 peer transition-all duration-300"
            required
            placeholder="Enter Product Title"
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}

          <input
            id="description"
            name="description"
            type="text"
            className="w-full mb-2 bg-black border border-gray-600 text-white p-5 text-lg focus:outline-none focus:ring-2 focus:ring-gray-600 peer transition-all duration-300"
            required
            placeholder="Enter Product Description"
          />
          {errors.description && <p className="text-red-500">{errors.description}</p>}

          <input
            id="category"
            name="category"
            type="text"
            className="w-full mb-2 bg-black border border-gray-600 text-white p-5 text-lg focus:outline-none focus:ring-2 focus:ring-gray-600 peer transition-all duration-300"
            required
            placeholder="Enter Product Category"
          />
          {errors.category && <p className="text-red-500">{errors.category}</p>}

          <input
            id="link"
            name="link"
            type="text"
            className="w-full mb-2 bg-black border border-gray-600 text-white p-5 text-lg focus:outline-none focus:ring-2 focus:ring-gray-600 peer transition-all duration-300"
            required
            placeholder="Enter Product Image Link"
          />
          {errors.link && <p className="text-red-500">{errors.link}</p>}

          <input
            id="price"
            name="price"
            type="text"
            className="w-full mb-2 bg-black border border-gray-600 text-white p-5 text-lg focus:outline-none focus:ring-2 focus:ring-gray-600 peer transition-all duration-300"
            required
            placeholder="Enter Product Price"
          />
          {errors.price && <p className="text-red-500">{errors.price}</p>}
        </div>

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

export default StartupForm;