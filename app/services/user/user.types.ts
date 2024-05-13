export interface BankAccount {
  accountNo: string
  bank: string
}

enum UserRoleEnum {
  MANAGER = "manager",
  EMPLOYEE = "employee",
  USER = "user",
}

export interface RegisterInfo {
  email: string
  password: string
  name: string
  dob: Date
  phone: string
  image: string
  bankAccount: BankAccount[]
  role: UserRoleEnum[]
}

export interface UpdateInfo {
  email?: string
  dob?: Date
  phone?: string
  image?: string
  bankAccount?: BankAccount[]
}
