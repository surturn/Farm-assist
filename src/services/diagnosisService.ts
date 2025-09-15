// Crop Diagnosis Service - Mock Implementation
// TODO: Replace with real API calls to AI model/Supabase

export interface DiagnosisData {
  image?: File;
  cropType: string;
  location: string;
  symptoms?: string;
  growthStage?: string;
}

export interface DiagnosisResult {
  id: string;
  confidence: number;
  diagnosis: string;
  disease?: string;
  severity: 'low' | 'medium' | 'high';
  recommendations: string[];
  treatmentOptions: TreatmentOption[];
  createdAt: string;
}

export interface TreatmentOption {
  id: string;
  type: 'organic' | 'chemical' | 'cultural';
  name: string;
  description: string;
  effectiveness: number;
  cost: 'low' | 'medium' | 'high';
  timeToEffect: string;
}

// Mock diagnoses database
const mockDiagnoses: DiagnosisResult[] = [
  {
    id: '1',
    confidence: 0.92,
    diagnosis: 'Leaf Spot Disease',
    disease: 'Alternaria alternata',
    severity: 'medium',
    recommendations: [
      'Remove affected leaves immediately',
      'Improve air circulation around plants', 
      'Avoid overhead watering',
      'Apply fungicide treatment'
    ],
    treatmentOptions: [
      {
        id: '1',
        type: 'organic',
        name: 'Neem Oil Spray',
        description: 'Natural fungicide effective against leaf spot',
        effectiveness: 75,
        cost: 'low',
        timeToEffect: '7-10 days'
      },
      {
        id: '2',
        type: 'chemical',
        name: 'Copper Sulfate',
        description: 'Broad-spectrum fungicide for severe infections',
        effectiveness: 90,
        cost: 'medium',
        timeToEffect: '3-5 days'
      }
    ],
    createdAt: new Date().toISOString()
  }
];

export const diagnosisService = {
  // Analyze crop image and symptoms
  async getDiagnosis(data: DiagnosisData): Promise<DiagnosisResult> {
    // TODO: Upload image to Supabase storage
    // TODO: Send data to AI model for analysis
    // TODO: Store result in Supabase database
    
    console.log('Mock diagnosis request:', data);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Return mock diagnosis
    const mockResult: DiagnosisResult = {
      id: Math.random().toString(36).substr(2, 9),
      confidence: Math.random() * 0.3 + 0.7, // 70-100%
      diagnosis: data.symptoms ? `Suspected ${data.symptoms}` : 'Healthy Plant',
      disease: data.symptoms ? 'Unknown pathogen' : undefined,
      severity: Math.random() > 0.5 ? 'medium' : 'low',
      recommendations: [
        `Monitor ${data.cropType} plants closely`,
        'Maintain proper spacing between plants',
        'Ensure adequate drainage',
        'Regular inspection recommended'
      ],
      treatmentOptions: mockDiagnoses[0].treatmentOptions,
      createdAt: new Date().toISOString()
    };
    
    return mockResult;
  },

  // Get diagnosis history
  async getDiagnosisHistory(): Promise<DiagnosisResult[]> {
    // TODO: Fetch from Supabase database with user authentication
    console.log('Mock: Fetching diagnosis history');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockDiagnoses;
  },

  // Save diagnosis result
  async saveDiagnosis(diagnosis: DiagnosisResult): Promise<void> {
    // TODO: Save to Supabase database
    console.log('Mock: Saving diagnosis', diagnosis);
    
    await new Promise(resolve => setTimeout(resolve, 300));
  }
};