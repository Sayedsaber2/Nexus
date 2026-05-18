import {zodResolver} from "@hookform/resolvers/zod";
import {Eye, EyeOff} from "lucide-react";
import React, {useContext, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {LoginSchema, RegisterSchema} from "./Schema/RegisterSchema";
import {Field, FieldError} from "../ui/field";
import {Input} from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {SendLogin, SendRegister} from "@/Services/register";
import {Button, Spinner} from "@heroui/react";
import toast from "react-hot-toast";
import {AuthConText} from "@/Context/AuthConText";

export default function AuthForm({
  isLogin,
  showPassword,
  setShowPassword,
  showConfirm,
  setShowConfirm,
  navigate,
}) {
  const {setIsLogged_in} = useContext(AuthConText);

  const [ApiErroe, setApiErroe] = useState(null);
  const [Loading, setLoading] = useState(false);
  const {handleSubmit, control} = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(isLogin ? LoginSchema : RegisterSchema),
  });

  async function onSubmit(value) {
    if (isLogin) {
      setLoading(true);

      const response = await SendLogin(value);
      if (!response?.success) {
        toast.error(response?.message);
        setApiErroe(response?.message || "Something went wrong");
      } else {
        toast.success("welcome back! ");
        localStorage.setItem("token", response?.data?.token);
        setIsLogged_in(true);
        navigate("/");
      }

      setLoading(false);
    } else {
      setLoading(true);
      const response = await SendRegister(value);
      if (!response?.success) {
        toast.error(response?.message);
        setApiErroe(response?.message || "Something went wrong");
      } else {
        toast.success(response?.message);
        navigate("/auth/login");
      }
      setLoading(false);
    }
  }
  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)} noValidate>
      {!isLogin && (
        <Controller
          name="name"
          control={control}
          render={({field, fieldState}) => (
            <Field className="p-0" data-invalid={fieldState.invalid}>
              <Input
                {...field}
                type="text"
                placeholder="Name"
                id="form-rhf-demo-name"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )}

      {!isLogin && (
        <Controller
          name="username"
          control={control}
          render={({field, fieldState}) => (
            <Field className="p-0" data-invalid={fieldState.invalid}>
              <Input
                {...field}
                type="text"
                placeholder="Username"
                id="form-rhf-demo-username"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )}
      <Controller
        name="email"
        control={control}
        render={({field, fieldState}) => (
          <Field className="p-0" data-invalid={fieldState.invalid}>
            <Input
              {...field}
              type="email"
              placeholder="Email Address"
              id="form-rhf-demo-email"
              aria-invalid={fieldState.invalid}
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {!isLogin && (
        <div className="flex gap-3">
          <Controller
            name="dateOfBirth"
            control={control}
            render={({field, fieldState}) => (
              <Field className="p-0" data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  style={{colorScheme: "dark"}}
                  type="date"
                  placeholder="Date of Birth"
                  id="form-rhf-demo-dateOfBirth"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="gender"
            control={control}
            render={({field, fieldState}) => (
              <Field className=" h-full" data-invalid={fieldState.invalid}>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className={`
                              py-2.5 w-full rounded-lg border
                              bg-[#0A0A0F] text-white placeholder:text-gray-500
                              focus:ring-1 outline-none focus:outline-none
                              ${
                                fieldState.invalid
                                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                  : "border-white/10 focus:ring-[#7C5CFC] focus:border-[#7C5CFC]"
                              }
                              `}
                  >
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>

                  <SelectContent className="bg-[#12121A] border border-white/10 text-white">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      )}

      <Controller
        name="password"
        control={control}
        render={({field, fieldState}) => (
          <Field className="p-0" data-invalid={fieldState.invalid}>
            <div className=" relative">
              <Input
                {...field}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                id="form-rhf-demo-password"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className=" absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition"
              >
                {showPassword ? (
                  <EyeOff size={18} className="hover:scale-110 transition" />
                ) : (
                  <Eye size={18} className="hover:scale-110 transition" />
                )}
              </button>
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      {!isLogin && (
        <Controller
          name="rePassword"
          control={control}
          render={({field, fieldState}) => (
            <Field className="p-0" data-invalid={fieldState.invalid}>
              <div className=" relative">
                <Input
                  {...field}
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm Password"
                  id="form-rhf-demo-rePassword"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className=" absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition"
                >
                  {showConfirm ? (
                    <EyeOff size={18} className="hover:scale-110 transition" />
                  ) : (
                    <Eye size={18} className="hover:scale-110 transition" />
                  )}
                </button>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )}
      {ApiErroe && (
        <p className="text-sm text-red-500 text-center">{ApiErroe}</p>
      )}
      <Button
        type="submit"
        isPending={Loading}
        className="w-full mt- py-5 rounded-lg text-white font-semibold 
                bg-linear-to-br from-[#7C5CFC] to-[#FC5CA8] 
                hover:opacity-90 transition 
                shadow-lg shadow-purple-500/20 cursor-pointer"
      >
        {Loading && <Spinner size="sm" color="white" />}
        {isLogin ? "SIGN IN" : "REGISTER NOW"}
      </Button>

      <p className="text-sm text-gray-400 text-center ">
        {isLogin ? (
          <>
            {"Don’t have an account?"}{" "}
            <span
              onClick={() => navigate("/auth/register")}
              className="text-[#7C5CFC] cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/auth/login")}
              className="text-[#7C5CFC] cursor-pointer hover:underline"
            >
              Sign In
            </span>
          </>
        )}
      </p>
    </form>
  );
}
