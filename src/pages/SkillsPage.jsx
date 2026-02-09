import { Link } from 'react-router-dom';
import SkillGraph from '../components/SkillGraph';

export default function SkillsPage() {
  return (
    <div>
      <nav style={{ padding: '12px 20px 0' }}>
        <Link to="/">Back</Link>
      </nav>
      <SkillGraph />
    </div>
  );
}
