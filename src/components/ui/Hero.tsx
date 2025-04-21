import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export const Hero = () => {
  return (
    <LinearGradient
      colors={['#2563eb', '#1e40af']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <ThemedText type="title" style={styles.title}>
            Simplify Your Business Finances
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            FinanceFlow helps small businesses manage accounting, invoicing,
            and expenses all in one place. Save time and focus on growing your
            business.
          </ThemedText>
          
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.primaryButton}>
              <ThemedText style={styles.primaryButtonText}>
                Start Free 30-Day Trial
              </ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryButton}>
              <ThemedText style={styles.secondaryButtonText}>
                Watch Demo
              </ThemedText>
            </TouchableOpacity>
          </View>
          
          <View style={styles.infoRow}>
            <ThemedText style={styles.infoText}>No credit card required</ThemedText>
            <ThemedText style={styles.infoText}> • </ThemedText>
            <ThemedText style={styles.infoText}>Cancel anytime</ThemedText>
          </View>
        </View>
        
        <View style={styles.imageContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
              }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>
      
      <View style={styles.featuresContainer}>
        <View style={styles.featureItem}>
          <View style={styles.featureIconContainer}>
            <MaterialCommunityIcons name="chart-line" size={24} color="white" />
          </View>
          <View style={styles.featureTextContainer}>
            <ThemedText style={styles.featureTitle}>Real-time Reports</ThemedText>
            <ThemedText style={styles.featureDescription}>
              Get instant insights into your business performance with
              customizable reports.
            </ThemedText>
          </View>
        </View>
        
        <View style={styles.featureItem}>
          <View style={styles.featureIconContainer}>
            <MaterialCommunityIcons name="credit-card" size={24} color="white" />
          </View>
          <View style={styles.featureTextContainer}>
            <ThemedText style={styles.featureTitle}>Seamless Payments</ThemedText>
            <ThemedText style={styles.featureDescription}>
              Accept payments online and reconcile them automatically with
              your books.
            </ThemedText>
          </View>
        </View>
        
        <View style={styles.featureItem}>
          <View style={styles.featureIconContainer}>
            <Feather name="clock" size={24} color="white" />
          </View>
          <View style={styles.featureTextContainer}>
            <ThemedText style={styles.featureTitle}>Time-Saving</ThemedText>
            <ThemedText style={styles.featureDescription}>
              Automate repetitive tasks and save hours on financial
              management.
            </ThemedText>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 40,
    paddingHorizontal: 16,
  },
  content: {
    flexDirection: 'column',
  },
  textContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#e0f2fe',
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: '#2563eb',
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  secondaryButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
  },
  infoText: {
    color: '#e0f2fe',
    fontSize: 14,
  },
  imageContainer: {
    marginVertical: 24,
  },
  imageWrapper: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 6,
  },
  featuresContainer: {
    marginTop: 32,
    gap: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  featureIconContainer: {
    backgroundColor: '#3b82f6',
    padding: 10,
    borderRadius: 20,
    marginRight: 16,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    color: 'white',
  },
  featureDescription: {
    color: '#e0f2fe',
    fontSize: 14,
  },
});