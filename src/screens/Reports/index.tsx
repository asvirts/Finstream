import React, { useState, useEffect } from "react"
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native"
import {
  Text,
  Title,
  Card,
  Divider,
  ActivityIndicator,
  Button,
  List,
  Avatar,
  SegmentedButtons
} from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { LineChart, BarChart, PieChart } from "react-native-chart-kit"
import { Dimensions } from "react-native"
import { format, subMonths, subDays, startOfMonth, endOfMonth } from "date-fns"
import { formatCurrency } from "../../utils/currencyUtils"

type TimeRange = "month" | "quarter" | "year" | "custom"
type ReportType =
  | "profit-loss"
  | "balance-sheet"
  | "cash-flow"
  | "expenses"
  | "revenue"
  | "tax"

const screenWidth = Dimensions.get("window").width - 32

const ReportsScreen = () => {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<TimeRange>("month")
  const [selectedReportType, setSelectedReportType] =
    useState<ReportType>("profit-loss")
  const [reportData, setReportData] = useState<any>(null)

  useEffect(() => {
    loadReportData()
  }, [timeRange, selectedReportType])

  const loadReportData = async () => {
    setLoading(true)

    // In a real app, this would fetch report data from an API based on timeRange and reportType
    setTimeout(() => {
      const data = generateMockData()
      setReportData(data)
      setLoading(false)
    }, 1500)
  }

  const generateMockData = () => {
    const today = new Date()

    const getMonthLabels = () => {
      const labels = []
      for (let i = 5; i >= 0; i--) {
        labels.push(format(subMonths(today, i), "MMM"))
      }
      return labels
    }

    const getDayLabels = () => {
      const labels = []
      for (let i = 6; i >= 0; i--) {
        labels.push(format(subDays(today, i), "dd"))
      }
      return labels
    }

    switch (selectedReportType) {
      case "profit-loss":
        return {
          chartData: {
            labels: timeRange === "month" ? getDayLabels() : getMonthLabels(),
            datasets: [
              {
                data:
                  timeRange === "month"
                    ? [2100, 2400, 2800, 3000, 2500, 2800, 3200]
                    : [12000, 14500, 13800, 16000, 18500, 21000],
                color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
                strokeWidth: 2
              },
              {
                data:
                  timeRange === "month"
                    ? [1800, 2100, 2200, 2400, 2000, 2200, 2500]
                    : [10000, 12500, 11500, 13000, 14500, 16000],
                color: (opacity = 1) => `rgba(244, 67, 54, ${opacity})`,
                strokeWidth: 2
              }
            ],
            legend: ["Revenue", "Expenses"]
          },
          summaryData: {
            revenue: timeRange === "month" ? 18800 : 95800,
            expenses: timeRange === "month" ? 15200 : 77500,
            profit: timeRange === "month" ? 3600 : 18300,
            profitMargin: timeRange === "month" ? 19.15 : 19.1
          },
          topItems: [
            {
              name: "Software Sales",
              amount: timeRange === "month" ? 9500 : 48000
            },
            {
              name: "Consulting Services",
              amount: timeRange === "month" ? 6300 : 32000
            },
            { name: "Training", amount: timeRange === "month" ? 3000 : 15800 }
          ],
          bottomItems: [
            { name: "Rent", amount: timeRange === "month" ? 3000 : 18000 },
            { name: "Salaries", amount: timeRange === "month" ? 8000 : 42000 },
            { name: "Marketing", amount: timeRange === "month" ? 2500 : 12000 }
          ]
        }

      case "expenses":
        return {
          chartData: {
            data: [
              {
                name: "Salaries",
                amount: 42000,
                color: "#F44336",
                legendFontColor: "#7F7F7F",
                legendFontSize: 12
              },
              {
                name: "Rent",
                amount: 18000,
                color: "#2196F3",
                legendFontColor: "#7F7F7F",
                legendFontSize: 12
              },
              {
                name: "Marketing",
                amount: 12000,
                color: "#4CAF50",
                legendFontColor: "#7F7F7F",
                legendFontSize: 12
              },
              {
                name: "Software",
                amount: 8500,
                color: "#FF9800",
                legendFontColor: "#7F7F7F",
                legendFontSize: 12
              },
              {
                name: "Other",
                amount: 10000,
                color: "#9C27B0",
                legendFontColor: "#7F7F7F",
                legendFontSize: 12
              }
            ]
          },
          summaryData: {
            total: 90500,
            month: format(today, "MMMM yyyy"),
            prevMonthChange: 5.2
          },
          topItems: [
            { name: "Salaries", amount: 42000, percentage: 46.4 },
            { name: "Rent", amount: 18000, percentage: 19.9 },
            { name: "Marketing", amount: 12000, percentage: 13.3 },
            { name: "Software", amount: 8500, percentage: 9.4 },
            { name: "Other", amount: 10000, percentage: 11.0 }
          ]
        }

      case "revenue":
        return {
          chartData: {
            labels: getMonthLabels(),
            datasets: [
              {
                data: [12000, 14500, 13800, 16000, 18500, 21000],
                color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
                strokeWidth: 2
              }
            ]
          },
          summaryData: {
            total: 95800,
            month: format(today, "MMMM yyyy"),
            prevMonthChange: 13.5
          },
          topItems: [
            { name: "Software Sales", amount: 48000, percentage: 50.1 },
            { name: "Consulting Services", amount: 32000, percentage: 33.4 },
            { name: "Training", amount: 15800, percentage: 16.5 }
          ]
        }

      case "cash-flow":
        return {
          chartData: {
            labels: getMonthLabels(),
            datasets: [
              {
                data: [8000, 5000, 7500, 8200, 10000, 12400],
                color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
                strokeWidth: 2
              }
            ]
          },
          summaryData: {
            inflow: 24500,
            outflow: 18300,
            netCashFlow: 6200,
            previousNetCashFlow: 4800,
            cashOnHand: 38700,
            burnRate: 86
          }
        }

      case "balance-sheet":
        return {
          summaryData: {
            assets: 156800,
            liabilities: 62400,
            equity: 94400,
            month: format(today, "MMMM yyyy")
          },
          assets: [
            { name: "Cash and Equivalents", amount: 38700 },
            { name: "Accounts Receivable", amount: 42000 },
            { name: "Property and Equipment", amount: 68000 },
            { name: "Other Assets", amount: 8100 }
          ],
          liabilities: [
            { name: "Accounts Payable", amount: 15400 },
            { name: "Loans", amount: 32000 },
            { name: "Other Liabilities", amount: 15000 }
          ],
          equity: [
            { name: "Paid-in Capital", amount: 60000 },
            { name: "Retained Earnings", amount: 34400 }
          ]
        }

      case "tax":
        return {
          summaryData: {
            totalTaxes: 16850,
            salesTax: 5600,
            incomeTax: 8250,
            payrollTax: 3000,
            nextDueDate: "2025-04-15"
          },
          quarterly: [
            { quarter: "Q1", amount: 3900 },
            { quarter: "Q2", amount: 4150 },
            { quarter: "Q3", amount: 4300 },
            { quarter: "Q4", amount: 4500 }
          ],
          deductions: [
            { name: "Office Expenses", amount: 24000 },
            { name: "Travel", amount: 12000 },
            { name: "Equipment", amount: 18000 },
            { name: "Professional Development", amount: 8000 }
          ]
        }

      default:
        return null
    }
  }

  const renderTimeRangeSelector = () => (
    <SegmentedButtons
      value={timeRange}
      onValueChange={setTimeRange as any}
      buttons={[
        { value: "month", label: "Month" },
        { value: "quarter", label: "Quarter" },
        { value: "year", label: "Year" },
        { value: "custom", label: "Custom" }
      ]}
      style={styles.segmentedButtons}
    />
  )

  const renderReportList = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.reportTypeScroll}
    >
      <TouchableOpacity
        style={[
          styles.reportType,
          selectedReportType === "profit-loss" && styles.selectedReportType
        ]}
        onPress={() => setSelectedReportType("profit-loss")}
      >
        <MaterialCommunityIcons
          name="chart-line"
          size={24}
          color={selectedReportType === "profit-loss" ? "#2196F3" : "#757575"}
        />
        <Text
          style={[
            styles.reportTypeText,
            selectedReportType === "profit-loss" &&
              styles.selectedReportTypeText
          ]}
        >
          Profit & Loss
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.reportType,
          selectedReportType === "balance-sheet" && styles.selectedReportType
        ]}
        onPress={() => setSelectedReportType("balance-sheet")}
      >
        <MaterialCommunityIcons
          name="scale-balance"
          size={24}
          color={selectedReportType === "balance-sheet" ? "#2196F3" : "#757575"}
        />
        <Text
          style={[
            styles.reportTypeText,
            selectedReportType === "balance-sheet" &&
              styles.selectedReportTypeText
          ]}
        >
          Balance Sheet
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.reportType,
          selectedReportType === "cash-flow" && styles.selectedReportType
        ]}
        onPress={() => setSelectedReportType("cash-flow")}
      >
        <MaterialCommunityIcons
          name="cash-multiple"
          size={24}
          color={selectedReportType === "cash-flow" ? "#2196F3" : "#757575"}
        />
        <Text
          style={[
            styles.reportTypeText,
            selectedReportType === "cash-flow" && styles.selectedReportTypeText
          ]}
        >
          Cash Flow
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.reportType,
          selectedReportType === "expenses" && styles.selectedReportType
        ]}
        onPress={() => setSelectedReportType("expenses")}
      >
        <MaterialCommunityIcons
          name="chart-pie"
          size={24}
          color={selectedReportType === "expenses" ? "#2196F3" : "#757575"}
        />
        <Text
          style={[
            styles.reportTypeText,
            selectedReportType === "expenses" && styles.selectedReportTypeText
          ]}
        >
          Expenses
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.reportType,
          selectedReportType === "revenue" && styles.selectedReportType
        ]}
        onPress={() => setSelectedReportType("revenue")}
      >
        <MaterialCommunityIcons
          name="chart-bar"
          size={24}
          color={selectedReportType === "revenue" ? "#2196F3" : "#757575"}
        />
        <Text
          style={[
            styles.reportTypeText,
            selectedReportType === "revenue" && styles.selectedReportTypeText
          ]}
        >
          Revenue
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.reportType,
          selectedReportType === "tax" && styles.selectedReportType
        ]}
        onPress={() => setSelectedReportType("tax")}
      >
        <MaterialCommunityIcons
          name="file-document-outline"
          size={24}
          color={selectedReportType === "tax" ? "#2196F3" : "#757575"}
        />
        <Text
          style={[
            styles.reportTypeText,
            selectedReportType === "tax" && styles.selectedReportTypeText
          ]}
        >
          Tax
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )

  const renderProfitLossReport = () => (
    <>
      <Card style={styles.chartCard}>
        <Card.Title title="Revenue vs Expenses" />
        <Card.Content>
          <LineChart
            data={reportData.chartData}
            width={screenWidth}
            height={220}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2"
              }
            }}
            bezier
            style={styles.chart}
            yAxisLabel="$"
            yAxisSuffix=""
            fromZero
            legend={reportData.chartData.legend}
          />
        </Card.Content>
      </Card>

      <Card style={styles.summaryCard}>
        <Card.Title title="Summary" />
        <Card.Content>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Revenue</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency(reportData.summaryData.revenue)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Expenses</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency(reportData.summaryData.expenses)}
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.profitLabel}>Net Profit</Text>
            <Text style={styles.profitValue}>
              {formatCurrency(reportData.summaryData.profit)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Profit Margin</Text>
            <Text style={styles.profitValue}>
              {reportData.summaryData.profitMargin.toFixed(1)}%
            </Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.detailCard}>
        <Card.Title title="Top Revenue Sources" />
        <Card.Content>
          {reportData.topItems.map((item: any, index: number) => (
            <View key={`revenue-${index}`} style={styles.itemRow}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemAmount}>
                {formatCurrency(item.amount)}
              </Text>
            </View>
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.detailCard}>
        <Card.Title title="Top Expense Categories" />
        <Card.Content>
          {reportData.bottomItems.map((item: any, index: number) => (
            <View key={`expense-${index}`} style={styles.itemRow}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemAmount}>
                {formatCurrency(item.amount)}
              </Text>
            </View>
          ))}
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate("ReportDetail", { type: "profit-loss" })
        }
        style={styles.viewFullButton}
      >
        View Full Report
      </Button>
    </>
  )

  const renderExpensesReport = () => (
    <>
      <Card style={styles.chartCard}>
        <Card.Title
          title="Expense Breakdown"
          subtitle={reportData.summaryData.month}
        />
        <Card.Content>
          <PieChart
            data={reportData.chartData.data}
            width={screenWidth}
            height={220}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
            }}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </Card.Content>
      </Card>

      <Card style={styles.summaryCard}>
        <Card.Title title="Summary" />
        <Card.Content>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Expenses</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency(reportData.summaryData.total)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>vs Previous Month</Text>
            <Text
              style={[
                styles.changeValue,
                reportData.summaryData.prevMonthChange > 0
                  ? styles.negativeChange
                  : styles.positiveChange
              ]}
            >
              {reportData.summaryData.prevMonthChange > 0 ? "+" : ""}
              {reportData.summaryData.prevMonthChange}%
            </Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.detailCard}>
        <Card.Title title="Expense Categories" />
        <Card.Content>
          {reportData.topItems.map((item: any, index: number) => (
            <View key={`expense-${index}`} style={styles.itemRow}>
              <View style={styles.itemNameContainer}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPercentage}>
                  {item.percentage.toFixed(1)}%
                </Text>
              </View>
              <Text style={styles.itemAmount}>
                {formatCurrency(item.amount)}
              </Text>
            </View>
          ))}
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate("ReportDetail", { type: "expenses" })
        }
        style={styles.viewFullButton}
      >
        View Full Report
      </Button>
    </>
  )

  const renderRevenueReport = () => (
    <>
      <Card style={styles.chartCard}>
        <Card.Title
          title="Revenue Trends"
          subtitle={reportData.summaryData.month}
        />
        <Card.Content>
          <BarChart
            data={reportData.chartData}
            width={screenWidth}
            height={220}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
            style={styles.chart}
            yAxisLabel="$"
            verticalLabelRotation={0}
            fromZero
          />
        </Card.Content>
      </Card>

      <Card style={styles.summaryCard}>
        <Card.Title title="Summary" />
        <Card.Content>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Revenue</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency(reportData.summaryData.total)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>vs Previous Month</Text>
            <Text style={[styles.changeValue, styles.positiveChange]}>
              +{reportData.summaryData.prevMonthChange}%
            </Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.detailCard}>
        <Card.Title title="Revenue Sources" />
        <Card.Content>
          {reportData.topItems.map((item: any, index: number) => (
            <View key={`revenue-${index}`} style={styles.itemRow}>
              <View style={styles.itemNameContainer}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPercentage}>
                  {item.percentage.toFixed(1)}%
                </Text>
              </View>
              <Text style={styles.itemAmount}>
                {formatCurrency(item.amount)}
              </Text>
            </View>
          ))}
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={() => navigation.navigate("ReportDetail", { type: "revenue" })}
        style={styles.viewFullButton}
      >
        View Full Report
      </Button>
    </>
  )

  const renderCashFlowReport = () => (
    <>
      <Card style={styles.chartCard}>
        <Card.Title title="Cash Flow" />
        <Card.Content>
          <LineChart
            data={reportData.chartData}
            width={screenWidth}
            height={220}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2"
              }
            }}
            bezier
            style={styles.chart}
            yAxisLabel="$"
            fromZero
          />
        </Card.Content>
      </Card>

      <Card style={styles.summaryCard}>
        <Card.Title title="Summary" />
        <Card.Content>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Cash Inflow</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency(reportData.summaryData.inflow)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Cash Outflow</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency(reportData.summaryData.outflow)}
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.profitLabel}>Net Cash Flow</Text>
            <Text style={styles.profitValue}>
              {formatCurrency(reportData.summaryData.netCashFlow)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>vs Previous Period</Text>
            <Text
              style={[
                styles.changeValue,
                reportData.summaryData.netCashFlow >
                reportData.summaryData.previousNetCashFlow
                  ? styles.positiveChange
                  : styles.negativeChange
              ]}
            >
              {(
                ((reportData.summaryData.netCashFlow -
                  reportData.summaryData.previousNetCashFlow) /
                  reportData.summaryData.previousNetCashFlow) *
                100
              ).toFixed(1)}
              %
            </Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.summaryCard}>
        <Card.Title title="Cash Position" />
        <Card.Content>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Cash on Hand</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency(reportData.summaryData.cashOnHand)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Burn Rate (Daily)</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency(reportData.summaryData.burnRate)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Runway</Text>
            <Text style={styles.summaryValue}>
              {Math.round(
                reportData.summaryData.cashOnHand /
                  reportData.summaryData.burnRate
              )}{" "}
              days
            </Text>
          </View>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate("ReportDetail", { type: "cash-flow" })
        }
        style={styles.viewFullButton}
      >
        View Full Report
      </Button>
    </>
  )

  const renderBalanceSheetReport = () => (
    <>
      <Card style={styles.summaryCard}>
        <Card.Title
          title="Balance Sheet Summary"
          subtitle={reportData.summaryData.month}
        />
        <Card.Content>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Assets</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency(reportData.summaryData.assets)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Liabilities</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency(reportData.summaryData.liabilities)}
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.profitLabel}>Total Equity</Text>
            <Text style={styles.profitValue}>
              {formatCurrency(reportData.summaryData.equity)}
            </Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.detailCard}>
        <Card.Title title="Assets" />
        <Card.Content>
          {reportData.assets.map((item: any, index: number) => (
            <View key={`asset-${index}`} style={styles.itemRow}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemAmount}>
                {formatCurrency(item.amount)}
              </Text>
            </View>
          ))}
          <Divider style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Assets</Text>
            <Text style={styles.totalAmount}>
              {formatCurrency(reportData.summaryData.assets)}
            </Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.detailCard}>
        <Card.Title title="Liabilities" />
        <Card.Content>
          {reportData.liabilities.map((item: any, index: number) => (
            <View key={`liability-${index}`} style={styles.itemRow}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemAmount}>
                {formatCurrency(item.amount)}
              </Text>
            </View>
          ))}
          <Divider style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Liabilities</Text>
            <Text style={styles.totalAmount}>
              {formatCurrency(reportData.summaryData.liabilities)}
            </Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.detailCard}>
        <Card.Title title="Equity" />
        <Card.Content>
          {reportData.equity.map((item: any, index: number) => (
            <View key={`equity-${index}`} style={styles.itemRow}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemAmount}>
                {formatCurrency(item.amount)}
              </Text>
            </View>
          ))}
          <Divider style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Equity</Text>
            <Text style={styles.totalAmount}>
              {formatCurrency(reportData.summaryData.equity)}
            </Text>
          </View>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate("ReportDetail", { type: "balance-sheet" })
        }
        style={styles.viewFullButton}
      >
        View Full Report
      </Button>
    </>
  )

  const renderTaxReport = () => (
    <>
      <Card style={styles.summaryCard}>
        <Card.Title title="Tax Summary" />
        <Card.Content>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Taxes (Year to Date)</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency(reportData.summaryData.totalTaxes)}
            </Text>
          </View>
          <View style={styles.taxBreakdown}>
            <View style={styles.taxItem}>
              <Text style={styles.taxLabel}>Sales Tax</Text>
              <Text style={styles.taxValue}>
                {formatCurrency(reportData.summaryData.salesTax)}
              </Text>
            </View>
            <View style={styles.taxItem}>
              <Text style={styles.taxLabel}>Income Tax</Text>
              <Text style={styles.taxValue}>
                {formatCurrency(reportData.summaryData.incomeTax)}
              </Text>
            </View>
            <View style={styles.taxItem}>
              <Text style={styles.taxLabel}>Payroll Tax</Text>
              <Text style={styles.taxValue}>
                {formatCurrency(reportData.summaryData.payrollTax)}
              </Text>
            </View>
          </View>
          <View style={[styles.summaryRow, styles.nextTaxDue]}>
            <Text style={styles.summaryLabel}>Next Tax Due Date</Text>
            <Text style={styles.dueDate}>
              {format(
                new Date(reportData.summaryData.nextDueDate),
                "MMM d, yyyy"
              )}
            </Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.detailCard}>
        <Card.Title title="Quarterly Tax Payments" />
        <Card.Content>
          {reportData.quarterly.map((item: any, index: number) => (
            <View key={`quarter-${index}`} style={styles.itemRow}>
              <Text style={styles.itemName}>{item.quarter}</Text>
              <Text style={styles.itemAmount}>
                {formatCurrency(item.amount)}
              </Text>
            </View>
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.detailCard}>
        <Card.Title title="Potential Tax Deductions" />
        <Card.Content>
          {reportData.deductions.map((item: any, index: number) => (
            <View key={`deduction-${index}`} style={styles.itemRow}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemAmount}>
                {formatCurrency(item.amount)}
              </Text>
            </View>
          ))}
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={() => navigation.navigate("ReportDetail", { type: "tax" })}
        style={styles.viewFullButton}
      >
        View Full Report
      </Button>
    </>
  )

  const renderReportContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Generating report...</Text>
        </View>
      )
    }

    switch (selectedReportType) {
      case "profit-loss":
        return renderProfitLossReport()
      case "expenses":
        return renderExpensesReport()
      case "revenue":
        return renderRevenueReport()
      case "cash-flow":
        return renderCashFlowReport()
      case "balance-sheet":
        return renderBalanceSheetReport()
      case "tax":
        return renderTaxReport()
      default:
        return null
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Reports</Title>
      </View>

      {renderReportList()}

      <View style={styles.timeRangeContainer}>{renderTimeRangeSelector()}</View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderReportContent()}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  header: {
    backgroundColor: "#fff",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0"
  },
  title: {
    marginBottom: 8
  },
  reportTypeScroll: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0"
  },
  reportType: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  reportTypeText: {
    marginTop: 4,
    fontSize: 12,
    color: "#757575"
  },
  selectedReportType: {
    borderBottomWidth: 2,
    borderBottomColor: "#2196F3"
  },
  selectedReportTypeText: {
    color: "#2196F3",
    fontWeight: "bold"
  },
  timeRangeContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    marginBottom: 8
  },
  segmentedButtons: {
    marginBottom: 8
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32
  },
  chartCard: {
    marginBottom: 16,
    elevation: 1
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16
  },
  summaryCard: {
    marginBottom: 16,
    elevation: 1
  },
  detailCard: {
    marginBottom: 16,
    elevation: 1
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4
  },
  summaryLabel: {
    fontSize: 14,
    color: "#757575"
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "bold"
  },
  profitLabel: {
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "bold"
  },
  profitValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50"
  },
  divider: {
    marginVertical: 8
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6
  },
  itemName: {
    fontSize: 14
  },
  itemAmount: {
    fontSize: 14,
    fontWeight: "bold"
  },
  itemNameContainer: {
    flex: 1
  },
  itemPercentage: {
    fontSize: 12,
    color: "#757575",
    marginTop: 2
  },
  changeValue: {
    fontSize: 14,
    fontWeight: "bold"
  },
  positiveChange: {
    color: "#4CAF50"
  },
  negativeChange: {
    color: "#F44336"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 32
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold"
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold"
  },
  taxBreakdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 16
  },
  taxItem: {
    alignItems: "center",
    flex: 1
  },
  taxLabel: {
    fontSize: 12,
    color: "#757575",
    marginBottom: 4
  },
  taxValue: {
    fontSize: 14,
    fontWeight: "bold"
  },
  nextTaxDue: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0"
  },
  dueDate: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#F44336"
  },
  viewFullButton: {
    marginTop: 8,
    marginBottom: 24
  }
})

export default ReportsScreen
