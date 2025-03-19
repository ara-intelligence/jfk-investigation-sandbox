
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ChevronDown, Clock, FileText, User, Plus, Maximize2, Minimize2, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

// Sample events data
const eventsData = [
  {
    id: "e1",
    title: "JFK Announces Dallas Trip",
    date: "September 26, 1963",
    time: "14:30",
    description: "President Kennedy announces plans to visit Dallas as part of a fundraising tour of Texas.",
    category: "Planning",
    significance: "Medium",
    locations: ["White House, Washington D.C."],
    persons: [{ id: "jfk", name: "John F. Kennedy" }],
    documents: [{ id: "d101", title: "Press Release - Texas Trip" }]
  },
  {
    id: "e2",
    title: "Secret Service Advance Team in Dallas",
    date: "November 13, 1963",
    time: "09:00",
    description: "Secret Service agents arrive in Dallas to begin preparations for the presidential visit.",
    category: "Security",
    significance: "Medium",
    locations: ["Dallas, TX"],
    persons: [
      { id: "p101", name: "Winston Lawson" },
      { id: "p102", name: "Forrest Sorrels" }
    ],
    documents: [{ id: "d102", title: "Secret Service Advance Report" }]
  },
  {
    id: "e3",
    title: "Motorcade Route Finalized",
    date: "November 18, 1963",
    time: "16:45",
    description: "The final motorcade route through downtown Dallas is established, including the turn onto Elm Street passing the Texas School Book Depository.",
    category: "Planning",
    significance: "High",
    locations: ["Dallas, TX"],
    persons: [
      { id: "p101", name: "Winston Lawson" },
      { id: "p102", name: "Forrest Sorrels" },
      { id: "p103", name: "Jesse Curry" }
    ],
    documents: [{ id: "d103", title: "Motorcade Route Map" }]
  },
  {
    id: "e4",
    title: "Oswald at Work",
    date: "November 22, 1963",
    time: "08:15",
    description: "Lee Harvey Oswald arrives at work at the Texas School Book Depository.",
    category: "Suspect Activity",
    significance: "Critical",
    locations: ["Texas School Book Depository, Dallas, TX"],
    persons: [{ id: "p1", name: "Lee Harvey Oswald" }],
    documents: [{ id: "d104", title: "Employee Attendance Record" }]
  },
  {
    id: "e5",
    title: "Presidential Motorcade Begins",
    date: "November 22, 1963",
    time: "11:40",
    description: "The presidential motorcade departs from Love Field Airport in Dallas.",
    category: "Key Event",
    significance: "High",
    locations: ["Love Field Airport, Dallas, TX"],
    persons: [
      { id: "jfk", name: "John F. Kennedy" },
      { id: "jbk", name: "Jacqueline Kennedy" },
      { id: "lbj", name: "Lyndon B. Johnson" }
    ],
    documents: [{ id: "d105", title: "Secret Service Motorcade Log" }]
  },
  {
    id: "e6",
    title: "Assassination",
    date: "November 22, 1963",
    time: "12:30",
    description: "President Kennedy is shot while riding in the presidential limousine on Elm Street in Dealey Plaza.",
    category: "Key Event",
    significance: "Critical",
    locations: ["Dealey Plaza, Dallas, TX"],
    persons: [
      { id: "jfk", name: "John F. Kennedy" },
      { id: "p1", name: "Lee Harvey Oswald" },
      { id: "jbk", name: "Jacqueline Kennedy" }
    ],
    documents: [
      { id: "d106", title: "Zapruder Film" },
      { id: "d107", title: "Autopsy Report" }
    ]
  },
  {
    id: "e7",
    title: "Arrival at Parkland Hospital",
    date: "November 22, 1963",
    time: "12:38",
    description: "The presidential limousine arrives at Parkland Memorial Hospital.",
    category: "Key Event",
    significance: "High",
    locations: ["Parkland Memorial Hospital, Dallas, TX"],
    persons: [
      { id: "jfk", name: "John F. Kennedy" },
      { id: "jbk", name: "Jacqueline Kennedy" },
      { id: "p104", name: "Dr. Charles Carrico" }
    ],
    documents: [{ id: "d108", title: "Parkland Hospital Records" }]
  },
  {
    id: "e8",
    title: "Death Pronounced",
    date: "November 22, 1963",
    time: "13:00",
    description: "President Kennedy is pronounced dead at Parkland Memorial Hospital.",
    category: "Key Event",
    significance: "Critical",
    locations: ["Parkland Memorial Hospital, Dallas, TX"],
    persons: [
      { id: "jfk", name: "John F. Kennedy" },
      { id: "p104", name: "Dr. Charles Carrico" },
      { id: "p105", name: "Dr. Malcolm Perry" }
    ],
    documents: [{ id: "d109", title: "Death Certificate" }]
  },
  {
    id: "e9",
    title: "Oswald Arrested",
    date: "November 22, 1963",
    time: "13:50",
    description: "Lee Harvey Oswald is arrested at the Texas Theatre in Oak Cliff.",
    category: "Key Event",
    significance: "Critical",
    locations: ["Texas Theatre, Dallas, TX"],
    persons: [
      { id: "p1", name: "Lee Harvey Oswald" },
      { id: "p106", name: "Officer M.N. McDonald" }
    ],
    documents: [{ id: "d110", title: "Arrest Report" }]
  },
  {
    id: "e10",
    title: "Johnson Sworn In",
    date: "November 22, 1963",
    time: "14:38",
    description: "Lyndon B. Johnson is sworn in as the 36th President of the United States aboard Air Force One.",
    category: "Key Event",
    significance: "High",
    locations: ["Air Force One, Love Field, Dallas, TX"],
    persons: [
      { id: "lbj", name: "Lyndon B. Johnson" },
      { id: "jbk", name: "Jacqueline Kennedy" },
      { id: "p107", name: "Judge Sarah Hughes" }
    ],
    documents: [{ id: "d111", title: "Oath of Office Photo" }]
  },
  {
    id: "e11",
    title: "Oswald Shot",
    date: "November 24, 1963",
    time: "11:21",
    description: "While being transferred from the city jail to the county jail, Oswald is shot and killed by Jack Ruby in the basement of Dallas Police Headquarters.",
    category: "Key Event",
    significance: "Critical",
    locations: ["Dallas Police Headquarters, Dallas, TX"],
    persons: [
      { id: "p1", name: "Lee Harvey Oswald" },
      { id: "p2", name: "Jack Ruby" },
      { id: "p108", name: "Captain Will Fritz" }
    ],
    documents: [
      { id: "d112", title: "Police Transfer Orders" },
      { id: "d113", title: "Television Footage" }
    ]
  },
  {
    id: "e12",
    title: "Warren Commission Established",
    date: "November 29, 1963",
    time: "17:00",
    description: "President Johnson establishes the Warren Commission to investigate the assassination.",
    category: "Investigation",
    significance: "High",
    locations: ["White House, Washington D.C."],
    persons: [
      { id: "lbj", name: "Lyndon B. Johnson" },
      { id: "p5", name: "Earl Warren" },
      { id: "p7", name: "Allen Dulles" }
    ],
    documents: [{ id: "d114", title: "Executive Order 11130" }]
  }
];

