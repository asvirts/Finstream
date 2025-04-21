import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export const Testimonials = () => {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.headerContainer}>
        <ThemedText style={styles.subheading}>TESTIMONIALS</ThemedText>
        <ThemedText type="title" style={styles.heading}>
          Trusted by businesses worldwide
        </ThemedText>
        <ThemedText style={styles.description}>
          See what our customers are saying about how Finstream has transformed their financial management.
        </ThemedText>
      </View>

      <View style={styles.testimonialsContainer}>
        <View style={styles.testimonialCard}>
          <View style={styles.ratingContainer}>
            <MaterialCommunityIcons name="star" size={20} color="#FBBF24" />
            <MaterialCommunityIcons name="star" size={20} color="#FBBF24" />
            <MaterialCommunityIcons name="star" size={20} color="#FBBF24" />
            <MaterialCommunityIcons name="star" size={20} color="#FBBF24" />
            <MaterialCommunityIcons name="star" size={20} color="#FBBF24" />
          </View>
          
          <ThemedText style={styles.testimonialText}>
            "Finstream has completely transformed how we manage our finances. The invoicing system alone has saved us hours every week, and the financial reports give us clear insights into our business performance."
          </ThemedText>
          
          <View style={styles.testimonialAuthor}>
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/women/45.jpg' }}
              style={styles.authorImage}
            />
            <View>
              <ThemedText style={styles.authorName}>Sarah Johnson</ThemedText>
              <ThemedText style={styles.authorRole}>CEO, Brightline Design</ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.testimonialCard}>
          <View style={styles.ratingContainer}>
            <MaterialCommunityIcons name="star" size={20} color="#FBBF24" />
            <MaterialCommunityIcons name="star" size={20} color="#FBBF24" />
            <MaterialCommunityIcons name="star" size={20} color="#FBBF24" />
            <MaterialCommunityIcons name="star" size={20} color="#FBBF24" />
            <MaterialCommunityIcons name="star" size={20} color="#FBBF24" />
          </View>
          
          <ThemedText style={styles.testimonialText}>
            "As a freelancer, keeping track of my finances used to be a nightmare. Finstream makes it easy to send professional invoices, track my expenses, and prepare for tax season. It's a game-changer!"
          </ThemedText>
          
          <View style={styles.testimonialAuthor}>
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
              style={styles.authorImage}
            />
            <View>
              <ThemedText style={styles.authorName}>Michael Rodriguez</ThemedText>
              <ThemedText style={styles.authorRole}>Independent Consultant</ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.testimonialCard}>
          <View style={styles.ratingContainer}>
            <MaterialCommunityIcons name="star" size={20} color="#FBBF24" />
            <MaterialCommunityIcons name="star" size={20} color="#FBBF24" />
            <MaterialCommunityIcons name="star" size={20} color="#FBBF24" />
            <MaterialCommunityIcons name="star" size={20} color="#FBBF24" />
            <MaterialCommunityIcons name="star" size={20} color="#FBBF24" />
          </View>
          
          <ThemedText style={styles.testimonialText}>
            "The bank connection feature saves us so much time. Transactions are automatically categorized, and our books are always up to date. The customer support team is also incredibly responsive and helpful."
          </ThemedText>
          
          <View style={styles.testimonialAuthor}>
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/women/68.jpg' }}
              style={styles.authorImage}
            />
            <View>
              <ThemedText style={styles.authorName}>Jennifer Lee</ThemedText>
              <ThemedText style={styles.authorRole}>CFO, Tech Innovators</ThemedText>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBlock}>
          <ThemedText style={styles.statNumber}>10,000+</ThemedText>
          <ThemedText style={styles.statLabel}>Active Users</ThemedText>
        </View>
        
        <View style={styles.statBlock}>
          <ThemedText style={styles.statNumber}>$500M+</ThemedText>
          <ThemedText style={styles.statLabel}>Invoices Processed</ThemedText>
        </View>
        
        <View style={styles.statBlock}>
          <ThemedText style={styles.statNumber}>98%</ThemedText>
          <ThemedText style={styles.statLabel}>Customer Satisfaction</ThemedText>
        </View>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 40,
    paddingHorizontal: 16,
    backgroundColor: '#f8fafc',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  subheading: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
    marginBottom: 8,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 16,
    maxWidth: '80%',
  },
  testimonialsContainer: {
    marginBottom: 40,
  },
  testimonialCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  testimonialText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  testimonialAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  authorName: {
    fontWeight: '600',
    fontSize: 16,
  },
  authorRole: {
    fontSize: 14,
    opacity: 0.7,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  statBlock: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
});