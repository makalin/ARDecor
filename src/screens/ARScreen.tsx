import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  Modal,
  ScrollView,
} from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

interface FurnitureItem {
  id: string;
  name: string;
  model: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: number;
}

const ARScreen: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isARMode, setIsARMode] = useState(false);
  const [selectedFurniture, setSelectedFurniture] = useState<FurnitureItem | null>(null);
  const [placedFurniture, setPlacedFurniture] = useState<FurnitureItem[]>([]);
  const [showControls, setShowControls] = useState(false);
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const furnitureCatalog = [
    {
      id: '1',
      name: 'Modern Sofa',
      model: 'sofa.glb',
      thumbnail: 'https://via.placeholder.com/80',
    },
    {
      id: '2',
      name: 'Coffee Table',
      model: 'table.glb',
      thumbnail: 'https://via.placeholder.com/80',
    },
    {
      id: '3',
      name: 'Dining Chair',
      model: 'chair.glb',
      thumbnail: 'https://via.placeholder.com/80',
    },
    {
      id: '4',
      name: 'Bookshelf',
      model: 'bookshelf.glb',
      thumbnail: 'https://via.placeholder.com/80',
    },
  ];

  const handleStartAR = () => {
    if (hasPermission) {
      setIsARMode(true);
      setShowControls(true);
    } else {
      Alert.alert('Permission Required', 'Camera permission is required for AR mode.');
    }
  };

  const handlePlaceFurniture = () => {
    if (selectedFurniture) {
      const newFurniture: FurnitureItem = {
        ...selectedFurniture,
        position: { x: 0, y: 0, z: -2 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: 1,
      };
      setPlacedFurniture([...placedFurniture, newFurniture]);
      setSelectedFurniture(null);
    }
  };

  const handleSaveDesign = () => {
    Alert.alert('Success', 'Your AR design has been saved!');
  };

  const handleShareDesign = () => {
    Alert.alert('Share', 'Sharing your AR design...');
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!isARMode ? (
        <View style={styles.setupContainer}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.setupHeader}
          >
            <Ionicons name="camera" size={60} color="white" />
            <Text style={styles.setupTitle}>AR Furniture Visualization</Text>
            <Text style={styles.setupSubtitle}>
              Point your camera at a flat surface to place furniture
            </Text>
          </LinearGradient>

          <View style={styles.setupContent}>
            <Text style={styles.sectionTitle}>Select Furniture</Text>
            <View style={styles.furnitureGrid}>
              {furnitureCatalog.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.furnitureItem,
                    selectedFurniture?.id === item.id && styles.selectedFurniture,
                  ]}
                  onPress={() => setSelectedFurniture(item)}
                >
                  <View style={styles.furnitureThumbnail}>
                    <Text style={styles.furnitureName}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[
                styles.startButton,
                !selectedFurniture && styles.disabledButton,
              ]}
              onPress={handleStartAR}
              disabled={!selectedFurniture}
            >
              <Text style={styles.startButtonText}>Start AR Experience</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.arContainer}>
          <Camera
            ref={cameraRef}
            style={styles.camera}
            type={cameraType}
            ratio="16:9"
          >
            <View style={styles.arOverlay}>
              {/* AR Grid and Furniture Rendering would go here */}
              <View style={styles.arGrid}>
                <Text style={styles.arInstructions}>
                  Tap to place {selectedFurniture?.name}
                </Text>
              </View>

              {/* AR Controls */}
              <View style={styles.arControls}>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => setIsARMode(false)}
                >
                  <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={handlePlaceFurniture}
                >
                  <Ionicons name="add" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={handleSaveDesign}
                >
                  <Ionicons name="save" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={handleShareDesign}
                >
                  <Ionicons name="share" size={24} color="white" />
                </TouchableOpacity>
              </View>

              {/* Furniture Catalog Overlay */}
              {showControls && (
                <View style={styles.catalogOverlay}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {furnitureCatalog.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        style={[
                          styles.catalogItem,
                          selectedFurniture?.id === item.id && styles.selectedCatalogItem,
                        ]}
                        onPress={() => setSelectedFurniture(item)}
                      >
                        <View style={styles.catalogThumbnail}>
                          <Text style={styles.catalogName}>{item.name}</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>
          </Camera>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  setupContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  setupHeader: {
    height: height * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  setupTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  setupSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  setupContent: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  furnitureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  furnitureItem: {
    width: (width - 60) / 2,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedFurniture: {
    borderWidth: 3,
    borderColor: '#007AFF',
  },
  furnitureThumbnail: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
  },
  furnitureName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  arContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  arOverlay: {
    flex: 1,
    position: 'relative',
  },
  arGrid: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arInstructions: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 8,
  },
  arControls: {
    position: 'absolute',
    top: 50,
    right: 20,
    flexDirection: 'column',
  },
  controlButton: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  catalogOverlay: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
  },
  catalogItem: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCatalogItem: {
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  catalogThumbnail: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
  },
  catalogName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});

export default ARScreen; 