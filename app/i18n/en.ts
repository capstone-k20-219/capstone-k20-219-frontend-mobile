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
  parkingSlotID: "Parking slot ID",
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
  mtb: "Motorbike",
  trk: "Truck",
  bus: "Bus",
  bcl: "Bicycle",
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
  feedback: "Feedback",
  feedbackService: "Service feedback",
  serviceName: "Service name",
  feedbackPlaceholder: "Please write your feedback here...",
  noAvailableService: "No available services found.",
  parkingFeePerHour: "Parking fee per hour",
  bookingExpiredAt: "Booking expired at",
  noSuitableVehicleTitle: "No available vehicle found",
  noSuitableVehicle:
    "There is no {{vehicleType}} in your vehicle list, please add a {{vehicleType}} to your vehicle list to book this slot.",
  noAvailableVehicle: "There is no available {{vehicleType}} in your vehicle list.",
  invalidTimePeriod: "Booking time should be from {{fromTime}} to {{toTime}}",
  bookingSuccessTitle: "Booking success",
  bookingSuccess: "Your booking has been successfully created!",
  bookingServiceSuccess: "Your service request has been successfully created!",
  bookingServiceSuccessTitle: "Service booking success",
  bookingRequestSentAt: "Booking request sent at",
  deleteBankAccount: "Delete bank account",
  deleteVehicle: "Delete vehicle",
  deleteBankAccountConfirmation: "Are you sure you want to delete this bank account?",
  deleteVehicleConfirmation: "Are you sure you want to delete this vehicle?",
  deleteParkingVehicleWarning: " You can not delete this vehicle because it is in the parking lot.",
  deleteParkingVehicleWarningTitle: "Deleting a parking vehicle!",
  ok: "OK",
  noServiceChosen: "No service chosen",
  pleaseSelectService: "Please select at least 1 service",
  bookingService: "Booking service",
  bookingServiceConfirmation: "Are you sure you want to book service?",
  emptyInputTitle: "Empty input",
  invalidPlateNumberTitle: "Invalid plate number",
  invalidPlateNumberMessage:
    "Plate number must be in the format like the following example: 98K1-02897",
  emptyInputMessage: "Please fill in all the required fields",
}

export default en
export type Translations = typeof en
