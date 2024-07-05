import { useForm } from "react-hook-form";
import Field from "../common/Field";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    console.log(formData);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,
        formData
      );

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      alert(`Server : ${error.message}`);
      setError("root.random", {
        type: "random",
        message: ` Something Went Wrong ${error.message}`,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[30px]"
    >
      <Field label="First Name" error={errors.firstName}>
        <input
          {...register("firstName", { required: "Required firstName" })}
          type="firstName"
          name="firstName"
          id="firstName"
          className={`auth-input ${
            !!errors.firstName ? "border-red-500" : "border-gray-500"
          }`}
        ></input>
      </Field>
      <Field label="Last Name" error={errors.lastName}>
        <input
          {...register("lastName")}
          type="lastName"
          name="lastName"
          id="lastName"
          className={`auth-input ${
            !!errors.lastName ? "border-red-500" : "border-gray-500"
          }`}
        ></input>
      </Field>
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
      <button
        className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
        type="submit"
      >
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
