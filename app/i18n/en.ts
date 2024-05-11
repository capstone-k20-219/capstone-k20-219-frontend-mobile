const en = {
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
  },
  emailOrPhone: "Email or phone number",
  password: "Password",
  login: "Login",
  forgotPassword: "Forgot password?",
  dontHaveAccount: "Don't have an account? ",
  signUp: "Sign up",
  continue: "Continue",
  skipForNow: "Skip for now",
  done: "Done",
  createAccountSuccess: "Your account has been successfully created!",
  personalInfo: "Personal Information",
  vehicleRegister: "Vehicle Register",
  bankAccountRegister: "Bank Account Register",
  fullName: "Full name",
  dateOfBirth: "Date of birth",
  phoneNumber: "Phone number",
  email: "Email",
  confirmPassword: "Confirm password",
  plateNumber: "Plate number",
  vehicleType: "Vehicle type",
  bankName: "Bank name",
  accountNumber: "Account number",
  scanQRCode: "Scan this QR code to checkout!",
  payment: "Payment",
  addMoreCard: "Add more card",
  paymentDetail: "Payment Details",
  slotBooking: "Slot Booking",
  vehicleNumber: "Vehicle number",
  parkingSlot: "Parking slot",
  bookingTime: "Booking time",
  bookingFee: "Booking fee",
  total: "Total",
  chooseYourVehicle: "Choose your vehicle",
  availableService: "Available service",
  book: "Book",
  profile: "Profile",
  bankAccount: "Bank account",
  vehicle: "Vehicle",
  policy: "Policy",
  FAQ: "FAQ",
  setting: "Setting",
  logout: "Log out",
  edit: "Edit",
  vehicleList: "VEHICLE LIST",
  serviceBooking: "Service Booking",
  serviceList: "Service List",
  addNewVehicle: "ADD NEW VEHICLE",
  addNewAccount: "ADD NEW ACCOUNT",
  cancel: "Cancel",
  confirm: "Confirm",
  parkingSlotBooking: "PARKING SLOT BOOKING",
  arrivalDate: "Arrival date",
  arrivalTime: "Arrival time",
  totalCost: "Total cost",
  untilYourBookingExpire: "Until your booking expired!",
  parkingDetail: "Parking Details",
  vehicleID: "Vehicle ID",
  parkingSlotID: "Parknig slot ID",
  noVehicleInParkingLot: "You have no vehicle in the parking lot!",
  paymentSuccess: "PAYMENT SUCCESS",
  transactionID: "Transaction ID",
  paymentTime: "Payment time",
  map: "Map",
  booking: "Booking",
  checkout: "Checkout",
  more: "More",
  service: "Service",
  invalidEmail: "Invalid email",
  invalidPhoneNumber: "Invalid phone number",
  invalidPassword: "Invalid password",
  passwordRequired: "Password is required",
  logoutConfirmation: "Are you sure you want to logout of your account?",
  yes: "Yes",
  save: "Save",
  car: "Car",
  motorbike: "Motorbike",
  truck: "Truck",
  bus: "Bus",
  bicycle: "Bicycle",
  cardNumber: "Card number",
  language: "Language",
  en: "English",
  vn: "Vietnamese",
  version: "Version",
  darkMode: "Dark mode",
  notification: "Notification",
  reportBug: "Report a bug",
  sessionExpired: "Your session has expired. Please login again.",
  sessionExpiredTitle: "Session Expired",
  invalidCredentials: "Invalid credentials. Please try again.",
  invalidCredentialsTitle: "Invalid Credentials",
}

export default en
export type Translations = typeof en
