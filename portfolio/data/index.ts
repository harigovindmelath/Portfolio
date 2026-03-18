export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  link?: string;
  featured?: boolean;
  isAI?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Real-Time Violence Detection System",
    description: "Built a real-time system to detect violent activity in video streams using CNN for spatial feature extraction and LSTM for temporal analysis. Designed for multi-person scenarios.",
    tech: ["PyTorch", "OpenCV"],
    featured: true,
    link: "https://github.com/harigovindmelath/Real-Time-Violence-Detection-From-Video-Usig-CNN-LSTM.git",
  },
  {
    id: 0,
    title: "Smart Water Leak Detection System (IoT + LSTM + Flask)",
    description: "Developed an end-to-end IoT-based system to monitor water flow, pressure, and temperature in real time using ESP32. Integrated an LSTM-based predictive model for leak detection and Flask dashboard.",
    tech: ["ESP32", "IoT", "Python", "LSTM", "Flask"],
    featured: true,
    link: "https://github.com/harigovindmelath/Smart-Water-Leak-Detection-System-IoT-LSTM-Flask-.git",
  },
  {
    id: 2,
    title: "AgriSkill – Web Application for Connecting Farmers",
    description: "Developed a web platform connecting farmers with experts using intelligent matching. Implemented TF-IDF and k-NN algorithms to recommend relevant experts.",
    tech: ["Django", "Python"],
    featured: true,
    link: "https://github.com/harigovindmelath/agriskill.git",
  },
  {
    id: 3,
    title: "Motion Detection and Alert System",
    description: "Created an automated monitoring system that detects motion from live video feeds and triggers real-time alerts via email, reducing manual surveillance effort.",
    tech: ["OpenCV", "Python"],
    featured: true,
    link: "https://github.com/harigovindmelath/Motion-Detection-and-Alert-System-with-Image-Capture-and-Email-Notifications.git",
  },
  {
    id: 4,
    title: "Expense Tracker",
    description: "Built a lightweight web application to track daily expenses with category-based organization and real-time total calculation.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/harigovindmelath/Expense_tracker.git",
  },
  {
    id: 5,
    title: "Employee Payroll Management System",
    description: "Designed a normalized relational database system to manage employee records and payroll efficiently.",
    tech: ["SQL"],
    link: "https://github.com/harigovindmelath/Employee_payroll_management.git",
  },
  {
    id: 6,
    title: "Thengha Launchpad",
    description: "Developed a fully functional application using the Loveable AI platform, showcasing rapid AI-assisted development workflows.",
    tech: ["React", "Tailwind"],
    isAI: true,
    link: "https://github.com/harigovindmelath/thengha-launchpad.git",
  },
  {
    id: 7,
    title: "Student Management System (PyQt6)",
    description: "Built a desktop application with an interactive GUI to manage student records with CRUD operations and SQLite integration.",
    tech: ["Python", "PyQt6", "SQLite"],
    link: "https://github.com/harigovindmelath/Student-Management-System-Using-PyQt6.git",
  },
  {
    id: 8,
    title: "Automated News Email Service",
    description: "Built an automated system that fetches news via NewsAPI and sends structured summaries via email.",
    tech: ["Python", "NewsAPI", "SMTP"],
    link: "https://github.com/harigovindmelath/Automated-News-Email-Service-Using-NewsAPI-and-Email-Integration.git",
  },
  {
    id: 9,
    title: "Cyberbullying Tweets Classifier",
    description: "Developed an NLP-based model using TF-IDF and Random Forest to classify tweets for cyberbullying detection.",
    tech: ["Python", "NLP", "Scikit-learn"],
    link: "https://github.com/harigovindmelath/CyberBulllying-Tweets-Classifier.git",
  },
  {
    id: 10,
    title: "Django Web Application",
    description: "Built a full-stack application with authentication, file upload, sharing, and user profile management.",
    tech: ["Django", "Python", "JavaScript"],
    link: "https://github.com/harigovindmelath/Django-WebApp.git",
  },
];

export interface Certification {
  id: number;
  title: string;
  description: string;
  link?: string;
}

export const certifications: Certification[] = [
  {
    id: 1,
    title: "AWS Academy Graduate – Cloud Foundations",
    description: "Understanding of cloud computing concepts, AWS services, and deployment fundamentals.",
    link: "https://www.credly.com/badges/f177d5cc-102d-4a39-8301-e7c7d7d0b6a2/linked_in_profile",
  },
  {
    id: 2,
    title: "Mastering Generative AI and ChatGPT",
    description: "Covers prompt engineering, generative AI concepts, and real-world applications of large language models.",
    link: "https://media.geeksforgeeks.org/courses/certificates/7a5169221826a552af01e451ac0ac0e1.pdf",
  },
  {
    id: 3,
    title: "Linux Fundamentals (Red Hat RH104)",
    description: "Hands-on knowledge of Linux systems, command-line usage, and system operations.",
  },
  {
    id: 4,
    title: "UiPath Academy Automation Explorer Training",
    description: "Introduction to robotic process automation (RPA) and building automation workflows using UiPath.",
    link: "https://credentials.uipath.com/cded5163-61de-4386-be70-fcaf45cf4330#acc.670uxKDY",
  },
  {
    id: 5,
    title: "Professional Certificate in SQL and SQL for Data Analysis",
    description: "Covers SQL querying, database design, and data analysis techniques for real-world applications.",
    link: "https://www.udemy.com/certificate/UC-91c411c8-75c9-4dea-b8f6-f5ee931748a3/",
  },
  {
    id: 6,
    title: "Django Essentials – Build and Deploy Real-World Apps",
    description: "Covers backend development using Django, including authentication, database handling, and deployment.",
    link: "https://ude.my/UC-7f6a4495-d67a-44ef-906c-f9e5d59cd182",
  },
];
