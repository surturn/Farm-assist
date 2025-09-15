// Authentication Service - Mock Implementation
// TODO: Replace with Supabase Auth integration

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  farmName?: string;
  location?: string;
  createdAt: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignUpData extends AuthCredentials {
  name: string;
  farmName?: string;
  location?: string;
}

// Mock user data
const mockUser: User = {
  id: 'user123',
  email: 'farmer@example.com',
  name: 'John Farmer',
  farmName: 'Green Valley Farm',
  location: 'California, USA',
  createdAt: '2024-01-15T10:30:00Z'
};

let isAuthenticated = false;

export const authService = {
  // Sign up new user
  async signUp(data: SignUpData): Promise<User> {
    // TODO: Integrate with Supabase Auth
    // TODO: Create user profile in Supabase database
    console.log('Mock signup request:', data);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate signup success
    isAuthenticated = true;
    return {
      ...mockUser,
      email: data.email,
      name: data.name,
      farmName: data.farmName,
      location: data.location
    };
  },

  // Sign in existing user
  async signIn(credentials: AuthCredentials): Promise<User> {
    // TODO: Integrate with Supabase Auth
    console.log('Mock signin request:', credentials.email);
    
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Simulate login validation
    if (credentials.email === mockUser.email) {
      isAuthenticated = true;
      return mockUser;
    } else {
      throw new Error('Invalid credentials');
    }
  },

  // Sign out user
  async signOut(): Promise<void> {
    // TODO: Clear Supabase session
    console.log('Mock signout');
    
    await new Promise(resolve => setTimeout(resolve, 300));
    isAuthenticated = false;
  },

  // Get current user
  async getCurrentUser(): Promise<User | null> {
    // TODO: Get user from Supabase session
    console.log('Mock: Getting current user');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return isAuthenticated ? mockUser : null;
  },

  // Update user profile
  async updateProfile(userId: string, updates: Partial<User>): Promise<User> {
    // TODO: Update user in Supabase database
    console.log('Mock: Updating user profile', updates);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return { ...mockUser, ...updates };
  },

  // Reset password
  async resetPassword(email: string): Promise<void> {
    // TODO: Use Supabase Auth password reset
    console.log('Mock: Password reset for', email);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  },

  // Check authentication status
  isAuthenticated(): boolean {
    // TODO: Check Supabase session
    return isAuthenticated;
  }
};