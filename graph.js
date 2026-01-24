// =============================================================================
// SKILL OBSERVATORY - Interactive Skill Graph
// =============================================================================

// Level definitions with numeric values for calculations
// Colors from level 1 to 9 as specified
const LEVELS = {
  beginner_1: { name: 'Beginner', tier: 1, value: 1, color: '#F6ECC9' },
  beginner_2: { name: 'Beginner', tier: 2, value: 2, color: '#F6E39E' },
  beginner_3: { name: 'Beginner', tier: 3, value: 3, color: '#F8D247' },
  intermediate_1: { name: 'Intermediate', tier: 1, value: 4, color: '#B7FEE4' },
  intermediate_2: { name: 'Intermediate', tier: 2, value: 5, color: '#4CEAB1' },
  intermediate_3: { name: 'Intermediate', tier: 3, value: 6, color: '#45B68D' },
  expert_1: { name: 'Expert', tier: 1, value: 7, color: '#666666' },
  expert_2: { name: 'Expert', tier: 2, value: 8, color: '#333333' },
  expert_3: { name: 'Expert', tier: 3, value: 9, color: '#000000' }
};

// Cluster color
const CLUSTER_COLOR = '#CFE5FF';

// Helper to get category from level
function getLevelCategory(level) {
  if (level.startsWith('beginner')) return 'beginner';
  if (level.startsWith('intermediate')) return 'intermediate';
  return 'expert';
}

