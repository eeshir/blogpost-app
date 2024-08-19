import z from "zod";

export const signinSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Password must be atleast 6 characters long" }),
});


export const signupSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Password must be atleast 6 characters long" }),
    name: z.string().min(3, { message: "Name must be atleast 3 characters long" }),
});


export const createBlogSchema = z.object({
    title: z.string().min(3, { message: "Title must be atleast 3 characters long" }),
    content: z.string().min(10, { message: "Content must be atleast 10 characters long" }),
});


export const updateBlogSchema = z.object({
    title: z.string().min(3, { message: "Title must be atleast 3 characters long" }),
    content: z.string().min(10, { message: "Content must be atleast 10 characters long" }),
    id: z.string().uuid(),
});

export type SigninSchema = z.infer<typeof signinSchema>;
export type SignupSchema = z.infer<typeof signupSchema>;
export type CreateBlogSchema = z.infer<typeof createBlogSchema>;
export type UpdateBlogSchema = z.infer<typeof updateBlogSchema>;



