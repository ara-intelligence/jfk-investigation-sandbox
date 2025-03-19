import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Download, FileText, Bookmark, Share, ArrowLeftRight, Edit, Tag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Sample document data
const documents = {
  "1": {
    id: "1",
    title: "Warren Commission Interview: Ruby",
    content: `
      TESTIMONY OF JACK RUBY
      
      The President's Commission met at 11:45 a.m. on June 7, 1964, at Parkland Memorial Hospital, Dallas, Tex.
      
      Present were Chief Justice Earl Warren, Chairman; Representative Gerald R. Ford, John J. McCloy, and Allen W. Dulles, members.
      
      Also present were J. Lee Rankin, general counsel; Joseph A. Ball, assistant counsel; Leon D. Hubert, Jr., assistant counsel; E. L. Wehli, Dallas County sheriff; Jim Bowie, Dallas County sheriff's office; William F. Alexander, assistant district attorney; Clayton Fowler, chief defense counsel; Joe H. Tonahill, defense counsel; Elmer W. Moore, Secret Service; and Jim Underwood, television reporter.
      
      [Document contains extensive testimony from Jack Ruby regarding his motivations and actions on November 24, 1963, when he shot Lee Harvey Oswald in the basement of the Dallas Police Department.]
      
      Mr. RUBY: I have been used for a purpose, and there will be a certain tragic occurrence happening if you don't take my testimony and somehow vindicate me so my people don't suffer because of what I have done.
      
      [Further testimony about Ruby's mental state and concerns about a conspiracy to kill him in prison follow.]
      
      CHAIRMAN WARREN: Thank you very much, Jack. We appreciate your testimony, and I want to say to you that I think you have been very honest and forthright with us. I don't want you to feel that all of these things you speak of are going to happen to you, because I don't think they will. I think that you will have a fair trial, and I think that everything will be done in accordance with the law...
    `,
    date: "April 12, 1964",
    type: "text",
    classification: "Public",
    category: "Interview",
    agency: "Warren Commission",
    releaseBatch: "1992 Release",
    metadata: {
      documentId: "Warren_Commission_Ruby_1964-04-12",
      pages: 42,
      format: "Transcript",
      relatedDocuments: ["Warren Commission Report Vol. V", "Ruby Trial Transcript"],
      keywords: ["Jack Ruby", "Lee Harvey Oswald", "Dallas Police Department", "Warren Commission"]
    }
  },
  // Other documents would be defined here
};

// Sample notes for this document
const sampleNotes = [
  { 
    id: "note1", 
    text: "Ruby claims he wasn't part of a conspiracy, but his language here about being 'used for a purpose' is interesting.", 
    timestamp: "2023-10-15T14:23:00", 
    page: 1 
  },
  { 
    id: "note2", 
    text: "Cross-reference with testimony from Dallas PD officers regarding security procedures in the basement.", 
    timestamp: "2023-10-16T09:12:00", 
    page: 3 
  },
];

// Sample connections to other entities
const connections = [
  { type: "person", id: "p1", name: "Jack Ruby", relationship: "Subject of Interview" },
  { type: "person", id: "p2", name: "Lee Harvey Oswald", relationship: "Mentioned" },
  { type: "person", id: "p3", name: "Earl Warren", relationship: "Interviewer" },
  { type: "event", id: "e1", name: "Oswald Shooting", date: "November 24, 1963", relationship: "Discussed" },
];

