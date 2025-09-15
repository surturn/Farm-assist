// Weather Service - Mock Implementation  
// TODO: Replace with real weather API calls and Supabase integration

export interface WeatherLocation {
  latitude: number;
  longitude: number;
  city: string;
  region: string;
  country: string;
}

export interface WeatherCondition {
  id: string;
  date: string;
  temperature: {
    current: number;
    min: number;
    max: number;
    unit: 'celsius' | 'fahrenheit';
  };
  humidity: number;
  precipitation: {
    amount: number;
    probability: number;
    unit: 'mm' | 'inches';
  };
  windSpeed: number;
  windDirection: string;
  condition: string;
  description: string;
  uvIndex: number;
}

export interface WeatherPrediction {
  location: WeatherLocation;
  current: WeatherCondition;
  forecast: WeatherCondition[];
  farmingAdvice: FarmingAdvice[];
  alerts: WeatherAlert[];
}

export interface FarmingAdvice {
  id: string;
  type: 'irrigation' | 'planting' | 'harvesting' | 'protection' | 'general';
  priority: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  actionRequired: boolean;
  validUntil: string;
}

export interface WeatherAlert {
  id: string;
  type: 'frost' | 'drought' | 'flood' | 'storm' | 'hail';
  severity: 'low' | 'medium' | 'high' | 'extreme';
  title: string;
  description: string;
  startTime: string;
  endTime: string;
}

// Mock weather data
const generateMockWeather = (location: WeatherLocation): WeatherPrediction => {
  const today = new Date();
  const forecast: WeatherCondition[] = [];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    forecast.push({
      id: `day-${i}`,
      date: date.toISOString().split('T')[0],
      temperature: {
        current: Math.round(18 + Math.random() * 15),
        min: Math.round(12 + Math.random() * 8),
        max: Math.round(25 + Math.random() * 10),
        unit: 'celsius'
      },
      humidity: Math.round(40 + Math.random() * 40),
      precipitation: {
        amount: Math.random() * 10,
        probability: Math.round(Math.random() * 100),
        unit: 'mm'
      },
      windSpeed: Math.round(5 + Math.random() * 15),
      windDirection: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)],
      condition: ['sunny', 'cloudy', 'partly-cloudy', 'rainy'][Math.floor(Math.random() * 4)],
      description: 'Partly cloudy with occasional showers',
      uvIndex: Math.round(2 + Math.random() * 8)
    });
  }

  return {
    location,
    current: forecast[0],
    forecast,
    farmingAdvice: [
      {
        id: '1',
        type: 'irrigation',
        priority: 'medium',
        title: 'Optimal Irrigation Window',
        description: 'Early morning watering recommended due to low wind and moderate humidity',
        actionRequired: true,
        validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '2', 
        type: 'protection',
        priority: 'high',
        title: 'Frost Protection Needed',
        description: 'Temperature may drop below 2°C tonight. Cover sensitive crops.',
        actionRequired: true,
        validUntil: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString()
      }
    ],
    alerts: [
      {
        id: '1',
        type: 'frost',
        severity: 'medium',
        title: 'Frost Warning',
        description: 'Light frost expected in low-lying areas between 2-6 AM',
        startTime: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
        endTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString()
      }
    ]
  };
};

export const weatherService = {
  // Get current weather and forecast for location
  async getWeatherPrediction(location: WeatherLocation): Promise<WeatherPrediction> {
    // TODO: Integrate with weather API (OpenWeather, WeatherAPI, etc.)
    // TODO: Store historical data in Supabase
    console.log('Mock weather request for:', location);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return generateMockWeather(location);
  },

  // Get location coordinates from city name
  async getLocationCoordinates(cityName: string): Promise<WeatherLocation> {
    // TODO: Use geocoding API
    console.log('Mock geocoding request:', cityName);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      latitude: -34.6037 + (Math.random() - 0.5) * 2,
      longitude: -58.3816 + (Math.random() - 0.5) * 2,
      city: cityName,
      region: 'Mock Region',
      country: 'Mock Country'
    };
  },

  // Get farming advice based on current conditions
  async getFarmingAdvice(location: WeatherLocation, cropType: string): Promise<FarmingAdvice[]> {
    // TODO: Generate AI-powered advice based on weather + crop data
    console.log('Mock farming advice request:', { location, cropType });
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return [
      {
        id: '1',
        type: 'irrigation',
        priority: 'high',
        title: `${cropType} Watering Schedule`,
        description: 'Based on current humidity and temperature, increase watering frequency',
        actionRequired: true,
        validUntil: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        type: 'general',
        priority: 'medium', 
        title: 'Optimal Growth Conditions',
        description: `Current weather is favorable for ${cropType} growth. Continue regular care routine.`,
        actionRequired: false,
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
  }
};