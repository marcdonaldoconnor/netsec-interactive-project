import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, Clock, Target, BookOpen, 
  CheckCircle2, Circle, Play, Lock
} from "lucide-react";
import type { Course, Module, Progress as ProgressType } from "@shared/schema";

export default function CourseDetail() {
  const [, params] = useRoute("/courses/:id");
  const courseId = params?.id;

  const { data: course, isLoading: courseLoading } = useQuery<Course>({
    queryKey: ["/api/courses", courseId],
    enabled: !!courseId,
  });

  const { data: modules, isLoading: modulesLoading } = useQuery<Module[]>({
    queryKey: ["/api/courses", courseId, "modules"],
    enabled: !!courseId,
  });

  const { data: userProgress } = useQuery<ProgressType[]>({
    queryKey: ["/api/progress"],
  });

  const courseProgress = userProgress?.find(p => p.courseId === courseId);
  const completedModules = (courseProgress?.completedModules as string[]) || [];
  const progressPercent = modules ? (completedModules.length / modules.length) * 100 : 0;

  const isLoading = courseLoading || modulesLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-5xl mx-auto space-y-8">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-64" />
          <div className="space-y-4">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-24" />)}
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="p-12 text-center max-w-md">
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Course not found</h2>
          <p className="text-muted-foreground mb-6 font-body">
            The course you're looking for doesn't exist.
          </p>
          <Link href="/dashboard">
            <Button data-testid="button-back-dashboard">Back to Dashboard</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const sortedModules = modules?.sort((a, b) => a.order - b.order) || [];
  const nextModule = sortedModules.find(m => !completedModules.includes(m.id));

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" data-testid="button-back">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                {completedModules.length} of {sortedModules.length} completed
              </div>
              <Progress value={progressPercent} className="w-32 h-2" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 space-y-8">
        <Card className="p-8">
          <div className="flex items-start gap-6">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-amber-50 dark:from-primary/5 dark:to-primary/10 text-primary flex-shrink-0">
              <BookOpen className="w-12 h-12" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-4xl font-bold">{course.title}</h1>
                <Badge variant="outline" className="capitalize ml-4">
                  {course.difficulty}
                </Badge>
              </div>
              <p className="text-lg text-muted-foreground mb-6 font-body">
                {course.description}
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{course.duration} minutes</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Target className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{sortedModules.length} modules</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-primary">
                    {completedModules.length} completed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Course Modules</h2>
          <div className="space-y-3">
            {sortedModules.map((module, index) => {
              const isCompleted = completedModules.includes(module.id);
              const isNext = nextModule?.id === module.id;
              const isLocked = index > 0 && !completedModules.includes(sortedModules[index - 1].id) && !isCompleted;

              return (
                <Card 
                  key={module.id} 
                  className={`p-6 hover-elevate transition-all ${isNext ? 'ring-2 ring-primary' : ''}`}
                  data-testid={`card-module-${module.id}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                      ${isCompleted ? 'bg-primary text-primary-foreground' : 
                        isLocked ? 'bg-muted text-muted-foreground' : 
                        'bg-primary/10 text-primary'}`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : isLocked ? (
                        <Lock className="w-5 h-5" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold mb-1">{module.title}</h3>
                          {isNext && (
                            <Badge className="mb-2">Continue Here</Badge>
                          )}
                          <p className="text-sm text-muted-foreground line-clamp-2 font-body">
                            {module.content.substring(0, 120)}...
                          </p>
                        </div>
                        <Link href={`/courses/${courseId}/modules/${module.id}`}>
                          <Button 
                            disabled={isLocked}
                            variant={isCompleted ? "outline" : "default"}
                            data-testid={`button-module-${module.id}`}
                          >
                            {isLocked ? (
                              <>
                                <Lock className="w-4 h-4 mr-2" />
                                Locked
                              </>
                            ) : isCompleted ? (
                              "Review"
                            ) : (
                              <>
                                <Play className="w-4 h-4 mr-2" />
                                {isNext ? "Continue" : "Start"}
                              </>
                            )}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {sortedModules.length === 0 && (
          <Card className="p-12 text-center">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No modules yet</h3>
            <p className="text-muted-foreground font-body">
              This course is being updated with new content. Check back soon!
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
