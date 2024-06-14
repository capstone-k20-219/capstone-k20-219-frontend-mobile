import React, { FC } from "react"

// modules
import { observer } from "mobx-react-lite"
import { Alert } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { SafeAreaView } from "react-native-safe-area-context"

// hooks
import { useStores } from "app/models"
import { useStripe } from "@stripe/stripe-react-native"
import { useFocusEffect } from "@react-navigation/native"

// themes
import { appStyle } from "app/theme"

interface PaymentScreenProps extends AppStackScreenProps<"Payment"> {}

export const PaymentScreen: FC<PaymentScreenProps> = observer(function PaymentScreen(props) {
  const { amount } = props.route.params
  const rootStore = useStores()
  const { initPaymentSheet, presentPaymentSheet } = useStripe()

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Pakislot",
      customerId: rootStore.billInfo.customerId,
      customerEphemeralKeySecret: rootStore.billInfo.ephemeralKey,
      paymentIntentClientSecret: rootStore.billInfo.paymentIntent,
      defaultBillingDetails: {
        email: rootStore.userInfo.email,
      },
    })
    if (!error) {
      const { error } = await presentPaymentSheet()
      if (error) {
        Alert.alert(`Error`, "Payment failed")
      } else {
        Alert.alert("Success", "Your order is confirmed!")
      }
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      console.log(amount)
      rootStore.postBillInfo({ amount })
      initializePaymentSheet()
    }, []),
  )

  return <SafeAreaView style={appStyle.rootContainer}></SafeAreaView>
})
