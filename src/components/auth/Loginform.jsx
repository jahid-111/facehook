import { useForm } from "react-hook-form";

const Loginform = () => {
  const {
    register,
    handleSubmit,
    formState: { error },
  } = useForm();

  const submitForm = (formData) => {
    console.log(formData);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
      ></form>
    </>
  );
};

export default Loginform;
