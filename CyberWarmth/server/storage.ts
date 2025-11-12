import { 
  type Course, type InsertCourse,
  type Module, type InsertModule,
  type Quiz, type InsertQuiz,
  type Progress, type InsertProgress,
  type KnowledgeArticle, type InsertKnowledgeArticle,
  type QuizQuestion
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getAllCourses(): Promise<Course[]>;
  getCourseById(id: string): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  getModulesByCourseId(courseId: string): Promise<Module[]>;
  getModuleById(moduleId: string): Promise<Module | undefined>;
  createModule(module: InsertModule): Promise<Module>;
  
  getQuizByModuleId(moduleId: string): Promise<Quiz | undefined>;
  createQuiz(quiz: InsertQuiz): Promise<Quiz>;
  
  getUserProgress(userId: string): Promise<Progress[]>;
  getProgressByCourseId(userId: string, courseId: string): Promise<Progress | undefined>;
  createOrUpdateProgress(progress: InsertProgress): Promise<Progress>;
  completeModule(userId: string, courseId: string, moduleId: string): Promise<Progress>;
  
  getAllKnowledgeArticles(): Promise<KnowledgeArticle[]>;
  getKnowledgeArticleById(id: string): Promise<KnowledgeArticle | undefined>;
  createKnowledgeArticle(article: InsertKnowledgeArticle): Promise<KnowledgeArticle>;
}

export class MemStorage implements IStorage {
  private courses: Map<string, Course>;
  private modules: Map<string, Module>;
  private quizzes: Map<string, Quiz>;
  private progress: Map<string, Progress>;
  private knowledgeArticles: Map<string, KnowledgeArticle>;

  constructor() {
    this.courses = new Map();
    this.modules = new Map();
    this.quizzes = new Map();
    this.progress = new Map();
    this.knowledgeArticles = new Map();
    
    this.seedData();
  }