// Comprehensive skill data organized by clusters
const skillData = {
  // Programming Languages
  languages: {
    label: 'Programming Languages',
    skills: [
      { id: 'python', label: 'Python', level: 'expert_3' },
      { id: 'javascript', label: 'JavaScript', level: 'expert_2' },
      { id: 'typescript', label: 'TypeScript', level: 'expert_1' },
      { id: 'java', label: 'Java', level: 'intermediate_3' },
      { id: 'csharp', label: 'C#', level: 'intermediate_2' },
      { id: 'cpp', label: 'C++', level: 'intermediate_1' },
      { id: 'go', label: 'Go', level: 'intermediate_2' },
      { id: 'rust', label: 'Rust', level: 'beginner_3' },
      { id: 'kotlin', label: 'Kotlin', level: 'beginner_2' },
      { id: 'swift', label: 'Swift', level: 'beginner_1' },
      { id: 'ruby', label: 'Ruby', level: 'intermediate_1' },
      { id: 'php', label: 'PHP', level: 'intermediate_2' },
      { id: 'scala', label: 'Scala', level: 'beginner_2' },
      { id: 'r', label: 'R', level: 'intermediate_1' },
      { id: 'julia', label: 'Julia', level: 'beginner_1' },
      { id: 'elixir', label: 'Elixir', level: 'beginner_2' },
      { id: 'haskell', label: 'Haskell', level: 'beginner_1' },
      { id: 'clojure', label: 'Clojure', level: 'beginner_1' }
    ]
  },

  // Backend Development
  backend: {
    label: 'Backend Development',
    skills: [
      { id: 'django', label: 'Django', level: 'expert_2' },
      { id: 'fastapi', label: 'FastAPI', level: 'expert_1' },
      { id: 'flask', label: 'Flask', level: 'intermediate_3' },
      { id: 'express', label: 'Express.js', level: 'expert_1' },
      { id: 'nestjs', label: 'NestJS', level: 'intermediate_2' },
      { id: 'spring', label: 'Spring Boot', level: 'intermediate_1' },
      { id: 'aspnet', label: 'ASP.NET Core', level: 'intermediate_1' },
      { id: 'rails', label: 'Ruby on Rails', level: 'beginner_3' },
      { id: 'laravel', label: 'Laravel', level: 'intermediate_1' },
      { id: 'graphql', label: 'GraphQL', level: 'intermediate_3' },
      { id: 'rest', label: 'REST API Design', level: 'expert_2' },
      { id: 'grpc', label: 'gRPC', level: 'intermediate_1' },
      { id: 'websockets', label: 'WebSockets', level: 'intermediate_2' },
      { id: 'microservices', label: 'Microservices Architecture', level: 'intermediate_3' },
      { id: 'serverless', label: 'Serverless', level: 'intermediate_2' },
      { id: 'authentication', label: 'Authentication & OAuth', level: 'expert_1' }
    ]
  },

  // Frontend Development
  frontend: {
    label: 'Frontend Development',
    skills: [
      { id: 'html', label: 'HTML5', level: 'expert_2' },
      { id: 'css', label: 'CSS3', level: 'expert_1' },
      { id: 'react', label: 'React', level: 'expert_2' },
      { id: 'vue', label: 'Vue.js', level: 'intermediate_2' },
      { id: 'angular', label: 'Angular', level: 'intermediate_1' },
      { id: 'svelte', label: 'Svelte', level: 'beginner_3' },
      { id: 'nextjs', label: 'Next.js', level: 'expert_1' },
      { id: 'nuxt', label: 'Nuxt.js', level: 'intermediate_1' },
      { id: 'tailwind', label: 'Tailwind CSS', level: 'expert_1' },
      { id: 'sass', label: 'Sass/SCSS', level: 'intermediate_3' },
      { id: 'redux', label: 'Redux', level: 'intermediate_3' },
      { id: 'zustand', label: 'Zustand', level: 'intermediate_2' },
      { id: 'webpack', label: 'Webpack', level: 'intermediate_2' },
      { id: 'vite', label: 'Vite', level: 'intermediate_3' },
      { id: 'storybook', label: 'Storybook', level: 'intermediate_1' },
      { id: 'responsive', label: 'Responsive Design', level: 'expert_1' },
      { id: 'accessibility', label: 'Web Accessibility', level: 'intermediate_2' },
      { id: 'pwa', label: 'Progressive Web Apps', level: 'intermediate_1' }
    ]
  },

  // Databases
  databases: {
    label: 'Databases',
    skills: [
      { id: 'postgres', label: 'PostgreSQL', level: 'expert_2' },
      { id: 'mysql', label: 'MySQL', level: 'intermediate_3' },
      { id: 'mongodb', label: 'MongoDB', level: 'intermediate_3' },
      { id: 'redis', label: 'Redis', level: 'intermediate_2' },
      { id: 'elasticsearch', label: 'Elasticsearch', level: 'intermediate_1' },
      { id: 'sqlite', label: 'SQLite', level: 'intermediate_2' },
      { id: 'cassandra', label: 'Cassandra', level: 'beginner_2' },
      { id: 'dynamodb', label: 'DynamoDB', level: 'intermediate_1' },
      { id: 'neo4j', label: 'Neo4j', level: 'beginner_2' },
      { id: 'influxdb', label: 'InfluxDB', level: 'beginner_1' },
      { id: 'sqlalchemy', label: 'SQLAlchemy', level: 'expert_1' },
      { id: 'prisma', label: 'Prisma', level: 'intermediate_2' },
      { id: 'typeorm', label: 'TypeORM', level: 'intermediate_1' },
      { id: 'dbdesign', label: 'Database Design', level: 'intermediate_3' },
      { id: 'query_opt', label: 'Query Optimization', level: 'intermediate_2' }
    ]
  },

  // DevOps & Infrastructure
  devops: {
    label: 'DevOps & Infrastructure',
    skills: [
      { id: 'docker', label: 'Docker', level: 'expert_1' },
      { id: 'kubernetes', label: 'Kubernetes', level: 'intermediate_2' },
      { id: 'terraform', label: 'Terraform', level: 'intermediate_2' },
      { id: 'ansible', label: 'Ansible', level: 'intermediate_1' },
      { id: 'jenkins', label: 'Jenkins', level: 'intermediate_2' },
      { id: 'github_actions', label: 'GitHub Actions', level: 'expert_1' },
      { id: 'gitlab_ci', label: 'GitLab CI/CD', level: 'intermediate_2' },
      { id: 'argocd', label: 'ArgoCD', level: 'beginner_3' },
      { id: 'helm', label: 'Helm', level: 'intermediate_1' },
      { id: 'prometheus', label: 'Prometheus', level: 'intermediate_1' },
      { id: 'grafana', label: 'Grafana', level: 'intermediate_2' },
      { id: 'elk', label: 'ELK Stack', level: 'intermediate_1' },
      { id: 'nginx', label: 'Nginx', level: 'intermediate_3' },
      { id: 'linux', label: 'Linux Administration', level: 'intermediate_3' },
      { id: 'bash_scripting', label: 'Bash Scripting', level: 'intermediate_2' }
    ]
  },

  // Cloud Platforms
  cloud: {
    label: 'Cloud Platforms',
    skills: [
      { id: 'aws', label: 'AWS', level: 'intermediate_3' },
      { id: 'aws_ec2', label: 'AWS EC2', level: 'intermediate_2' },
      { id: 'aws_s3', label: 'AWS S3', level: 'intermediate_3' },
      { id: 'aws_lambda', label: 'AWS Lambda', level: 'intermediate_2' },
      { id: 'aws_rds', label: 'AWS RDS', level: 'intermediate_1' },
      { id: 'gcp', label: 'Google Cloud Platform', level: 'intermediate_1' },
      { id: 'gcp_compute', label: 'GCP Compute Engine', level: 'beginner_3' },
      { id: 'gcp_storage', label: 'GCP Cloud Storage', level: 'intermediate_1' },
      { id: 'azure', label: 'Microsoft Azure', level: 'beginner_3' },
      { id: 'azure_functions', label: 'Azure Functions', level: 'beginner_2' },
      { id: 'digitalocean', label: 'DigitalOcean', level: 'intermediate_2' },
      { id: 'vercel', label: 'Vercel', level: 'intermediate_3' },
      { id: 'netlify', label: 'Netlify', level: 'intermediate_2' },
      { id: 'cloudflare', label: 'Cloudflare', level: 'intermediate_1' },
      { id: 'heroku', label: 'Heroku', level: 'intermediate_2' }
    ]
  },

  // Data Science & ML
  datascience: {
    label: 'Data Science & ML',
    skills: [
      { id: 'numpy', label: 'NumPy', level: 'expert_1' },
      { id: 'pandas', label: 'Pandas', level: 'expert_2' },
      { id: 'matplotlib', label: 'Matplotlib', level: 'intermediate_3' },
      { id: 'seaborn', label: 'Seaborn', level: 'intermediate_2' },
      { id: 'plotly', label: 'Plotly', level: 'intermediate_2' },
      { id: 'sklearn', label: 'Scikit-learn', level: 'intermediate_3' },
      { id: 'tensorflow', label: 'TensorFlow', level: 'intermediate_1' },
      { id: 'pytorch', label: 'PyTorch', level: 'intermediate_2' },
      { id: 'keras', label: 'Keras', level: 'intermediate_1' },
      { id: 'jupyter', label: 'Jupyter Notebooks', level: 'expert_1' },
      { id: 'statistics', label: 'Statistics', level: 'intermediate_2' },
      { id: 'ml_basics', label: 'Machine Learning Fundamentals', level: 'intermediate_2' },
      { id: 'deep_learning', label: 'Deep Learning', level: 'intermediate_1' },
      { id: 'nlp', label: 'Natural Language Processing', level: 'intermediate_1' },
      { id: 'cv', label: 'Computer Vision', level: 'beginner_3' },
      { id: 'feature_eng', label: 'Feature Engineering', level: 'intermediate_2' },
      { id: 'model_deploy', label: 'Model Deployment', level: 'intermediate_1' }
    ]
  },

  // AI & LLMs
  ai: {
    label: 'AI & LLMs',
    skills: [
      { id: 'openai_api', label: 'OpenAI API', level: 'expert_1' },
      { id: 'langchain', label: 'LangChain', level: 'intermediate_3' },
      { id: 'llm_prompting', label: 'Prompt Engineering', level: 'expert_1' },
      { id: 'rag', label: 'RAG Systems', level: 'intermediate_2' },
      { id: 'vector_db', label: 'Vector Databases', level: 'intermediate_2' },
      { id: 'embeddings', label: 'Embeddings', level: 'intermediate_2' },
      { id: 'fine_tuning', label: 'Model Fine-tuning', level: 'intermediate_1' },
      { id: 'huggingface', label: 'Hugging Face', level: 'intermediate_2' },
      { id: 'anthropic_api', label: 'Anthropic Claude API', level: 'intermediate_3' },
      { id: 'ai_agents', label: 'AI Agents', level: 'intermediate_1' },
      { id: 'semantic_search', label: 'Semantic Search', level: 'intermediate_2' },
      { id: 'chatbots', label: 'Chatbot Development', level: 'intermediate_2' }
    ]
  },

  // Testing & Quality
  testing: {
    label: 'Testing & Quality',
    skills: [
      { id: 'pytest', label: 'Pytest', level: 'expert_1' },
      { id: 'jest', label: 'Jest', level: 'intermediate_3' },
      { id: 'cypress', label: 'Cypress', level: 'intermediate_2' },
      { id: 'playwright', label: 'Playwright', level: 'intermediate_2' },
      { id: 'selenium', label: 'Selenium', level: 'intermediate_1' },
      { id: 'unittest', label: 'Unit Testing', level: 'expert_1' },
      { id: 'integration_test', label: 'Integration Testing', level: 'intermediate_3' },
      { id: 'e2e_test', label: 'E2E Testing', level: 'intermediate_2' },
      { id: 'tdd', label: 'Test-Driven Development', level: 'intermediate_2' },
      { id: 'mocking', label: 'Mocking & Stubbing', level: 'intermediate_3' },
      { id: 'coverage', label: 'Code Coverage', level: 'intermediate_2' },
      { id: 'load_testing', label: 'Load Testing', level: 'intermediate_1' },
      { id: 'api_testing', label: 'API Testing', level: 'intermediate_2' }
    ]
  },

  // Security
  security: {
    label: 'Security',
    skills: [
      { id: 'owasp', label: 'OWASP Top 10', level: 'intermediate_2' },
      { id: 'encryption', label: 'Encryption & Hashing', level: 'intermediate_2' },
      { id: 'jwt', label: 'JWT Tokens', level: 'intermediate_3' },
      { id: 'ssl_tls', label: 'SSL/TLS', level: 'intermediate_1' },
      { id: 'security_headers', label: 'Security Headers', level: 'intermediate_1' },
      { id: 'cors', label: 'CORS', level: 'intermediate_2' },
      { id: 'sql_injection', label: 'SQL Injection Prevention', level: 'intermediate_2' },
      { id: 'xss_prevention', label: 'XSS Prevention', level: 'intermediate_2' },
      { id: 'secrets_mgmt', label: 'Secrets Management', level: 'intermediate_1' },
      { id: 'vulnerability_scan', label: 'Vulnerability Scanning', level: 'beginner_3' },
      { id: 'penetration_test', label: 'Penetration Testing Basics', level: 'beginner_2' }
    ]
  },

  // Tools & Productivity
  tools: {
    label: 'Tools & Productivity',
    skills: [
      { id: 'git', label: 'Git', level: 'expert_2' },
      { id: 'github', label: 'GitHub', level: 'expert_2' },
      { id: 'gitlab', label: 'GitLab', level: 'intermediate_2' },
      { id: 'vscode', label: 'VS Code', level: 'expert_1' },
      { id: 'vim', label: 'Vim', level: 'intermediate_1' },
      { id: 'postman', label: 'Postman', level: 'intermediate_3' },
      { id: 'insomnia', label: 'Insomnia', level: 'intermediate_1' },
      { id: 'figma', label: 'Figma', level: 'intermediate_1' },
      { id: 'notion', label: 'Notion', level: 'intermediate_2' },
      { id: 'slack', label: 'Slack', level: 'intermediate_2' },
      { id: 'jira', label: 'Jira', level: 'intermediate_2' },
      { id: 'confluence', label: 'Confluence', level: 'intermediate_1' },
      { id: 'linear', label: 'Linear', level: 'intermediate_1' },
      { id: 'miro', label: 'Miro', level: 'beginner_3' }
    ]
  },

  // Architecture & Design
  architecture: {
    label: 'Architecture & Design',
    skills: [
      { id: 'design_patterns', label: 'Design Patterns', level: 'intermediate_3' },
      { id: 'solid', label: 'SOLID Principles', level: 'intermediate_3' },
      { id: 'clean_arch', label: 'Clean Architecture', level: 'intermediate_2' },
      { id: 'ddd', label: 'Domain-Driven Design', level: 'intermediate_1' },
      { id: 'event_driven', label: 'Event-Driven Architecture', level: 'intermediate_2' },
      { id: 'cqrs', label: 'CQRS', level: 'beginner_3' },
      { id: 'api_design', label: 'API Design', level: 'intermediate_3' },
      { id: 'system_design', label: 'System Design', level: 'intermediate_2' },
      { id: 'scalability', label: 'Scalability Patterns', level: 'intermediate_1' },
      { id: 'caching', label: 'Caching Strategies', level: 'intermediate_2' },
      { id: 'load_balancing', label: 'Load Balancing', level: 'intermediate_1' },
      { id: 'message_queues', label: 'Message Queues', level: 'intermediate_2' }
    ]
  },

  // Mobile Development
  mobile: {
    label: 'Mobile Development',
    skills: [
      { id: 'react_native', label: 'React Native', level: 'intermediate_2' },
      { id: 'flutter', label: 'Flutter', level: 'beginner_3' },
      { id: 'ionic', label: 'Ionic', level: 'beginner_2' },
      { id: 'expo', label: 'Expo', level: 'intermediate_2' },
      { id: 'ios_dev', label: 'iOS Development', level: 'beginner_2' },
      { id: 'android_dev', label: 'Android Development', level: 'beginner_2' },
      { id: 'mobile_ui', label: 'Mobile UI Design', level: 'intermediate_1' },
      { id: 'app_store', label: 'App Store Deployment', level: 'intermediate_1' },
      { id: 'push_notif', label: 'Push Notifications', level: 'intermediate_1' },
      { id: 'deep_linking', label: 'Deep Linking', level: 'beginner_3' }
    ]
  },

  // Soft Skills
  soft: {
    label: 'Soft Skills',
    skills: [
      { id: 'communication', label: 'Communication', level: 'expert_1' },
      { id: 'teamwork', label: 'Teamwork', level: 'expert_1' },
      { id: 'leadership', label: 'Leadership', level: 'intermediate_2' },
      { id: 'problem_solving', label: 'Problem Solving', level: 'expert_2' },
      { id: 'critical_thinking', label: 'Critical Thinking', level: 'intermediate_3' },
      { id: 'time_mgmt', label: 'Time Management', level: 'intermediate_2' },
      { id: 'mentoring', label: 'Mentoring', level: 'intermediate_2' },
      { id: 'presentation', label: 'Presentation Skills', level: 'intermediate_2' },
      { id: 'documentation', label: 'Technical Documentation', level: 'intermediate_3' },
      { id: 'code_review', label: 'Code Review', level: 'expert_1' },
      { id: 'estimation', label: 'Project Estimation', level: 'intermediate_1' },
      { id: 'stakeholder', label: 'Stakeholder Management', level: 'intermediate_1' }
    ]
  },

  // Methodologies
  methodologies: {
    label: 'Methodologies',
    skills: [
      { id: 'agile', label: 'Agile', level: 'intermediate_3' },
      { id: 'scrum', label: 'Scrum', level: 'intermediate_3' },
      { id: 'kanban', label: 'Kanban', level: 'intermediate_2' },
      { id: 'lean', label: 'Lean Development', level: 'intermediate_1' },
      { id: 'devops_culture', label: 'DevOps Culture', level: 'intermediate_2' },
      { id: 'ci_cd', label: 'CI/CD Best Practices', level: 'intermediate_3' },
      { id: 'pair_prog', label: 'Pair Programming', level: 'intermediate_2' },
      { id: 'mob_prog', label: 'Mob Programming', level: 'beginner_3' },
      { id: 'bdd', label: 'Behavior-Driven Development', level: 'intermediate_1' },
      { id: 'refactoring', label: 'Refactoring', level: 'intermediate_3' }
    ]
  },

  // Hobbies & Interests
  hobbies: {
    label: 'Hobbies & Interests',
    skills: [
      { id: 'photography', label: 'Photography', level: 'intermediate_1' },
      { id: 'gaming', label: 'Gaming', level: 'intermediate_2' },
      { id: 'reading', label: 'Reading', level: 'intermediate_2' },
      { id: 'music', label: 'Music', level: 'beginner_3' },
      { id: 'cooking', label: 'Cooking', level: 'intermediate_1' },
      { id: 'travel', label: 'Travel', level: 'intermediate_1' },
      { id: 'fitness', label: 'Fitness', level: 'intermediate_1' },
      { id: 'hiking', label: 'Hiking', level: 'beginner_3' },
      { id: 'open_source', label: 'Open Source Contributing', level: 'intermediate_2' },
      { id: 'blogging', label: 'Technical Blogging', level: 'intermediate_1' }
    ]
  }
};

