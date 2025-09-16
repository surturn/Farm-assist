import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  CloudRain, 
  BarChart3, 
  Leaf, 
  Zap, 
  Shield, 
  TrendingUp,
  Users,
  Award,
  ArrowRight
} from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: Camera,
      title: "AI Crop Diagnosis",
      description: "Upload plant photos for instant disease identification and treatment recommendations",
      href: "/diagnosis",
      color: "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
    },
    {
      icon: CloudRain,
      title: "Weather Intelligence", 
      description: "Get precise weather forecasts and farming advice tailored to your location",
      href: "/weather",
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track crop health, yield predictions, and farm performance metrics",
      href: "/dashboard", 
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
    }
  ];

  const stats = [
    { icon: Users, label: "Active Farmers", value: "10,000+" },
    { icon: Leaf, label: "Crops Analyzed", value: "500K+" },
    { icon: Award, label: "Accuracy Rate", value: "94%" },
    { icon: TrendingUp, label: "Yield Increase", value: "23%" }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 px-4 py-2 bg-primary/10 text-primary border-primary/20">
              <Zap className="w-4 h-4 mr-2" />
              AI-Powered Agriculture
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Smart Farming with{" "}
              <span className="hero-gradient bg-clip-text text-transparent">
                AI Technology
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Revolutionize your farm with intelligent crop diagnosis, weather predictions, 
              and data-driven insights. Increase yields while reducing costs and environmental impact.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/auth">
                <Button size="lg" className="hero-gradient text-white border-0 glow-effect group">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              
              <Link to="/diagnosis">
                <Button variant="outline" size="lg">
                  Try Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="glass-card text-center">
                <Icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed to help modern farmers make smarter decisions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, description, href, color }) => (
              <Card key={title} className="glass-card hover:glow-effect transition-all duration-300 group">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {description}
                  </CardDescription>
                  <Link to={href}>
                    <Button variant="ghost" className="p-0 h-auto font-semibold text-primary group-hover:text-primary-light">
                      Learn more
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="glass-card hero-gradient border-0 text-white">
            <CardContent className="p-12">
              <Shield className="h-16 w-16 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Farm?
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                Join thousands of farmers who are already using AI to optimize their crops, 
                reduce waste, and increase profitability.
              </p>
              <Link to="/auth">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="bg-white text-primary hover:bg-accent border-0 glow-effect"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Home;