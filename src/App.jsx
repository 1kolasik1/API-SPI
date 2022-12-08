import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Albums, { loader as albumsLoader } from "./routes/Albums";
import Users, { loader as usersLoader } from "./routes/Users";
import User, { loader as userLoader } from "./routes/User";
import Layout from "./routes/Layout";
import Album, { loader as albumLoader } from "./routes/Album";
import ErrorPage from "./routes/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        loader: albumsLoader,
        element: <Albums />,
      },
      {
        path: "/albums",
        loader: albumsLoader,
        element: <Albums />,
      },
      {
        path: "/users",
        loader: usersLoader,
        element: <Users />,
      },
      {
        path: "/users/:id",
        loader: userLoader,
        element: <User />,
      },
      {
        path: "/albums/:id",
        loader: albumLoader,
        element: <Album />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default function App() {
  return (
    <div className="allElements">
      <RouterProvider router={router} />
    </div>
  );
}