  private seedData() {
    const courses: Course[] = [
      {
        id: "course-1",
        title: "Network Security",
        description: "Master the fundamentals of securing networks, firewalls, and intrusion detection systems",
        category: "Security Fundamentals",
        difficulty: "beginner",
        duration: 180,
        icon: "shield"
      },
      {
        id: "course-2",
        title: "Phishing Awareness",
        description: "Learn to identify and protect against phishing attacks and social engineering tactics",
        category: "Security Awareness",
        difficulty: "beginner",
        duration: 120,
        icon: "mail"
      },
      {
        id: "course-3",
        title: "Password Security",
        description: "Understand best practices for password management and authentication mechanisms",
        category: "Security Fundamentals",
        difficulty: "beginner",
        duration: 90,
        icon: "key"
      },
      {
        id: "course-4",
        title: "Data Protection",
        description: "Safeguard sensitive information with encryption, access controls, and data governance",
        category: "Data Security",
        difficulty: "intermediate",
        duration: 150,
        icon: "lock"
      }
    ];

    const modules: Module[] = [
      {
        id: "module-1-1",
        courseId: "course-1",
        title: "Introduction to Network Security",
        content: "Network security is the practice of protecting computer networks from unauthorized access, misuse, malfunction, modification, destruction, or improper disclosure.\n\nKey Concepts:\n\n1. CIA Triad: The foundation of information security\n   - Confidentiality: Ensuring data is accessible only to authorized users\n   - Integrity: Maintaining accuracy and completeness of data\n   - Availability: Ensuring authorized users have access when needed\n\n2. Network Threats:\n   - Malware: Viruses, worms, trojans, ransomware\n   - Denial of Service (DoS) attacks\n   - Man-in-the-Middle (MitM) attacks\n   - SQL Injection and Cross-Site Scripting (XSS)\n\n3. Defense Mechanisms:\n   - Firewalls: Act as barriers between trusted and untrusted networks\n   - Intrusion Detection Systems (IDS): Monitor network traffic for suspicious activity\n   - Virtual Private Networks (VPN): Encrypt data transmission over public networks\n   - Access Control Lists (ACL): Define who can access specific resources\n\nBest Practices:\n- Implement defense in depth (multiple layers of security)\n- Keep all systems and software updated\n- Use strong authentication mechanisms\n- Regular security audits and vulnerability assessments\n- Employee training and awareness programs",
        order: 1
      },
      {
        id: "module-1-2",
        courseId: "course-1",
        title: "Firewall Configuration",
        content: "Firewalls are critical components of network security that control incoming and outgoing network traffic based on predetermined security rules.\n\nTypes of Firewalls:\n\n1. Packet-Filtering Firewalls\n   - Examine packets and allow/block based on source/destination IP, port, protocol\n   - Fast but limited in detecting sophisticated attacks\n\n2. Stateful Inspection Firewalls\n   - Track the state of active connections\n   - Make decisions based on context and state of traffic\n\n3. Application-Level Gateways (Proxy Firewalls)\n   - Filter traffic at the application layer\n   - Provide detailed logging and content filtering\n\n4. Next-Generation Firewalls (NGFW)\n   - Combine traditional firewall with advanced features\n   - Include intrusion prevention, application awareness, deep packet inspection\n\nConfiguration Best Practices:\n- Default deny policy (block all traffic except explicitly allowed)\n- Segment networks into security zones\n- Log all firewall activities for audit trails\n- Regular rule review and cleanup\n- Test firewall rules in staging before production\n- Implement both inbound and outbound filtering\n\nCommon Firewall Rules:\n- Allow HTTPS (port 443) for web traffic\n- Allow SSH (port 22) from specific IP addresses only\n- Block all incoming connections to databases\n- Allow DNS queries (port 53)\n- Restrict administrative access to management network",
        order: 2
      },
      {
        id: "module-2-1",
        courseId: "course-2",
        title: "Understanding Phishing Attacks",
        content: "Phishing is a cybercrime where attackers impersonate legitimate organizations to steal sensitive information such as login credentials, credit card numbers, and personal data.\n\nTypes of Phishing Attacks:\n\n1. Email Phishing\n   - Mass emails sent to thousands of users\n   - Impersonate banks, popular services, government agencies\n   - Create urgency to bypass critical thinking\n\n2. Spear Phishing\n   - Targeted attacks on specific individuals or organizations\n   - Highly personalized with researched information\n   - More sophisticated and harder to detect\n\n3. Whaling\n   - Targets high-profile individuals (executives, celebrities)\n   - Often involves business email compromise\n   - Can result in significant financial losses\n\n4. Smishing (SMS Phishing)\n   - Phishing via text messages\n   - Often includes malicious links\n   - Exploits mobile device vulnerabilities\n\n5. Vishing (Voice Phishing)\n   - Phone calls from fake representatives\n   - Request sensitive information verbally\n   - Use caller ID spoofing\n\nRed Flags to Watch For:\n- Unexpected requests for personal information\n- Suspicious sender email addresses\n- Poor grammar and spelling errors\n- Generic greetings (Dear Customer)\n- Urgent or threatening language\n- Suspicious links or attachments\n- Requests to verify account information\n- Too good to be true offers\n\nProtection Strategies:\n- Verify sender identity through official channels\n- Hover over links before clicking\n- Use multi-factor authentication\n- Keep software and browsers updated\n- Use anti-phishing tools and email filters\n- Report suspicious emails to IT security",
        order: 1
      },
      {
        id: "module-3-1",
        courseId: "course-3",
        title: "Password Security Fundamentals",
        content: "Strong password practices are essential for protecting your accounts and sensitive information from unauthorized access.\n\nPassword Vulnerabilities:\n\n1. Weak Passwords\n   - Short length (less than 12 characters)\n   - Common words or patterns\n   - Personal information (birthdays, names)\n   - Sequential numbers or letters\n\n2. Password Reuse\n   - Using same password across multiple accounts\n   - One breach compromises all accounts\n   - Credential stuffing attacks exploit this\n\n3. Storage Issues\n   - Writing passwords on sticky notes\n   - Storing in plain text files\n   - Sharing passwords via email or chat\n\nCreating Strong Passwords:\n\n1. Length Requirements\n   - Minimum 12-16 characters\n   - Longer passwords are exponentially harder to crack\n   - Passphrases can be both long and memorable\n\n2. Complexity Requirements\n   - Mix of uppercase and lowercase letters\n   - Include numbers and special characters\n   - Avoid predictable substitutions (@ for a)\n\n3. Uniqueness\n   - Different password for each account\n   - Use password managers to track\n   - Generate random passwords for maximum security\n\nPassword Management Tools:\n- Password Managers (LastPass, 1Password, Bitwarden)\n  - Generate strong, unique passwords\n  - Encrypt and store passwords securely\n  - Auto-fill credentials safely\n  - Sync across devices\n\nMulti-Factor Authentication (MFA):\n- Something you know (password)\n- Something you have (phone, security key)\n- Something you are (biometrics)\n- Adds critical layer of security\n- Protects even if password is compromised\n\nBest Practices:\n- Enable MFA wherever available\n- Change passwords immediately after a breach\n- Use password managers\n- Never share passwords\n- Regular password updates for critical accounts",
        order: 1
      },
      {
        id: "module-4-1",
        courseId: "course-4",
        title: "Data Encryption Basics",
        content: "Data encryption is the process of converting readable data into an encoded format that can only be read by authorized parties with the decryption key.\n\nWhy Encryption Matters:\n\n1. Confidentiality Protection\n   - Prevents unauthorized access to sensitive data\n   - Protects data in transit and at rest\n   - Essential for compliance (GDPR, HIPAA, PCI-DSS)\n\n2. Data Breach Mitigation\n   - Encrypted data is useless without the key\n   - Reduces impact of security incidents\n   - Protects against insider threats\n\nTypes of Encryption:\n\n1. Symmetric Encryption\n   - Uses single key for encryption and decryption\n   - Fast and efficient for large data\n   - Examples: AES, DES, 3DES\n   - Challenge: Secure key distribution\n\n2. Asymmetric Encryption\n   - Uses public and private key pairs\n   - Public key encrypts, private key decrypts\n   - Examples: RSA, ECC, ElGamal\n   - Slower but solves key distribution problem\n\n3. Hashing\n   - One-way encryption (cannot be decrypted)\n   - Creates fixed-size output from any input\n   - Used for password storage, data integrity\n   - Examples: SHA-256, bcrypt, Argon2\n\nEncryption in Practice:\n\n1. Data at Rest\n   - Full disk encryption (BitLocker, FileVault)\n   - Database encryption (TDE)\n   - File/folder encryption\n   - Cloud storage encryption\n\n2. Data in Transit\n   - HTTPS/TLS for web traffic\n   - VPN for network connections\n   - SSH for remote access\n   - Email encryption (S/MIME, PGP)\n\n3. Data in Use\n   - Encrypted RAM\n   - Secure enclaves\n   - Homomorphic encryption (future)\n\nKey Management:\n- Generate keys using cryptographically secure methods\n- Store keys separately from encrypted data\n- Implement key rotation policies\n- Use hardware security modules (HSM) for critical keys\n- Document key recovery procedures\n\nCommon Mistakes:\n- Using weak encryption algorithms\n- Poor key management practices\n- Encrypting without proper authentication\n- Not encrypting backups\n- Hardcoding encryption keys in code",
        order: 1
      }
    ];

    const quizzes: Quiz[] = [
      {
        id: "quiz-1-1",
        moduleId: "module-1-1",
        title: "Network Security Basics Quiz",
        questions: [
          {
            id: "q1",
            question: "What does the 'C' in the CIA Triad stand for?",
            answers: ["Confidentiality", "Cyber", "Cryptography", "Connection"],
            correctAnswer: 0,
            explanation: "The CIA Triad consists of Confidentiality, Integrity, and Availability - the three pillars of information security."
          },
          {
            id: "q2",
            question: "Which of these is NOT a common network threat?",
            answers: ["Malware", "Denial of Service", "Firewall", "Man-in-the-Middle"],
            correctAnswer: 2,
            explanation: "A firewall is a defense mechanism, not a threat. It helps protect against the other options listed."
          },
          {
            id: "q3",
            question: "What is the purpose of a VPN?",
            answers: [
              "To block all network traffic",
              "To encrypt data transmission over public networks",
              "To replace firewalls",
              "To store passwords"
            ],
            correctAnswer: 1,
            explanation: "VPNs create encrypted tunnels for data transmission, protecting information as it travels over public networks."
          }
        ] as QuizQuestion[]
      },
      {
        id: "quiz-1-2",
        moduleId: "module-1-2",
        title: "Firewall Configuration Quiz",
        questions: [
          {
            id: "q1",
            question: "What is the recommended default firewall policy?",
            answers: ["Allow all", "Default deny", "Random", "No policy"],
            correctAnswer: 1,
            explanation: "Default deny is the security best practice - block all traffic except what is explicitly allowed."
          },
          {
            id: "q2",
            question: "Which firewall type tracks the state of active connections?",
            answers: ["Packet-filtering", "Stateful inspection", "Proxy", "Application-level"],
            correctAnswer: 1,
            explanation: "Stateful inspection firewalls monitor the state of connections and make decisions based on connection context."
          }
        ] as QuizQuestion[]
      },
      {
        id: "quiz-2-1",
        moduleId: "module-2-1",
        title: "Phishing Awareness Quiz",
        questions: [
          {
            id: "q1",
            question: "What is spear phishing?",
            answers: [
              "Mass email attacks sent to everyone",
              "Targeted attacks on specific individuals",
              "Phishing via phone calls",
              "Phishing via text messages"
            ],
            correctAnswer: 1,
            explanation: "Spear phishing involves highly targeted, personalized attacks on specific individuals or organizations."
          },
          {
            id: "q2",
            question: "Which is a red flag in a phishing email?",
            answers: [
              "Professional formatting",
              "Expected sender",
              "Urgent requests for personal information",
              "Clear subject line"
            ],
            correctAnswer: 2,
            explanation: "Phishing emails often create false urgency to pressure victims into acting without thinking critically."
          },
          {
            id: "q3",
            question: "What should you do if you receive a suspicious email?",
            answers: [
              "Click the link to verify",
              "Reply with your information",
              "Report it to IT security",
              "Forward it to friends"
            ],
            correctAnswer: 2,
            explanation: "Always report suspicious emails to your IT security team. Never click links or provide information."
          }
        ] as QuizQuestion[]
      },
      {
        id: "quiz-3-1",
        moduleId: "module-3-1",
        title: "Password Security Quiz",
        questions: [
          {
            id: "q1",
            question: "What is the recommended minimum password length?",
            answers: ["6 characters", "8 characters", "12 characters", "20 characters"],
            correctAnswer: 2,
            explanation: "Modern security standards recommend at least 12-16 characters for strong password protection."
          },
          {
            id: "q2",
            question: "What does MFA stand for?",
            answers: [
              "Multiple File Access",
              "Multi-Factor Authentication",
              "Managed Firewall Application",
              "Maximum File Allowance"
            ],
            correctAnswer: 1,
            explanation: "Multi-Factor Authentication adds layers of security beyond just a password."
          },
          {
            id: "q3",
            question: "Why should you use different passwords for each account?",
            answers: [
              "It's easier to remember",
              "One breach won't compromise all accounts",
              "It's required by law",
              "Password managers don't work otherwise"
            ],
            correctAnswer: 1,
            explanation: "Using unique passwords prevents a single breach from compromising all your accounts through credential stuffing."
          }
        ] as QuizQuestion[]
      },
      {
        id: "quiz-4-1",
        moduleId: "module-4-1",
        title: "Data Encryption Quiz",
        questions: [
          {
            id: "q1",
            question: "Which type of encryption uses a single key?",
            answers: ["Asymmetric", "Symmetric", "Hashing", "Public key"],
            correctAnswer: 1,
            explanation: "Symmetric encryption uses one key for both encryption and decryption operations."
          },
          {
            id: "q2",
            question: "What is hashing primarily used for?",
            answers: [
              "Encrypting files",
              "Password storage and data integrity",
              "Network communication",
              "Email encryption"
            ],
            correctAnswer: 1,
            explanation: "Hashing creates one-way encrypted values, perfect for securely storing passwords and verifying data integrity."
          },
          {
            id: "q3",
            question: "What does HTTPS use to encrypt web traffic?",
            answers: ["FTP", "SSH", "TLS/SSL", "VPN"],
            correctAnswer: 2,
            explanation: "HTTPS uses TLS (Transport Layer Security) to encrypt communication between browsers and web servers."
          }
        ] as QuizQuestion[]
      }
    ];

    const knowledgeArticles: KnowledgeArticle[] = [
      {
        id: "article-1",
        title: "10 Essential Cybersecurity Tips for Remote Workers",
        content: "Remote work has become the norm, but it comes with unique security challenges. Here are essential tips to stay secure:\n\n1. Use a VPN when connecting to company resources\n2. Keep your home network secure with strong WiFi passwords\n3. Enable two-factor authentication on all accounts\n4. Keep software and operating systems updated\n5. Use company-approved devices and software only\n6. Secure your physical workspace\n7. Be cautious with public WiFi\n8. Use encrypted communication tools\n9. Regular data backups\n10. Report security incidents immediately",
        category: "Network Security",
        readTime: 5
      },
      {
        id: "article-2",
        title: "How to Spot a Phishing Email",
        content: "Phishing emails are getting more sophisticated. Learn to identify the warning signs:\n\n- Check the sender's email address carefully\n- Look for spelling and grammar mistakes\n- Be wary of urgent or threatening language\n- Hover over links before clicking\n- Verify requests through official channels\n- Don't trust unexpected attachments\n- Look for generic greetings\n- Question requests for sensitive information",
        category: "Phishing Prevention",
        readTime: 4
      },
      {
        id: "article-3",
        title: "Creating Unbreakable Passwords",
        content: "Strong passwords are your first line of defense. Follow these guidelines:\n\n1. Use at least 12-16 characters\n2. Mix uppercase, lowercase, numbers, and symbols\n3. Avoid common words and phrases\n4. Use passphrases for memorability\n5. Never reuse passwords\n6. Use a password manager\n7. Enable multi-factor authentication\n8. Change passwords after breaches\n9. Don't share passwords\n10. Avoid predictable patterns",
        category: "Password Management",
        readTime: 6
      },
      {
        id: "article-4",
        title: "Understanding Data Encryption",
        content: "Encryption protects your sensitive data from unauthorized access. Learn the basics:\n\n- Encryption converts readable data into coded format\n- Only authorized parties with the key can decrypt\n- Symmetric encryption uses one key\n- Asymmetric encryption uses public/private key pairs\n- Use encryption for data at rest and in transit\n- HTTPS encrypts web traffic\n- Full disk encryption protects devices\n- End-to-end encryption secures communications",
        category: "Data Encryption",
        readTime: 7
      },
      {
        id: "article-5",
        title: "Securing Your Home Network",
        content: "Your home network is the gateway to your digital life. Protect it:\n\n1. Change default router passwords\n2. Use WPA3 encryption for WiFi\n3. Hide your network SSID\n4. Enable firewall on router\n5. Keep router firmware updated\n6. Use strong WiFi passwords\n7. Create a guest network\n8. Disable WPS and UPnP\n9. Monitor connected devices\n10. Use network segmentation",
        category: "Network Security",
        readTime: 8
      },
      {
        id: "article-6",
        title: "Multi-Factor Authentication: Your Security Shield",
        content: "MFA adds critical layers to your account security:\n\n- Combines multiple verification methods\n- Something you know (password)\n- Something you have (phone, token)\n- Something you are (biometrics)\n- Protects even if password is compromised\n- Use authenticator apps over SMS\n- Enable on all important accounts\n- Keep backup codes secure\n- Update contact information",
        category: "Password Management",
        readTime: 5
      }
    ];

    courses.forEach(course => this.courses.set(course.id, course));
    modules.forEach(module => this.modules.set(module.id, module));
    quizzes.forEach(quiz => this.quizzes.set(quiz.id, quiz));
    knowledgeArticles.forEach(article => this.knowledgeArticles.set(article.id, article));
  }

  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourseById(id: string): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = randomUUID();
    const course: Course = { ...insertCourse, id };
    this.courses.set(id, course);
    return course;
  }

  async getModulesByCourseId(courseId: string): Promise<Module[]> {
    return Array.from(this.modules.values())
      .filter(module => module.courseId === courseId)
      .sort((a, b) => a.order - b.order);
  }

  async getModuleById(moduleId: string): Promise<Module | undefined> {
    return this.modules.get(moduleId);
  }

  async createModule(insertModule: InsertModule): Promise<Module> {
    const id = randomUUID();
    const module: Module = { ...insertModule, id };
    this.modules.set(id, module);
    return module;
  }

  async getQuizByModuleId(moduleId: string): Promise<Quiz | undefined> {
    return Array.from(this.quizzes.values()).find(quiz => quiz.moduleId === moduleId);
  }

  async createQuiz(insertQuiz: InsertQuiz): Promise<Quiz> {
    const id = randomUUID();
    const quiz: Quiz = { ...insertQuiz, id };
    this.quizzes.set(id, quiz);
    return quiz;
  }

  async getUserProgress(userId: string = "default-user"): Promise<Progress[]> {
    return Array.from(this.progress.values()).filter(p => p.userId === userId);
  }

  async getProgressByCourseId(userId: string, courseId: string): Promise<Progress | undefined> {
    return Array.from(this.progress.values()).find(
      p => p.userId === userId && p.courseId === courseId
    );
  }

  async createOrUpdateProgress(insertProgress: InsertProgress): Promise<Progress> {
    const existing = await this.getProgressByCourseId(
      insertProgress.userId,
      insertProgress.courseId
    );

    if (existing) {
      const updated: Progress = { ...existing, ...insertProgress };
      this.progress.set(existing.id, updated);
      return updated;
    }

    const id = randomUUID();
    const progress: Progress = { ...insertProgress, id };
    this.progress.set(id, progress);
    return progress;
  }

  async completeModule(
    userId: string = "default-user",
    courseId: string,
    moduleId: string
  ): Promise<Progress> {
    let progress = await this.getProgressByCourseId(userId, courseId);

    if (!progress) {
      progress = await this.createOrUpdateProgress({
        userId,
        courseId,
        completedModules: [moduleId],
        quizScores: {}
      });
    } else {
      const completedModules = progress.completedModules as string[];
      if (!completedModules.includes(moduleId)) {
        completedModules.push(moduleId);
        progress.completedModules = completedModules;
        this.progress.set(progress.id, progress);
      }
    }

    return progress;
  }

  async getAllKnowledgeArticles(): Promise<KnowledgeArticle[]> {
    return Array.from(this.knowledgeArticles.values());
  }

  async getKnowledgeArticleById(id: string): Promise<KnowledgeArticle | undefined> {
    return this.knowledgeArticles.get(id);
  }

  async createKnowledgeArticle(insertArticle: InsertKnowledgeArticle): Promise<KnowledgeArticle> {
    const id = randomUUID();
    const article: KnowledgeArticle = { ...insertArticle, id };
    this.knowledgeArticles.set(id, article);
    return article;
  }
}

export const storage = new MemStorage();
