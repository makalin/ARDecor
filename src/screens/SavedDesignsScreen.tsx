import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface SavedDesign {
  id: string;
  name: string;
  date: string;
  thumbnail: string;
  furnitureCount: number;
  roomType: string;
}

const SavedDesignsScreen: React.FC = () => {
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([
    {
      id: '1',
      name: 'Living Room Setup',
      date: '2024-01-15',
      thumbnail: 'https://via.placeholder.com/300x200',
      furnitureCount: 5,
      roomType: 'Living Room',
    },
    {
      id: '2',
      name: 'Bedroom Design',
      date: '2024-01-10',
      thumbnail: 'https://via.placeholder.com/300x200',
      furnitureCount: 3,
      roomType: 'Bedroom',
    },
    {
      id: '3',
      name: 'Home Office',
      date: '2024-01-08',
      thumbnail: 'https://via.placeholder.com/300x200',
      furnitureCount: 4,
      roomType: 'Office',
    },
    {
      id: '4',
      name: 'Dining Area',
      date: '2024-01-05',
      thumbnail: 'https://via.placeholder.com/300x200',
      furnitureCount: 6,
      roomType: 'Dining Room',
    },
  ]);

  const handleDeleteDesign = (id: string) => {
    Alert.alert(
      'Delete Design',
      'Are you sure you want to delete this design?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setSavedDesigns(savedDesigns.filter(design => design.id !== id));
          },
        },
      ]
    );
  };

  const handleShareDesign = (design: SavedDesign) => {
    Alert.alert('Share Design', `Sharing ${design.name}...`);
  };

  const handleEditDesign = (design: SavedDesign) => {
    Alert.alert('Edit Design', `Opening ${design.name} for editing...`);
  };

  const renderDesignItem = ({ item }: { item: SavedDesign }) => (
    <View style={styles.designCard}>
      <Image source={{ uri: item.thumbnail }} style={styles.designThumbnail} />
      <View style={styles.designInfo}>
        <Text style={styles.designName}>{item.name}</Text>
        <Text style={styles.designRoomType}>{item.roomType}</Text>
        <View style={styles.designMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="calendar" size={16} color="#666" />
            <Text style={styles.metaText}>{item.date}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="cube" size={16} color="#666" />
            <Text style={styles.metaText}>{item.furnitureCount} items</Text>
          </View>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEditDesign(item)}
        >
          <Ionicons name="create" size={20} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.shareButton]}
          onPress={() => handleShareDesign(item)}
        >
          <Ionicons name="share" size={20} color="#34C759" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteDesign(item.id)}
        >
          <Ionicons name="trash" size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved Designs</Text>
        <Text style={styles.headerSubtitle}>
          Your saved AR furniture designs
        </Text>
      </View>

      {savedDesigns.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="bookmark-outline" size={80} color="#ccc" />
          <Text style={styles.emptyTitle}>No Saved Designs</Text>
          <Text style={styles.emptySubtitle}>
            Start creating AR designs to see them here
          </Text>
          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createButtonText}>Create New Design</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={savedDesigns}
          renderItem={renderDesignItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  createButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 20,
  },
  designCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  designThumbnail: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  designInfo: {
    padding: 15,
  },
  designName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  designRoomType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  designMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#f0f8ff',
  },
  shareButton: {
    backgroundColor: '#f0fff0',
  },
  deleteButton: {
    backgroundColor: '#fff0f0',
  },
});

export default SavedDesignsScreen; 