"use server";

export async function handleForm(prevStatus: any, formData: FormData) {
  console.log(prevStatus);
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return {
    errors: ["wrong password", "password too short"],
  };
}
