import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Shield, Mail, Key, Lock, 
  Search, Clock, BookOpen, Filter
} from "lucide-react";
import type { Course, Progress as ProgressType } from "@shared/schema";

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const { data: userProgress } = useQuery<ProgressType[]>({
    queryKey: ["/api/progress"],
  });

  const courseIcons: Record<string, React.ReactNode> = {
    "Network Security": <Shield className="w-10 h-10" />,
    "Phishing Awareness": <Mail className="w-10 h-10" />,
    "Password Security": <Key className="w-10 h-10" />,
    "Data Protection": <Lock className="w-10 h-10" />
  };

  const getCourseProgress = (courseId: string) => {
    const progress = userProgress?.find(p => p.courseId === courseId);
    if (!progress) return 0;
    const completedModules = progress.completedModules as string[];
    return completedModules.length;
  };

  const filteredCourses = courses?.filter(course => {
    const matchesSearch = !searchQuery || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDifficulty = !selectedDifficulty || course.difficulty === selectedDifficulty;
    const matchesCategory = !selectedCategory || course.category === selectedCategory;
    
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const difficulties = ["beginner", "intermediate", "advanced"];
  const categories = Array.from(new Set(courses?.map(c => c.category) || []));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <Skeleton className="h-12 w-64" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-80" />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary/5 to-amber-50/50 dark:from-primary/5 dark:to-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Courses</h1>
          <p className="text-lg text-muted-foreground mb-8 font-body max-w-2xl">
            Explore our comprehensive catalog of cybersecurity training courses designed for all skill levels
          </p>
          
          <div className="max-w-2xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-base rounded-full"
              data-testid="input-search"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="md:w-64 flex-shrink-0">
            <Card className="p-6 sticky top-6">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5" />
                <h2 className="font-semibold">Filters</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold mb-3">Difficulty</h3>
                  <div className="space-y-2">
                    {difficulties.map((diff) => (
                      <button
                        key={diff}
                        onClick={() => setSelectedDifficulty(
                          selectedDifficulty === diff ? null : diff
                        )}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all hover-elevate
                          ${selectedDifficulty === diff 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-card hover:bg-accent'}`}
                        data-testid={`button-difficulty-${diff}`}
                      >
                        <span className="capitalize">{diff}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {categories.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold mb-3">Category</h3>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(
                            selectedCategory === cat ? null : cat
                          )}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all hover-elevate
                            ${selectedCategory === cat 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-card hover:bg-accent'}`}
                          data-testid={`button-category-${cat}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {(selectedDifficulty || selectedCategory) && (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setSelectedDifficulty(null);
                      setSelectedCategory(null);
                    }}
                    data-testid="button-clear-filters"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </Card>
          </aside>

          <div className="flex-1">
            <div className="mb-6">
              <p className="text-muted-foreground">
                {filteredCourses?.length || 0} courses found
              </p>
            </div>

            {filteredCourses && filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => {
                  const completedModules = getCourseProgress(course.id);
                  const isStarted = completedModules > 0;

                  return (
                    <Card 
                      key={course.id} 
                      className="p-6 hover-elevate transition-transform hover:scale-105 flex flex-col"
                      data-testid={`card-course-${course.id}`}
                    >
                      <div className="mb-4 p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-amber-50 dark:from-primary/5 dark:to-primary/10 w-fit text-primary">
                        {courseIcons[course.title] || <BookOpen className="w-10 h-10" />}
                      </div>
                      
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold flex-1">{course.title}</h3>
                        {isStarted && (
                          <Badge variant="secondary" className="ml-2 flex-shrink-0">
                            In Progress
                          </Badge>
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 font-body flex-1">
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
                        <Button 
                          className="w-full" 
                          variant={isStarted ? "default" : "outline"}
                          data-testid={`button-course-${course.id}`}
                        >
                          {isStarted ? "Continue Learning" : "Start Course"}
                        </Button>
                      </Link>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                <p className="text-muted-foreground font-body mb-6">
                  {searchQuery || selectedDifficulty || selectedCategory
                    ? "Try adjusting your filters or search terms"
                    : "Check back soon for new courses"}
                </p>
                {(searchQuery || selectedDifficulty || selectedCategory) && (
                  <Button 
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedDifficulty(null);
                      setSelectedCategory(null);
                    }}
                    data-testid="button-reset-search"
                  >
                    Clear All Filters
                  </Button>
                )}
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
