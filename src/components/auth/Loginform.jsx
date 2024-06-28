import { useForm } from "react-hook-form";
import Field from "../common/Field";
import { useNavigate } from "react-router-dom";

const Loginform = () => {
  const navigateHomePage = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = (formData) => {
    console.log(formData);
    navigateHomePage("/");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
      >
        <Field label="Email" error={errors.email}>
          <input
            {...register("email", { required: "Required Email" })}
            type="email"
            name="email"
            id="email"
            className={`auth-input ${
              !!errors.email ? "border-red-500" : "border-gray-500"
            }`}
          ></input>
        </Field>
        <Field label="Password" error={errors.password}>
          <input
            {...register("password", {
              required: "Required password",
              minLength: {
                value: 8,
                message: "Your Password Must be 8 Characterrs",
              },
            })}
            type="password"
            name="password"
            id="password"
            className={`auth-input ${
              !!errors.password ? "border-red-500" : "border-gray-500"
            }`}
          ></input>
        </Field>
        <Field>
          <button
            className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
            type="submit"
          >
            Log In
          </button>
        </Field>
      </form>
    </>
  );
};

export default Loginform;
