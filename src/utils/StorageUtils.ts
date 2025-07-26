import AsyncStorage from '@react-native-async-storage/async-storage';
import { ARFurniture } from './ARUtils';

export interface SavedDesign {
  id: string;
  name: string;
  date: string;
  thumbnail: string;
  furniture: ARFurniture[];
  roomDimensions: {
    width: number;
    height: number;
    depth: number;
  };
  description?: string;
  tags?: string[];
}

export class StorageUtils {
  static readonly DESIGNS_KEY = 'ardecor_saved_designs';
  static readonly USER_PREFERENCES_KEY = 'ardecor_user_preferences';
  static readonly FURNITURE_CATALOG_KEY = 'ardecor_furniture_catalog';

  // Save a new design
  static async saveDesign(design: SavedDesign): Promise<void> {
    try {
      const existingDesigns = await this.getSavedDesigns();
      const updatedDesigns = [...existingDesigns, design];
      await AsyncStorage.setItem(this.DESIGNS_KEY, JSON.stringify(updatedDesigns));
    } catch (error) {
      console.error('Error saving design:', error);
      throw new Error('Failed to save design');
    }
  }

  // Get all saved designs
  static async getSavedDesigns(): Promise<SavedDesign[]> {
    try {
      const designsJson = await AsyncStorage.getItem(this.DESIGNS_KEY);
      return designsJson ? JSON.parse(designsJson) : [];
    } catch (error) {
      console.error('Error loading designs:', error);
      return [];
    }
  }

  // Update an existing design
  static async updateDesign(designId: string, updatedDesign: Partial<SavedDesign>): Promise<void> {
    try {
      const designs = await this.getSavedDesigns();
      const designIndex = designs.findIndex(d => d.id === designId);
      
      if (designIndex !== -1) {
        designs[designIndex] = { ...designs[designIndex], ...updatedDesign };
        await AsyncStorage.setItem(this.DESIGNS_KEY, JSON.stringify(designs));
      }
    } catch (error) {
      console.error('Error updating design:', error);
      throw new Error('Failed to update design');
    }
  }

  // Delete a design
  static async deleteDesign(designId: string): Promise<void> {
    try {
      const designs = await this.getSavedDesigns();
      const filteredDesigns = designs.filter(d => d.id !== designId);
      await AsyncStorage.setItem(this.DESIGNS_KEY, JSON.stringify(filteredDesigns));
    } catch (error) {
      console.error('Error deleting design:', error);
      throw new Error('Failed to delete design');
    }
  }

  // Save user preferences
  static async saveUserPreferences(preferences: any): Promise<void> {
    try {
      await AsyncStorage.setItem(this.USER_PREFERENCES_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error('Error saving preferences:', error);
      throw new Error('Failed to save preferences');
    }
  }

  // Get user preferences
  static async getUserPreferences(): Promise<any> {
    try {
      const preferencesJson = await AsyncStorage.getItem(this.USER_PREFERENCES_KEY);
      return preferencesJson ? JSON.parse(preferencesJson) : {};
    } catch (error) {
      console.error('Error loading preferences:', error);
      return {};
    }
  }

  // Save furniture catalog
  static async saveFurnitureCatalog(catalog: any[]): Promise<void> {
    try {
      await AsyncStorage.setItem(this.FURNITURE_CATALOG_KEY, JSON.stringify(catalog));
    } catch (error) {
      console.error('Error saving catalog:', error);
      throw new Error('Failed to save catalog');
    }
  }

  // Get furniture catalog
  static async getFurnitureCatalog(): Promise<any[]> {
    try {
      const catalogJson = await AsyncStorage.getItem(this.FURNITURE_CATALOG_KEY);
      return catalogJson ? JSON.parse(catalogJson) : [];
    } catch (error) {
      console.error('Error loading catalog:', error);
      return [];
    }
  }

  // Clear all data
  static async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        this.DESIGNS_KEY,
        this.USER_PREFERENCES_KEY,
        this.FURNITURE_CATALOG_KEY,
      ]);
    } catch (error) {
      console.error('Error clearing data:', error);
      throw new Error('Failed to clear data');
    }
  }

  // Export designs as JSON
  static async exportDesigns(): Promise<string> {
    try {
      const designs = await this.getSavedDesigns();
      return JSON.stringify(designs, null, 2);
    } catch (error) {
      console.error('Error exporting designs:', error);
      throw new Error('Failed to export designs');
    }
  }

  // Import designs from JSON
  static async importDesigns(designsJson: string): Promise<void> {
    try {
      const designs = JSON.parse(designsJson);
      if (Array.isArray(designs)) {
        await AsyncStorage.setItem(this.DESIGNS_KEY, JSON.stringify(designs));
      } else {
        throw new Error('Invalid designs format');
      }
    } catch (error) {
      console.error('Error importing designs:', error);
      throw new Error('Failed to import designs');
    }
  }

  // Get storage usage statistics
  static async getStorageStats(): Promise<{
    designsCount: number;
    totalSize: number;
    lastBackup?: string;
  }> {
    try {
      const designs = await this.getSavedDesigns();
      const designsSize = JSON.stringify(designs).length;
      
      return {
        designsCount: designs.length,
        totalSize: designsSize,
      };
    } catch (error) {
      console.error('Error getting storage stats:', error);
      return {
        designsCount: 0,
        totalSize: 0,
      };
    }
  }
} 