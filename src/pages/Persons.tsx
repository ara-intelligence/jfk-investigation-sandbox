
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Plus, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample persons data
const personsData = [
  { 
    id: "p1", 
    name: "Lee Harvey Oswald", 
    role: "Primary Suspect",
    status: "Deceased",
    tags: ["Suspect", "Ex-Marine", "Soviet Connection"],
    connections: 16,
    lastUpdated: "2023-09-15"
  },
  { 
    id: "p2", 
    name: "Jack Ruby", 
    role: "Oswald's Shooter",
    status: "Deceased",
    tags: ["Nightclub Owner", "Dallas Connection"],
    connections: 8,
    lastUpdated: "2023-09-12"
  },
  { 
    id: "p3", 
    name: "Marina Oswald", 
    role: "Witness",
    status: "Living",
    tags: ["Oswald's Wife", "Soviet Citizen"],
    connections: 5,
    lastUpdated: "2023-09-10"
  },
  { 
    id: "p4", 
    name: "J. Edgar Hoover", 
    role: "FBI Director",
    status: "Deceased",
    tags: ["FBI", "Government Official"],
    connections: 12,
    lastUpdated: "2023-08-28"
  },
  { 
    id: "p5", 
    name: "Earl Warren", 
    role: "Commission Chairman",
    status: "Deceased",
    tags: ["Warren Commission", "Chief Justice"],
    connections: 9,
    lastUpdated: "2023-08-22"
  },
  { 
    id: "p6", 
    name: "Abraham Zapruder", 
    role: "Witness",
    status: "Deceased",
    tags: ["Filmed Assassination", "Civilian"],
    connections: 3,
    lastUpdated: "2023-08-15"
  },
  { 
    id: "p7", 
    name: "Allen Dulles", 
    role: "Commission Member",
    status: "Deceased",
    tags: ["Warren Commission", "Ex-CIA Director"],
    connections: 7,
    lastUpdated: "2023-08-10"
  },
  { 
    id: "p8", 
    name: "James Hosty", 
    role: "FBI Agent",
    status: "Deceased",
    tags: ["FBI", "Oswald File Handler"],
    connections: 6,
    lastUpdated: "2023-08-05"
  },
  { 
    id: "p9", 
    name: "George de Mohrenschildt", 
    role: "Oswald Associate",
    status: "Deceased",
    tags: ["CIA Connection", "Russian Émigré"],
    connections: 5,
    lastUpdated: "2023-07-30"
  },
];

const Persons = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter persons based on search query
  const filteredPersons = personsData.filter(person => 
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Persons of Interest</h1>
          <p className="text-muted-foreground mt-1">Key individuals connected to the case</p>
        </div>
        
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Person
        </Button>
      </div>
      
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search persons..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              <Filter className="h-4 w-4 mr-1" />
              Filter by Role
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>All Roles</DropdownMenuItem>
            <DropdownMenuItem>Suspects</DropdownMenuItem>
            <DropdownMenuItem>Witnesses</DropdownMenuItem>
            <DropdownMenuItem>Officials</DropdownMenuItem>
            <DropdownMenuItem>Associates</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Persons</TabsTrigger>
          <TabsTrigger value="suspects">Suspects</TabsTrigger>
          <TabsTrigger value="witnesses">Witnesses</TabsTrigger>
          <TabsTrigger value="officials">Officials</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPersons.map((person, index) => (
              <Link 
                to={`/persons/${person.id}`} 
                key={person.id}
                className="group"
                style={{ "--index": index } as React.CSSProperties}
              >
                <Card className="h-full overflow-hidden transition-all duration-300 hover:border-primary/20 hover:shadow-lg animate-enter">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div className="h-10 w-10 rounded-full bg-muted/70 flex items-center justify-center">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`
                          ${person.status === "Deceased" ? "bg-red-50 text-red-700 border-red-200" : "bg-green-50 text-green-700 border-green-200"}
                        `}
                      >
                        {person.status}
                      </Badge>
                    </div>
                    <h3 className="font-medium text-base group-hover:text-primary transition-colors">{person.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{person.role}</p>
                    
                    <div className="flex flex-wrap gap-1 mt-3">
                      {person.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-3 border-t flex items-center justify-between text-xs text-muted-foreground">
                      <span>{person.connections} connections</span>
                      <span>Updated {person.lastUpdated}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="suspects" className="mt-0">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Displaying suspects only</p>
          </div>
        </TabsContent>
        
        <TabsContent value="witnesses" className="mt-0">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Displaying witnesses only</p>
          </div>
        </TabsContent>
        
        <TabsContent value="officials" className="mt-0">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Displaying officials only</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Persons;
