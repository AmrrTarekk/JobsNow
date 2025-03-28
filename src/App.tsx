import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "./layout/MainLayout";
import ErrorPage from "./pages/NotFound";
import LoadingComp from "./components/LoadingComponent";
import DetailsLayout from "./layout/DetailsLayout";

// Lazy load first-app pages
const Home = lazy(() => import("./pages/Home"));
const ViewJobDetails = lazy(() => import("./pages/ViewJobDetails"));
const ViewSkillDetails = lazy(() => import("./pages/ViewSkillDetails"));
const SearchJobs = lazy(() => import("./pages/SearchJobs"));

// Lazy load second-app from submodule
const SecondApp = lazy(() => import("../book-world/src/App"));

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
          path: `jobs`,
          element: (
            <Suspense fallback={<LoadingComp />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: `jobs/search`,
          element: (
            <Suspense fallback={<LoadingComp />}>
              <SearchJobs />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: `/jobs`,
      element: <DetailsLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: `job/:id`,
          element: (
            <Suspense fallback={<LoadingComp />}>
              <ViewJobDetails />
            </Suspense>
          ),
        },
        {
          path: `skill/:id`,
          element: (
            <Suspense fallback={<LoadingComp />}>
              <ViewSkillDetails />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: `/second-app/*`, // Load second-app inside /second-app route
      element: (
        <Suspense fallback={<LoadingComp />}>
          <SecondApp />
        </Suspense>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
