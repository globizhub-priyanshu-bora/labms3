import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { c as createLucideIcon, B as Button, l as loginUser, r as registerUser } from "./router-CekfRpIN.mjs";
import { L as Label } from "./label-BUX4JRaZ.mjs";
import { A as Activity, U as User } from "./user.mjs";
import { M as Mail, P as Phone } from "./phone.mjs";
import "@tanstack/react-router";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "./server.mjs";
import "node:async_hooks";
import "@tanstack/react-router/ssr/server";
import "bcryptjs";
import "cookie";
import "drizzle-orm";
import "zod";
import "./session-manager-DRdZONnW.mjs";
import "drizzle-orm/node-postgres";
import "drizzle-orm/pg-core";
import "./helpers-VjNq_44e.mjs";
import "@radix-ui/react-label";
const __iconNode$2 = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode$1);
const __iconNode = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode);
const bgimage = "/assets/bgimage-C68Ti84X.jpg";
function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: {
      errors: errorsLogin,
      isSubmitting: isSubmittingLogin
    },
    reset: resetLogin
  } = useForm();
  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: {
      errors: errorsSignup,
      isSubmitting: isSubmittingSignup
    },
    reset: resetSignup,
    watch
  } = useForm();
  const onLogin = async (data) => {
    try {
      setErrorMessage("");
      const response = await loginUser({
        data
      });
      let result;
      if (response instanceof Response) {
        result = await response.json();
      } else {
        result = response;
      }
      if (result.success) {
        if (!result.user.hasCompletedSetup || !result.user.labId) {
          window.location.href = "/lab-setup";
        } else {
          window.location.href = "/lab-management";
        }
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Login failed. Please try again.");
    }
  };
  const onRegister = async (data) => {
    try {
      setErrorMessage("");
      setSuccessMessage("");
      const phoneNumber = data.phoneNumber ? parseInt(data.phoneNumber.replace(/\D/g, "")) : void 0;
      const result = await registerUser({
        data: {
          ...data,
          phoneNumber
        }
      });
      if (result.success) {
        setSuccessMessage("Registration successful! Please login to complete lab setup.");
        resetSignup();
        setShowPassword(false);
        setShowConfirmPassword(false);
        setTimeout(() => {
          setIsLogin(true);
          setSuccessMessage("");
        }, 2e3);
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Registration failed. Please try again.");
    }
  };
  const switchMode = () => {
    setIsLogin(!isLogin);
    setErrorMessage("");
    setSuccessMessage("");
    resetLogin();
    resetSignup();
    setShowPassword(false);
    setShowConfirmPassword(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen relative flex items-center justify-center p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
      /* @__PURE__ */ jsx("img", { src: bgimage, alt: "Medical Laboratory", className: "w-full h-full object-cover" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-blue-900/70 to-indigo-900/70" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-lg", children: /* @__PURE__ */ jsx(Activity, { className: "w-8 h-8 text-blue-600" }) }),
        /* @__PURE__ */ jsx("h1", { className: "text-white text-4xl font-bold mb-2", children: "GlobPathology" }),
        /* @__PURE__ */ jsx("p", { className: "text-white/90 text-lg", children: isLogin ? "Welcome Back" : "Get Started Today" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8", children: [
        successMessage && /* @__PURE__ */ jsx("div", { className: "mb-6 p-4 bg-green-50 border border-green-200 rounded-lg", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-green-800", children: successMessage }) }),
        errorMessage && /* @__PURE__ */ jsx("div", { className: "mb-6 p-4 bg-red-50 border border-red-200 rounded-lg", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-red-800", children: errorMessage }) }),
        isLogin ? /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmitLogin(onLogin), className: "space-y-5", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { className: "block text-sm font-semibold text-white mb-2", children: "Email Address *" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Mail, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" }),
              /* @__PURE__ */ jsx("input", { type: "email", ...registerLogin("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              }), className: "w-full pl-11 pr-4 py-3 border border-gray-300 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all", placeholder: "your.email@example.com" })
            ] }),
            errorsLogin.email && /* @__PURE__ */ jsx("p", { className: "text-red-300 text-xs mt-1", children: errorsLogin.email.message })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { className: "block text-sm font-semibold text-white mb-2", children: "Password *" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Lock, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" }),
              /* @__PURE__ */ jsx("input", { type: showPassword ? "text" : "password", ...registerLogin("password", {
                required: "Password is required"
              }), className: "w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white", placeholder: "Enter your password" }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600", children: showPassword ? /* @__PURE__ */ jsx(EyeOff, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Eye, { className: "w-5 h-5" }) })
            ] }),
            errorsLogin.password && /* @__PURE__ */ jsx("p", { className: "text-red-300 text-xs mt-1", children: errorsLogin.password.message })
          ] }),
          /* @__PURE__ */ jsx(Button, { type: "submit", disabled: isSubmittingLogin, className: "w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5", children: isSubmittingLogin ? "Signing in..." : "Sign In" })
        ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmitSignup(onRegister), className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { className: "block text-sm font-semibold text-white mb-2", children: "Full Name *" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(User, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" }),
              /* @__PURE__ */ jsx("input", { type: "text", ...registerSignup("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters"
                }
              }), className: "w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white", placeholder: "John Doe" })
            ] }),
            errorsSignup.name && /* @__PURE__ */ jsx("p", { className: "text-red-300 text-xs mt-1", children: errorsSignup.name.message })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { className: "block text-sm font-semibold text-white mb-2", children: "Email Address *" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Mail, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" }),
              /* @__PURE__ */ jsx("input", { type: "email", ...registerSignup("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              }), className: "w-full pl-11 pr-4 py-3 border border-gray-300 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all", placeholder: "your.email@example.com" })
            ] }),
            errorsSignup.email && /* @__PURE__ */ jsx("p", { className: "text-red-300 text-xs mt-1", children: errorsSignup.email.message })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { className: "block text-sm font-semibold text-white mb-2", children: "Phone Number" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Phone, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" }),
              /* @__PURE__ */ jsx("input", { type: "tel", ...registerSignup("phoneNumber"), className: "w-full pl-11 pr-4 py-3 border border-gray-300 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all", placeholder: "1234567890" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { className: "block text-sm font-semibold text-white mb-2", children: "Password *" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Lock, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" }),
              /* @__PURE__ */ jsx("input", { type: showPassword ? "text" : "password", ...registerSignup("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/,
                  message: "Password must contain uppercase, lowercase, number, and special character"
                }
              }), className: "w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white", placeholder: "Enter password" }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600", children: showPassword ? /* @__PURE__ */ jsx(EyeOff, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Eye, { className: "w-5 h-5" }) })
            ] }),
            errorsSignup.password && /* @__PURE__ */ jsx("p", { className: "text-red-300 text-xs mt-1", children: errorsSignup.password.message })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { className: "block text-sm font-semibold text-white mb-2", children: "Confirm Password *" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Lock, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" }),
              /* @__PURE__ */ jsx("input", { type: showConfirmPassword ? "text" : "password", ...registerSignup("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === watch("password") || "Passwords do not match"
              }), className: "w-full pl-11 pr-12 py-3 border border-gray-300 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all", placeholder: "Confirm password" }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setShowConfirmPassword(!showConfirmPassword), className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600", children: showConfirmPassword ? /* @__PURE__ */ jsx(EyeOff, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Eye, { className: "w-5 h-5" }) })
            ] }),
            errorsSignup.confirmPassword && /* @__PURE__ */ jsx("p", { className: "text-red-300 text-xs mt-1", children: errorsSignup.confirmPassword.message })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "p-3 bg-blue-900/30 border border-blue-400/30 rounded-lg backdrop-blur-sm", children: /* @__PURE__ */ jsxs("p", { className: "text-xs text-white/90", children: [
            /* @__PURE__ */ jsx("strong", { children: "Note:" }),
            " After registration, you'll be prompted to complete your lab setup with details like registration number, address, etc."
          ] }) }),
          /* @__PURE__ */ jsx(Button, { type: "submit", disabled: isSubmittingSignup, className: "w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5", children: isSubmittingSignup ? "Creating Account..." : "Create Account" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-white/90", children: [
          isLogin ? "Don't have an account?" : "Already have an account?",
          /* @__PURE__ */ jsx("button", { onClick: switchMode, type: "button", className: "ml-2 text-white font-semibold hover:text-blue-200 transition-colors underline", children: isLogin ? "Sign Up" : "Sign In" })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  AuthPage as component
};
