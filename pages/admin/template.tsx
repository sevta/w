import type { Template } from "types";
import axios from "axios";
import LayoutAdmin from "layouts/layout-admin";
import { fetcher } from "lib/fetcher";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useSWR from "swr";

export default function AdminTemplatePage() {
  const { data: users } = useSWR("/api/user", fetcher);
  const { register, setFocus, handleSubmit, reset } = useForm<Template>();

  console.log({ users });

  async function registerTemplate({ name, price }: Template) {
    try {
      const resp = await axios.post("/api/template", { name, price });
      if (resp) toast.success("success create template");
      reset();
      setFocus("name");
    } catch (error: any) {
      toast.error(error.response.data.message);
      setFocus("name");
      console.log(error);
    }
  }

  return (
    <LayoutAdmin title="Template">
      <div className="card ">
        <div className="card-body">
          <div className="card-title">Add New Template</div>
          <form onSubmit={handleSubmit(registerTemplate)}>
            <div className="form-control">
              <label htmlFor="">
                <span>Template name</span>
              </label>
              <input type="text" {...register("name", { required: true })} />
            </div>
            <div className="form-control">
              <label htmlFor="">
                <span>Price</span>
              </label>
              <input type="number" {...register("price", { required: true })} />
            </div>

            <div className="card-actions">
              <button className="btn btn-accent shadow-none">save</button>
            </div>
          </form>
        </div>
      </div>
    </LayoutAdmin>
  );
}
