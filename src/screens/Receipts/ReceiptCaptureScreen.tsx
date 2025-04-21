import React, { useState, useEffect, useRef } from "react"
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator
} from "react-native"
import { Camera, CameraType, FlashMode } from "expo-camera"
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator"
import { Button, IconButton, Portal, Dialog, Title } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import { v4 as uuidv4 } from "uuid"

interface ReceiptCaptureScreenProps {
  route?: {
    params?: {
      onCaptureComplete?: (imageData: string, results?: any) => void
    }
  }
}

const ReceiptCaptureScreen: React.FC<ReceiptCaptureScreenProps> = ({
  route
}) => {
  const navigation = useNavigation()
  const cameraRef = useRef<Camera>(null)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [cameraType, setCameraType] = useState(CameraType.back)
  const [flashMode, setFlashMode] = useState(FlashMode.off)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [processingImage, setProcessingImage] = useState(false)
  const [processingResults, setProcessingResults] = useState<any>(null)
  const [dialogVisible, setDialogVisible] = useState(false)

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === "granted")
    })()
  }, [])

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8
        })

        // Process the image - crop, rotate, etc.
        const processedImage = await manipulateAsync(
          photo.uri,
          [{ resize: { width: 1200 } }],
          { compress: 0.8, format: SaveFormat.JPEG }
        )

        setCapturedImage(processedImage.uri)
        setProcessingImage(true)

        // Simulate OCR processing
        await simulateOCRProcessing(processedImage.uri)
      } catch (error) {
        console.error("Error taking picture:", error)
        Alert.alert("Error", "Failed to take picture. Please try again.")
      }
    }
  }

  const simulateOCRProcessing = async (imageUri: string) => {
    // In a real app, this would send the image to an OCR service
    // and return the extracted text, merchant, date, amount, etc.

    // Simulate API call delay
    setTimeout(async () => {
      // Simulate receipt OCR results
      const mockResults = {
        merchant: "Office Supplies Inc.",
        date: new Date().toISOString().split("T")[0],
        total: 124.99,
        taxAmount: 10.0,
        items: [
          { description: "Printer Paper", price: 24.99, quantity: 2 },
          { description: "Ink Cartridge", price: 45.99, quantity: 1 },
          { description: "Pens", price: 9.99, quantity: 1 }
        ]
      }

      // Save receipt image to app directory
      const receiptId = uuidv4()
      const localUri =
        FileSystem.documentDirectory + `receipts/${receiptId}.jpg`

      // Create directory if it doesn't exist
      try {
        await FileSystem.makeDirectoryAsync(
          FileSystem.documentDirectory + "receipts/",
          { intermediates: true }
        )
        await FileSystem.copyAsync({ from: imageUri, to: localUri })
      } catch (error) {
        console.error("Error saving receipt:", error)
      }

      setProcessingImage(false)
      setProcessingResults(mockResults)
      setDialogVisible(true)
    }, 2000) // Simulate API delay
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8
    })

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0]
      setCapturedImage(selectedImage.uri)
      setProcessingImage(true)
      await simulateOCRProcessing(selectedImage.uri)
    }
  }

  const discardImage = () => {
    setCapturedImage(null)
    setProcessingResults(null)
  }

  const useReceipt = () => {
    setDialogVisible(false)

    // Navigate to create transaction with receipt data
    navigation.navigate("NewTransaction", {
      receipt: {
        imageUri: capturedImage,
        ...processingResults
      }
    })
  }

  const toggleCameraType = () => {
    setCameraType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    )
  }

  const toggleFlash = () => {
    setFlashMode((current) =>
      current === FlashMode.off ? FlashMode.on : FlashMode.off
    )
  }

  if (hasPermission === null) {
    return <View style={styles.container} />
  }

  if (hasPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <MaterialCommunityIcons name="camera-off" size={64} color="#999" />
        <Text style={styles.permissionText}>
          Camera access denied. Please enable camera access in your device
          settings to use this feature.
        </Text>
        <Button
          mode="contained"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          Go Back
        </Button>
      </View>
    )
  }

  if (processingImage) {
    return (
      <View style={styles.processingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.processingText}>Analyzing receipt...</Text>
      </View>
    )
  }

  if (capturedImage && !processingImage) {
    return (
      <View style={styles.previewContainer}>
        <Image source={{ uri: capturedImage }} style={styles.previewImage} />
        <View style={styles.previewButtons}>
          <Button
            icon="refresh"
            mode="outlined"
            onPress={discardImage}
            style={styles.previewButton}
          >
            Retake
          </Button>
          <Button
            icon="check"
            mode="contained"
            onPress={() => setDialogVisible(true)}
            style={styles.previewButton}
          >
            Use This Image
          </Button>
        </View>

        <Portal>
          <Dialog
            visible={dialogVisible}
            onDismiss={() => setDialogVisible(false)}
          >
            <Dialog.Title>Receipt Details</Dialog.Title>
            <Dialog.Content>
              {processingResults && (
                <>
                  <Text style={styles.receiptMerchant}>
                    {processingResults.merchant}
                  </Text>
                  <Text style={styles.receiptDate}>
                    {processingResults.date}
                  </Text>
                  <Text style={styles.receiptTotal}>
                    Total: ${processingResults.total.toFixed(2)}
                  </Text>
                </>
              )}
              <Text style={styles.confirmText}>
                Would you like to create a transaction with this receipt?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setDialogVisible(false)}>Cancel</Button>
              <Button onPress={useReceipt}>Create Transaction</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={cameraType}
        flashMode={flashMode}
      >
        <View style={styles.buttonContainer}>
          <View style={styles.topButtonRow}>
            <IconButton
              icon="close"
              iconColor="white"
              size={30}
              onPress={() => navigation.goBack()}
            />
            <IconButton
              icon={flashMode === FlashMode.on ? "flash" : "flash-off"}
              iconColor="white"
              size={30}
              onPress={toggleFlash}
            />
          </View>

          <View style={styles.overlayGuide}>
            <View style={styles.receiptOutline} />
          </View>

          <View style={styles.bottomButtonRow}>
            <TouchableOpacity style={styles.galleryButton} onPress={pickImage}>
              <MaterialCommunityIcons name="image" size={30} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePicture}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.flipButton}
              onPress={toggleCameraType}
            >
              <MaterialCommunityIcons
                name="camera-flip"
                size={30}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  camera: {
    flex: 1
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "transparent",
    justifyContent: "space-between"
  },
  topButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20
  },
  overlayGuide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  receiptOutline: {
    width: "80%",
    height: "80%",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 8,
    borderStyle: "dashed"
  },
  bottomButtonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 30
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 6,
    borderColor: "white",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center"
  },
  captureButtonInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white"
  },
  flipButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50
  },
  galleryButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  permissionText: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 30
  },
  backButton: {
    marginTop: 20
  },
  processingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  processingText: {
    marginTop: 20,
    fontSize: 16
  },
  previewContainer: {
    flex: 1
  },
  previewImage: {
    flex: 1
  },
  previewButtons: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  previewButton: {
    flex: 1,
    marginHorizontal: 5
  },
  receiptMerchant: {
    fontSize: 16,
    fontWeight: "bold"
  },
  receiptDate: {
    marginVertical: 8
  },
  receiptTotal: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16
  },
  confirmText: {
    marginTop: 8
  }
})

export default ReceiptCaptureScreen
