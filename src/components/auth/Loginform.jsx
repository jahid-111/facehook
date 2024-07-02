import { useForm } from "react-hook-form";
import Field from "../common/Field";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const LoginForm = () => {
  const navigateHomePage = useNavigate();
  const { setAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        formData
      );

      if (response.status === 200) {
        const { token, user } = response.data;
        if (token) {
          const authToken = token.token;
          const refreshToken = token.refreshToken;
          console.log(`auth ${authToken},`);
          setAuth({ user, authToken, refreshToken });
          navigateHomePage("/");
        }
      }
    } catch (err) {
      alert(`Server : ${err.message}`);
      setError("root.random", {
        type: "random",
        message: `User Not Found "${formData.email}"`,
      });
    }
  };

  return (
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
              message: "Your Password Must be 8 Characters",
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
      <p className=" text-red-600 mb-3">{errors?.root?.random?.message}</p>
      <Field>
        <button
          className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
          type="submit"
        >
          Log In
        </button>
      </Field>
    </form>
  );
};

export default LoginForm;
