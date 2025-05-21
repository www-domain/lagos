
import Sidebar from "@/components/sidebar";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const navigate = useNavigate();

  return (
    <main className="relative isolate">
      <Sidebar>
        <h1 className="text-3xl text-gray-700 font-bold">Change Password</h1>

        <div className="mx-auto mt-8"></div>
      </Sidebar>
    </main>
  );
}
