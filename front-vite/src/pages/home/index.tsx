import { Link } from "react-router";

const Home = () => {
  return (
    <div className="p-5 mb-4 bg-light rounded-5 shadow-sm">
      <div className="container-fluid py-5">
        <h1 className="display-5 fw-bold">FULLSTACK DEVELOPER</h1>
        <p className="col-md-12 fs-4">
          Belajar FullStack Developer dengan Golang dan React TypeScript
        </p>
        <hr />
        <Link to="/register" className="btn btn-primary btn-lg me-3">
          REGISTER
        </Link>
        <Link to="/login" className="btn btn-secondary btn-lg">
          LOGIN
        </Link>
      </div>
    </div>
  );
};

export default Home;
