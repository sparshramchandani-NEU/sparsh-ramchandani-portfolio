// pages/api/chatbot/routes.js
import axios from 'axios';

// Portfolio information for context - REPLACE WITH YOUR ACTUAL INFO
const portfolioInfo = `
NAME: Sparsh Ghanshyamdas Ramchandani  
Role: DevOps & Software Engineer & Integration Engineer
Location: United States  
Email: sparshghanshyamdasramchandani@gmail.com  
Phone: 617-467-8533  

TAGLINE:  
Turning Complexity Into Elegance  
I architect robust, scalable systems where DevOps best practices and modern software engineering converge-delivering seamless deployments and resilient cloud-native solutions.

SKILLS:  
Frontend: React.js, JavaScript  
Testing Tools: Selenium, Cypress, Postman, Pytest, Jira
Backend: Node.js, Java, Go, FastAPI, Spring Boot, Gorm, Gin, Django, Hibernate  
Cloud & DevOps: AWS, GCP, Azure, Kubernetes (AKS, EKS), Docker, Terraform, Pulumi, Jenkins, ArgoCD, Helm, Linux  
Supply Chain Systems: NetSuite, SAP, WMS platforms, ERP systems, Oracle SCM
Integration Platforms: Workato, Boomi, Celigo, MuleSoft, Apache NiFi
CI/CD & Automation: Azure Pipelines, GitHub Actions, ArgoCD, Jenkins  
Monitoring & Logging: Prometheus, Grafana, AWS CloudWatch, Datadog, Kafka  
Databases: MySQL, MongoDB, PostgreSQL, DynamoDB, AWS RDS, SQL Server, Redis  
Languages: Python, Java, JavaScript, Bash, Go, Swift, Ruby  
Other: Microservices, RESTful APIs, Infrastructure as Code (IaC), Distributed Systems, Shell Scripting, Postman, API testing, CI/CD Integration, Defect Tracking, Documentation

EXPERIENCE:  

- Fullstack Engineer, Bright Mind Enrichment & Schooling (Sep 2024 – Present)  
  * Designed, developed, and maintained RESTful APIs and microservices using Node.js and React.js, enabling seamless integration and supporting scalable business operations.  
  * Automated infrastructure provisioning and microservices deployment on AKS using Terraform, ArgoCD, and Azure Pipelines, following best practices for containerization and CI/CD.  
  * Collaborated with stakeholders and cross-functional teams to define requirements, prioritize features, and ensure alignment between business goals and technical solutions.  
  * Enhanced deployment robustness by implementing monitoring, security measures, and AKS best practices, resulting in improved system reliability and operational efficiency.
  ●	Built B2B integration flows between e-commerce platforms and internal WMS using Workato and REST APIs, processing 10K+ daily transactions with JSON/XML data transformation and EDI message mapping 
●	Developed Ruby-based ETL pipelines for supply chain data synchronization between NetSuite ERP and MongoDB, implementing automated testing workflows and comprehensive documentation for 3rd party integrations 
●	Established API integrations with shipping carriers (FedEx, UPS) using Node.js and Express.js, providing customer-facing support for integration issues and achieving 99.9% uptime through Datadog monitoring 
●	Implemented webhook-based event processing system for inventory management using Azure Functions and Redis, enabling real-time updates across multiple WMS platforms with detailed audit logging
● Designed and executed automated and manual test cases for cloud-based microservices, validating functional, performance, and security requirements using Cypress and Postman. 
● Developed and maintained end-to-end API test scripts, ensuring robust data integrity and seamless integration across distributed systems. 
● Collaborated with developers and stakeholders to define acceptance criteria, refine test strategies, and document defects in Jira, enhancing product quality and traceability. 
● Integrated automated tests into Azure Pipelines for continuous deployment, improving release reliability and accelerating feedback cycles.


- Fullstack Engineer, Samsung (Oct 2021 – Aug 2022)  
  * Migrated legacy Java-based microservices to Go, resulting in improved system performance, reduced latency, and easier maintenance for distributed cloud-native applications.  
  * Designed, developed, and maintained RESTful APIs utilizing Go with Gin as well as Java with Spring Boot and Hibernate, supporting seamless integration and robust backend functionality.  
  * Integrated an Envoy-based service mesh within Kubernetes clusters to optimize service discovery, traffic management, and security across microservices.  
  * Implemented continuous monitoring for EKS with Datadog, and managed infrastructure and configuration using Terraform and Helm to ensure reliable, scalable deployments.
  ●	Architected IPaaS solution using Boomi for connecting Samsung's ERP systems with 3rd party supply chain partners, handling EDI 850/810 purchase orders and invoices with XML/JSON transformations 
●	Created REST API integration framework in Go for B2B system integrations between warehouse management systems and e-commerce platforms, supporting customer integrations with comprehensive error handling 
●	Deployed Ruby scripts for automated EDI message validation and mapping between trading partners, reducing integration errors by 40% while maintaining detailed documentation for support teams 
●	Built real-time inventory synchronization platform using Kafka and PostgreSQL, integrating with multiple WMS platforms through standardized API clients and providing 3rd line support to non-technical stakeholders
 Led the migration of test automation frameworks from legacy systems to microservices based testing, leveraging Selenium and custom scripts for comprehensive regression and performance testing. 
 ● Built and executed automated test suites for RESTful APIs and web applications, ensuring scalability and reliability in Kubernetes-managed environments.
 ● Implemented continuous integration of automated tests within EKS deployments using Terraform and Helm, supporting rapid, high-quality releases.
 ● Identified, documented, and tracked software defects using Jira, collaborating closely with cross- functional teams to resolve issues and optimize system performance


- Fullstack Engineer, Ultra Instruments & Controls (Oct 2019 – Oct 2020)  
  * Built and deployed a full-stack web application using FastAPI for backend APIs and React for a dynamic, responsive frontend.  
  * Containerized and deployed services on GCP using Google Cloud Containers and Google Storage, leveraging Terraform for infrastructure provisioning and GitHub Actions for automated CI/CD workflows.  
  * Collaborated closely with stakeholders and cross-functional partners to gather requirements, iterate on features, and deliver solutions aligned with business objectives.  
  * Implemented secure, scalable API endpoints and optimized cloud infrastructure, resulting in high availability, efficient resource usage, and streamlined deployment cycles.
  ●	Developed Celigo-based integration flows connecting client ERP systems with supply chain applications, implementing REST/JSON APIs with Python FastAPI for seamless B2B integrations 
●	Engineered ETL data pipelines using Apache NiFi for warehouse inventory tracking, processing XML feeds from WMS platforms and transforming into standardized formats for NetSuite import 
●	Built customer-facing integration dashboard using React, providing real-time visibility into EDI transactions, API health monitoring, and automated alerting for 3rd party system connectivity issues 
●	Implemented Ruby-based middleware for e-commerce platform integrations (Shopify, Magento) with Google Cloud Functions, handling order fulfillment workflows and shipping carrier integrations
 Developed and executed automated and manual test cases for full-stack web applications deployed on GCP, ensuring functional and usability requirements were met. 
 ● Utilized Selenium and Pytest to automate UI and API testing, integrating test execution into GitHub Actions CI/CD workflows for rapid feedback. 
 ● Coordinated with stakeholders to gather requirements, define test plans, and communicate test results, supporting continuous improvement. 
 ● Maintained detailed documentation of test strategies, test cases, and defect reports, ensuring transparency and traceability throughout the software lifecycle.


PROJECTS:  

1. **Web-App (GitHub) (Dec 2023)**  
   * Pioneered Infrastructure as Code (IaC) adoption using Pulumi for AWS, orchestrating seamless deployment of EC2 instances and RDS databases, emphasizing scalability and automation.  
   * Integrated AWS Lambda, GCP storage, and Mailgun to streamline data workflows and enable user notifications upon task completion.  
   * Enhanced event-driven architecture using AWS SNS to trigger Lambda functions and DynamoDB for status tracking, enabling real-time system updates.
2. AI-Summarizer: Engineered a React/FastAPI AI summarizer using Hugging Face for multi-format inputs
3. Event Management System: Built a SwiftUI iOS event app with a Node.js/AWS backend, featuring QR sharing

EDUCATION:  
- Master of Science in Computer Software Engineering, Northeastern University, Boston, MA (Sep 2022 – May 2024)  
  Courses: Database Design, Algorithms, Cloud Computing, Web Design & Development, User Experience

CONTACT:  
Email: sparshghanshyamdasramchandani@gmail.com
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
          model: "llama-3.1-8b-instant", // You can also use "mixtral-8x7b-32768" or other Groq models
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
