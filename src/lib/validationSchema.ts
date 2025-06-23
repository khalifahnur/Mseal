import * as Yup from "yup";

export const validationSchema = Yup.object({
  membershipTier: Yup.string().required("Membership tier is required"),
  physicalAddress: Yup.string().required("Street address is required"),
  city: Yup.string().required("City is required"),
  phoneNumber: Yup.string()
    .matches(/^\+254\d{9}$/, "Phone number must be in the format +254XXXXXXXXX")
    .required("Phone number is required"),
  dob: Yup.string()
    .required("Date of birth is required")
    .test("valid-date", "Invalid date", (value) => {
      return value ? !isNaN(new Date(value).getTime()) : false;
    }),
  email: Yup.string().email("Invalid email").required("Email is required"),
  amount: Yup.number().min(0).required("Amount is required"),
  useDefaultNumber: Yup.boolean(),
});

export const signupSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{9}$/, "Phone number must be 9 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  agreeTerms: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const paymentvalidationSchema = Yup.object({
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be greater than 0")
      .min(1, "Amount must be at least 1"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^(\+254|0)[7|1]\d{8}$/, "Enter a valid Kenyan phone number (e.g., +2547XXXXXXXX)"),
    useDefaultNumber: Yup.boolean(),
  });
