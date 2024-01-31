import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";

const Home = () => <h1>Home</h1>;
const About = () => <h1>About</h1>;
const Profile = () => <h1>Profile</h1>;

function App() {
  return (
    <Router>
      <h1>App</h1>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/profile">Profile</Link>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/" exact element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
