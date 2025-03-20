
import { useState, useEffect } from "react";
import { 
  Search as SearchIcon, 
  Filter, 
  FileText, 
  User, 
  Calendar, 
  Link as LinkIcon, 
  Lightbulb,
  MessageSquare,
  Flag
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator
} from "@/components/ui/command";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

// Sample search results data
const searchResults = {
  documents: [
    { 
      id: "1", 
      title: "Warren Commission Interview: Ruby", 
      excerpt: "...stated he had no prior contact with Oswald...",
      matchCount: 6,
      type: "text",
      category: "Interview",
      date: "April 12, 1964",
      flaggedBy: 12
    },
    { 
      id: "3", 
      title: "CIA Memorandum RE: Oswald", 
      excerpt: "...subject visited Mexico City embassy on...",
      matchCount: 4,
      type: "text",
      category: "Intelligence",
      date: "October 10, 1963",
      flaggedBy: 28
    },
  ],
  persons: [
    {
      id: "p1",
      name: "Lee Harvey Oswald",
      role: "Primary Suspect",
      matchCount: 8,
      connections: 16,
      flaggedBy: 5
    },
    {
      id: "p4",
      name: "J. Edgar Hoover",
      role: "FBI Director",
      matchCount: 3,
      connections: 12,
      flaggedBy: 7
    }
  ],
  patterns: [
    {
      id: "pat1",
      title: "Mexican Embassy Connections",
      description: "Multiple subjects connected to Mexican Embassy visits",
      confidence: 78,
      supportingEvidence: 12,
      investigatorCount: 23
    },
    {
      id: "pat2",
      title: "Timing Discrepancies",
      description: "Inconsistencies in timeline reports from witnesses",
      confidence: 64,
      supportingEvidence: 8,
      investigatorCount: 15
    }
  ]
};

