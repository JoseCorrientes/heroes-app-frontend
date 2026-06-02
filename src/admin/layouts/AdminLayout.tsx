import { Link, Outlet } from "react-router";

export const AdminLayout = () => {
  return (
    <div className="bg-blue-500 ">
      <ul className="flex flex-row gap-4 justify-center">
        <li>
          <Link to={"/admin"}>Admin</Link>
        </li>
        <li>
          <Link to={"/admin/admin2"}>Admin 2</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};
