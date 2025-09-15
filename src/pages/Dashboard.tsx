import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Leaf, 
  Droplets, 
  Sun,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Camera,
  CloudRain,
  DollarSign,
  Users
} from "lucide-react";
import { diagnosisService, type DiagnosisResult } from "@/services/diagnosisService";
import { weatherService, type WeatherPrediction } from "@/services/weatherService";

const Dashboard = () => {
  const [recentDiagnoses, setRecentDiagnoses] = useState<DiagnosisResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Load recent diagnoses - in real app this would be user-specific
        const diagnoses = await diagnosisService.getDiagnosisHistory();
        setRecentDiagnoses(diagnoses);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const farmMetrics = [
    {
      title: "Total Crops Analyzed",
      value: "127",
      change: "+23%",
      trend: "up",
      icon: Camera,
      color: "text-blue-600"
    },
    {
      title: "Healthy Plants",
      value: "89%",
      change: "+5%", 
      trend: "up",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Issues Detected",
      value: "14",
      change: "-12%",
      trend: "down", 
      icon: AlertTriangle,
      color: "text-orange-600"
    },
    {
      title: "Treatment Success",
      value: "92%",
      change: "+8%",
      trend: "up",
      icon: TrendingUp,
      color: "text-purple-600"
    }
  ];

  const weatherSummary = {
    location: "Your Farm Location",
    temperature: "24°C",
    condition: "Partly Cloudy",
    humidity: "68%",
    precipitation: "15%",
    advice: "Optimal conditions for morning watering"
  };

  const upcomingTasks = [
    {
      id: "1",
      title: "Apply Neem Oil Treatment",
      crop: "Tomatoes - Section A", 
      priority: "high",
      dueDate: "Today, 6:00 AM",
      status: "pending"
    },
    {
      id: "2",
      title: "Inspect Bean Plants",
      crop: "Green Beans - Section B",
      priority: "medium", 
      dueDate: "Tomorrow, 8:00 AM",
      status: "scheduled"
    },
    {
      id: "3",
      title: "Harvest Analysis",
      crop: "Wheat - Field 1",
      priority: "low",
      dueDate: "Next Week",
      status: "scheduled"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <Leaf className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <BarChart3 className="h-10 w-10 text-primary" />
            Farm Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Monitor your farm's health, track progress, and manage tasks from one central location
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {farmMetrics.map((metric) => (
            <Card key={metric.title} className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {metric.title}
                    </p>
                    <p className="text-3xl font-bold">{metric.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-accent ${metric.color}`}>
                    <metric.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-green-600 mr-1" />
                  )}
                  <span className="text-sm font-medium text-green-600">
                    {metric.change}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">
                    vs last month
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Weather Summary */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="h-5 w-5" />
                Today's Weather
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{weatherSummary.temperature}</p>
                  <p className="text-muted-foreground">{weatherSummary.condition}</p>
                </div>
                <Sun className="h-12 w-12 text-yellow-500" />
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    Humidity
                  </span>
                  <span className="font-medium">{weatherSummary.humidity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm">
                    <CloudRain className="h-4 w-4 text-blue-500" />
                    Precipitation
                  </span>
                  <span className="font-medium">{weatherSummary.precipitation}</span>
                </div>
              </div>
              
              <div className="p-3 bg-accent/50 rounded-lg">
                <p className="text-sm font-medium text-primary">💡 Farm Tip</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {weatherSummary.advice}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Recent Diagnoses */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Recent Diagnoses
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentDiagnoses.length > 0 ? (
                <div className="space-y-4">
                  {recentDiagnoses.slice(0, 3).map((diagnosis) => (
                    <div key={diagnosis.id} className="flex items-center gap-3 p-3 bg-accent/30 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {diagnosis.diagnosis}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(diagnosis.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className="text-xs">
                        {Math.round(diagnosis.confidence * 100)}%
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Camera className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    No diagnoses yet. Start analyzing your crops!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Upcoming Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{task.title}</p>
                        <p className="text-xs text-muted-foreground">{task.crop}</p>
                      </div>
                      <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{task.dueDate}</span>
                      <span className="capitalize">{task.status}</span>
                    </div>
                    {task !== upcomingTasks[upcomingTasks.length - 1] && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Health Overview */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5" />
              Farm Health Overview
            </CardTitle>
            <CardDescription>
              Overall health status of your crops and fields
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Crop Health Score</span>
                  <span className="text-2xl font-bold text-green-600">89%</span>
                </div>
                <Progress value={89} className="h-3" />
                <p className="text-xs text-muted-foreground">
                  Excellent overall health across all monitored crops
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Disease Prevention</span>
                  <span className="text-2xl font-bold text-blue-600">94%</span>
                </div>
                <Progress value={94} className="h-3" />
                <p className="text-xs text-muted-foreground">
                  Strong preventive measures and early detection
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Treatment Success</span>
                  <span className="text-2xl font-bold text-purple-600">92%</span>
                </div>
                <Progress value={92} className="h-3" />
                <p className="text-xs text-muted-foreground">
                  High success rate for applied treatments
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;