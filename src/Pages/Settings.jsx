import {zodResolver} from "@hookform/resolvers/zod";
import {Eye, EyeOff, KeyRound, Loader2, LogOut} from "lucide-react";
import {useContext, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {z} from "zod";
import {Input} from "@/Components/ui/input";
import {Label} from "@/Components/ui/label";
import {AuthConText} from "@/Context/AuthConText";
import axios from "axios";
import toast from "react-hot-toast";
import {ChangePasswordSchema} from "@/Components/auth/Schema/RegisterSchema";
import {ChangePassword} from "@/Services/register";
import {useNavigate} from "react-router-dom";

export default function Settings() {
  const {setIsLogged_in} = useContext(AuthConText);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [ApiErroe, setApiErroe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {handleSubmit, control, reset} = useForm({
    defaultValues: {password: "", newPassword: ""},
    resolver: zodResolver(ChangePasswordSchema),
  });

  async function onSubmit(values) {
    setIsLoading(true);
    const response = await ChangePassword(values);
    if (!response?.success) {
      toast.error(response?.message);
      setApiErroe(response?.message || "Something went wrong");
    } else {
      toast.success("password changed successfully");
      localStorage.setItem("token", response?.data?.token);
      setIsLogged_in(true);
      reset()
      
    }
    setIsLoading(false);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLogged_in(false);
  }

  return (
    <div className="max-w-lg mx-auto mt-8 space-y-4 px-4">
      {/* Change Password Card */}
      <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-accent flex items-center justify-center text-accent-foreground">
            <KeyRound size={18} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Change Password
            </h2>
            <p className="text-xs text-muted-foreground">
              Update your password
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-4"
        >
          {/* Old Password */}
          <Controller
            name="password"
            control={control}
            render={({field, fieldState}) => (
              <div className="space-y-1.5">
                <Label
                  htmlFor="password"
                  className="text-xs text-muted-foreground"
                >
                  Old Password
                </Label>
                <div className="relative">
                  <Input
                    {...field}
                    id="Password"
                    type={showOld ? "text" : "password"}
                    placeholder="Enter old password"
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                    className="pr-10 rounded-xl bg-muted/50 border-border text-foreground "
                  />
                  <button
                    type="button"
                    onClick={() => setShowOld((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                  >
                    {showOld ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {fieldState.invalid && (
                  <p className="text-xs text-red-500 px-1">
                    {fieldState.error?.message}
                  </p>
                )}
              </div>
            )}
          />

          {/* New Password */}
          <Controller
            name="newPassword"
            control={control}
            render={({field, fieldState}) => (
              <div className="space-y-1.5">
                <Label
                  htmlFor="newPassword"
                  className="text-xs text-muted-foreground"
                >
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    {...field}
                    id="newPassword"
                    type={showNew ? "text" : "password"}
                    placeholder="Enter new password"
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                    className="pr-10 rounded-xl bg-muted/50 border-border text-foreground"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                  >
                    {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {fieldState.invalid && (
                  <p className="text-xs text-red-500 px-1">
                    {fieldState.error?.message}
                  </p>
                )}
              </div>
            )}
          />
          {ApiErroe && (
            <p className="text-sm text-red-500 text-center">{ApiErroe}</p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="
                cursor-pointer
                w-full py-2.5 rounded-xl
                bg-linear-to-br from-[#7C5CFC] to-[#FC5CA8]
                text-white text-sm font-semibold
                hover:opacity-90 active:scale-[0.99]
                shadow-lg shadow-purple-500/20
                disabled:opacity-60 disabled:cursor-not-allowed
                transition-all duration-200
            "
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin mx-auto" />
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Danger Zone</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Actions here cannot be undone
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="
            cursor-pointer
            w-full py-2.5 rounded-xl
            border border-destructive/40
            text-destructive bg-destructive/5
            text-sm font-semibold
            flex items-center justify-center gap-2
            hover:bg-destructive hover:text-white
            active:scale-[0.99]
            transition-all duration-200
          "
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
}
