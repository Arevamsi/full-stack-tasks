const fs = require('fs');
const path = require('path');

const writeFiles = (baseDir, files) => {
    Object.keys(files).forEach(filePath => {
        const fullPath = path.join(baseDir, filePath);
        fs.mkdirSync(path.dirname(fullPath), { recursive: true });
        fs.writeFileSync(fullPath, files[filePath].trim());
    });
};

console.log("Generating Task 19 & 20 (Git)...");
writeFiles(__dirname + '/TASK-19_20_GitOperations', {
    'git-tutorial.md': `# Git Operations & Branching Strategies

## Task 19: Core Git Operations
\`\`\`bash
# Initialize repository
git init my-project
cd my-project

# Staging files
echo "# Project Title" > README.md
git add README.md
git add .

# Committing changes
git commit -m "Initial commit with README"

# Pushing to remote (assuming connection)
git remote add origin https://github.com/user/repo.git
git push origin main
\`\`\`

## Task 20: Branching Strategies & Conflicts
\`\`\`bash
# Create feature branch
git checkout -b feature-a

# Make changes and commit
echo "Feature A data" >> feature.txt
git add feature.txt
git commit -m "Added Feature A"

# Rebasing vs Merging
git checkout main
# simulate pulling updates from team
echo "Main branch data" >> main.txt
git add . && git commit -m "Updates on main"

# Rebasing feature onto main
git checkout feature-a
git rebase main

# Handling merge conflicts intentionally
git checkout -b feature-conflict
echo "Conflict 1" > file.txt
git commit -am "C1"
git checkout main
echo "Conflict 2" > file.txt
git commit -am "C2"
git merge feature-conflict
# The conflict must be resolved manually before:
# git commit -m "Resolved conflict"
\`\`\`
`
});

console.log("Generating Task 21 (CI/CD)...");
writeFiles(__dirname + '/TASK-21_CICDPipeline', {
    '.github/workflows/deploy.yml': `name: Spring Boot CI/CD Pipeline\n\non:\n  push:\n    branches: [ "main" ]\n  pull_request:\n    branches: [ "main" ]\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n    - uses: actions/checkout@v3\n    - name: Set up JDK 17\n      uses: actions/setup-java@v3\n      with:\n        java-version: '17'\n        distribution: 'temurin'\n    - name: Build with Maven\n      run: mvn -B package --file pom.xml\n    - name: Run Tests\n      run: mvn test\n  deploy:\n    needs: build\n    runs-on: ubuntu-latest\n    steps:\n    - name: Deploy to Cloud (Simulator)\n      run: echo "Deploying artifact to Production Servers..."`,
    'Jenkinsfile': `pipeline {\n    agent any\n    tools {\n        maven 'Maven 3.8.1'\n        jdk 'JDK 17'\n    }\n    stages {\n        stage('Checkout') {\n            steps {\n                git 'https://github.com/user/demo-repo.git'\n            }\n        }\n        stage('Build') {\n            steps {\n                sh 'mvn clean package -DskipTests'\n            }\n        }\n        stage('Test') {\n            steps {\n                sh 'mvn test'\n            }\n        }\n        stage('Deploy') {\n            steps {\n                echo 'Deploying to staging environment...'\n            }\n        }\n    }\n}`
});

console.log("Generating Task 22 (Cloud Analysis)...");
writeFiles(__dirname + '/TASK-22_CloudComparison', {
    'cloud_comparison.md': `# Cloud Service Providers Comparison\n\n## 1. AWS (Amazon Web Services)\n- **Compute:** EC2 (Elastic Compute Cloud), Lambda (Serverless), ECS/EKS (Containers)\n- **Storage:** S3 (Object Storage), EBS (Block Storage)\n- **Databases:** RDS (Relational), DynamoDB (NoSQL)\n- **Networking:** VPC (Virtual Private Cloud), Route 53 (DNS)\n\n## 2. GCP (Google Cloud Platform)\n- **Compute:** Compute Engine, Cloud Functions, GKE\n- **Storage:** Cloud Storage, Persistent Disk\n- **Databases:** Cloud SQL, Cloud Spanner, Firestore\n- **Networking:** Virtual Private Cloud, Cloud DNS\n\n## 3. Microsoft Azure\n- **Compute:** Virtual Machines, Azure Functions, AKS\n- **Storage:** Blob Storage, Disk Storage\n- **Databases:** Azure SQL, Cosmos DB\n- **Networking:** Virtual Network, Azure DNS\n\n## Pricing Model\nMost cloud providers use a **Pay-As-You-Go** model, billing by the second/minute for compute and per GB for storage, eliminating upfront capital expenditures.\n`
});

console.log("Generating Task 23 & 24 (Vibe Coding)...");
writeFiles(__dirname + '/TASK-23_24_VibeCoding', {
    'prompt_templates.md': `# Prompt Engineering & Vibe Coding\n\n## Task 23: Effective Prompts\n**Prompt Design:** "Act as a Senior DevOps Engineer. Generate a robust Terraform template to create an AWS VPC with 2 public subnets and 2 private subnets, including an Internet Gateway and NAT Gateway."\n*Evaluation:* High quality because it specifies the role, precise requirements, constraints (2 subnets), and expected artifacts.\n\n## Task 24: AI Cloud Feature Generation\n**Iteration 1:** "Write a Python API." (Too broad)\n**Iteration 2:** "Write a FastAPI application in Python that has a GET /status endpoint." (Better)\n**Iteration 3:** "Write a FastAPI app with a GET /status endpoint, package it in a Dockerfile, and provide an AWS ECS task definition." (Production-ready Vibe Coding)\n`,
    'generated_app/main.py': `from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/status")\ndef read_status():\n    return {"status": "healthy", "service": "vibe-cloud"}\n`,
    'generated_app/Dockerfile': `FROM python:3.9-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY . .\nCMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]\n`,
    'generated_app/requirements.txt': `fastapi\nuvicorn\n`
});

console.log("Batch 4 Done!");
