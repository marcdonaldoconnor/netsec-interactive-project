import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Search, Shield, Lock, Mail, Key, 
  Network, Database, FileText, Clock,
  ArrowRight
} from "lucide-react";
import type { KnowledgeArticle } from "@shared/schema";

export default function Knowledge() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: articles, isLoading } = useQuery<KnowledgeArticle[]>({
    queryKey: ["/api/knowledge"],
  });

  const categories = [
    { icon: <Shield className="w-6 h-6" />, name: "Network Security", color: "text-primary" },
    { icon: <Mail className="w-6 h-6" />, name: "Phishing Prevention", color: "text-amber-500" },
    { icon: <Key className="w-6 h-6" />, name: "Password Management", color: "text-orange-500" },
    { icon: <Lock className="w-6 h-6" />, name: "Data Encryption", color: "text-primary" },
    { icon: <Network className="w-6 h-6" />, name: "Firewall Configuration", color: "text-amber-500" },
    { icon: <Database className="w-6 h-6" />, name: "Data Privacy", color: "text-orange-500" }
  ];

  const filteredArticles = articles?.filter(article => {
    const matchesSearch = !searchQuery || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-16 w-full max-w-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-48" />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary/5 to-amber-50/50 dark:from-primary/5 dark:to-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Knowledge Base</h1>
          <p className="text-lg text-muted-foreground mb-8 font-body max-w-2xl">
            Explore best practices, security tips, and comprehensive guides to strengthen your cybersecurity knowledge
          </p>
          
          <div className="max-w-2xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search articles, topics, security tips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-base rounded-full"
              data-testid="input-search"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(
                  selectedCategory === category.name ? null : category.name
                )}
                className={`p-4 rounded-xl border-2 transition-all hover-elevate
                  ${selectedCategory === category.name 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border bg-card'}`}
                data-testid={`button-category-${index}`}
              >
                <div className={`${category.color} mb-2 flex justify-center`}>
                  {category.icon}
                </div>
                <div className="text-sm font-semibold text-center">
                  {category.name}
                </div>
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">
              {selectedCategory || "All Articles"}
            </h2>
            {selectedCategory && (
              <Button 
                variant="ghost" 
                onClick={() => setSelectedCategory(null)}
                data-testid="button-clear-filter"
              >
                Clear Filter
              </Button>
            )}
          </div>

          {filteredArticles && filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Card 
                  key={article.id} 
                  className="p-6 hover-elevate transition-all group cursor-pointer"
                  data-testid={`card-article-${article.id}`}
                >
                  <div className="mb-4">
                    <Badge variant="secondary" className="mb-3">
                      {article.category}
                    </Badge>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3 font-body">
                    {article.content.substring(0, 150)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime} min read</span>
                    </div>
                    <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform" data-testid={`button-read-${article.id}`}>
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground font-body">
                {searchQuery 
                  ? "Try adjusting your search terms" 
                  : "Check back soon for new cybersecurity articles and guides"}
              </p>
            </Card>
          )}
        </section>
      </div>
    </div>
  );
}
