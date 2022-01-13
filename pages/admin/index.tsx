import Stats from "components/admin/stats";
import LayoutAdmin from "layouts/layout-admin";
import { fetcher } from "lib/fetcher";
import useSWR from "swr";

export default function AdminPage() {
  const { data: users } = useSWR("/api/user", fetcher);
  const { data: templates } = useSWR("/api/template", fetcher);
  return (
    <LayoutAdmin>
      <Stats users={users?.data} templates={templates?.data} />
    </LayoutAdmin>
  );
}
