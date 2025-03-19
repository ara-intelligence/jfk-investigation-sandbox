
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Files, Clock, Users, BookOpen, AlertTriangle, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const statusItems = [
  { 
    title: "Total Documents", 
    value: "2,834", 
    icon: Files, 
    color: "text-blue-500",
    link: "/documents"
  },
  { 
    title: "Persons of Interest", 
    value: "187", 
    icon: Users, 
    color: "text-violet-500",
    link: "/persons"
  },
  { 
    title: "Timeline Events", 
    value: "426", 
    icon: Clock, 
    color: "text-amber-500",
    link: "/timeline"
  },
  { 
    title: "Investigation Notes", 
    value: "94", 
    icon: BookOpen, 
    color: "text-emerald-500",
    link: "/notes"
  },
];

const recentDocuments = [
  { id: "1", title: "Warren Commission Interview: Ruby", date: "April 12, 1964", category: "Interview" },
  { id: "2", title: "Autopsy Report", date: "November 22, 1963", category: "Medical" },
  { id: "3", title: "CIA Memorandum RE: Oswald", date: "October 10, 1963", category: "Intelligence" },
  { id: "4", title: "Dallas Police Report", date: "November 23, 1963", category: "Law Enforcement" },
];

const keyFindings = [
  "Multiple witness accounts suggest shots from the grassy knoll",
  "Timeline inconsistencies around Oswald's movements",
  "Gaps in chain of custody for critical evidence",
  "Connections between Ruby and organized crime figures"
];

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Investigation Dashboard</h1>
          <p className="text-muted-foreground mt-1">Case summary and key insights</p>
        </div>
        <Button variant="outline" className="group">
          <FileText className="h-4 w-4 mr-2 group-hover:text-primary transition-colors" />
          <span>Generate Report</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statusItems.map((item, index) => (
          <Link to={item.link} key={item.title} className="group">
            <Card className="border hover:border-primary/20 hover:shadow-lg transition-all duration-300 h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">{item.title}</CardTitle>
                  <item.icon className={`h-5 w-5 ${item.color} group-hover:scale-110 transition-transform duration-300`} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold tracking-tight">{item.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-medium flex items-center">
              <Files className="h-5 w-5 mr-2 text-primary" />
              Recent Documents
            </CardTitle>
            <CardDescription>Latest reviewed case files</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentDocuments.map((doc) => (
                <Link to={`/documents/${doc.id}`} key={doc.id}>
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                    <div>
                      <h3 className="font-medium">{doc.title}</h3>
                      <p className="text-sm text-muted-foreground">{doc.date}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium bg-secondary text-secondary-foreground px-2.5 py-0.5 rounded-full">
                        {doc.category}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4" asChild>
              <Link to="/documents">View all documents</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-medium flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
              Key Findings
            </CardTitle>
            <CardDescription>Critical investigative insights</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {keyFindings.map((finding, index) => (
                <li key={index} className="flex items-start">
                  <div className="h-2 w-2 mt-2 rounded-full bg-amber-500 mr-2" />
                  <span className="text-sm">{finding}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
