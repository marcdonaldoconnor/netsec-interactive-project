import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Lock, Mail, Key, Target, Award, Users, TrendingUp, BookOpen, Zap } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Interactive Modules",
      description: "Hands-on learning with real-world cybersecurity scenarios and practical exercises"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics and achievement badges"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Real-World Scenarios",
      description: "Practice with simulations based on actual security threats and incidents"
    }
  ];

  const courses = [
    {
      icon: <Shield className="w-12 h-12 text-primary" />,
      title: "Network Security",
      description: "Master the fundamentals of securing networks, firewalls, and intrusion detection",
      modules: 12
    },
    {
      icon: <Mail className="w-12 h-12 text-primary" />,
      title: "Phishing Awareness",
      description: "Learn to identify and protect against phishing attacks and social engineering",
      modules: 8
    },
    {
      icon: <Key className="w-12 h-12 text-primary" />,
      title: "Password Security",
      description: "Understand best practices for password management and authentication",
      modules: 6
    },
    {
      icon: <Lock className="w-12 h-12 text-primary" />,
      title: "Data Protection",
      description: "Safeguard sensitive information with encryption and access controls",
      modules: 10
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Choose Your Path",
      description: "Select from our comprehensive course catalog based on your skill level and interests"
    },
    {
      number: "02",
      title: "Learn & Practice",
      description: "Complete interactive modules with quizzes and hands-on exercises"
    },
    {
      number: "03",
      title: "Earn Achievements",
      description: "Track your progress and earn certificates as you master each topic"
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="relative bg-gradient-to-br from-primary/10 via-amber-50 to-orange-50 dark:from-primary/5 dark:via-background dark:to-background overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent dark:from-black/40" />
        
        <header className="relative border-b border-border/40 backdrop-blur-md bg-background/80 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                <Shield className="w-8 h-8 text-primary" />
                <span className="text-xl font-bold">SecureLearn</span>
              </div>
              <nav className="hidden md:flex items-center gap-8">
                <Link href="/courses" data-testid="link-courses">
                  <span className="text-sm font-medium hover-elevate px-3 py-2 rounded-md cursor-pointer">Courses</span>
                </Link>
                <Link href="/dashboard" data-testid="link-dashboard">
                  <span className="text-sm font-medium hover-elevate px-3 py-2 rounded-md cursor-pointer">Dashboard</span>
                </Link>
                <Link href="/knowledge" data-testid="link-knowledge">
                  <span className="text-sm font-medium hover-elevate px-3 py-2 rounded-md cursor-pointer">Knowledge Base</span>
                </Link>
              </nav>
              <div className="flex items-center gap-4">
                <Link href="/dashboard">
                  <Button variant="default" data-testid="button-get-started">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <section className="relative py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              Master Cybersecurity
              <br />
              <span className="text-primary">One Module at a Time</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 font-body">
              Build essential security skills through interactive training, real-world scenarios, 
              and gamified learning. Start your cybersecurity journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/dashboard">
                <Button size="lg" className="text-base px-8" data-testid="button-start-learning">
                  <Zap className="w-5 h-5 mr-2" />
                  Start Learning Free
                </Button>
              </Link>
              <Link href="/courses">
                <Button size="lg" variant="outline" className="text-base px-8 backdrop-blur-md bg-background/80" data-testid="button-view-courses">
                  View All Courses
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover-elevate" data-testid={`card-feature-${index}`}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground font-body">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Our Courses</h2>
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
              Choose from our comprehensive catalog of cybersecurity training courses
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <Card key={index} className="p-6 hover-elevate transition-transform hover:scale-105" data-testid={`card-course-${index}`}>
                <div className="mb-4 p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-amber-50 dark:from-primary/5 dark:to-primary/10 w-fit">
                  {course.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 font-body">{course.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{course.modules} modules</span>
                  <Button variant="ghost" size="sm" data-testid={`button-explore-${index}`}>Explore</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Learn by Doing
              </h2>
              <p className="text-lg text-muted-foreground mb-8 font-body">
                Our platform combines theory with practice, giving you hands-on experience 
                with real cybersecurity scenarios. Track your progress, earn achievements, 
                and build skills that matter.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="text-2xl font-bold">10,000+</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Active Learners</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="text-2xl font-bold">50+</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Courses Available</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-4" data-testid={`step-${index}`}>
                  <div className="text-4xl font-bold text-primary/20">{step.number}</div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground font-body">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-amber-50/50 dark:from-primary/5 dark:to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 font-body">
            Join thousands of learners building essential cybersecurity skills
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="text-base px-8" data-testid="button-start-now">
              Start Learning Now
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-primary" />
                <span className="font-bold">SecureLearn</span>
              </div>
              <p className="text-sm text-muted-foreground font-body">
                Master cybersecurity through interactive training and real-world scenarios.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Courses</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><span className="hover-elevate cursor-pointer inline-block px-2 py-1 rounded" data-testid="link-footer-network-security">Network Security</span></li>
                <li><span className="hover-elevate cursor-pointer inline-block px-2 py-1 rounded" data-testid="link-footer-phishing">Phishing Awareness</span></li>
                <li><span className="hover-elevate cursor-pointer inline-block px-2 py-1 rounded" data-testid="link-footer-password">Password Security</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/knowledge" data-testid="link-footer-knowledge"><span className="hover-elevate cursor-pointer inline-block px-2 py-1 rounded">Knowledge Base</span></Link></li>
                <li><span className="hover-elevate cursor-pointer inline-block px-2 py-1 rounded" data-testid="link-footer-practices">Best Practices</span></li>
                <li><span className="hover-elevate cursor-pointer inline-block px-2 py-1 rounded" data-testid="link-footer-tips">Security Tips</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><span className="hover-elevate cursor-pointer inline-block px-2 py-1 rounded" data-testid="link-footer-about">About Us</span></li>
                <li><span className="hover-elevate cursor-pointer inline-block px-2 py-1 rounded" data-testid="link-footer-contact">Contact</span></li>
                <li><span className="hover-elevate cursor-pointer inline-block px-2 py-1 rounded" data-testid="link-footer-privacy">Privacy Policy</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 SecureLearn. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
