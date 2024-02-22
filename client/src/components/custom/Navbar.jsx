import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-[#00A67E] items-center flex flex-col py-5 gap-3">
      <h1 className="text-5xl font-extrabold text-green-100">Chat GPT Clone</h1>
      <ul className="flex gap-4 ">
        <Link to="/auth" className="hover:text-green-200">
          SignUp
        </Link>
        <Link to="/auth" className="hover:text-green-200">
          Login
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
