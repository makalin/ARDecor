import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface FurnitureItem {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
}

const CatalogScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  const categories = ['All', 'Sofas', 'Tables', 'Chairs', 'Storage', 'Lighting'];

  const furnitureData: FurnitureItem[] = [
    {
      id: '1',
      name: 'Modern L-Shaped Sofa',
      category: 'Sofas',
      price: 1299,
      rating: 4.5,
      image: 'https://via.placeholder.com/300x200',
      description: 'Comfortable L-shaped sofa perfect for modern living rooms',
      dimensions: { width: 280, height: 85, depth: 180 },
    },
    {
      id: '2',
      name: 'Glass Coffee Table',
      category: 'Tables',
      price: 299,
      rating: 4.2,
      image: 'https://via.placeholder.com/300x200',
      description: 'Elegant glass coffee table with metal frame',
      dimensions: { width: 120, height: 45, depth: 60 },
    },
    {
      id: '3',
      name: 'Ergonomic Office Chair',
      category: 'Chairs',
      price: 199,
      rating: 4.7,
      image: 'https://via.placeholder.com/300x200',
      description: 'Comfortable office chair with adjustable features',
      dimensions: { width: 65, height: 120, depth: 70 },
    },
    {
      id: '4',
      name: 'Bookshelf Unit',
      category: 'Storage',
      price: 449,
      rating: 4.3,
      image: 'https://via.placeholder.com/300x200',
      description: 'Large bookshelf with multiple compartments',
      dimensions: { width: 180, height: 200, depth: 40 },
    },
    {
      id: '5',
      name: 'Floor Lamp',
      category: 'Lighting',
      price: 89,
      rating: 4.1,
      image: 'https://via.placeholder.com/300x200',
      description: 'Modern floor lamp with adjustable head',
      dimensions: { width: 30, height: 160, depth: 30 },
    },
    {
      id: '6',
      name: 'Dining Table Set',
      category: 'Tables',
      price: 599,
      rating: 4.6,
      image: 'https://via.placeholder.com/300x200',
      description: 'Complete dining table with 4 chairs',
      dimensions: { width: 150, height: 75, depth: 90 },
    },
  ];

  const filteredFurniture = furnitureData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedFurniture = [...filteredFurniture].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const renderFurnitureItem = ({ item }: { item: FurnitureItem }) => (
    <TouchableOpacity style={styles.furnitureCard}>
      <Image source={{ uri: item.image }} style={styles.furnitureImage} />
      <View style={styles.furnitureInfo}>
        <Text style={styles.furnitureName}>{item.name}</Text>
        <Text style={styles.furnitureCategory}>{item.category}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
        <Text style={styles.furniturePrice}>${item.price}</Text>
        <Text style={styles.furnitureDimensions}>
          {item.dimensions.width}W × {item.dimensions.height}H × {item.dimensions.depth}D cm
        </Text>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={20} color="white" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Furniture Catalog</Text>
        <Text style={styles.headerSubtitle}>Browse and select furniture for your space</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search furniture..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Sort by:</Text>
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => setSortBy(sortBy === 'name' ? 'price' : sortBy === 'price' ? 'rating' : 'name')}
          >
            <Text style={styles.sortText}>
              {sortBy === 'name' ? 'Name' : sortBy === 'price' ? 'Price' : 'Rating'}
            </Text>
            <Ionicons name="chevron-down" size={16} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={sortedFurniture}
        renderItem={renderFurnitureItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
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
  searchContainer: {
    padding: 20,
    backgroundColor: 'white',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 45,
    fontSize: 16,
  },
  filtersContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
  },
  selectedCategoryText: {
    color: 'white',
    fontWeight: '600',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  sortLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 10,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  sortText: {
    fontSize: 14,
    color: '#333',
    marginRight: 5,
  },
  listContainer: {
    padding: 20,
  },
  furnitureCard: {
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
    position: 'relative',
  },
  furnitureImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  furnitureInfo: {
    padding: 15,
  },
  furnitureName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  furnitureCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  furniturePrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  furnitureDimensions: {
    fontSize: 12,
    color: '#999',
  },
  addButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 40,
    height: 40,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CatalogScreen; 