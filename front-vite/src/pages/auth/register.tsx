import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { useRegister } from "../../hooks/useRegister";

type ValidationErrors = {
  [key: string]: string;
};

type RegisterForm = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export const Register = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useRegister();

  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    username: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  const updtField = (field: string, val: string) => {
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    mutate(
      {
        name: form.name,
        email: form.email,
        password: form.password,
        username: form.username,
      },
      {
        onSuccess() {
          navigate("/login");
        },
        onError(error: any) {
          setErrors(error.response.data.errors);
        },
      }
    );
  };
  return (
    <div className="row justify-content-center">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card border-0 rounded-4 shadow-sm">
            <div className="card-body">
              <h4 className="fw-bold text-center">REGISTER</h4>
              <hr />
              <form onSubmit={handleRegister}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label className="mb-1 fw-bold">Full Name</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => updtField("name", e.target.value)}
                        className="form-control"
                        placeholder="Full Name"
                      />
                      {errors.Name && (
                        <div className="alert alert-danger mt-2 rounded-4">
                          {errors.Name}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
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
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label className="mb-1 fw-bold">Email address</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => updtField("email", e.target.value)}
                        className="form-control"
                        placeholder="Email Address"
                      />
                      {errors.Email && (
                        <div className="alert alert-danger mt-2 rounded-4">
                          {errors.Email}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
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
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 rounded-4"
                  disabled={isPending}
                >
                  {isPending ? "Loading..." : "REGISTER"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
