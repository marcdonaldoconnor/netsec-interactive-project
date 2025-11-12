import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Shield, Mail, Key, Lock, 
  Award, BookOpen, Clock, TrendingUp,
  Play, CheckCircle2
} from "lucide-react";
import { Link } from "wouter";
import type { Course, Progress as ProgressType } from "@shared/schema";

export default function Dashboard() {
  const { data: courses, isLoading: coursesLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const { data: userProgress, isLoading: progressLoading } = useQuery<ProgressType[]>({
    queryKey: ["/api/progress"],
  });

  const stats = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      label: "Courses Completed",
      value: userProgress?.filter(p => {
        const course = courses?.find(c => c.id === p.courseId);
        const completedCount = (p.completedModules as string[]).length;
        return course && completedCount > 0;
      }).length || 0,
      color: "text-primary"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: "Hours Learned",
      value: "12.5",
      color: "text-amber-500"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: "Current Streak",
      value: "7 days",
      color: "text-orange-500"
    },
    {
      icon: <Award className="w-6 h-6" />,
      label: "Achievements",
      value: "5",
      color: "text-primary"
    }
  ];

  const courseIcons: Record<string, React.ReactNode> = {
    "Network Security": <Shield className="w-8 h-8" />,
    "Phishing Awareness": <Mail className="w-8 h-8" />,
    "Password Security": <Key className="w-8 h-8" />,
    "Data Protection": <Lock className="w-8 h-8" />
  };

  const getCourseProgress = (courseId: string) => {
    const progress = userProgress?.find(p => p.courseId === courseId);
    if (!progress) return 0;
    const completedModules = progress.completedModules as string[];
    return completedModules.length;
  };

  const isLoading = coursesLoading || progressLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <Skeleton className="h-12 w-64" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32" />)}
          </div>
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Welcome back!</h1>
          <p className="text-lg text-muted-foreground font-body">Continue your cybersecurity learning journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6" data-testid={`card-stat-${index}`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-primary/10 ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {userProgress && userProgress.length > 0 && (
          <section>
            <h2 className="text-3xl font-semibold mb-6">Continue Learning</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userProgress.slice(0, 3).map((progress) => {
                const course = courses?.find(c => c.id === progress.courseId);
                if (!course) return null;
                
                const completedModules = progress.completedModules as string[];
                const progressPercent = (completedModules.length / 10) * 100;

                return (
                  <Card key={course.id} className="p-6 hover-elevate" data-testid={`card-progress-${course.id}`}>
                    <div className="mb-4 p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-amber-50 dark:from-primary/5 dark:to-primary/10 w-fit text-primary">
                      {courseIcons[course.title] || <BookOpen className="w-8 h-8" />}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 font-body line-clamp-2">
                      {course.description}
                    </p>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-semibold">{completedModules.length} modules</span>
                        </div>
                        <Progress value={progressPercent} className="h-3" />
                      </div>
                      <Link href={`/courses/${course.id}`}>
                        <Button className="w-full" data-testid={`button-continue-${course.id}`}>
                          <Play className="w-4 h-4 mr-2" />
                          Continue
                        </Button>
                      </Link>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold">All Courses</h2>
            <Link href="/courses">
              <Button variant="outline" data-testid="button-view-all-courses">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses?.map((course) => {
              const completedModules = getCourseProgress(course.id);
              const isStarted = completedModules > 0;

              return (
                <Card key={course.id} className="p-6 hover-elevate transition-transform hover:scale-105" data-testid={`card-course-${course.id}`}>
                  <div className="mb-4 p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-amber-50 dark:from-primary/5 dark:to-primary/10 w-fit text-primary">
                    {courseIcons[course.title] || <BookOpen className="w-8 h-8" />}
                  </div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold flex-1">{course.title}</h3>
                    {isStarted && (
                      <Badge variant="secondary" className="ml-2">
                        In Progress
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 font-body line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between text-sm mb-4">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration} min
                    </span>
                    <Badge variant="outline" className="capitalize">
                      {course.difficulty}
                    </Badge>
                  </div>
                  <Link href={`/courses/${course.id}`}>
                    <Button className="w-full" variant={isStarted ? "default" : "outline"} data-testid={`button-start-${course.id}`}>
                      {isStarted ? (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Continue
                        </>
                      ) : (
                        "Start Course"
                      )}
                    </Button>
                  </Link>
                </Card>
              );
            })}
          </div>
        </section>

        {(!courses || courses.length === 0) && !isLoading && (
          <Card className="p-12 text-center">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No courses available yet</h3>
            <p className="text-muted-foreground font-body">
              Check back soon for new cybersecurity training courses!
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
