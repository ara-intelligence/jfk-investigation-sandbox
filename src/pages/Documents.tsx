
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Filter, 
  Search, 
  ChevronDown, 
  FileImage, 
  FileAudio, 
  FileLock, 
  Table,
  Grid
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Sample documents data
const documentsData = [
  { 
    id: "1", 
    title: "Warren Commission Interview: Ruby", 
    date: "April 12, 1964", 
    type: "text", 
    classification: "Public",
    category: "Interview",
    agency: "Warren Commission",
    releaseBatch: "1992 Release"
  },
  { 
    id: "2", 
    title: "Autopsy Report", 
    date: "November 22, 1963", 
    type: "text", 
    classification: "Public",
    category: "Medical",
    agency: "Bethesda Naval Hospital",
    releaseBatch: "1992 Release"
  },
  { 
    id: "3", 
    title: "CIA Memorandum RE: Oswald", 
    date: "October 10, 1963", 
    type: "text", 
    classification: "Declassified",
    category: "Intelligence",
    agency: "CIA",
    releaseBatch: "2017 Release"
  },
  { 
    id: "4", 
    title: "Dallas Police Report", 
    date: "November 23, 1963", 
    type: "text", 
    classification: "Public",
    category: "Law Enforcement",
    agency: "Dallas Police Department",
    releaseBatch: "1992 Release"
  },
  { 
    id: "5", 
    title: "Dealey Plaza Photograph #1", 
    date: "November 22, 1963", 
    type: "image", 
    classification: "Public",
    category: "Photograph",
    agency: "Civilian",
    releaseBatch: "1992 Release"
  },
  { 
    id: "6", 
    title: "Parkland Hospital Admission Records", 
    date: "November 22, 1963", 
    type: "text", 
    classification: "Public",
    category: "Medical",
    agency: "Parkland Memorial Hospital",
    releaseBatch: "1992 Release"
  },
  { 
    id: "7", 
    title: "FBI Report on Bullet Fragments", 
    date: "December 5, 1963", 
    type: "text", 
    classification: "Public",
    category: "Forensic",
    agency: "FBI",
    releaseBatch: "1992 Release"
  },
  { 
    id: "8", 
    title: "HSCA Interview: Shaw", 
    date: "March 14, 1978", 
    type: "audio", 
    classification: "Declassified",
    category: "Interview",
    agency: "HSCA",
    releaseBatch: "2017 Release"
  },
  { 
    id: "9", 
    title: "Secret Service Protocols Memo", 
    date: "November 2, 1963", 
    type: "text", 
    classification: "Declassified",
    category: "Security",
    agency: "Secret Service",
    releaseBatch: "2021 Release"
  },
  { 
    id: "10", 
    title: "Witness Testimony Compilation", 
    date: "February 17, 1964", 
    type: "text", 
    classification: "Public",
    category: "Testimony",
    agency: "Warren Commission",
    releaseBatch: "1992 Release"
  },
  { 
    id: "11", 
    title: "Motorcade Route Planning", 
    date: "November 18, 1963", 
    type: "text", 
    classification: "Declassified",
    category: "Security",
    agency: "Secret Service",
    releaseBatch: "2017 Release"
  },
  { 
    id: "12", 
    title: "Mexico City CIA Station Log", 
    date: "October 1, 1963", 
    type: "text", 
    classification: "Redacted",
    category: "Intelligence",
    agency: "CIA",
    releaseBatch: "2021 Release"
  },
];

const Documents = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter documents based on search query
  const filteredDocuments = documentsData.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.agency.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDocIcon = (type: string) => {
    switch (type) {
      case "image": return <FileImage className="h-5 w-5 text-blue-400" />;
      case "audio": return <FileAudio className="h-5 w-5 text-purple-400" />;
      case "text":
      default: return <FileText className="h-5 w-5 text-gray-400" />;
    }
  };

  const getClassificationBadge = (classification: string) => {
    switch (classification) {
      case "Declassified":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Declassified</Badge>;
      case "Redacted":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Redacted</Badge>;
      case "Public":
      default:
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Public</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Documents</h1>
          <p className="text-muted-foreground mt-1">Browse and search through case files</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant={viewMode === "grid" ? "default" : "outline"} 
            size="sm" 
            onClick={() => setViewMode("grid")}
            className="w-10 h-9 p-0"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button 
            variant={viewMode === "table" ? "default" : "outline"} 
            size="sm" 
            onClick={() => setViewMode("table")}
            className="w-10 h-9 p-0"
          >
            <Table className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search documents..."
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
            <DropdownMenuItem>All Documents</DropdownMenuItem>
            <DropdownMenuItem>Interviews</DropdownMenuItem>
            <DropdownMenuItem>Intelligence</DropdownMenuItem>
            <DropdownMenuItem>Medical</DropdownMenuItem>
            <DropdownMenuItem>Photographs</DropdownMenuItem>
            <DropdownMenuItem>Reports</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              <FileLock className="h-4 w-4 mr-1" />
              Classification
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>All</DropdownMenuItem>
            <DropdownMenuItem>Public</DropdownMenuItem>
            <DropdownMenuItem>Declassified</DropdownMenuItem>
            <DropdownMenuItem>Redacted</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Files</TabsTrigger>
          <TabsTrigger value="1992">1992 Release</TabsTrigger>
          <TabsTrigger value="2017">2017 Release</TabsTrigger>
          <TabsTrigger value="2021">2021 Release</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocuments.map((doc, index) => (
                <Link 
                  to={`/documents/${doc.id}`} 
                  key={doc.id}
                  className="group"
                  style={{ "--index": index } as React.CSSProperties}
                >
                  <Card className="h-full overflow-hidden transition-all duration-300 hover:border-primary/20 hover:shadow-lg">
                    <CardContent className="p-5 animate-enter">
                      <div className="flex justify-between items-start mb-3">
                        {getDocIcon(doc.type)}
                        {getClassificationBadge(doc.classification)}
                      </div>
                      <h3 className="font-medium text-base group-hover:text-primary transition-colors truncate">{doc.title}</h3>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-muted-foreground">{doc.date}</span>
                        <Badge variant="secondary" className="text-xs">{doc.category}</Badge>
                      </div>
                      <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
                        {doc.agency}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Document</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Agency</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Classification</th>
                  </tr>
                </thead>
                <tbody className="bg-card divide-y">
                  {filteredDocuments.map((doc) => (
                    <tr 
                      key={doc.id} 
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <Link to={`/documents/${doc.id}`} className="flex items-center">
                          {getDocIcon(doc.type)}
                          <span className="ml-2 font-medium hover:text-primary transition-colors">{doc.title}</span>
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{doc.date}</td>
                      <td className="px-6 py-4">
                        <Badge variant="secondary">{doc.category}</Badge>
                      </td>
                      <td className="px-6 py-4 text-sm">{doc.agency}</td>
                      <td className="px-6 py-4">
                        {getClassificationBadge(doc.classification)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="1992" className="mt-0">
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : ""}>
            {/* Similar content structure, filtered for 1992 releases */}
            <div className="text-center py-12">
              <p className="text-muted-foreground">Displaying 1992 Release files</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="2017" className="mt-0">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Displaying 2017 Release files</p>
          </div>
        </TabsContent>
        
        <TabsContent value="2021" className="mt-0">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Displaying 2021 Release files</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Documents;
