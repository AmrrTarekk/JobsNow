import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "./layout/MainLayout";
import ErrorPage from "./pages/NotFound";

const Home = lazy(() => import("./pages/Home"));
const ViewJobDetails = lazy(() => import("./pages/ViewJobDetails"));
const SearchJobs = lazy(() => import("./pages/SearchJobs"));

function App() {
  const router = createBrowserRouter([
    {
      path: `/`,
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: `/`,
          element: <Navigate to="/jobs" replace />,
        },
        {
          path: `/jobs`,
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: `/jobs/search`,
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <SearchJobs />
            </Suspense>
          ),
        },
        {
          path: `/jobs/job/:id`,
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <ViewJobDetails />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;