// =============================================================================
// BUILD GRAPH ELEMENTS
// =============================================================================

function buildElements() {
  const elements = [];
  const clusterSkillMap = {};

  // Add user node
  elements.push({
    data: { id: 'user', label: 'Full Stack Developer', type: 'user' }
  });

  // Process each cluster
  Object.entries(skillData).forEach(([clusterId, cluster]) => {
    clusterSkillMap[clusterId] = [];

    // Add cluster node
    elements.push({
      data: {
        id: clusterId,
        label: cluster.label,
        type: 'cluster'
      }
    });

    // Add edge from user to cluster
    elements.push({
      data: { source: 'user', target: clusterId, type: 'user-cluster' }
    });

    // Add skills
    cluster.skills.forEach(skill => {
      clusterSkillMap[clusterId].push(skill.level);

      elements.push({
        data: {
          id: skill.id,
          label: skill.label,
          level: skill.level,
          cluster: clusterId,
          clusterLabel: cluster.label,
          type: 'skill'
        }
      });

      // Add edge from cluster to skill
      elements.push({
        data: { source: clusterId, target: skill.id, type: 'cluster-skill' }
      });
    });
  });

  // Calculate median level for each cluster
  Object.entries(clusterSkillMap).forEach(([clusterId, levels]) => {
    const values = levels.map(l => LEVELS[l].value).sort((a, b) => a - b);
    const mid = Math.floor(values.length / 2);
    const medianValue = values.length % 2 === 0
      ? (values[mid - 1] + values[mid]) / 2
      : values[mid];

    // Find closest level to median
    let closestLevel = 'intermediate_2';
    let closestDiff = Infinity;
    Object.entries(LEVELS).forEach(([key, data]) => {
      const diff = Math.abs(data.value - medianValue);
      if (diff < closestDiff) {
        closestDiff = diff;
        closestLevel = key;
      }
    });

    // Update cluster node with median level
    const clusterNode = elements.find(e => e.data.id === clusterId);
    if (clusterNode) {
      clusterNode.data.medianLevel = closestLevel;
      clusterNode.data.skillCount = levels.length;
    }
  });

  return elements;
}

