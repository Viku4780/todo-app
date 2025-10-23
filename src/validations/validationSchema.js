import * as yup from "yup";

export const schema = yup.object().shape({
    name: yup.string().required("Name is required").min(3, "Name must be atleast 3 charecters"),
    lastName: yup.string(), 
    email: yup.string().required("Email is required").email("Invalid email format"),
    password: yup.string().required("Password is required").min(6, "Password must be at least 6 charecters").matches( /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Must contain one uppercase, one number, and one special character"), 
})