const DocumentViewer = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("document");
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState(sampleNotes);
  
  const document = id && documents[id as keyof typeof documents];
  
  if (!document) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Document Not Found</h2>
          <p className="text-muted-foreground mt-2">The requested document could not be found.</p>
          <Button variant="outline" className="mt-4" asChild>
            <Link to="/documents">Back to Documents</Link>
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
        page: 1, // Default to page 1
      };
      
      setNotes([...notes, note]);
      setNewNote("");
      toast.success("Note added to document");
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link to="/documents">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{document.title}</h1>
            <div className="flex items-center mt-1 text-muted-foreground">
              <FileText className="h-4 w-4 mr-1" />
              <span className="text-sm">{document.date} • {document.agency}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.success("Document bookmarked")}>
            <Bookmark className="h-4 w-4 mr-1" />
            Bookmark
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.success("Document shared")}>
            <Share className="h-4 w-4 mr-1" />
            Share
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.success("Document downloaded")}>
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      </div>
      
      <div className="flex gap-4 flex-col xl:flex-row">
        <div className="flex-1 xl:max-w-[70%]">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-4">
              <TabsTrigger value="document">Document</TabsTrigger>
              <TabsTrigger value="annotations">Annotations</TabsTrigger>
              <TabsTrigger value="connections">Connections</TabsTrigger>
              <TabsTrigger value="metadata">Metadata</TabsTrigger>
            </TabsList>
            
            <TabsContent value="document" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <div className="h-[70vh] overflow-y-auto bg-white dark:bg-black/50 p-6 rounded border whitespace-pre-line font-mono text-sm">
                    {document.content}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="annotations" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-2">Document Annotations</h3>
                    <p className="text-sm text-muted-foreground">
                      Annotations and highlights made to this document
                    </p>
                  </div>
                  
                  <div className="h-[70vh] overflow-y-auto">
                    <div className="space-y-4">
                      <div className="p-4 border rounded-md bg-yellow-50 dark:bg-yellow-900/20">
                        <p className="font-medium">Highlighted Text (Page 3):</p>
                        <blockquote className="italic border-l-4 border-yellow-400 pl-3 my-2 text-sm">
                          "I have been used for a purpose, and there will be a certain tragic occurrence happening if you don't take my testimony and somehow vindicate me so my people don't suffer because of what I have done."
                        </blockquote>
                        <div className="text-sm text-muted-foreground mt-2">
                          Highlighted by John Smith • October 15, 2023
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-md bg-blue-50 dark:bg-blue-900/20">
                        <p className="font-medium">Comment (Page 8):</p>
                        <blockquote className="italic border-l-4 border-blue-400 pl-3 my-2 text-sm">
                          "Ruby's testimony about his mental state seems inconsistent with earlier statements."
                        </blockquote>
                        <div className="text-sm text-muted-foreground mt-2">
                          Comment by Jane Doe • October 16, 2023
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="connections" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-2">Document Connections</h3>
                    <p className="text-sm text-muted-foreground">
                      People, events, and other documents connected to this file
                    </p>
                  </div>
                  
                  <div className="h-[70vh] overflow-y-auto">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium mb-3 flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          Connected People
                        </h4>
                        <div className="space-y-2">
                          {connections.filter(c => c.type === "person").map(person => (
                            <Link to={`/persons/${person.id}`} key={person.id}>
                              <div className="p-3 border rounded-md hover:bg-muted/50 transition-colors flex justify-between items-center">
                                <div>
                                  <p className="font-medium">{person.name}</p>
                                  <p className="text-xs text-muted-foreground">{person.relationship}</p>
                                </div>
                                <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-3 flex items-center">
                          <Tag className="h-4 w-4 mr-1" />
                          Connected Events
                        </h4>
                        <div className="space-y-2">
                          {connections.filter(c => c.type === "event").map(event => (
                            <Link to={`/timeline?event=${event.id}`} key={event.id}>
                              <div className="p-3 border rounded-md hover:bg-muted/50 transition-colors flex justify-between items-center">
                                <div>
                                  <p className="font-medium">{event.name}</p>
                                  <p className="text-xs text-muted-foreground">{event.date} • {event.relationship}</p>
                                </div>
                                <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="metadata" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-2">Document Metadata</h3>
                    <p className="text-sm text-muted-foreground">
                      Technical information about this document
                    </p>
                  </div>
                  
                  <div className="h-[70vh] overflow-y-auto">
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 text-sm">
                      <div className="space-y-1">
                        <dt className="text-muted-foreground">Document ID</dt>
                        <dd className="font-mono">{document.metadata.documentId}</dd>
                      </div>
                      
                      <div className="space-y-1">
                        <dt className="text-muted-foreground">Classification</dt>
                        <dd>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {document.classification}
                          </Badge>
                        </dd>
                      </div>
                      
                      <div className="space-y-1">
                        <dt className="text-muted-foreground">Release Batch</dt>
                        <dd>{document.releaseBatch}</dd>
                      </div>
                      
                      <div className="space-y-1">
                        <dt className="text-muted-foreground">Document Type</dt>
                        <dd>{document.metadata.format}</dd>
                      </div>
                      
                      <div className="space-y-1">
                        <dt className="text-muted-foreground">Pages</dt>
                        <dd>{document.metadata.pages}</dd>
                      </div>
                      
                      <div className="space-y-1">
                        <dt className="text-muted-foreground">Agency</dt>
                        <dd>{document.agency}</dd>
                      </div>
                      
                      <div className="space-y-1 col-span-2">
                        <dt className="text-muted-foreground">Keywords</dt>
                        <dd className="flex flex-wrap gap-2">
                          {document.metadata.keywords.map(keyword => (
                            <Badge key={keyword} variant="secondary">
                              {keyword}
                            </Badge>
                          ))}
                        </dd>
                      </div>
                      
                      <div className="space-y-1 col-span-2">
                        <dt className="text-muted-foreground">Related Documents</dt>
                        <dd className="flex flex-col gap-1">
                          {document.metadata.relatedDocuments.map(doc => (
                            <span key={doc} className="text-primary hover:underline cursor-pointer">
                              {doc}
                            </span>
                          ))}
                        </dd>
                      </div>
                    </dl>
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
              
              <div className="space-y-4 mb-4 max-h-[40vh] overflow-y-auto">
                {notes.map((note) => (
                  <div key={note.id} className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm">{note.text}</p>
                    <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                      <span>Page {note.page}</span>
                      <span>{new Date(note.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t">
                <Textarea
                  placeholder="Add a new note about this document..."
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

export default DocumentViewer;
