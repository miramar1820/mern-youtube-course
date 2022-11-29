import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

function AuthPage() {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // console.log("Error", error);
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // console.log(form);
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message);
      // console.log("Data", data);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      //message(data.message);
      auth.login(data.token, data.userId);
      // console.log("Data", data);
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Minimize Link</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field">
                <input
                  id="email"
                  type="text"
                  className="validate"
                  name="email"
                  onChange={changeHandler}
                  value={form.email}
                />
                <label htmlFor="email">Enter email</label>
              </div>
              <div className="input-field">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="validate"
                  onChange={changeHandler}
                  value={form.password}
                />
                <label htmlFor="password">Enter password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn waves-effect waves-light yellow darken-4 m-1"
              disabled={loading}
              onClick={loginHandler}
            >
              Log in
            </button>
            <button
              className="btn waves-effect waves-light grey lighten-1 black-text"
              disabled={loading}
              onClick={registerHandler}
            >
              Register
            </button>
          </div>
        </div>
        {loading && (
          <div className="progress">
            <div className="indeterminate"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthPage;
