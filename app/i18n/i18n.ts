import * as Localization from "expo-localization"
import i18n from "i18n-js"
import { I18nManager } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

// if English isn't your default language, move Translations to the appropriate language file.
import en, { Translations } from "./en"
import vn from "./vn"

i18n.fallbacks = true
/**
 * we need always include "*-US" for some valid language codes because when you change the system language,
 * the language code is the suffixed with "-US". i.e. if a device is set to English ("en"),
 * if you change to another language and then return to English language code is now "en-US".
 */
i18n.translations = { en, "en-US": en, vn }

const locales = Localization.getLocales() // This method is guaranteed to return at least one array item.
// The preferred language is the first element in the array, however, we fallback to en-US, especially for tests.
const preferredLanguage:
  | Localization.Locale
  | { languageTag: string; textDirection: "ltr" | "rtl" } = locales[0] || {
  languageTag: "en-US",
  textDirection: "ltr",
}

AsyncStorage.getItem("language").then((language) => {
  if (language) {
    i18n.locale = language
  } else {
    i18n.locale = preferredLanguage.languageTag
  }
})

// handle RTL languages
export const isRTL = preferredLanguage.textDirection === "rtl"
I18nManager.allowRTL(isRTL)
I18nManager.forceRTL(isRTL)

/**
 * Builds up valid keypaths for translations.
 */
export type TxKeyPath = RecursiveKeyOf<Translations>

// via: https://stackoverflow.com/a/65333050
type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<TObj[TKey], `${TKey}`>
}[keyof TObj & (string | number)]

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `['${TKey}']` | `.${TKey}`
  >
}[keyof TObj & (string | number)]

type RecursiveKeyOfHandleValue<TValue, Text extends string> = TValue extends any[]
  ? Text
  : TValue extends object
  ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
  : Text
