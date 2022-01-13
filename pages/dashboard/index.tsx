import axios from "axios";
import { fetcher } from "lib/fetcher";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useSWR from "swr";
import { Wedding } from "types";

export default function DashboardPage() {
  const { data: user } = useSWR("/api/user/me", fetcher);
  // const { data: wedding } = useSWR("/api/user/wedding", fetcher);

  const { register, handleSubmit } = useForm<Wedding>();

  // console.log({ wedding });

  async function submit({ groom, bride, weddingDate }: Wedding): Promise<any> {
    console.log({ groom, weddingDate, bride });
    try {
      const resp = await axios.post("/api/user/wedding", {
        groom,
        bride,
        weddingDate,
      });
      console.log({ resp });
      toast.success("success create wedding");
    } catch (error) {
      toast.error("error");
      console.log(error);
    }
  }

  return (
    <div className="font-inter bg-slate-200 h-screen w-full relative">
      <pre className="hidden">{JSON.stringify(user, null, 2)}</pre>
      <div className="container">
        <main>
          <div className="card">
            <div className="card-body">
              <div className="card-title">Weding</div>
              <form onSubmit={handleSubmit(submit)}>
                <div className="form-control">
                  <label htmlFor="">
                    <span>Nama pengantin pria</span>
                  </label>
                  <input
                    type="text"
                    {...register("groom", { required: true })}
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="">
                    <span>Nama pengantin wanita</span>
                  </label>
                  <input
                    type="text"
                    {...register("bride", { required: true })}
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="">
                    <span>Tanggal acara</span>
                  </label>
                  <input
                    type="date"
                    {...register("weddingDate", { required: true })}
                  />
                </div>
                <div className="py-5">
                  <button className="btn">save</button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
