"use server";

import { z } from "zod";

const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);

const checkUsername = (username: string) => {
  return !username.includes("potato");
};

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => {
  return password === confirm_password;
};

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "username must be string",
        required_error: "Where is my user name?",
      })
      .min(3, "way too short")
      .max(10, "That's too long!")
      .refine((username) => checkUsername, "custome error"),
    email: z.string().email(),
    password: z
      .string()
      .min(10)
      .regex(
        passwordRegex,
        "A password must have lowercase, UPPERCASE, a number and special characters."
      ),
    confirm_password: z.string().min(10),
  })
  .refine(checkPasswords, {
    message: "Both passwords should be the same!",
    path: ["confirm_password"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    console.log;
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
