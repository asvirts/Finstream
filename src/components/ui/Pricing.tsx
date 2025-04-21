import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export const Pricing = () => {
  const [annualBilling, setAnnualBilling] = useState(true);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.headerContainer}>
        <ThemedText style={styles.subheading}>PRICING</ThemedText>
        <ThemedText type="title" style={styles.heading}>
          Simple, transparent pricing
        </ThemedText>
        <ThemedText style={styles.description}>
          Choose the plan that's right for your business. All plans include a 30-day free trial.
        </ThemedText>
      </View>

      <View style={styles.billingToggleContainer}>
        <ThemedText style={[styles.billingText, !annualBilling && styles.activeBillingText]}>
          Monthly
        </ThemedText>
        <TouchableOpacity 
          style={styles.toggleContainer} 
          onPress={() => setAnnualBilling(!annualBilling)}
          activeOpacity={0.8}
        >
          <View style={[styles.toggleButton, annualBilling && styles.toggleButtonActive]} />
        </TouchableOpacity>
        <View style={styles.annualBillingContainer}>
          <ThemedText style={[styles.billingText, annualBilling && styles.activeBillingText]}>
            Annual
          </ThemedText>
          <View style={styles.savingsBadge}>
            <ThemedText style={styles.savingsText}>Save 20%</ThemedText>
          </View>
        </View>
      </View>

      <View style={styles.plansContainer}>
        <View style={styles.planCard}>
          <ThemedText style={styles.planName}>Starter</ThemedText>
          <ThemedText style={styles.planPrice}>
            ${annualBilling ? '15' : '19'}
            <ThemedText style={styles.planPricePeriod}>/month</ThemedText>
          </ThemedText>
          {annualBilling && (
            <ThemedText style={styles.billedText}>
              Billed annually (${15 * 12})
            </ThemedText>
          )}
          <ThemedText style={styles.planDescription}>
            Perfect for freelancers and solo entrepreneurs.
          </ThemedText>
          
          <View style={styles.planFeatures}>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="check" size={18} color="#3b82f6" style={styles.featureIcon} />
              <ThemedText style={styles.featureText}>5 clients</ThemedText>
            </View>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="check" size={18} color="#3b82f6" style={styles.featureIcon} />
              <ThemedText style={styles.featureText}>Unlimited invoices</ThemedText>
            </View>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="check" size={18} color="#3b82f6" style={styles.featureIcon} />
              <ThemedText style={styles.featureText}>Expense tracking</ThemedText>
            </View>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="check" size={18} color="#3b82f6" style={styles.featureIcon} />
              <ThemedText style={styles.featureText}>Basic reports</ThemedText>
            </View>
          </View>
          
          <TouchableOpacity style={styles.planButton}>
            <ThemedText style={styles.planButtonText}>Choose Plan</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={[styles.planCard, styles.planCardFeatured]}>
          <View style={styles.popularBadge}>
            <ThemedText style={styles.popularText}>Most Popular</ThemedText>
          </View>
          <ThemedText style={styles.planName}>Professional</ThemedText>
          <ThemedText style={styles.planPrice}>
            ${annualBilling ? '39' : '49'}
            <ThemedText style={styles.planPricePeriod}>/month</ThemedText>
          </ThemedText>
          {annualBilling && (
            <ThemedText style={styles.billedText}>
              Billed annually (${39 * 12})
            </ThemedText>
          )}
          <ThemedText style={styles.planDescription}>
            Ideal for small businesses and growing teams.
          </ThemedText>
          
          <View style={styles.planFeatures}>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="check" size={18} color="#3b82f6" style={styles.featureIcon} />
              <ThemedText style={styles.featureText}>Unlimited clients</ThemedText>
            </View>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="check" size={18} color="#3b82f6" style={styles.featureIcon} />
              <ThemedText style={styles.featureText}>Unlimited invoices & estimates</ThemedText>
            </View>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="check" size={18} color="#3b82f6" style={styles.featureIcon} />
              <ThemedText style={styles.featureText}>Recurring invoices</ThemedText>
            </View>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="check" size={18} color="#3b82f6" style={styles.featureIcon} />
              <ThemedText style={styles.featureText}>Advanced reports</ThemedText>
            </View>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="check" size={18} color="#3b82f6" style={styles.featureIcon} />
              <ThemedText style={styles.featureText}>Team access (3 users)</ThemedText>
            </View>
          </View>
          
          <TouchableOpacity style={[styles.planButton, styles.featuredButton]}>
            <ThemedText style={[styles.planButtonText, styles.featuredButtonText]}>Choose Plan</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.planCard}>
          <ThemedText style={styles.planName}>Business</ThemedText>
          <ThemedText style={styles.planPrice}>
            ${annualBilling ? '79' : '99'}
            <ThemedText style={styles.planPricePeriod}>/month</ThemedText>
          </ThemedText>
          {annualBilling && (
            <ThemedText style={styles.billedText}>
              Billed annually (${79 * 12})
            </ThemedText>
          )}
          <ThemedText style={styles.planDescription}>
            Complete solution for larger businesses.
          </ThemedText>
          
          <View style={styles.planFeatures}>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="check" size={18} color="#3b82f6" style={styles.featureIcon} />
              <ThemedText style={styles.featureText}>Everything in Professional</ThemedText>
            </View>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="check" size={18} color="#3b82f6" style={styles.featureIcon} />
              <ThemedText style={styles.featureText}>Custom branding</ThemedText>
            </View>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="check" size={18} color="#3b82f6" style={styles.featureIcon} />
              <ThemedText style={styles.featureText}>Unlimited team access</ThemedText>
            </View>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="check" size={18} color="#3b82f6" style={styles.featureIcon} />
              <ThemedText style={styles.featureText}>Priority support</ThemedText>
            </View>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons name="check" size={18} color="#3b82f6" style={styles.featureIcon} />
              <ThemedText style={styles.featureText}>API access</ThemedText>
            </View>
          </View>
          
          <TouchableOpacity style={styles.planButton}>
            <ThemedText style={styles.planButtonText}>Choose Plan</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.enterpriseContainer}>
        <ThemedText style={styles.enterpriseHeading}>
          Need a custom solution for your enterprise?
        </ThemedText>
        <ThemedText style={styles.enterpriseDescription}>
          Our enterprise plan offers custom features, dedicated support, and flexible billing options.
        </ThemedText>
        <TouchableOpacity style={styles.enterpriseButton}>
          <ThemedText style={styles.enterpriseButtonText}>Contact Sales</ThemedText>
        </TouchableOpacity>
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
  billingToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  toggleContainer: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e2e8f0',
    padding: 2,
    marginHorizontal: 12,
  },
  toggleButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleButtonActive: {
    transform: [{ translateX: 22 }],
  },
  billingText: {
    fontSize: 14,
    opacity: 0.6,
  },
  activeBillingText: {
    opacity: 1,
    fontWeight: '600',
  },
  annualBillingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  savingsBadge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  savingsText: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '600',
  },
  plansContainer: {
    marginBottom: 40,
  },
  planCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  planCardFeatured: {
    borderColor: '#3b82f6',
    borderWidth: 2,
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    right: 24,
    backgroundColor: '#3b82f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  popularText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  planName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  planPricePeriod: {
    fontSize: 16,
    fontWeight: 'normal',
    opacity: 0.7,
  },
  billedText: {
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 12,
  },
  planDescription: {
    fontSize: 16,
    opacity: 0.8,
    marginBottom: 20,
  },
  planFeatures: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    marginRight: 10,
  },
  featureText: {
    fontSize: 14,
  },
  planButton: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  planButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  featuredButton: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  featuredButtonText: {
    color: 'white',
  },
  enterpriseContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  enterpriseHeading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  enterpriseDescription: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
    opacity: 0.8,
    maxWidth: '90%',
  },
  enterpriseButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3b82f6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  enterpriseButtonText: {
    color: '#3b82f6',
    fontWeight: '600',
  },
});