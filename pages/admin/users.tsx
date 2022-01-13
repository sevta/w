import axios from "axios";
import LayoutAdmin from "layouts/layout-admin";
import { fetcher } from "lib/fetcher";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useSWR from "swr";
import { User } from "types";

export default function AdminUsersPage() {
  const { register, handleSubmit, setFocus, reset } = useForm<User>();
  const { data: templates } = useSWR("/api/template", fetcher);
  const { data: users, mutate } = useSWR("/api/user", fetcher);

  async function onSubmit({
    name,
    password,
    email,
    templateId,
  }: User): Promise<any> {
    try {
      const resp = await axios.post("/api/user/register", {
        email,
        password,
        name,
        templateId,
      });
      if (resp) {
        console.log({ resp });
        toast.success("success add users");
        mutate();
        reset();
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      setFocus("email");
      console.log(error.response);
    }
  }

  return (
    <LayoutAdmin title="Users">
      <div className="card mb-6">
        <div className="card-body">
          <div className="card-title">Lists users</div>
          <div>
            {users?.data.map((user: any, index: number) => (
              <div key={index} className="py-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{user.email}</span>
                  <div className="flex items-center justify-between space-x-2">
                    <button className="btn btn-xs btn-error px-3">
                      delete
                    </button>
                    <button className="btn btn-xs px-3">edit</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="card-title">Add user</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label htmlFor="">
                <span>Email</span>
              </label>
              <input type="email" {...register("email", { required: true })} />
            </div>
            <div className="form-control">
              <label htmlFor="">
                <span>Username</span>
              </label>
              <input
                autoComplete="false"
                type="text"
                {...register("name", { required: true })}
              />
            </div>
            <div className="form-control">
              <label htmlFor="">
                <span>Password</span>
              </label>
              <input
                autoComplete="false"
                type="password"
                {...register("password", { required: true })}
              />
            </div>

            <div className="form-control">
              <label htmlFor="">
                <span>template</span>
              </label>
              <select
                className="select"
                id=""
                {...register("templateId", { required: true })}
              >
                <option disabled selected>
                  choose here
                </option>
                {templates?.data?.map((template: any, index: number) => (
                  <option value={template.id} key={index}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="card-actions">
                <button className="btn btn-accent shadow-none">Add</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </LayoutAdmin>
  );
}