// =============================================================================
// HEXAGON SHAPE FOR CLUSTERS
// =============================================================================

// Register hexagon shape
cytoscape.prototype.registerShape = function() {};

// Create hexagon shape for clusters
function createHexagonPoints(centerX, centerY, size) {
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    points.push({
      x: centerX + size * Math.cos(angle),
      y: centerY + size * Math.sin(angle)
    });
  }
  return points;
}

// =============================================================================
// INITIALIZE CYTOSCAPE
// =============================================================================

const elements = buildElements();

// Count skills by level
const stats = {
  total: 0,
  beginner: 0,
  intermediate: 0,
  expert: 0
};

elements.forEach(el => {
  if (el.data.type === 'skill') {
    stats.total++;
    const category = getLevelCategory(el.data.level);
    stats[category]++;
  }
});

// Update stat counters
document.getElementById('total-skills').textContent = stats.total;
document.getElementById('beginner-count').textContent = stats.beginner;
document.getElementById('intermediate-count').textContent = stats.intermediate;
document.getElementById('expert-count').textContent = stats.expert;

// Initialize Cytoscape
const cy = cytoscape({
  container: document.getElementById('cy'),
  elements,
  layout: { name: 'preset' },
  wheelSensitivity: 0.3,
  minZoom: 0.1,
  maxZoom: 3,

  style: [
    // Base node style
    {
      selector: 'node',
      style: {
        'label': 'data(label)',
        'text-valign': 'bottom',
        'text-halign': 'center',
        'text-margin-y': 8,
        'text-wrap': 'wrap',
        'text-max-width': '80px',
        'font-family': '"Outfit", -apple-system, sans-serif',
        'font-size': '10px',
        'color': '#333',
        'text-outline-color': '#fff',
        'text-outline-width': 2,
        'text-outline-opacity': 1,
        'transition-property': 'background-color, border-color, width, height, opacity, box-shadow',
        'transition-duration': '0.25s',
        'overlay-opacity': 0
      }
    },

    // User node - central hub
    {
      selector: 'node[type="user"]',
      style: {
        'width': 120,
        'height': 120,
        'background-color': '#1a1a1a',
        'background-opacity': 1,
        'border-width': 5,
        'border-color': '#4CEAB1',
        'border-opacity': 1,
        'text-valign': 'center',
        'text-halign': 'center',
        'text-margin-y': 0,
        'font-size': '13px',
        'font-weight': 700,
        'color': '#fff',
        'text-outline-width': 0,
        'text-max-width': '90px',
        'z-index': 1000,
        'shadow-blur': 30,
        'shadow-color': 'rgba(76, 234, 177, 0.4)',
        'shadow-offset-x': 0,
        'shadow-offset-y': 0,
        'shadow-opacity': 1
      }
    },

    // Cluster nodes - hexagon shape
    {
      selector: 'node[type="cluster"]',
      style: {
        'width': 90,
        'height': 90,
        'shape': 'hexagon',
        'background-color': CLUSTER_COLOR,
        'background-opacity': 1,
        'border-width': 3,
        'border-style': 'solid',
        'border-color': '#8BB8E8',
        'text-valign': 'center',
        'text-halign': 'center',
        'text-margin-y': 0,
        'font-size': '10px',
        'font-weight': 600,
        'color': '#1a3a5c',
        'text-outline-color': '#fff',
        'text-outline-width': 2,
        'text-max-width': '75px',
        'z-index': 100,
        'shadow-blur': 15,
        'shadow-color': 'rgba(139, 184, 232, 0.3)',
        'shadow-offset-x': 0,
        'shadow-offset-y': 4,
        'shadow-opacity': 1
      }
    },

    // Skill nodes - Level 1 (smallest)
    {
      selector: 'node[level="beginner_1"]',
      style: {
        'width': 32,
        'height': 32,
        'background-color': '#F6ECC9',
        'border-width': 2,
        'border-color': '#E8D9A0',
        'font-size': '9px',
        'font-weight': 500,
        'color': '#5a4d1f',
        'text-outline-color': '#fff',
        'text-outline-width': 1.5,
        'z-index': 10
      }
    },
    // Level 2
    {
      selector: 'node[level="beginner_2"]',
      style: {
        'width': 36,
        'height': 36,
        'background-color': '#F6E39E',
        'border-width': 2,
        'border-color': '#E0CA70',
        'font-size': '9px',
        'font-weight': 500,
        'color': '#5a4d1f',
        'text-outline-color': '#fff',
        'text-outline-width': 1.5,
        'z-index': 10
      }
    },
    // Level 3
    {
      selector: 'node[level="beginner_3"]',
      style: {
        'width': 40,
        'height': 40,
        'background-color': '#F8D247',
        'border-width': 2,
        'border-color': '#D9B530',
        'font-size': '9px',
        'font-weight': 500,
        'color': '#4a3d10',
        'text-outline-color': '#fff',
        'text-outline-width': 1.5,
        'z-index': 10
      }
    },

    // Level 4
    {
      selector: 'node[level="intermediate_1"]',
      style: {
        'width': 44,
        'height': 44,
        'background-color': '#B7FEE4',
        'border-width': 2,
        'border-color': '#7FE8C4',
        'font-size': '9px',
        'font-weight': 500,
        'color': '#1a5c47',
        'text-outline-color': '#fff',
        'text-outline-width': 1.5,
        'z-index': 10
      }
    },
    // Level 5
    {
      selector: 'node[level="intermediate_2"]',
      style: {
        'width': 48,
        'height': 48,
        'background-color': '#4CEAB1',
        'border-width': 2,
        'border-color': '#2FC892',
        'font-size': '9px',
        'font-weight': 500,
        'color': '#0d3d2d',
        'text-outline-color': '#fff',
        'text-outline-width': 1.5,
        'z-index': 10
      }
    },
    // Level 6
    {
      selector: 'node[level="intermediate_3"]',
      style: {
        'width': 52,
        'height': 52,
        'background-color': '#45B68D',
        'border-width': 2,
        'border-color': '#339970',
        'font-size': '10px',
        'font-weight': 500,
        'color': '#fff',
        'text-outline-color': '#1a5c47',
        'text-outline-width': 1.5,
        'z-index': 10
      }
    },

    // Level 7
    {
      selector: 'node[level="expert_1"]',
      style: {
        'width': 56,
        'height': 56,
        'background-color': '#666666',
        'border-width': 2,
        'border-color': '#4d4d4d',
        'font-size': '10px',
        'font-weight': 600,
        'color': '#fff',
        'text-outline-color': '#333',
        'text-outline-width': 1.5,
        'z-index': 10
      }
    },
    // Level 8
    {
      selector: 'node[level="expert_2"]',
      style: {
        'width': 60,
        'height': 60,
        'background-color': '#333333',
        'border-width': 2,
        'border-color': '#1a1a1a',
        'font-size': '10px',
        'font-weight': 600,
        'color': '#fff',
        'text-outline-color': '#000',
        'text-outline-width': 1.5,
        'z-index': 10
      }
    },
    // Level 9 (highest)
    {
      selector: 'node[level="expert_3"]',
      style: {
        'width': 66,
        'height': 66,
        'background-color': '#000000',
        'border-width': 3,
        'border-color': '#4CEAB1',
        'font-size': '10px',
        'font-weight': 700,
        'color': '#fff',
        'text-outline-color': '#000',
        'text-outline-width': 1.5,
        'z-index': 15
      }
    },

    // Edges
    {
      selector: 'edge',
      style: {
        'width': 1,
        'line-color': '#ccc',
        'curve-style': 'bezier',
        'opacity': 0.4,
        'target-arrow-shape': 'none'
      }
    },

    {
      selector: 'edge[type="user-cluster"]',
      style: {
        'width': 2.5,
        'line-color': '#8BB8E8',
        'opacity': 0.5,
        'line-style': 'solid'
      }
    },

    {
      selector: 'edge[type="cluster-skill"]',
      style: {
        'width': 1,
        'line-color': '#d0d0d0',
        'opacity': 0.35
      }
    },

    // Highlighted states
    {
      selector: 'node.highlighted',
      style: {
        'border-color': '#4CEAB1',
        'border-width': 4,
        'z-index': 2000,
        'shadow-blur': 25,
        'shadow-color': 'rgba(76, 234, 177, 0.6)',
        'shadow-opacity': 1
      }
    },

    {
      selector: 'node.faded',
      style: {
        'opacity': 0.15
      }
    },

    {
      selector: 'edge.faded',
      style: {
        'opacity': 0.05
      }
    },

    {
      selector: 'node.search-match',
      style: {
        'border-color': '#F8D247',
        'border-width': 4,
        'z-index': 3000,
        'shadow-blur': 25,
        'shadow-color': 'rgba(248, 210, 71, 0.7)',
        'shadow-opacity': 1
      }
    },

    {
      selector: 'edge.highlighted',
      style: {
        'opacity': 0.8,
        'width': 2,
        'line-color': '#4CEAB1'
      }
    }
  ]
});

