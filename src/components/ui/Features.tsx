import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export const Features = () => {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.headerContainer}>
        <ThemedText style={styles.subheading}>POWERFUL FEATURES</ThemedText>
        <ThemedText type="title" style={styles.heading}>
          Everything you need to manage your business finances
        </ThemedText>
        <ThemedText style={styles.description}>
          Our comprehensive platform gives you all the tools to stay on top of your finances,
          from invoicing to expense tracking to financial reporting.
        </ThemedText>
      </View>

      <View style={styles.featuresGrid}>
        <View style={styles.featureCard}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="file-document-outline" size={24} color="#3b82f6" />
          </View>
          <ThemedText style={styles.featureTitle}>Smart Invoicing</ThemedText>
          <ThemedText style={styles.featureDescription}>
            Create professional invoices in seconds and automate payment reminders
          </ThemedText>
        </View>

        <View style={styles.featureCard}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="chart-bar" size={24} color="#3b82f6" />
          </View>
          <ThemedText style={styles.featureTitle}>Financial Reporting</ThemedText>
          <ThemedText style={styles.featureDescription}>
            Get instant access to profit & loss, cash flow, and balance sheets
          </ThemedText>
        </View>

        <View style={styles.featureCard}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="receipt" size={24} color="#3b82f6" />
          </View>
          <ThemedText style={styles.featureTitle}>Expense Tracking</ThemedText>
          <ThemedText style={styles.featureDescription}>
            Easily capture and categorize expenses with receipt scanning
          </ThemedText>
        </View>

        <View style={styles.featureCard}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="bank" size={24} color="#3b82f6" />
          </View>
          <ThemedText style={styles.featureTitle}>Bank Connections</ThemedText>
          <ThemedText style={styles.featureDescription}>
            Securely connect your bank accounts for automatic transaction import
          </ThemedText>
        </View>

        <View style={styles.featureCard}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="account-multiple" size={24} color="#3b82f6" />
          </View>
          <ThemedText style={styles.featureTitle}>Client Management</ThemedText>
          <ThemedText style={styles.featureDescription}>
            Keep client information organized and access payment history easily
          </ThemedText>
        </View>

        <View style={styles.featureCard}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="calendar-check" size={24} color="#3b82f6" />
          </View>
          <ThemedText style={styles.featureTitle}>Tax Preparation</ThemedText>
          <ThemedText style={styles.featureDescription}>
            Stay ready for tax season with organized financial records
          </ThemedText>
        </View>
      </View>

      <View style={styles.showcaseContainer}>
        <View style={styles.showcaseImageContainer}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            }}
            style={styles.showcaseImage}
            resizeMode="cover"
          />
        </View>
        
        <View style={styles.showcaseContent}>
          <ThemedText style={styles.showcaseSubheading}>STREAMLINED WORKFLOW</ThemedText>
          <ThemedText type="title" style={styles.showcaseHeading}>
            Save hours every week on financial tasks
          </ThemedText>
          
          <View style={styles.benefitsList}>
            <View style={styles.benefitItem}>
              <MaterialCommunityIcons name="check-circle" size={20} color="#3b82f6" style={styles.checkIcon} />
              <ThemedText style={styles.benefitText}>
                Automate recurring invoices and payment reminders
              </ThemedText>
            </View>
            <View style={styles.benefitItem}>
              <MaterialCommunityIcons name="check-circle" size={20} color="#3b82f6" style={styles.checkIcon} />
              <ThemedText style={styles.benefitText}>
                Track expenses on the go with our mobile app
              </ThemedText>
            </View>
            <View style={styles.benefitItem}>
              <MaterialCommunityIcons name="check-circle" size={20} color="#3b82f6" style={styles.checkIcon} />
              <ThemedText style={styles.benefitText}>
                Generate financial reports with one click
              </ThemedText>
            </View>
            <View style={styles.benefitItem}>
              <MaterialCommunityIcons name="check-circle" size={20} color="#3b82f6" style={styles.checkIcon} />
              <ThemedText style={styles.benefitText}>
                Connect with your accountant directly through the platform
              </ThemedText>
            </View>
          </View>
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
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f9ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
  showcaseContainer: {
    marginTop: 24,
  },
  showcaseImageContainer: {
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  showcaseImage: {
    width: '100%',
    height: 200,
  },
  showcaseContent: {
    paddingHorizontal: 8,
  },
  showcaseSubheading: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
    marginBottom: 8,
  },
  showcaseHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  benefitsList: {
    gap: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: {
    marginRight: 12,
  },
  benefitText: {
    fontSize: 16,
    flex: 1,
  },
});