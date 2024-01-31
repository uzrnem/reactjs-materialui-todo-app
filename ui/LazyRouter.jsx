import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));
const Profile = lazy(() => import("./Profile"));

function App() {
  return (
    <Router>
      <h1>App</h1>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/profile">Profile</Link>
      <Routes>
        <Route index element={<Suspense fallback={<div>Loading Home...</div>}><Home /></Suspense>} />
        <Route path="/" exact element={<Suspense fallback={<div>Loading Home...</div>}><Home /></Suspense>} />
        <Route path="/about" element={<Suspense fallback={<div>Loading About...</div>}><About /></Suspense>} />
        <Route path="/profile" element={<Suspense fallback={<div>Loading Profile...</div>}><Profile /></Suspense>} />
      </Routes>
    </Router>
  );
}

export default App;
