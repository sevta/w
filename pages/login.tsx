import Layout from "layouts";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

type IUserLogin = {
  email: string;
  password: string;
};

export default function Homepage() {
  const { register, handleSubmit } = useForm<IUserLogin>();

  const router = useRouter();

  async function handleLogin({ email, password }: IUserLogin): Promise<any> {
    try {
      const resp: any = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/admin",
        redirect: false,
      });

      if (resp?.ok) router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout className="flex items-center justify-center bg-base-200">
      <div>
        <form onSubmit={handleSubmit(handleLogin)}>
          <input
            type="email"
            placeholder="email"
            className="rounded-r-none"
            {...register("email", { required: true })}
          />
          <input
            type="password"
            placeholder="password"
            className="rounded-none"
            {...register("password", { required: true })}
          />
          <button className="btn btn-primary rounded-l-none">login</button>
        </form>
      </div>
    </Layout>
  );
}
