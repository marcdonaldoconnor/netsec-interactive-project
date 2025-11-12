import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute, useLocation, Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { 
  ArrowLeft, ArrowRight, CheckCircle2, 
  BookOpen, Target, Award
} from "lucide-react";
import type { Module, Quiz, Progress as ProgressType, QuizResult } from "@shared/schema";

export default function ModulePage() {
  const [, params] = useRoute("/courses/:courseId/modules/:moduleId");
  const [, setLocation] = useLocation();
  const courseId = params?.courseId;
  const moduleId = params?.moduleId;
  const { toast } = useToast();
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const { data: module, isLoading: moduleLoading } = useQuery<Module>({
    queryKey: ["/api/courses", courseId, "modules", moduleId],
    enabled: !!courseId && !!moduleId,
  });

  const { data: allModules } = useQuery<Module[]>({
    queryKey: ["/api/courses", courseId, "modules"],
    enabled: !!courseId,
  });

  const { data: quiz } = useQuery<Quiz>({
    queryKey: ["/api/modules", moduleId, "quiz"],
    enabled: !!moduleId && showQuiz,
  });

  const { data: userProgress } = useQuery<ProgressType[]>({
    queryKey: ["/api/progress"],
  });

  const completeModuleMutation = useMutation({
    mutationFn: async (moduleId: string) => {
      return await apiRequest("POST", "/api/progress/complete", { 
        courseId, 
        moduleId 
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
      toast({
        title: "Module completed!",
        description: "Great job! You've completed this module.",
      });
    },
  });

  const sortedModules = allModules?.sort((a, b) => a.order - b.order) || [];
  const currentIndex = sortedModules.findIndex(m => m.id === moduleId);
  const nextModule = sortedModules[currentIndex + 1];
  const prevModule = sortedModules[currentIndex - 1];

  const courseProgress = userProgress?.find(p => p.courseId === courseId);
  const completedModules = (courseProgress?.completedModules as string[]) || [];
  const isCompleted = moduleId ? completedModules.includes(moduleId) : false;

  const handleCompleteModule = () => {
    if (moduleId && !isCompleted) {
      completeModuleMutation.mutate(moduleId);
    }
  };

  const handleQuizSubmit = () => {
    if (!quiz) return;
    
    const questions = quiz.questions as any[];
    let correct = 0;
    const correctAnswers: number[] = [];

    questions.forEach((q, index) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
        correctAnswers.push(index);
      }
    });

    const result: QuizResult = {
      score: Math.round((correct / questions.length) * 100),
      totalQuestions: questions.length,
      correctAnswers,
      passed: correct / questions.length >= 0.7
    };

    setQuizResult(result);

    if (result.passed && moduleId && !isCompleted) {
      completeModuleMutation.mutate(moduleId);
    }
  };

  if (moduleLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="p-12 text-center max-w-md">
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Module not found</h2>
          <Link href={`/courses/${courseId}`}>
            <Button data-testid="button-back-course">Back to Course</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const questions = (quiz?.questions as any[]) || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href={`/courses/${courseId}`}>
              <Button variant="ghost" size="sm" data-testid="button-back">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Course
              </Button>
            </Link>
            {isCompleted && (
              <div className="flex items-center gap-2 text-sm text-primary">
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-semibold">Completed</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {!showQuiz && !quizResult && (
          <>
            <div>
              <h1 className="text-4xl font-bold mb-4">{module.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Module {currentIndex + 1} of {sortedModules.length}</span>
                <Separator orientation="vertical" className="h-4" />
                <span>Course Progress: {completedModules.length}/{sortedModules.length}</span>
              </div>
            </div>

            <Card className="p-8">
              <div className="prose prose-lg max-w-none font-body dark:prose-invert">
                <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                  {module.content}
                </div>
              </div>
            </Card>

            <div className="flex items-center justify-between gap-4 pt-6">
              <div>
                {prevModule && (
                  <Link href={`/courses/${courseId}/modules/${prevModule.id}`}>
                    <Button variant="outline" data-testid="button-previous">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous Module
                    </Button>
                  </Link>
                )}
              </div>
              <div className="flex gap-3">
                {!isCompleted && (
                  <Button 
                    onClick={() => setShowQuiz(true)} 
                    size="lg"
                    data-testid="button-take-quiz"
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Take Quiz
                  </Button>
                )}
                {nextModule && (
                  <Link href={`/courses/${courseId}/modules/${nextModule.id}`}>
                    <Button size="lg" variant={isCompleted ? "default" : "outline"} data-testid="button-next">
                      Next Module
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </>
        )}

        {showQuiz && !quizResult && (
          <>
            <div>
              <h2 className="text-3xl font-bold mb-2">Module Quiz</h2>
              <p className="text-muted-foreground font-body">
                Answer all questions correctly to complete this module
              </p>
            </div>

            <div className="space-y-6">
              {questions.map((question, qIndex) => (
                <Card key={question.id} className="p-6" data-testid={`card-question-${qIndex}`}>
                  <div className="mb-4">
                    <div className="text-sm text-muted-foreground mb-2">
                      Question {qIndex + 1} of {questions.length}
                    </div>
                    <h3 className="text-xl font-semibold">{question.question}</h3>
                  </div>
                  <div className="space-y-3">
                    {question.answers.map((answer: string, aIndex: number) => {
                      const isSelected = selectedAnswers[question.id] === aIndex;
                      return (
                        <button
                          key={aIndex}
                          onClick={() => setSelectedAnswers(prev => ({ 
                            ...prev, 
                            [question.id]: aIndex 
                          }))}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all hover-elevate
                            ${isSelected 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border bg-card'}`}
                          data-testid={`button-answer-${qIndex}-${aIndex}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                              ${isSelected ? 'border-primary bg-primary' : 'border-muted-foreground'}`}
                            >
                              {isSelected && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
                            </div>
                            <span className="font-body">{answer}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex items-center justify-between gap-4 pt-6">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowQuiz(false);
                  setSelectedAnswers({});
                }}
                data-testid="button-cancel-quiz"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleQuizSubmit}
                disabled={Object.keys(selectedAnswers).length !== questions.length}
                size="lg"
                data-testid="button-submit-quiz"
              >
                Submit Quiz
              </Button>
            </div>
          </>
        )}

        {quizResult && (
          <Card className="p-8 text-center">
            <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center
              ${quizResult.passed ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}`}
            >
              {quizResult.passed ? (
                <Award className="w-10 h-10" />
              ) : (
                <Target className="w-10 h-10" />
              )}
            </div>
            <h2 className="text-3xl font-bold mb-2">
              {quizResult.passed ? "Congratulations!" : "Keep Practicing"}
            </h2>
            <p className="text-lg text-muted-foreground mb-6 font-body">
              You scored {quizResult.score}% on this quiz
            </p>
            <div className="max-w-md mx-auto mb-8">
              <Progress value={quizResult.score} className="h-4" />
            </div>
            <p className="text-muted-foreground mb-8 font-body">
              {quizResult.passed 
                ? "You've successfully completed this module!"
                : "You need 70% or higher to pass. Review the material and try again."}
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                variant="outline"
                onClick={() => {
                  setShowQuiz(false);
                  setQuizResult(null);
                  setSelectedAnswers({});
                }}
                data-testid="button-review-module"
              >
                Review Module
              </Button>
              {quizResult.passed && nextModule && (
                <Link href={`/courses/${courseId}/modules/${nextModule.id}`}>
                  <Button data-testid="button-next-module">
                    Next Module
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              )}
              {quizResult.passed && !nextModule && (
                <Link href={`/courses/${courseId}`}>
                  <Button data-testid="button-finish-course">
                    Finish Course
                    <CheckCircle2 className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              )}
              {!quizResult.passed && (
                <Button 
                  onClick={() => {
                    setQuizResult(null);
                    setSelectedAnswers({});
                  }}
                  data-testid="button-retry-quiz"
                >
                  Retry Quiz
                </Button>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
