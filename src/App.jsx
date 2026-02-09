import { Link, Route, Routes } from 'react-router-dom';
import SkillsPage from './pages/SkillsPage';

function Home() {
  return (
    <main className="home">
      <h1>Skill Graph Demo</h1>
      <p>Open the skills page to view the React version of the graph.</p>
      <Link to="/skills" className="btn">Go to Skills</Link>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/skills" element={<SkillsPage />} />
    </Routes>
  );
}
