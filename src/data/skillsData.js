export const LEVELS = {
  beginner_1: { name: 'Beginner', tier: 1, value: 1, color: '#F6ECC9', size: 30 },
  beginner_2: { name: 'Beginner', tier: 2, value: 2, color: '#F6E39E', size: 34 },
  beginner_3: { name: 'Beginner', tier: 3, value: 3, color: '#F8D247', size: 38 },
  intermediate_1: { name: 'Intermediate', tier: 1, value: 4, color: '#B7FEE4', size: 42 },
  intermediate_2: { name: 'Intermediate', tier: 2, value: 5, color: '#4CEAB1', size: 46 },
  intermediate_3: { name: 'Intermediate', tier: 3, value: 6, color: '#45B68D', size: 50 },
  expert_1: { name: 'Expert', tier: 1, value: 7, color: '#666666', size: 54 },
  expert_2: { name: 'Expert', tier: 2, value: 8, color: '#333333', size: 58 },
  expert_3: { name: 'Expert', tier: 3, value: 9, color: '#000000', size: 64 }
};

export function getLevelCategory(level) {
  if (level.startsWith('beginner')) return 'beginner';
  if (level.startsWith('intermediate')) return 'intermediate';
  return 'expert';
}

export const skillData = {
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