// =============================================================================
// LAYOUT CONFIGURATION
// =============================================================================

const layoutConfig = {
  name: 'cose',
  animate: false,
  randomize: true,
  
  // Physics simulation settings
  gravity: 0.05,
  nodeRepulsion: 500000,
  nodeOverlap: 80,
  
  // Different edge lengths based on edge type!
  // This is the key - cluster-skill edges are short, user-cluster edges are long
  idealEdgeLength: function(edge) {
    if (edge.data('type') === 'user-cluster') {
      return 400; // Long - push clusters far from center and each other
    }
    return 80; // Short - keep skills close to their cluster
  },
  
  edgeElasticity: function(edge) {
    if (edge.data('type') === 'user-cluster') {
      return 200; // Stiff - maintain distance between clusters
    }
    return 50; // Flexible - skills can adjust around cluster
  },
  
  nestingFactor: 1.2,
  
  // Spacing
  padding: 100,
  componentSpacing: 300,
  
  // Iterations for better results
  numIter: 2500,
  
  // Cooling
  initialTemp: 1000,
  coolingFactor: 0.99,
  minTemp: 1.0
};

function runLayout() {
  cy.layout(layoutConfig).run();
  cy.fit(undefined, 80);
}

// =============================================================================
// TOOLTIP
// =============================================================================

