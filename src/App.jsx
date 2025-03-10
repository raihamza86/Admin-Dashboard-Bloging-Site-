import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import AdminNavbar from "./Dashboard/components/AdminNavbar";
import AdminBlogs from "./Dashboard/pages/AdminBlogs";
import User from "./Dashboard/components/User";
import CreateBlogForm from "./Dashboard/components/CreateBlogForm";

const AdminLayout = () => (
  <div>
    <AdminNavbar />
    <Outlet />
  </div>
);

const router = createBrowserRouter([
  {
    element: <AdminLayout />,
    children: [
      { path: "/dashboard", element: <AdminBlogs /> },
      { path: "/dashboard/blogs", element: <AdminBlogs /> },
      { path: "/dashboard/users", element: <User /> },
      { path: "/dashboard/create-form", element: <CreateBlogForm /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