const Search = () => {
  const { query: urlQuery } = useParams<{ query: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState(urlQuery || "");
  const [isSearching, setIsSearching] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(!!urlQuery);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<string | null>(urlQuery || null);
  
  // Effect to handle URL param changes
  useEffect(() => {
    if (urlQuery) {
      setSearchQuery(urlQuery);
      setActiveQuestion(urlQuery);
      performSearch(urlQuery);
    }
  }, [urlQuery]);
  
  // Common investigation questions
  const investigationQuestions = [
    "Were there multiple shooters?",
    "What evidence links Oswald to the CIA?",
    "Connections between Ruby and organized crime?",
    "Timeline inconsistencies in witness reports",
    "Missing evidence from autopsy reports"
  ];
  
  const performSearch = (query: string) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
      setSearchPerformed(true);
    }, 500);
  };
  
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    // Update URL for bookmarking
    navigate(`/search/${encodeURIComponent(searchQuery)}`);
    
    // Show toast notification
    toast({
      title: "URL updated",
      description: "You can now bookmark this search result.",
      duration: 3000
    });
    
    performSearch(searchQuery);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const askQuestion = (question: string) => {
    setSearchQuery(question);
    setActiveQuestion(question);
    navigate(`/search/${encodeURIComponent(question)}`);
    performSearch(question);
  };
  
  const copySearchLink = () => {
    const url = `${window.location.origin}/search/${encodeURIComponent(searchQuery)}`;
    navigator.clipboard.writeText(url);
    
    toast({
      title: "Search URL copied",
      description: "Link has been copied to clipboard",
      duration: 3000
    });
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Global Investigation Search</h1>
        <p className="text-muted-foreground mt-1">
          Search across all case files, people, and evidence
        </p>
      </div>
      
      <Card className="overflow-hidden border-2 border-primary/10 shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search the JFK files or ask a question..."
                className="pl-10 pr-4 py-6 text-lg border-2 border-input focus-visible:ring-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <Button 
              onClick={handleSearch} 
              className="md:w-auto py-6 px-8 text-base font-medium"
              disabled={isSearching}
            >
              {isSearching ? "Searching..." : "Search Files"}
            </Button>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => setIsCommandOpen(true)}>
              <span className="mr-1">Command</span> <kbd className="rounded bg-muted px-1 text-xs">⌘K</kbd>
            </Badge>
            {investigationQuestions.map((question, i) => (
              <Badge 
                key={i} 
                variant={activeQuestion === question ? "default" : "outline"} 
                className="cursor-pointer hover:bg-primary/20"
                onClick={() => askQuestion(question)}
              >
                {question}
              </Badge>
            ))}
          </div>
          
          {searchPerformed && (
            <div className="mt-4 pt-4 border-t border-primary/10">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Current search: <span className="text-primary font-medium">{searchQuery}</span>
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={copySearchLink}
                >
                  <LinkIcon className="h-3.5 w-3.5" />
                  Copy Link
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {isSearching && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">Searching case files...</p>
            <Progress value={65} className="w-[200px]" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-4 flex gap-4">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-5/6" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {searchPerformed && !isSearching && (
        <div className="space-y-6">
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Results</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="persons">Persons</TabsTrigger>
              <TabsTrigger value="patterns">Patterns</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6 space-y-8">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-medium">Documents</h2>
                  <Button variant="link" asChild>
                    <Link to="/documents">View all documents</Link>
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchResults.documents.map((doc) => (
                    <Link 
                      to={`/documents/${doc.id}`} 
                      key={doc.id}
                      className="group"
                    >
                      <Card className="h-full overflow-hidden hover:shadow-md hover:border-primary/20 transition-all">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <FileText className="h-5 w-5 text-primary" />
                              <span className="text-sm text-muted-foreground">{doc.category}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-amber-600">
                              <Flag className="h-3.5 w-3.5" />
                              <span>{doc.flaggedBy} flags</span>
                            </div>
                          </div>
                          <h3 className="font-medium text-base group-hover:text-primary transition-colors">{doc.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1 italic">"{doc.excerpt}"</p>
                          <div className="mt-2 pt-2 border-t flex items-center justify-between text-xs">
                            <span className="text-primary font-medium">{doc.matchCount} matches</span>
                            <span className="text-muted-foreground">{doc.date}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-medium">Persons of Interest</h2>
                  <Button variant="link" asChild>
                    <Link to="/persons">View all persons</Link>
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.persons.map((person) => (
                    <Link 
                      to={`/persons/${person.id}`} 
                      key={person.id}
                      className="group"
                    >
                      <Card className="h-full overflow-hidden hover:shadow-md hover:border-primary/20 transition-all">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <User className="h-5 w-5 text-primary" />
                              <span className="text-sm text-muted-foreground">{person.role}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-amber-600">
                              <Flag className="h-3.5 w-3.5" />
                              <span>{person.flaggedBy} flags</span>
                            </div>
                          </div>
                          <h3 className="font-medium text-base group-hover:text-primary transition-colors">{person.name}</h3>
                          <div className="mt-2 pt-2 border-t flex items-center justify-between text-xs">
                            <span className="text-primary font-medium">{person.matchCount} matches</span>
                            <span className="text-muted-foreground">{person.connections} connections</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-medium">Investigation Patterns</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchResults.patterns.map((pattern) => (
                    <Card key={pattern.id} className="overflow-hidden hover:shadow-md transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Lightbulb className="h-5 w-5 text-amber-500" />
                            <span className="text-sm font-medium">Pattern Analysis</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <MessageSquare className="h-3.5 w-3.5 text-primary" />
                            <span>{pattern.investigatorCount} investigators</span>
                          </div>
                        </div>
                        <h3 className="font-medium text-base">{pattern.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{pattern.description}</p>
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span>Confidence</span>
                            <span className="font-medium">{pattern.confidence}%</span>
                          </div>
                          <Progress value={pattern.confidence} className="h-2" />
                        </div>
                        <div className="mt-2 pt-2 border-t flex items-center justify-between text-xs">
                          <span className="text-primary font-medium">{pattern.supportingEvidence} pieces of evidence</span>
                          <Button variant="ghost" size="sm" className="h-7 text-xs">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="documents" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.documents.map((doc) => (
                  <Link 
                    to={`/documents/${doc.id}`} 
                    key={doc.id}
                    className="group"
                  >
                    <Card className="h-full overflow-hidden hover:shadow-md hover:border-primary/20 transition-all">
                      <CardContent className="p-4">
                        {/* Same document card content as above */}
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            <span className="text-sm text-muted-foreground">{doc.category}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-amber-600">
                            <Flag className="h-3.5 w-3.5" />
                            <span>{doc.flaggedBy} flags</span>
                          </div>
                        </div>
                        <h3 className="font-medium text-base group-hover:text-primary transition-colors">{doc.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 italic">"{doc.excerpt}"</p>
                        <div className="mt-2 pt-2 border-t flex items-center justify-between text-xs">
                          <span className="text-primary font-medium">{doc.matchCount} matches</span>
                          <span className="text-muted-foreground">{doc.date}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
            
            {/* Other tab contents would be similar */}
            <TabsContent value="persons" className="mt-6">
              <p className="text-muted-foreground mb-4">Showing {searchResults.persons.length} persons matching your search</p>
            </TabsContent>
            
            <TabsContent value="patterns" className="mt-6">
              <p className="text-muted-foreground mb-4">Showing {searchResults.patterns.length} patterns matching your search</p>
            </TabsContent>
            
            <TabsContent value="insights" className="mt-6">
              <Card className="border-2 border-primary/10">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Lightbulb className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">AI Investigation Assistant</h3>
                      <p className="text-sm text-muted-foreground">Based on your search for "{searchQuery}"</p>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-primary/20 pl-4 py-2 bg-muted/30 rounded-r-md mb-4">
                    <p className="text-sm">
                      Your search involves connections between Oswald and potential CIA contacts. 
                      I've identified 3 key documents and 2 persons that might be relevant.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Key Findings:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <LinkIcon className="h-4 w-4 text-primary mt-0.5" />
                        <span>Documents mentioning both "Oswald" and "CIA" show a timeline inconsistency in September 1963</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <LinkIcon className="h-4 w-4 text-primary mt-0.5" />
                        <span>Mexico City embassy visit records have conflicting descriptions of the visitor</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <LinkIcon className="h-4 w-4 text-primary mt-0.5" />
                        <span>Multiple witness testimonies reference a possible lookalike during this period</span>
                      </li>
                    </ul>
                    
                    <div className="pt-3 mt-3 border-t">
                      <p className="text-sm text-muted-foreground">12 investigators are currently examining this connection</p>
                      <Button size="sm" className="mt-2">View Full Analysis</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
      
      <CommandDialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <SearchIcon className="mr-2 h-4 w-4" />
                <span>Search for documents</span>
              </CommandItem>
              <CommandItem>
                <User className="mr-2 h-4 w-4" />
                <span>Find person</span>
              </CommandItem>
              <CommandItem>
                <Calendar className="mr-2 h-4 w-4" />
                <span>Search by date</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Investigation Tools">
              <CommandItem>
                <Lightbulb className="mr-2 h-4 w-4" />
                <span>Analyze connections</span>
              </CommandItem>
              <CommandItem>
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>Ask AI assistant</span>
              </CommandItem>
              <CommandItem>
                <Flag className="mr-2 h-4 w-4" />
                <span>Flag for investigation</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
};

export default Search;
