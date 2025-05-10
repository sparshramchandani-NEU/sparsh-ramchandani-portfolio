// pages/api/chatbot/routes.js
import axios from 'axios';

// Portfolio information for context - REPLACE WITH YOUR ACTUAL INFO
const portfolioInfo = `
NAME: Sparsh Ghanshyamdas Ramchandani  
Role: DevOps & Software Engineer  
Location: United States  
Email: sparshghanshyamdasramchandani@gmail.com  
Phone: 617-467-8533  

TAGLINE:  
Turning Complexity Into Elegance  
I architect robust, scalable systems where DevOps best practices and modern software engineering converge-delivering seamless deployments and resilient cloud-native solutions.

SKILLS:  
Frontend: React.js, JavaScript  
Backend: Node.js, Java, Go, FastAPI, Spring Boot, Gorm, Gin, Django, Hibernate  
Cloud & DevOps: AWS, GCP, Azure, Kubernetes (AKS, EKS), Docker, Terraform, Pulumi, Jenkins, ArgoCD, Helm, Linux  
CI/CD & Automation: Azure Pipelines, GitHub Actions, ArgoCD, Jenkins  
Monitoring & Logging: Prometheus, Grafana, AWS CloudWatch, Datadog, Kafka  
Databases: MySQL, MongoDB, PostgreSQL, DynamoDB, AWS RDS, SQL Server, Redis  
Languages: Python, Java, JavaScript, Bash, Go, Swift  
Other: Microservices, RESTful APIs, Infrastructure as Code (IaC), Distributed Systems, Shell Scripting, Postman

EXPERIENCE:  

- Software Engineer, Bright Mind Enrichment & Schooling (Sep 2024 – Present)  
  * Designed, developed, and maintained RESTful APIs and microservices using Node.js and React.js, enabling seamless integration and supporting scalable business operations.  
  * Automated infrastructure provisioning and microservices deployment on AKS using Terraform, ArgoCD, and Azure Pipelines, following best practices for containerization and CI/CD.  
  * Collaborated with stakeholders and cross-functional teams to define requirements, prioritize features, and ensure alignment between business goals and technical solutions.  
  * Enhanced deployment robustness by implementing monitoring, security measures, and AKS best practices, resulting in improved system reliability and operational efficiency.

- Software Engineer, Samsung (Oct 2021 – Aug 2022)  
  * Migrated legacy Java-based microservices to Go, resulting in improved system performance, reduced latency, and easier maintenance for distributed cloud-native applications.  
  * Designed, developed, and maintained RESTful APIs utilizing Go with Gin as well as Java with Spring Boot and Hibernate, supporting seamless integration and robust backend functionality.  
  * Integrated an Envoy-based service mesh within Kubernetes clusters to optimize service discovery, traffic management, and security across microservices.  
  * Implemented continuous monitoring for EKS with Datadog, and managed infrastructure and configuration using Terraform and Helm to ensure reliable, scalable deployments.

- DevOps Engineer, Ultra Instruments & Controls (Oct 2019 – Oct 2020)  
  * Built and deployed a full-stack web application using FastAPI for backend APIs and React for a dynamic, responsive frontend.  
  * Containerized and deployed services on GCP using Google Cloud Containers and Google Storage, leveraging Terraform for infrastructure provisioning and GitHub Actions for automated CI/CD workflows.  
  * Collaborated closely with stakeholders and cross-functional partners to gather requirements, iterate on features, and deliver solutions aligned with business objectives.  
  * Implemented secure, scalable API endpoints and optimized cloud infrastructure, resulting in high availability, efficient resource usage, and streamlined deployment cycles.

PROJECTS:  

1. **Web-App (GitHub) (Dec 2023)**  
   * Pioneered Infrastructure as Code (IaC) adoption using Pulumi for AWS, orchestrating seamless deployment of EC2 instances and RDS databases, emphasizing scalability and automation.  
   * Integrated AWS Lambda, GCP storage, and Mailgun to streamline data workflows and enable user notifications upon task completion.  
   * Enhanced event-driven architecture using AWS SNS to trigger Lambda functions and DynamoDB for status tracking, enabling real-time system updates.

EDUCATION:  
- Master of Science in Computer Software Engineering, Northeastern University, Boston, MA (Sep 2022 – May 2024)  
  Courses: Database Design, Algorithms, Cloud Computing, Web Design & Development, User Experience

CONTACT:  
Email: sparsh.ramchandani@example.com  
GitHub: https://github.com/sparshramchandani-NEU  
LinkedIn: https://www.linkedin.com/in/sparsh-ramchandani/
`;

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Log to console for debugging
    console.log('Received message:', message);
    
    // Check if API key exists
    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ 
        error: 'Configuration error', 
        response: 'Sorry, I\'m not configured correctly. Please contact the site administrator.' 
      });
    }

    try {
      // Use Groq API to generate a response
      const response = await axios({
        method: 'POST',
        url: 'https://api.groq.com/openai/v1/chat/completions',
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        data: {
          model: "llama3-8b-8192", // You can also use "mixtral-8x7b-32768" or other Groq models
          messages: [
            {
              role: "system",
              content: `You are an AI assistant for Sparsh Ramchandani's portfolio website. 
              You embody Sparsh's professional brand - elegant, sophisticated, and technically proficient.
              Your purpose is to answer questions about Sparsh's skills, experience, projects, education, and contact information.
              Only answer questions related to the portfolio information provided.
              For other questions, politely redirect the conversation back to Sparsh's professional information.
              You are not a general-purpose AI and should not provide information outside of the portfolio context.
              Be helpful, concise, and friendly. Keep responses under 3 sentences unless elaboration is necessary.
              Use a confident, professional tone that matches Sparsh's brand of "Turning Complexity Into Elegance".
              Here is Sparsh's portfolio information: ${portfolioInfo}`
            },
            { role: "user", content: message }
          ],
          max_tokens: 500,
          temperature: 0.7
        }
      });

      const groqResponse = response.data.choices[0].message.content;
      console.log('Groq response success:', groqResponse.substring(0, 50) + '...');
      return res.status(200).json({ response: groqResponse });
    } catch (error) {
      console.error('API error:', error);
      
      // Provide a meaningful error message
      let errorMessage = 'Sorry, I encountered an error processing your request. Please try again later.';
      
      // Add more specific error messages based on the error type
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
        
        if (error.response.status === 401) {
          errorMessage = 'Authentication error. Please check the API key configuration.';
        } else if (error.response.status === 429) {
          errorMessage = 'Too many requests. Please try again in a moment.';
        } else if (error.response.status >= 500) {
          errorMessage = 'The AI service is currently unavailable. Please try again later.';
        }
      } else if (error.request) {
        console.error('No response received');
        errorMessage = 'No response received from the AI service. Please check your internet connection.';
      }
      
      return res.status(200).json({ 
        response: 'I apologize, but I\'m having trouble connecting to my knowledge base right now. Please try asking again in a moment.' 
      });
    }
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      error: 'Failed to process your request', 
      response: 'Sorry, I encountered an error. Please try again.' 
    });
  }
}