const Timeline = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState<string[]>([]);
  const [zoomLevel, setZoomLevel] = useState("medium"); // "compact", "medium", "detailed"
  
  // Filter events based on search query
  const filteredEvents = eventsData.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.persons.some(person => person.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleEventExpanded = (eventId: string) => {
    if (expanded.includes(eventId)) {
      setExpanded(expanded.filter(id => id !== eventId));
    } else {
      setExpanded([...expanded, eventId]);
    }
  };
  
  const getEventSizeClass = () => {
    switch (zoomLevel) {
      case "compact": return "py-2";
      case "detailed": return "py-6";
      default: return "py-4";
    }
  };
  
  const handleAddEvent = () => {
    toast.success("Event creation feature will be available soon");
  };
  
  const getSignificanceBadge = (significance: string) => {
    switch (significance) {
      case "Critical":
        return <Badge className="bg-red-500">Critical</Badge>;
      case "High":
        return <Badge className="bg-amber-500">High</Badge>;
      case "Medium":
      default:
        return <Badge className="bg-blue-500">Medium</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Timeline</h1>
          <p className="text-muted-foreground mt-1">Chronological events related to the case</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button onClick={() => setZoomLevel("compact")} variant={zoomLevel === "compact" ? "default" : "outline"} size="sm">
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button onClick={() => setZoomLevel("medium")} variant={zoomLevel === "medium" ? "default" : "outline"} size="sm">
            <Clock className="h-4 w-4" />
          </Button>
          <Button onClick={() => setZoomLevel("detailed")} variant={zoomLevel === "detailed" ? "default" : "outline"} size="sm">
            <Maximize2 className="h-4 w-4" />
          </Button>
          <Button onClick={handleAddEvent}>
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search events..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              <Filter className="h-4 w-4 mr-1" />
              Filter
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>All Events</DropdownMenuItem>
            <DropdownMenuItem>Key Events</DropdownMenuItem>
            <DropdownMenuItem>Planning</DropdownMenuItem>
            <DropdownMenuItem>Security</DropdownMenuItem>
            <DropdownMenuItem>Investigation</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-xl flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Case Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="relative border-l border-muted">
            {filteredEvents.map((event, index) => (
              <li 
                key={event.id} 
                className={`ml-6 ${getEventSizeClass()}`}
                style={{ "--index": index } as React.CSSProperties}
              >
                <div 
                  className={`
                    absolute w-3 h-3 rounded-full -left-1.5 mt-2
                    ${event.significance === "Critical" ? "bg-red-500" : 
                      event.significance === "High" ? "bg-amber-500" : "bg-blue-500"}
                    animate-enter
                  `}
                ></div>
                
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-1">
                  <div className="flex flex-col mb-2 md:mb-0">
                    <time className="text-sm font-normal text-muted-foreground">
                      {event.date}, {event.time}
                    </time>
                    <h3 className="text-lg font-medium flex items-center">
                      {event.title}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 ml-1" 
                        onClick={() => toggleEventExpanded(event.id)}
                      >
                        {expanded.includes(event.id) ? 
                          <Minimize2 className="h-3 w-3" /> : 
                          <PlusCircle className="h-3 w-3" />
                        }
                      </Button>
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{event.category}</Badge>
                    {getSignificanceBadge(event.significance)}
                  </div>
                </div>
                
                <p className="text-base font-normal text-muted-foreground mb-2">
                  {event.description}
                </p>
                
                {expanded.includes(event.id) && (
                  <div className="mt-3 space-y-4 bg-muted/30 p-3 rounded-md border animate-fade-in">
                    <div>
                      <h4 className="text-sm font-medium mb-1.5">Locations</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {event.locations.map((location, i) => (
                          <Badge key={i} variant="outline" className="font-normal">
                            {location}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1.5">People Involved</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {event.persons.map((person) => (
                          <Link to={`/persons/${person.id}`} key={person.id}>
                            <Badge className="bg-secondary hover:bg-secondary/80 transition-colors gap-1">
                              <User className="h-3 w-3" />
                              {person.name}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1.5">Related Documents</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {event.documents.map((doc) => (
                          <Link to={`/documents/${doc.id}`} key={doc.id}>
                            <Badge className="bg-muted hover:bg-muted/80 transition-colors gap-1 text-foreground">
                              <FileText className="h-3 w-3" />
                              {doc.title}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};

export default Timeline;
