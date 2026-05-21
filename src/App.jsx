import "./App.css";

function App() {
  const projects = [
    {
      title: "Enterprise AI Developer Copilot",
      desc: "RAG-based AI assistant that uploads project files, creates embeddings, stores content in FAISS, and answers codebase questions.",
      stack: "React · FastAPI · LangChain · FAISS · HuggingFace · RAG",
      link: "https://github.com/Richarreddy123/enterprise-ai-developer-copilot",
    },
    {
      title: "AI Resume Analyzer",
      desc: "ATS-style resume analyzer that compares resume content with job descriptions and returns match percentage, missing skills, and suggestions.",
      stack: "React · FastAPI · Python · PDF Parsing · Skill Matching",
      link: "#",
    },
    {
      title: "Real-Time Fraud Detection Platform",
      desc: "Low-latency ML system for transaction scoring using streaming pipelines and model inference APIs.",
      stack: "Python · Kafka · Spark · Redis · FastAPI · ML Models",
      link: "#",
    },
  ];

  return (
    <div className="page">
      <nav className="navbar">
        <h2>Richa Reddy Badala</h2>
        <div>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero">
        <p className="tag">AI/ML Engineer · GenAI · RAG · MLOps</p>
        <h1>Building production-grade AI systems for real-world impact.</h1>
        <p className="heroText">
          I design and build GenAI applications, RAG pipelines, ML inference APIs,
          and cloud-native AI platforms using Python, FastAPI, LangChain, Kafka,
          Spark, Kubernetes, AWS, and Azure.
        </p>

        <div className="buttons">
          <a href="https://github.com/Richarreddy123" target="_blank">
            <button>GitHub</button>
          </a>
          <a
  href="https://www.linkedin.com/in/richa-reddy-badala/"
  target="_blank"
  rel="noreferrer"
>
  <button>LinkedIn</button>
</a>
          <a
  href="/richa-resume.pdf"
  target="_blank"
  rel="noreferrer"
>
  <button>Resume</button>
</a>
        </div>
      </section>

      <section id="skills" className="section">
        <h2>Technical Skills</h2>
        <div className="grid">
          <Card title="GenAI / LLMs" text="RAG, LLMs, LangChain, OpenAI API, Azure OpenAI, HuggingFace, Prompt Engineering, Guardrails, Semantic Search" />
          <Card title="Machine Learning" text="ML, Deep Learning, NLP, Fraud Detection, Recommendation Systems, Personalization Models, CTR Prediction" />
          <Card title="Backend & APIs" text="Python, FastAPI, REST APIs, gRPC, Async Processing, Microservices, High-Concurrency Systems" />
          <Card title="Data Engineering" text="Apache Kafka, Spark Structured Streaming, PySpark, Real-Time Pipelines, Feature Stores" />
          <Card title="MLOps & Cloud" text="MLflow, Airflow, Docker, Kubernetes, GitHub Actions, AWS SageMaker, Bedrock, EKS, Azure OpenAI, AKS" />
          <Card title="Databases & Monitoring" text="Redis, Cassandra, SQL, Vector Databases, Prometheus, Datadog, Logging, Metrics, Alerting" />
        </div>
      </section>

      <section id="projects" className="section">
        <h2>Featured Projects</h2>
        <div className="projectGrid">
          {projects.map((project, index) => (
            <div className="projectCard" key={index}>
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              <span>{project.stack}</span>
              <a href={project.link} target="_blank">
                <button>View Project</button>
              </a>
            </div>
          ))}
        </div>
      </section>

      <section id="experience" className="section">
        <h2>Experience</h2>

        <div className="experience">
          <h3>JP Morgan Chase — Machine Learning Engineer</h3>
          <p>
            Built GenAI developer copilot systems, RAG pipelines, real-time
            embedding workflows, scalable inference services, and AI monitoring
            pipelines across cloud-native infrastructure.
          </p>
        </div>

        <div className="experience">
          <h3>IBM — Machine Learning Engineer</h3>
          <p>
            Developed fraud detection, personalization, document intelligence,
            and low-latency ML serving systems using Kafka, Spark, FastAPI,
            Docker, Kubernetes, MLflow, and Airflow.
          </p>
        </div>
      </section>

      <section id="contact" className="section contact">
        <h2>Contact</h2>
        <p>Email: richareddyb795@gmail.com</p>
        <p>GitHub: github.com/Richarreddy123</p>
      </section>
    </div>
  );
}

function Card({ title, text }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

export default App;