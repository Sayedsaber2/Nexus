import * as zod from "zod";

export const RegisterSchema = zod.object({
  name: zod.string().nonempty("Name is required").min(3, "Name must be at least 3 characters"),
  username: zod.string().nonempty("Username is required").min(3, "Username must be at least 3 characters"),
  email: zod.string().nonempty("Email is required").regex( /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address"),
  dateOfBirth: zod.coerce.date("Date is required").refine ((value)=>{
    const today = new Date().getFullYear();
    const birthYear = value.getFullYear();
    const age = today - birthYear;
    return age >= 13;

    } , "You must be at least 13 years old"),
    gender: zod.string().nonempty("Gender is required"),
    password: zod.string().nonempty("Password is required").regex(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    "Password must be at least 8 characters and include uppercase, lowercase, number/special character"),
  rePassword: zod.string().nonempty("Confirm Password is required")
}).refine((data) => data.password === data.rePassword, {
  message: "Passwords do not match",
  path: ["rePassword"],
});


export const LoginSchema = zod.object({
  email: zod.string().nonempty("Email is required").regex( /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address"),
  password: zod.string().nonempty("Password is required").regex(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    "Invalid password"),
})
export const ChangePasswordSchema = zod.object({
  password: zod.string().nonempty("Password is required").regex(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
"Invalid password"),
  newPassword: zod.string().nonempty("New Password is required").regex(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    "Invalid password"),
});