const tooltip = document.getElementById('tooltip');
const tooltipTitle = tooltip.querySelector('.tooltip-title');
const tooltipLevel = tooltip.querySelector('.tooltip-level');
const tooltipCluster = tooltip.querySelector('.tooltip-cluster');
const clusterInfo = document.getElementById('cluster-info');

function showTooltip(node, event) {
  const data = node.data();

  if (data.type === 'user') {
    tooltipTitle.textContent = data.label;
    tooltipLevel.textContent = '';
    tooltipLevel.className = 'tooltip-level';
    tooltipLevel.style.display = 'none';
    tooltipCluster.textContent = stats.total + ' skills across ' + Object.keys(skillData).length + ' domains';
  } else if (data.type === 'cluster') {
    tooltipTitle.textContent = data.label;
    const levelInfo = LEVELS[data.medianLevel];
    tooltipLevel.textContent = 'Median: ' + levelInfo.name + ' (Tier ' + levelInfo.tier + ')';
    tooltipLevel.className = 'tooltip-level ' + getLevelCategory(data.medianLevel);
    tooltipLevel.style.display = 'inline-flex';
    tooltipCluster.textContent = data.skillCount + ' skills in this domain';
  } else {
    tooltipTitle.textContent = data.label;
    const levelInfo = LEVELS[data.level];
    tooltipLevel.textContent = levelInfo.name + ' (Tier ' + levelInfo.tier + ')';
    tooltipLevel.className = 'tooltip-level ' + getLevelCategory(data.level);
    tooltipLevel.style.display = 'inline-flex';
    tooltipCluster.textContent = 'Domain: ' + data.clusterLabel;
  }

  const x = event.originalEvent.clientX;
  const y = event.originalEvent.clientY;

  tooltip.style.left = (x + 15) + 'px';
  tooltip.style.top = (y + 15) + 'px';
  tooltip.classList.add('visible');
}

