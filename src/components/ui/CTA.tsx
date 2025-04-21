import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export const CTA = () => {
  return (
    <LinearGradient
      colors={['#2563eb', '#1e40af']}
      style={styles.container}
    >
      <View style={styles.content}>
        <ThemedText type="title" style={styles.heading}>
          Ready to streamline your financial management?
        </ThemedText>
        <ThemedText style={styles.description}>
          Join thousands of businesses that use Finstream to save time and stay on top of their finances.
          Start your 30-day free trial today, no credit card required.
        </ThemedText>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton}>
            <ThemedText style={styles.primaryButtonText}>
              Start Free Trial
            </ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton}>
            <ThemedText style={styles.secondaryButtonText}>
              <MaterialCommunityIcons name="play-circle-outline" size={16} color="white" style={styles.playIcon} />
              Watch Demo
            </ThemedText>
          </TouchableOpacity>
        </View>
        
        <View style={styles.benefitsContainer}>
          <View style={styles.benefitItem}>
            <MaterialCommunityIcons name="check-circle" size={20} color="white" style={styles.benefitIcon} />
            <ThemedText style={styles.benefitText}>No credit card required</ThemedText>
          </View>
          
          <View style={styles.benefitItem}>
            <MaterialCommunityIcons name="check-circle" size={20} color="white" style={styles.benefitIcon} />
            <ThemedText style={styles.benefitText}>Free for 30 days</ThemedText>
          </View>
          
          <View style={styles.benefitItem}>
            <MaterialCommunityIcons name="check-circle" size={20} color="white" style={styles.benefitIcon} />
            <ThemedText style={styles.benefitText}>Cancel anytime</ThemedText>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 60,
    paddingHorizontal: 16,
    marginVertical: 40,
    borderRadius: 16,
    overflow: 'hidden',
  },
  content: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#e0f2fe',
    textAlign: 'center',
    marginBottom: 32,
    maxWidth: '90%',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 32,
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 16,
  },
  primaryButton: {
    backgroundColor: 'white',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: 'white',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  playIcon: {
    marginRight: 8,
  },
  benefitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 24,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  benefitIcon: {
    marginRight: 8,
  },
  benefitText: {
    fontSize: 14,
    color: 'white',
  },
});