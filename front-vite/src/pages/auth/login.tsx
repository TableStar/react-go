import { useNavigate } from "react-router";
import { useState, type FormEvent } from "react";
import { useLogin } from "../../hooks/useLogin";
import Cookies from "js-cookie";
import { useAuthContext } from "../../hooks/useAuthContext";

type ValidationErrors = {
  [key: string]: string;
};
type LoginForm = {
  password: string;
  username: string;
};

const Login = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useLogin();

  const [form, setForm] = useState<LoginForm>({
    password: "",
    username: "",
  });

  const { login } = useAuthContext();

  const [errors, setErrors] = useState<ValidationErrors>({});

  const updtField = (field: string, val: string) => {
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    mutate(
      {
        username: form.username,
        password: form.password,
      },
      {
        onSuccess(data) {
          //   Cookies.set("token", data.data.token);

          Cookies.set(
            "user",
            JSON.stringify({
              id: data.data.id,
              name: data.data.name,
              username: data.data.username,
              email: data.data.email,
            })
          );
          login(data.data.token);

          navigate("/admin/dashboard");
        },
        onError(error: any) {
          setErrors(error.response.data.errors);
        },
      }
    );
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-12">
        <div className="card border-0 rounded-4 shadow-sm">
          <div className="card-body">
            <h4 className="fw-bold text-center">LOGIN</h4>
            <hr />
            {errors.Error && (
              <div className="alert alert-danger mt-2 rounded-4">
                Username or Password is incorrect
              </div>
            )}
            <form onSubmit={handleLogin}>
              <div className="form-group mb-3">
                <label className="mb-1 fw-bold">Username</label>
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) => updtField("username", e.target.value)}
                  className="form-control"
                  placeholder="Username"
                />
                {errors.Username && (
                  <div className="alert alert-danger mt-2 rounded-4">
                    {errors.Username}
                  </div>
                )}
              </div>

              <div className="form-group mb-3">
                <label className="mb-1 fw-bold">Password</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => updtField("password", e.target.value)}
                  className="form-control"
                  placeholder="Password"
                />
                {errors.Password && (
                  <div className="alert alert-danger mt-2 rounded-4">
                    {errors.Password}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100 rounded-4"
                disabled={isPending}
              >
                {isPending ? "Loading..." : "LOGIN"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
