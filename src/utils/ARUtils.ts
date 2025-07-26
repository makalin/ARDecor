export interface ARPosition {
  x: number;
  y: number;
  z: number;
}

export interface ARRotation {
  x: number;
  y: number;
  z: number;
}

export interface ARScale {
  x: number;
  y: number;
  z: number;
}

export interface ARFurniture {
  id: string;
  name: string;
  model: string;
  position: ARPosition;
  rotation: ARRotation;
  scale: ARScale;
  color?: string;
  material?: string;
}

export class ARUtils {
  static calculateDistance(pos1: ARPosition, pos2: ARPosition): number {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    const dz = pos1.z - pos2.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  static isValidPlacement(furniture: ARFurniture, roomDimensions: { width: number; height: number; depth: number }): boolean {
    // Check if furniture fits within room boundaries
    const margin = 0.1; // 10cm margin
    return (
      furniture.position.x >= -roomDimensions.width / 2 + margin &&
      furniture.position.x <= roomDimensions.width / 2 - margin &&
      furniture.position.z >= -roomDimensions.depth / 2 + margin &&
      furniture.position.z <= roomDimensions.depth / 2 - margin
    );
  }

  static calculateRoomArea(roomDimensions: { width: number; height: number; depth: number }): number {
    return roomDimensions.width * roomDimensions.depth;
  }

  static calculateFurnitureArea(furniture: ARFurniture): number {
    // Assuming furniture scale represents dimensions in meters
    return furniture.scale.x * furniture.scale.z;
  }

  static getRoomUtilization(furniture: ARFurniture[], roomDimensions: { width: number; height: number; depth: number }): number {
    const roomArea = this.calculateRoomArea(roomDimensions);
    const furnitureArea = furniture.reduce((total, item) => total + this.calculateFurnitureArea(item), 0);
    return (furnitureArea / roomArea) * 100;
  }

  static generateFurnitureId(): string {
    return `furniture_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static convertToMeters(pixels: number, scale: number = 0.01): number {
    return pixels * scale;
  }

  static convertToPixels(meters: number, scale: number = 100): number {
    return meters * scale;
  }
}

export const defaultRoomDimensions = {
  width: 4, // 4 meters
  height: 2.7, // 2.7 meters
  depth: 5, // 5 meters
};

export const furnitureCategories = {
  SOFAS: 'Sofas',
  TABLES: 'Tables',
  CHAIRS: 'Chairs',
  STORAGE: 'Storage',
  LIGHTING: 'Lighting',
  DECOR: 'Decor',
} as const;

export const materialTypes = {
  WOOD: 'Wood',
  METAL: 'Metal',
  FABRIC: 'Fabric',
  GLASS: 'Glass',
  PLASTIC: 'Plastic',
  LEATHER: 'Leather',
} as const; 