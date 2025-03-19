import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ChevronLeft, 
  Edit, 
  User, 
  MapPin, 
  Calendar, 
  Fingerprint, 
  ArrowLeftRight, 
  FileText, 
  Clock, 
  Plus 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Sample person data
const persons = {
  "p1": {
    id: "p1",
    name: "Lee Harvey Oswald",
    role: "Primary Suspect",
    status: "Deceased",
    birthDate: "October 18, 1939",
    deathDate: "November 24, 1963",
    bio: `
      Lee Harvey Oswald was a former U.S. Marine who was arrested for the assassination of President John F. Kennedy on November 22, 1963, in Dallas, Texas. Oswald was himself murdered by Jack Ruby on November 24, 1963, while being transferred from the city jail to the county jail.

      Prior to the assassination, Oswald had defected to the Soviet Union in 1959, lived there until 1962, then returned to the United States. He brought with him his Russian wife, Marina, and their daughter. In early 1963, Oswald allegedly purchased a rifle by mail-order, which was later identified as the weapon used to assassinate President Kennedy.

      The Warren Commission concluded that Oswald acted alone in assassinating President Kennedy. However, various conspiracy theories have emerged over the decades questioning this conclusion, citing inconsistencies in the evidence, witness testimonies, and possible connections to other individuals or organizations.

      On November 22, 1963, Oswald was working at the Texas School Book Depository, which overlooked the presidential motorcade route. According to the Warren Commission, Oswald fired three shots from a sixth-floor window, killing President Kennedy and wounding Texas Governor John Connally.
    `,
    image: null,
    locations: [
      { name: "New Orleans, LA", period: "Birth - 1956" },
      { name: "U.S. Marine Corps", period: "1956 - 1959" },
      { name: "Soviet Union", period: "1959 - 1962" },
      { name: "Dallas, TX", period: "1962 - 1963" }
    ],
    connections: [
      { type: "person", id: "p2", name: "Jack Ruby", relationship: "Shooter" },
      { type: "person", id: "p3", name: "Marina Oswald", relationship: "Wife" },
      { type: "person", id: "p9", name: "George de Mohrenschildt", relationship: "Associate" },
      { type: "event", id: "e1", name: "JFK Assassination", date: "November 22, 1963", relationship: "Primary Suspect" },
      { type: "event", id: "e2", name: "Oswald Shooting", date: "November 24, 1963", relationship: "Victim" }
    ],
    documents: [
      { id: "d1", title: "Warren Commission Testimony on Oswald", date: "1964" },
      { id: "d2", title: "Oswald's Military Service Record", date: "1956-1959" },
      { id: "d3", title: "Dallas Police Report on Arrest", date: "November 22, 1963" },
      { id: "d4", title: "CIA File on Soviet Stay", date: "1959-1962" }
    ],
    timeline: [
      { date: "October 18, 1939", event: "Born in New Orleans, Louisiana" },
      { date: "October 24, 1956", event: "Joined the U.S. Marine Corps" },
      { date: "October 31, 1959", event: "Defected to the Soviet Union" },
      { date: "June 13, 1962", event: "Returned to the United States with Marina Oswald" },
      { date: "April 10, 1963", event: "Alleged attempted assassination of General Edwin Walker" },
      { date: "November 22, 1963", event: "Arrested for the assassination of President Kennedy" },
      { date: "November 24, 1963", event: "Shot and killed by Jack Ruby" }
    ]
  },
  // Other persons would be defined here
};

// Sample investigation notes
const sampleNotes = [
  { 
    id: "note1", 
    text: "Oswald's time in the Soviet Union needs deeper investigation - potential handlers or influences?", 
    timestamp: "2023-10-15T14:23:00"
  },
  { 
    id: "note2", 
    text: "Connection with de Mohrenschildt is suspicious - CIA records indicate possible intelligence connection.", 
    timestamp: "2023-10-16T09:12:00"
  },
];

const PersonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("profile");
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState(sampleNotes);
  
  const person = id && persons[id as keyof typeof persons];
  
  if (!person) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Person Not Found</h2>
          <p className="text-muted-foreground mt-2">The requested person could not be found.</p>
          <Button variant="outline" className="mt-4" asChild>
            <Link to="/persons">Back to Persons</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const handleAddNote = () => {
    if (newNote.trim()) {
      const note = {
        id: `note${Date.now()}`,
        text: newNote,
        timestamp: new Date().toISOString(),
      };
      
      setNotes([...notes, note]);
      setNewNote("");
      toast.success("Note added about this person");
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link to="/persons">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{person.name}</h1>
            <div className="flex items-center mt-1">
              <Badge variant={person.role === "Primary Suspect" ? "destructive" : "outline"}>
                {person.role}
              </Badge>
              <span className="mx-2 text-muted-foreground">•</span>
              <Badge 
                variant="outline" 
                className={`
                  ${person.status === "Deceased" ? "bg-red-50 text-red-700 border-red-200" : "bg-green-50 text-green-700 border-green-200"}
                `}
              >
                {person.status}
              </Badge>
            </div>
          </div>
        </div>
        
        <Button onClick={() => toast.success("Person profile can now be edited")}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>
      
      <div className="flex gap-4 flex-col xl:flex-row">
        <div className="flex-1 xl:max-w-[70%]">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="connections">Connections</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-xl">Biography</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 whitespace-pre-line">
                      {person.bio}
                    </div>
                  </CardContent>
                </Card>
                
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Personal Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-2">
                        <div>
                          <dt className="text-sm text-muted-foreground">Full Name</dt>
                          <dd className="font-medium">{person.name}</dd>
                        </div>
                        
                        {person.birthDate && (
                          <div>
                            <dt className="text-sm text-muted-foreground">Birth Date</dt>
                            <dd>{person.birthDate}</dd>
                          </div>
                        )}
                        
                        {person.deathDate && (
                          <div>
                            <dt className="text-sm text-muted-foreground">Death Date</dt>
                            <dd>{person.deathDate}</dd>
                          </div>
                        )}
                      </dl>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        Locations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {person.locations.map((location, index) => (
                          <li key={index} className="text-sm">
                            <span className="font-medium">{location.name}</span>
                            <span className="text-muted-foreground ml-2">({location.period})</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="timeline" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Personal Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="relative border-l border-muted">
                    {person.timeline.map((event, index) => (
                      <li key={index} className="mb-8 ml-6" style={{ "--index": index } as React.CSSProperties}>
                        <div className="absolute w-3 h-3 rounded-full bg-primary -left-1.5 mt-1.5 animate-enter"></div>
                        <time className="block mb-1 text-sm font-normal leading-none text-muted-foreground">
                          {event.date}
                        </time>
                        <p className="text-base font-medium">
                          {event.event}
                        </p>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="connections" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <ArrowLeftRight className="h-5 w-5 mr-2" />
                    Connections & Relationships
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Connected People</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {person.connections.filter(c => c.type === "person").map(connection => (
                          <Link to={`/persons/${connection.id}`} key={connection.id} className="group">
                            <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                              <div className="flex justify-between items-start">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 rounded-full bg-muted/70 flex items-center justify-center mr-3">
                                    <User className="h-5 w-5 text-muted-foreground" />
                                  </div>
                                  <div>
                                    <p className="font-medium group-hover:text-primary transition-colors">
                                      {connection.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {connection.relationship}
                                    </p>
                                  </div>
                                </div>
                                <Fingerprint className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Connected Events</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {person.connections.filter(c => c.type === "event").map(event => (
                          <Link to={`/timeline?event=${event.id}`} key={event.id} className="group">
                            <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium group-hover:text-primary transition-colors">
                                    {event.name}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {event.date} • {event.relationship}
                                  </p>
                                </div>
                                <Clock className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents" className="mt-0">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Related Documents
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Link Document
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {person.documents.map(doc => (
                      <Link to={`/documents/${doc.id}`} key={doc.id} className="group">
                        <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium group-hover:text-primary transition-colors">
                                {doc.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {doc.date}
                              </p>
                            </div>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="xl:w-96">
          <Card className="h-full">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Investigation Notes</h3>
                <Button size="sm" variant="ghost">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4 mb-4 max-h-[50vh] overflow-y-auto">
                {notes.map((note) => (
                  <div key={note.id} className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm">{note.text}</p>
                    <div className="flex justify-end items-center mt-2 text-xs text-muted-foreground">
                      <span>{new Date(note.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t">
                <Textarea
                  placeholder="Add a new note about this person..."
                  className="mb-3 min-h-24"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                />
                <Button onClick={handleAddNote} className="w-full">Add Note</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PersonDetail;
