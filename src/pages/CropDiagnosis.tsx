import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Camera, 
  Upload, 
  Loader2, 
  CheckCircle, 
  AlertTriangle, 
  Leaf,
  MapPin,
  Clock,
  TrendingUp,
  Shield
} from "lucide-react";
import { diagnosisService, type DiagnosisData, type DiagnosisResult } from "@/services/diagnosisService";
import { useToast } from "@/hooks/use-toast";

const CropDiagnosis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
  const [formData, setFormData] = useState<Omit<DiagnosisData, 'image'>>({
    cropType: '',
    location: '',
    symptoms: '',
    growthStage: ''
  });
  const { toast } = useToast();

  const cropTypes = [
    "Wheat", "Corn", "Rice", "Soybeans", "Tomatoes", "Potatoes", 
    "Lettuce", "Carrots", "Peppers", "Beans", "Other"
  ];

  const growthStages = [
    "Seedling", "Vegetative", "Flowering", "Fruiting", "Maturity"
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDiagnosis = async () => {
    if (!selectedImage || !formData.cropType || !formData.location) {
      toast({
        title: "Missing Information",
        description: "Please upload an image and fill in the required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const diagnosisData: DiagnosisData = {
        ...formData,
        image: selectedImage
      };
      
      const result = await diagnosisService.getDiagnosis(diagnosisData);
      setDiagnosisResult(result);
      
      toast({
        title: "Diagnosis Complete",
        description: "Your crop analysis is ready!"
      });
    } catch (error) {
      toast({
        title: "Analysis Failed", 
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Camera className="h-10 w-10 text-primary" />
            Crop Diagnosis
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload a photo of your crop for AI-powered disease identification and treatment recommendations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload & Analyze
              </CardTitle>
              <CardDescription>
                Provide plant photo and basic information for accurate diagnosis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Image Upload */}
              <div className="space-y-3">
                <Label htmlFor="image">Plant Photo *</Label>
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                  {imagePreview ? (
                    <div className="space-y-3">
                      <img 
                        src={imagePreview} 
                        alt="Plant preview" 
                        className="max-h-48 mx-auto rounded-lg object-cover"
                      />
                      <Button variant="outline" onClick={() => {
                        setSelectedImage(null);
                        setImagePreview(null);
                      }}>
                        Change Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Camera className="h-12 w-12 mx-auto text-muted-foreground" />
                      <div>
                        <p className="font-medium">Click to upload plant photo</p>
                        <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB</p>
                      </div>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Button 
                        variant="outline" 
                        onClick={() => document.getElementById('image')?.click()}
                      >
                        Choose File
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cropType">Crop Type *</Label>
                  <Select 
                    value={formData.cropType} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, cropType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select crop type" />
                    </SelectTrigger>
                    <SelectContent>
                      {cropTypes.map(crop => (
                        <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="growthStage">Growth Stage</Label>
                  <Select 
                    value={formData.growthStage} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, growthStage: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select growth stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {growthStages.map(stage => (
                        <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g. California, USA or zip code"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="symptoms">Observed Symptoms</Label>
                <Textarea
                  id="symptoms"
                  placeholder="Describe any visible issues (yellowing, spots, wilting, etc.)"
                  value={formData.symptoms}
                  onChange={(e) => setFormData(prev => ({ ...prev, symptoms: e.target.value }))}
                  rows={3}
                />
              </div>

              <Button 
                onClick={handleDiagnosis}
                disabled={isLoading}
                className="w-full hero-gradient text-white border-0 glow-effect"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Leaf className="mr-2 h-5 w-5" />
                    Analyze Crop
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Diagnosis Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {diagnosisResult ? (
                <div className="space-y-6">
                  {/* Confidence & Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Analysis Complete</span>
                    </div>
                    <Badge variant="outline">
                      {Math.round(diagnosisResult.confidence * 100)}% Confidence
                    </Badge>
                  </div>

                  <Separator />

                  {/* Main Diagnosis */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold">{diagnosisResult.diagnosis}</h3>
                    {diagnosisResult.disease && (
                      <p className="text-muted-foreground">
                        <strong>Pathogen:</strong> {diagnosisResult.disease}
                      </p>
                    )}
                    <Badge className={getSeverityColor(diagnosisResult.severity)}>
                      {diagnosisResult.severity.toUpperCase()} Severity
                    </Badge>
                  </div>

                  <Separator />

                  {/* Recommendations */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Recommendations
                    </h4>
                    <ul className="space-y-2">
                      {diagnosisResult.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  {/* Treatment Options */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">Treatment Options</h4>
                    <div className="space-y-3">
                      {diagnosisResult.treatmentOptions.map((treatment) => (
                        <div key={treatment.id} className="p-4 border rounded-lg space-y-2">
                          <div className="flex items-center justify-between">
                            <h5 className="font-medium">{treatment.name}</h5>
                            <Badge variant="outline" className="capitalize">
                              {treatment.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{treatment.description}</p>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-4">
                              <span>Effectiveness: {treatment.effectiveness}%</span>
                              <span>Cost: {treatment.cost}</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {treatment.timeToEffect}
                            </div>
                          </div>
                          <Progress value={treatment.effectiveness} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <div className="w-20 h-20 mx-auto bg-accent rounded-full flex items-center justify-center">
                    <Leaf className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Ready for Analysis</h3>
                    <p className="text-muted-foreground">
                      Upload a plant photo and fill in the form to get started
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CropDiagnosis;