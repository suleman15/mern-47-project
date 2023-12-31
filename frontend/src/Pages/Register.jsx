import { Link, useNavigate } from "react-router-dom";
import { CustomButton, InputField, Loading } from "../Component/index";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { BiLogoGithub, BiShareAlt, BiWifi } from "react-icons/bi";
import { AiFillInteraction } from "react-icons/ai";
import { axiosRequest } from "../api";
import { toast } from "react-toastify";

export default function Register() {
  let {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({ mode: "onChange" });
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  let onSubmit = async (data) => {
    console.log(data);
    setIsSubmitting(true);
    try {
      const res = await axiosRequest({
        url: "auth/register",
        data: data,
        method: "POST",
      });
      console.log(res);

      if (res?.success == "failed") {
        setErrMsg(res);
        toast.success(res?.message);
      } else {
        setErrMsg(res);
        toast.success(res?.message);
      }
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" bg-purple w-full lg:h-screen h-auto flex p-6  justify-center items-center md:p-20 ">
      <div className="border-4 border-white lg:flex-row flex-col md:w-full lg:w-[1024px]   bg-primary rounded-lg shadow-sm h-fit  overflow-hidden gap-3 flex ">
        {/* LEFT */}
        <div className=" order-1 lg:order-2  lg:w-1/2 w-full h-auto bg-cover bg-[url('assets/background.jpg')] relative  py-10 rounded-lg  bg-black flex justify-center items-center">
          <div className="text-center my-20 mx-2 bg-[#ffffff81] p-3 rounded-lg ">
            <div>Connect Your Friend & have share for fun.</div>
            <div className="text-sm text-[#505050]">
              Share families with friends and the world
            </div>
          </div>
          <div className="absolute   bottom-[10%] left-2 bg-white z-10 flex gap-3 items-center px-2 rounded-lg  ">
            <BiShareAlt />
            <span>Share</span>
          </div>
          <div className="absolute  top-[20%] left-5 bg-white z-10 flex gap-3 items-center px-2 rounded-lg">
            <BiWifi />
            <span>Wifi</span>
          </div>
          <div className="absolute  bottom-5 right-2 bg-white z-10 flex gap-3 items-center px-2 rounded-lg">
            <AiFillInteraction />
            <span>Interact</span>
          </div>
        </div>
        {/* RIGHT */}
        <div className="order-2 lg:order-1 lg:w-1/2  p-5 flex gap-3 flex-col">
          <Link to={"/"}>
            {" "}
            <img className="h-8" src="/logo.png" />{" "}
          </Link>
          <p>Register your account</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex gap-3 flex-col"
          >
            <div className="flex  gap-2 flex-col   md:flex-row">
              <InputField
                type="text"
                styles={"w-full"}
                placeholder="First Name"
                label="First Name: "
                register={register("firstName", {
                  required: "First Name is required",
                })}
                error={errors.firstName ? errors.firstName.message : ""}
              />
              <InputField
                type="text"
                styles={"w-full"}
                placeholder="Last Name"
                label="Last Name: "
                register={register("lastName", {
                  required: "Last Name is required",
                })}
                error={errors.lastName ? errors.lastName.message : ""}
              />
            </div>
            <InputField
              type="email"
              styles={"w-full"}
              placeholder="email@example.com"
              label="Email: "
              register={register("email", {
                required: "Email Address is required",
              })}
              error={errors.email ? errors.email.message : ""}
            />
            <div className="flex-col flex gap-2 md:flex-row">
              <InputField
                type="password"
                placeholder="Password"
                styles={"w-full"}
                label="Password: "
                register={register("password", {
                  required: "Password  is required",
                })}
                error={errors.password ? errors.password.message : ""}
              />
              <InputField
                type="password"
                placeholder="Confirm Password"
                styles={"w-full"}
                label="Password: "
                register={register("cPassword", {
                  validate: (value) => {
                    const { password } = getValues();
                    if (password != value) {
                      return "Password do not match";
                    }
                  },
                })}
                error={
                  errors.cPassword && errors.cPassword.type === "validate"
                    ? errors.cPassword?.message
                    : ""
                }
              />
            </div>

            {errMsg?.message && (
              <div className="text-[red] text-xs">{errMsg?.message}</div>
            )}
            {isSubmitting ? (
              <Loading />
            ) : (
              <CustomButton type={"submit"} title={"register"} />
            )}
          </form>
          <div className="text-xs  flex items-center justify-center">
            Already have an account?
            <Link className="text-Clr mx-2 hover:text-Clrhv" to={"/login"}>
              Login
            </Link>
          </div>
          <div className="text-[gray] text-sm text-center">
            ------ OR ------
          </div>
          <div className="flex justify-center gap-3 ">
            <FcGoogle className="text-Clr rounded-full cursor-pointer  w-8 h-8 p-1 bg-[#8080804d]" />
            <BiLogoGithub className="text-[#333333] rounded-full  cursor-pointer  w-8 h-8 p-[2px] bg-[#d4d4d498]" />
            <FaFacebook className="text-[#395693] rounded-full  cursor-pointer  w-8 h-8 p-1 bg-[#d4d4d498]" />
          </div>
        </div>
      </div>
    </div>
  );
}
