import React, { FC, useState } from "react"

// modules
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle, KeyboardAvoidingView, ScrollView } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { SafeAreaView } from "react-native-safe-area-context"

// components
import { Rating, Text, AddButton, BackButton, Input, PrimaryButton } from "app/components"

// hooks
import { useForm } from "react-hook-form"
import { useStores } from "app/models"

// themes
import { appStyle, colors, typography } from "app/theme"

// interfaces
import { CommentInfo } from "app/services/comment/comment.types"

interface FeedbackScreenProps extends AppStackScreenProps<"Feedback"> {}

export const FeedbackScreen: FC<FeedbackScreenProps> = observer(function FeedbackScreen(props) {
  const rootStore = useStores()
  const [rating, setRating] = useState(0)
  const { handleSubmit, control, setValue } = useForm<CommentInfo>({
    defaultValues: {
      rating: 0,
      content: "",
      serviceId: props.route.params.id,
    },
  })

  const handleSubmitOnPress = (data: CommentInfo) => {
    console.log(data)
    rootStore.postComment(data)
  }

  return (
    <SafeAreaView style={appStyle.rootContainer}>
      <KeyboardAvoidingView style={appStyle.flexGrow1} behavior="height">
        <ScrollView contentContainerStyle={$scrollViewContainer}>
          <View style={$headerContainer}>
            <BackButton />
            <Text style={$title} tx="feedbackService" />
            <AddButton style={appStyle.opacity0} disabled />
          </View>
          <View style={$formContainer}>
            <Rating length={5} value={rating} onChange={setRating} setValue={setValue} size={55} />
            <Input
              labelTx="serviceName"
              disable={true}
              inputWrapperStyle={$inputWrapper}
              returnKeyType="next"
              blurOnSubmit={false}
              value={props.route.params.name}
            />
            <Input
              control={control}
              controlName="content"
              inputWrapperStyle={[$inputWrapper, $textAreaWrapper]}
              placeHolderTx="feedbackPlaceholder"
              multiline
              textAlignVertical="top"
            />
            <PrimaryButton
              titleTx="confirm"
              style={$button}
              titleStyle={$buttonText}
              onPress={handleSubmit(handleSubmitOnPress)}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
})

const $headerContainer: ViewStyle = {
  paddingTop: 35,
  paddingBottom: 25,
  paddingHorizontal: 16,
  backgroundColor: colors.palette.primary100,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const $formContainer: ViewStyle = {
  paddingHorizontal: 20,
  paddingTop: 40,
  alignItems: "center",
  rowGap: 30,
  borderWidth: 1,
  borderColor: colors.black,
  borderRadius: 5,
  paddingBottom: 40,
  marginHorizontal: 18,
}

const $scrollViewContainer: ViewStyle = {
  flexGrow: 1,
  rowGap: 40,
}

const $title: TextStyle = {
  fontFamily: typography.fonts.rubik.bold,
  fontSize: 32,
  lineHeight: 36,
  color: colors.white,
  textAlign: "center",
}

const $inputWrapper: ViewStyle = {
  borderWidth: 1,
  borderRadius: 5,
  borderColor: colors.palette.neutral300,
  backgroundColor: colors.palette.neutral400,
  width: "100%",
}

const $textAreaWrapper: ViewStyle = {
  height: 180,
  backgroundColor: colors.white,
}

const $buttonText: TextStyle = {
  fontFamily: typography.fonts.rubik.regular,
  fontSize: 24,
  lineHeight: 28,
}

const $button: ViewStyle = {
  marginTop: 5,
  height: 50,
  borderRadius: 10,
  width: "100%",
}
