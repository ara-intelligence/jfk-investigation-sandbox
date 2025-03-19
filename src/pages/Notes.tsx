import { useState } from "react";
import { Search, Filter, Plus, ChevronDown, Edit, Trash2, Save, FileText, Calendar, Link as LinkIcon, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Link } from "react-router-dom";

// Sample notes data
const initialNotes = [
  {
    id: "n1",
    title: "Oswald's Movements Before Assassination",
    content: "Need to track Oswald's movements in the days leading up to Nov 22. Reports suggest he stored the rifle at Ruth Paine's garage. Cross-reference with Marina Oswald's testimony about his activities that morning.",
    date: "2023-10-12",
    category: "Investigation Lead",
    linkedItems: [
      { type: "person", id: "p1", name: "Lee Harvey Oswald" },
      { type: "document", id: "d1", name: "Warren Commission Testimony on Oswald" }
    ]
  },
  {
    id: "n2",
    title: "Witness Testimonies - Dealey Plaza",
    content: "Multiple witnesses on the grassy knoll reported hearing shots from behind the fence. This contradicts the official narrative of shots only coming from the Book Depository. Need to re-examine these testimonies and compare with acoustic evidence.",
    date: "2023-10-14",
    category: "Witness Analysis",
    linkedItems: [
      { type: "document", id: "d5", name: "Witness Compilation - Dealey Plaza" }
    ]
  },
  {
    id: "n3",
    title: "Ruby's Organized Crime Connections",
    content: "Jack Ruby had documented connections to organized crime figures in Chicago and Dallas. Need to investigate these relationships further and determine if they could be connected to the assassination or Ruby's motive for shooting Oswald.",
    date: "2023-10-15",
    category: "Background Research",
    linkedItems: [
      { type: "person", id: "p2", name: "Jack Ruby" },
      { type: "document", id: "d6", name: "FBI File - Ruby Associates" }
    ]
  },
  {
    id: "n4",
    title: "Chain of Custody - Kennedy's Body",
    content: "There appear to be irregularities in the chain of custody for President Kennedy's body after Parkland Hospital. The casket was transported without standard protocols being followed. This could have implications for the reliability of the autopsy evidence.",
    date: "2023-10-16",
    category: "Evidence Issue",
    linkedItems: [
      { type: "document", id: "d7", name: "Bethesda Naval Hospital Records" },
      { type: "document", id: "d8", name: "Parkland Hospital Records" }
    ]
  },
  {
    id: "n5",
    title: "Intelligence Agency Role Review",
    content: "Both the CIA and FBI had prior knowledge of Oswald, including his time in the Soviet Union and his return to the US. Need to compile a complete timeline of their interactions with Oswald and any surveillance that may have occurred.",
    date: "2023-10-17",
    category: "Intelligence Analysis",
    linkedItems: [
      { type: "person", id: "p1", name: "Lee Harvey Oswald" },
      { type: "document", id: "d9", name: "CIA File on Oswald" },
      { type: "document", id: "d10", name: "FBI Surveillance Records" }
    ]
  }
];

const categories = [
  "Investigation Lead",
  "Witness Analysis",
  "Background Research",
  "Evidence Issue",
  "Intelligence Analysis",
  "Conspiracy Theory",
  "Timeline Discrepancy"
];

