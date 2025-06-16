import { useAuthUser } from "../hooks/useAuthUser";
import { SidebarMenu } from "./SidebarMenu";

export const Dash = () => {
  const user = useAuthUser();

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-3">
          <SidebarMenu />
        </div>
        <div className="col-md-9">
          <div className="card border-0 rounded-4 shadow-sm">
            <div className="card-header">DASHBOARD</div>
            <div className="card-body">
              {user ? (
                <p>
                  Selamat Datang, <strong>{user?.name}</strong>
                </p>
              ) : (
                <p>Kamu belum login</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