function hideTooltip() {
  tooltip.classList.remove('visible');
}

function updateClusterInfo(node) {
  const data = node.data();
  clusterInfo.textContent = '';

  if (data.type === 'skill') {
    const levelInfo = LEVELS[data.level];
    const colorSpan = document.createElement('span');
    colorSpan.style.color = levelInfo.color;
    colorSpan.style.fontWeight = '600';
    colorSpan.textContent = data.label;
    clusterInfo.appendChild(colorSpan);
    clusterInfo.appendChild(document.createTextNode(' · ' + levelInfo.name + ' T' + levelInfo.tier));
  } else if (data.type === 'cluster') {
    const colorSpan = document.createElement('span');
    colorSpan.style.color = '#1a3a5c';
    colorSpan.style.fontWeight = '600';
    colorSpan.textContent = data.label;
    clusterInfo.appendChild(colorSpan);
    clusterInfo.appendChild(document.createTextNode(' · ' + data.skillCount + ' skills'));
  } else {
    clusterInfo.textContent = data.label;
  }
}

// Event listeners
cy.on('mouseover', 'node', function(e) {
  showTooltip(e.target, e);
  updateClusterInfo(e.target);
  e.target.addClass('highlighted');

  // When hovering a cluster, fade everything else
  if (e.target.data('type') === 'cluster') {
    const clusterId = e.target.id();
    const clusterSkills = cy.nodes('[cluster="' + clusterId + '"]');
    const clusterWithSkills = clusterSkills.add(e.target);
    const userNode = cy.$('#user');
    const userEdge = cy.edges('[source="user"][target="' + clusterId + '"]');
    const skillEdges = clusterSkills.connectedEdges();

    cy.elements().addClass('faded');
    clusterWithSkills.removeClass('faded');
    userNode.removeClass('faded');
    userEdge.removeClass('faded').addClass('highlighted');
    skillEdges.removeClass('faded');
  }
});

cy.on('mouseout', 'node', function(e) {
  hideTooltip();
  e.target.removeClass('highlighted');
  clusterInfo.textContent = 'Hover over a node';

  if (e.target.data('type') === 'cluster') {
    cy.elements().removeClass('faded highlighted');
  }
});

cy.on('mousemove', 'node', function(e) {
  const x = e.originalEvent.clientX;
  const y = e.originalEvent.clientY;
  tooltip.style.left = (x + 15) + 'px';
  tooltip.style.top = (y + 15) + 'px';
});

// =============================================================================
// CONTROLS
// =============================================================================

// Zoom controls
document.getElementById('zoom-in').addEventListener('click', () => {
  cy.zoom({
    level: cy.zoom() * 1.3,
    renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 }
  });
});

document.getElementById('zoom-out').addEventListener('click', () => {
  cy.zoom({
    level: cy.zoom() / 1.3,
    renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 }
  });
});