const Notes = () => {
  const [notes, setNotes] = useState(initialNotes);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    category: "Investigation Lead"
  });
  const [tempNote, setTempNote] = useState({
    title: "",
    content: "",
    category: ""
  });
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  
  // Filter notes based on search query
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const startEditingNote = (noteId: string) => {
    const note = notes.find(n => n.id === noteId);
    if (note) {
      setTempNote({
        title: note.title,
        content: note.content,
        category: note.category
      });
      setEditingNote(noteId);
    }
  };
  
  const saveEditedNote = (noteId: string) => {
    setNotes(notes.map(note => 
      note.id === noteId 
        ? { ...note, title: tempNote.title, content: tempNote.content, category: tempNote.category } 
        : note
    ));
    setEditingNote(null);
    toast.success("Note updated successfully");
  };
  
  const deleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
    toast.success("Note deleted successfully");
  };
  
  const createNewNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      const note = {
        id: `n${Date.now()}`,
        title: newNote.title,
        content: newNote.content,
        date: new Date().toISOString().split('T')[0],
        category: newNote.category,
        linkedItems: []
      };
      
      setNotes([note, ...notes]);
      setNewNote({
        title: "",
        content: "",
        category: "Investigation Lead"
      });
      setIsCreatingNote(false);
      toast.success("New note created successfully");
    } else {
      toast.error("Please provide both a title and content for the note");
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Investigation Notes</h1>
          <p className="text-muted-foreground mt-1">Document your thoughts and findings</p>
        </div>
        
        <Button onClick={() => setIsCreatingNote(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Note
        </Button>
      </div>
      
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search notes..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              <Filter className="h-4 w-4 mr-1" />
              Filter by Category
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>All Categories</DropdownMenuItem>
            {categories.map(category => (
              <DropdownMenuItem key={category}>{category}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {isCreatingNote && (
        <Card className="border-primary/20 shadow-lg animate-zoom-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Create New Note</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="new-title" className="text-sm font-medium block mb-1">
                  Title
                </label>
                <Input
                  id="new-title"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  placeholder="Note title..."
                />
              </div>
              
              <div>
                <label htmlFor="new-content" className="text-sm font-medium block mb-1">
                  Content
                </label>
                <Textarea
                  id="new-content"
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  placeholder="Enter your note content..."
                  className="min-h-[200px]"
                />
              </div>
              
              <div>
                <label htmlFor="new-category" className="text-sm font-medium block mb-1">
                  Category
                </label>
                <select
                  id="new-category"
                  value={newNote.category}
                  onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setIsCreatingNote(false)}>
                  Cancel
                </Button>
                <Button onClick={createNewNote}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Note
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.map((note, index) => (
          <Card 
            key={note.id} 
            className="overflow-hidden transition-all duration-300 hover:shadow-md"
            style={{ "--index": index } as React.CSSProperties}
          >
            <CardContent className="p-0">
              <div className="p-4">
                {editingNote === note.id ? (
                  // Editing mode
                  <div className="space-y-3 animate-fade-in">
                    <Input
                      value={tempNote.title}
                      onChange={(e) => setTempNote({ ...tempNote, title: e.target.value })}
                      className="font-medium text-lg"
                    />
                    
                    <Textarea
                      value={tempNote.content}
                      onChange={(e) => setTempNote({ ...tempNote, content: e.target.value })}
                      className="min-h-[120px]"
                    />
                    
                    <select
                      value={tempNote.category}
                      onChange={(e) => setTempNote({ ...tempNote, category: e.target.value })}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    
                    <div className="flex justify-end gap-2 pt-2">
                      <Button variant="outline" size="sm" onClick={() => setEditingNote(null)}>
                        Cancel
                      </Button>
                      <Button size="sm" onClick={() => saveEditedNote(note.id)}>
                        <Save className="h-4 w-4 mr-1" />
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  // View mode
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-lg">{note.title}</h3>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" onClick={() => startEditingNote(note.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteNote(note.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-4">
                      {note.content}
                    </p>
                    
                    <div className="pt-2">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">{note.category}</Badge>
                    </div>
                    
                    {note.linkedItems && note.linkedItems.length > 0 && (
                      <div className="pt-1">
                        <h4 className="text-xs text-muted-foreground mb-1">Connected Items:</h4>
                        <div className="flex flex-wrap gap-1">
                          {note.linkedItems.map((item, i) => (
                            <Link 
                              key={i} 
                              to={item.type === "person" ? `/persons/${item.id}` : `/documents/${item.id}`}
                              className="group"
                            >
                              <Badge 
                                variant="secondary" 
                                className="text-xs bg-secondary/50 flex items-center gap-1 hover:bg-secondary/80 transition-colors"
                              >
                                {item.type === "person" ? (
                                  <><User className="h-3 w-3" /> {item.name}</>
                                ) : (
                                  <><FileText className="h-3 w-3" /> {item.name}</>
                                )}
                              </Badge>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="bg-muted/30 px-4 py-2 flex items-center justify-between text-xs text-muted-foreground border-t border-muted/20">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{note.date}</span>
                </div>
                
                {!editingNote && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6" 
                    onClick={() => toast.success("Link feature coming soon")}
                  >
                    <LinkIcon className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredNotes.length === 0 && (
        <div className="text-center py-12 bg-muted/20 rounded-lg">
          <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No notes found. Create a new one to get started.</p>
        </div>
      )}
    </div>
  );
};

export default Notes;
