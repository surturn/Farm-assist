import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CloudRain, 
  Sun, 
  Cloud, 
  Wind, 
  Droplets, 
  Thermometer,
  Eye,
  MapPin,
  Search,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Clock
} from "lucide-react";
import { weatherService, type WeatherPrediction, type WeatherLocation } from "@/services/weatherService";
import { useToast } from "@/hooks/use-toast";

const WeatherPatterns = () => {
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherPrediction | null>(null);
  const { toast } = useToast();

  const handleLocationSearch = async () => {
    if (!location.trim()) {
      toast({
        title: "Location Required",
        description: "Please enter a city or location.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const coordinates = await weatherService.getLocationCoordinates(location);
      const prediction = await weatherService.getWeatherPrediction(coordinates);
      setWeatherData(prediction);
      
      toast({
        title: "Weather Data Loaded",
        description: `Updated forecast for ${coordinates.city}`
      });
    } catch (error) {
      toast({
        title: "Location Not Found",
        description: "Please try a different location.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'cloudy': return <Cloud className="h-8 w-8 text-gray-500" />;
      case 'rainy': return <CloudRain className="h-8 w-8 text-blue-500" />;
      default: return <Sun className="h-8 w-8 text-yellow-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      default: return 'border-gray-300 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'extreme': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'low': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <CloudRain className="h-10 w-10 text-primary" />
            Weather Intelligence
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get precise weather forecasts and farming recommendations tailored to your location
          </p>
        </div>

        {/* Location Search */}
        <Card className="glass-card mb-8">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="location" className="sr-only">Location</Label>
                <Input
                  id="location"
                  placeholder="Enter city, region, or coordinates..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLocationSearch()}
                />
              </div>
              <Button 
                onClick={handleLocationSearch}
                disabled={isLoading}
                className="hero-gradient text-white border-0"
              >
                {isLoading ? (
                  <Clock className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {weatherData ? (
          <div className="space-y-8">
            {/* Current Weather */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Current Weather - {weatherData.location.city}
                </CardTitle>
                <CardDescription>
                  {weatherData.location.region}, {weatherData.location.country}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    {getWeatherIcon(weatherData.current.condition)}
                    <div className="mt-2">
                      <div className="text-3xl font-bold">
                        {weatherData.current.temperature.current}°C
                      </div>
                      <div className="text-sm text-muted-foreground capitalize">
                        {weatherData.current.condition}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Temperature Range</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">{weatherData.current.temperature.min}°</span>
                      <span className="text-muted-foreground"> / </span>
                      <span className="font-medium">{weatherData.current.temperature.max}°</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Humidity</span>
                    </div>
                    <div className="text-2xl font-bold">{weatherData.current.humidity}%</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Wind className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Wind</span>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">{weatherData.current.windSpeed} km/h</div>
                      <div className="text-muted-foreground">{weatherData.current.windDirection}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weather Alerts */}
            {weatherData.alerts.length > 0 && (
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-600">
                    <AlertTriangle className="h-5 w-5" />
                    Weather Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {weatherData.alerts.map((alert) => (
                    <div key={alert.id} className={`p-4 border-l-4 rounded-r-lg ${getPriorityColor(alert.severity)}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{alert.title}</h4>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                      <div className="text-xs text-muted-foreground">
                        {new Date(alert.startTime).toLocaleDateString()} - {new Date(alert.endTime).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* 7-Day Forecast */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  7-Day Forecast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                  {weatherData.forecast.map((day) => (
                    <div key={day.id} className="text-center p-4 rounded-lg bg-accent/30">
                      <div className="text-sm font-medium mb-2">
                        {new Date(day.date).toLocaleDateString(undefined, { 
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="mb-2">
                        {getWeatherIcon(day.condition)}
                      </div>
                      <div className="text-sm">
                        <div className="font-bold">{day.temperature.max}°</div>
                        <div className="text-muted-foreground">{day.temperature.min}°</div>
                      </div>
                      <div className="flex items-center justify-center gap-1 mt-2 text-xs text-blue-600">
                        <Droplets className="h-3 w-3" />
                        {day.precipitation.probability}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Farming Advice */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Farming Recommendations
                </CardTitle>
                <CardDescription>
                  AI-generated advice based on current and forecasted conditions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {weatherData.farmingAdvice.map((advice) => (
                  <div key={advice.id} className={`p-4 border-l-4 rounded-r-lg ${getPriorityColor(advice.priority)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{advice.title}</h4>
                          <Badge variant="outline" className="capitalize text-xs">
                            {advice.type}
                          </Badge>
                          {advice.actionRequired && (
                            <Badge variant="outline" className="text-xs bg-orange-100 text-orange-600 dark:bg-orange-900/20">
                              Action Required
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{advice.description}</p>
                        <div className="text-xs text-muted-foreground">
                          Valid until: {new Date(advice.validUntil).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="glass-card">
            <CardContent className="text-center py-12">
              <div className="w-20 h-20 mx-auto bg-accent rounded-full flex items-center justify-center mb-4">
                <CloudRain className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Weather Intelligence Ready</h3>
              <p className="text-muted-foreground mb-6">
                Enter your location above to get detailed weather forecasts and farming recommendations
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WeatherPatterns;