document.getElementById('fit').addEventListener('click', () => {
  cy.fit(undefined, 60);
});

document.getElementById('center').addEventListener('click', () => {
  const userNode = cy.$('#user');
  cy.animate({
    center: { eles: userNode },
    zoom: 0.8,
    duration: 400,
    easing: 'ease-out-cubic'
  });
});

// Layout controls
const layoutOptions = document.querySelectorAll('.layout-option');
let currentLayout = 'radial';

layoutOptions.forEach(btn => {
  btn.addEventListener('click', () => {
    const layoutName = btn.dataset.layout;
    if (layoutName === currentLayout) return;

    layoutOptions.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentLayout = layoutName;

    let config;

    if (layoutName === 'cose') {
      config = layoutConfig;
    } else if (layoutName === 'concentric') {
      config = {
        name: 'concentric',
        animate: true,
        animationDuration: 800,
        concentric: node => {
          if (node.data('type') === 'user') return 3;
          if (node.data('type') === 'cluster') return 2;
          return 1;
        },
        levelWidth: () => 1,
        minNodeSpacing: 80,
        padding: 100
      };
    } else if (layoutName === 'circle') {
      config = {
        name: 'circle',
        animate: true,
        animationDuration: 800,
        padding: 100,
        spacingFactor: 2
      };
    } else if (layoutName === 'breadthfirst') {
      config = {
        name: 'breadthfirst',
        animate: true,
        animationDuration: 800,
        directed: true,
        roots: '#user',
        padding: 100,
        spacingFactor: 2
      };
    }

    cy.layout(config).run();
    setTimeout(() => cy.fit(undefined, 80), 100);
  });
});

// Search functionality
const searchInput = document.getElementById('search');
let searchTimeout;

searchInput.addEventListener('input', (e) => {
  clearTimeout(searchTimeout);
  const query = e.target.value.toLowerCase().trim();

  searchTimeout = setTimeout(() => {
    cy.elements().removeClass('search-match faded');

    if (!query) return;

    const matches = cy.nodes().filter(node => {
      const label = node.data('label')?.toLowerCase() || '';
      return label.includes(query);
    });

    if (matches.length > 0) {
      cy.elements().addClass('faded');
      matches.removeClass('faded').addClass('search-match');

      // Include connected clusters and user
      matches.forEach(node => {
        if (node.data('type') === 'skill') {
          const cluster = cy.$('#' + node.data('cluster'));
          cluster.removeClass('faded');
          const userNode = cy.$('#user');
          userNode.removeClass('faded');
        }
      });

      // Fit to matches
      if (matches.length <= 10) {
        cy.animate({
          fit: { eles: matches, padding: 100 },
          duration: 400
        });
      }
    }
  }, 200);
});

// Clear search on Escape
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    searchInput.value = '';
    cy.elements().removeClass('search-match faded');
    cy.fit(undefined, 60);
  }
});

// =============================================================================
// INITIALIZATION
// =============================================================================

// Hide loading
function hideLoader() {
  const loader = document.getElementById('loading');
  if (loader) {
    loader.classList.add('hidden');
  }
}

// Run initial layout
runLayout();
setTimeout(hideLoader, 500);

// Make nodes draggable
cy.nodes().grabify();

// Enable box selection
cy.boxSelectionEnabled(true);

// Move skills together with their cluster when dragging
let dragStartPositions = {};

cy.on('grab', 'node[type="cluster"]', function(e) {
  const cluster = e.target;
  const clusterId = cluster.id();
  const clusterSkills = cy.nodes('[cluster="' + clusterId + '"]');

  dragStartPositions = {};
  const clusterPos = cluster.position();

  clusterSkills.forEach(skill => {
    const skillPos = skill.position();
    dragStartPositions[skill.id()] = {
      dx: skillPos.x - clusterPos.x,
      dy: skillPos.y - clusterPos.y
    };
  });
});

cy.on('drag', 'node[type="cluster"]', function(e) {
  const cluster = e.target;
  const clusterId = cluster.id();
  const clusterSkills = cy.nodes('[cluster="' + clusterId + '"]');
  const clusterPos = cluster.position();

  clusterSkills.forEach(skill => {
    const offset = dragStartPositions[skill.id()];
    if (offset) {
      skill.position({
        x: clusterPos.x + offset.dx,
        y: clusterPos.y + offset.dy
      });
    }
  });
});

cy.on('free', 'node[type="cluster"]', function(e) {
  dragStartPositions = {};
});

// Double-click to focus
cy.on('dblclick', 'node', function(e) {
  const node = e.target;
  
  if (node.data('type') === 'cluster') {
    // Focus on cluster and its skills
    const clusterId = node.id();
    const skills = cy.nodes('[cluster="' + clusterId + '"]');
    const collection = skills.add(node);
    cy.animate({
      fit: { eles: collection, padding: 80 },
      duration: 400,
      easing: 'ease-out-cubic'
    });
  } else {
    cy.animate({
      center: { eles: node },
      zoom: 1.5,
      duration: 400,
      easing: 'ease-out-cubic'
    });
  }
});

// Right-click to show cluster skills
cy.on('cxttap', 'node[type="cluster"]', function(e) {
  const cluster = e.target;
  const skills = cy.nodes('[cluster="' + cluster.id() + '"]');
  const collection = skills.add(cluster);

  cy.animate({
    fit: { eles: collection, padding: 80 },
    duration: 400
  });
});

console.log('Skill Observatory initialized with ' + stats.total + ' skills');
