// mobx-state-tree
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { flow } from "mobx"

// modules
import { Alert } from "react-native"

// helpers
import { withSetPropAction } from "./helpers/withSetPropAction"

// services
import { api } from "app/services/api"

// interfaces
import { LoginInfo } from "app/services/authentication/auth.types"
import { RegisterInfo, UpdateInfo, BankAccount } from "app/services/user/user.types"
import { VehicleInfo } from "app/services/vehicle/vehicle.types"

// async storage
import { remove } from "app/utils/storage/storage"

// i18n
import { translate } from "app/i18n"

const BankAccountInfo = types
  .model("BankAccountInfo")
  .props({
    accountNo: types.maybeNull(types.string),
    bank: types.maybeNull(types.string),
  })
  .actions(withSetPropAction)

const VehicleTypeProps = types
  .model("VehicleTypeProps")
  .props({
    id: types.maybeNull(types.string),
    name: types.maybeNull(types.string),
  })
  .actions(withSetPropAction)

const Vehicle = types
  .model("Vehicle")
  .props({
    id: types.maybeNull(types.number),
    plateNo: types.maybeNull(types.string),
    description: types.maybeNull(types.string),
    userId: types.maybeNull(types.string),
    type: types.optional(VehicleTypeProps, {}),
  })
  .actions(withSetPropAction)

const VehicleType = types
  .model("VehicleType")
  .props({
    id: types.maybeNull(types.string),
    name: types.maybeNull(types.string),
    parkingFee: types.maybeNull(types.number),
    slotBookingFee: types.maybeNull(types.number),
  })
  .actions(withSetPropAction)

export const UserInfo = types
  .model("UserInfo")
  .props({
    email: types.maybeNull(types.string),
    password: types.maybeNull(types.string),
    name: types.maybeNull(types.string),
    dob: types.maybeNull(types.Date),
    phone: types.maybeNull(types.string),
    image: types.maybeNull(types.string),
    bankAccount: types.array(types.optional(BankAccountInfo, {})),
    role: types.array(types.enumeration(["manager", "employee", "user"])),
  })
  .actions(withSetPropAction)

const SlotType = types.model("SlotType").props({
  name: types.maybeNull(types.string),
})

const SlotInfo = types
  .model("SlotInfo")
  .props({
    id: types.maybeNull(types.string),
    x_start: types.maybeNull(types.number),
    x_end: types.maybeNull(types.number),
    y_start: types.maybeNull(types.number),
    y_end: types.maybeNull(types.number),
    typeId: types.maybeNull(types.string),
    type: types.optional(SlotType, {}),
  })
  .actions(withSetPropAction)

export const RootStoreModel = types
  .model("RootStore")
  .props({
    userId: types.maybeNull(types.string),
    userInfo: types.optional(UserInfo, {}),
    vehicle: types.array(types.optional(Vehicle, {})),
    vehicleType: types.array(types.optional(VehicleType, {})),
    slotInfo: types.array(types.optional(SlotInfo, {})),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    postAuth: flow(function* (payload: LoginInfo) {
      const response = yield api.auth.postLogin(payload)
      if (response.kind === "ok") {
        store.setProp("userId", response.data)
      } else {
        Alert.alert(
          translate("invalidCredentialsTitle"),
          translate("invalidCredentials"),
          [{ text: "OK" }],
          { cancelable: false },
        )
      }
    }),
  }))
  .actions((store) => ({
    postVehicle: flow(function* (payload: VehicleInfo) {
      let response = yield api.vehicle.postVehicle(payload)
      if (response.kind === "unauthorized") {
        yield api.auth.postRefreshToken()
        response = yield api.vehicle.postVehicle(payload)
      }
      if (response.kind === "ok") {
        store.setProp("vehicle", [
          ...store.vehicle,
          {
            plateNo: response.data.plateNo,
            userId: response.data.userId,
            type: { id: response.data.typeId },
            id: response.data.id,
            description: "",
          },
        ])
      } else {
        alert(JSON.stringify(response))
      }
    }),
  }))
  .actions((store) => ({
    postVehiclePublic: flow(function* (payload: VehicleInfo, userId: string) {
      let response = yield api.vehicle.postVehiclePublic(payload, userId)
      if (response.kind === "unauthorized") {
        yield api.auth.postRefreshToken()
        response = yield api.vehicle.postVehiclePublic(payload, userId)
      }
      if (response.kind === "ok") {
        store.setProp("vehicle", [
          ...store.vehicle,
          {
            plateNo: response.data.plateNo,
            userId: response.data.userId,
            type: { id: response.data.typeId },
            id: response.data.id,
            description: "",
          },
        ])
      } else {
        alert(JSON.stringify(response))
      }
    }),
  }))
  .actions((store) => ({
    postRegister: flow(function* () {
      const imageURL = yield api.firebase.getDefaultAvatar()
      store.userInfo.setProp("image", imageURL)
      const response = yield api.user.postRegister(store.userInfo as RegisterInfo)
      if (response.kind === "ok") {
        if (store.vehicle.length > 0) {
          store.postVehiclePublic(
            { plateNo: store.vehicle[0].plateNo, typeId: store.vehicle[0].type.id },
            response.data.id,
          )
        }
      } else {
        alert(JSON.stringify(response))
      }
    }),
  }))
  .actions((store) => ({
    getUserInfo: flow(function* () {
      let response = yield api.user.getUserInfo()
      if (response.kind === "unauthorized") {
        yield api.auth.postRefreshToken()
        response = yield api.user.getUserInfo()
      }
      if (response.kind === "ok") {
        store.setProp("userId", response.data.id)
        store.userInfo.setProp("email", response.data.email)
        store.userInfo.setProp("name", response.data.name)
        store.userInfo.setProp(
          "dob",
          new Date(response.data.dob).setHours(new Date(response.data.dob).getHours() + 7),
        )
        store.userInfo.setProp("phone", response.data.phone)
        store.userInfo.setProp("image", response.data.image)
        store.userInfo.setProp("bankAccount", response.data.bankAccount)
        store.userInfo.setProp("role", response.data.role)
        store.userInfo.setProp("password", "")
      } else {
        alert(JSON.stringify(response))
      }
    }),
  }))
  .actions((store) => ({
    postLogout: flow(function* () {
      let response = yield api.auth.postLogout()
      if (response.kind === "unauthorized") {
        yield api.auth.postRefreshToken()
        response = yield api.auth.postLogout()
      }
      if (response.kind === "ok") {
        store.setProp("userId", null)
        store.setProp("userInfo", {})
        store.setProp("vehicle", [{}])
        store.setProp("vehicleType", [{}])
        store.setProp("slotInfo", [{}])
        api.apisauce.setHeader("Authorization", "")
        yield remove("refresh_token")
      } else {
        alert(JSON.stringify(response))
      }
    }),
  }))
  .actions((store) => ({
    putUpdateUserInfo: flow(function* (payload: UpdateInfo) {
      let response = yield api.user.putUserInfo(payload)
      if (response.kind === "unauthorized") {
        yield api.auth.postRefreshToken()
        response = yield api.user.putUserInfo(payload)
      }
      if (response.kind === "ok") {
        if (payload.email) store.userInfo.setProp("email", payload.email)
        if (payload.dob) store.userInfo.setProp("dob", payload.dob)
        if (payload.phone) store.userInfo.setProp("phone", payload.phone)
        if (payload.image) store.userInfo.setProp("image", payload.image)
        if (payload.bankAccount) store.userInfo.setProp("bankAccount", payload.bankAccount)
      } else {
        alert(JSON.stringify(response))
      }
    }),
  }))
  .actions((store) => ({
    putUploadAvatar: flow(function* (uri: string) {
      const imageURL = yield api.firebase.uploadAvatarImage(uri, store.userId)
      store.putUpdateUserInfo({ image: imageURL })
    }),
  }))
  .actions((store) => ({
    getSlotInfo: flow(function* () {
      let response = yield api.parkingSlot.getParkingSlots()
      if (response.kind === "unauthorized") {
        yield api.auth.postRefreshToken()
        response = yield api.parkingSlot.getParkingSlots()
      }
      if (response.kind === "ok") {
        store.setProp("slotInfo", response.data)
      } else {
        alert(JSON.stringify(response))
      }
    }),
  }))
  .actions((store) => ({
    postBankAccount: flow(function* (payload: BankAccount) {
      const data = [...store.userInfo.bankAccount, payload]
      let response = yield api.user.putUserInfo({ bankAccount: data })
      if (response.kind === "unauthorized") {
        yield api.auth.postRefreshToken()
        response = yield api.user.putUserInfo({ bankAccount: data })
      }
      if (response.kind === "ok") {
        store.userInfo.setProp("bankAccount", data)
      } else {
        alert(JSON.stringify(response))
      }
    }),
  }))
  .actions((store) => ({
    deleteBankAccount: flow(function* (payload: BankAccount) {
      const data = store.userInfo.bankAccount.filter(
        (item) => item.bank !== payload.bank || item.accountNo !== payload.accountNo,
      )
      let response = yield api.user.putUserInfo({ bankAccount: data })
      if (response.kind === "unauthorized") {
        yield api.auth.postRefreshToken()
        response = yield api.user.putUserInfo({ bankAccount: data })
      }
      if (response.kind === "ok") {
        store.userInfo.setProp("bankAccount", data)
      } else {
        alert(JSON.stringify(response))
      }
    }),
  }))
  .actions((store) => ({
    getMyVehicles: flow(function* () {
      let response = yield api.vehicle.getMyVehicles()
      if (response.kind === "unauthorized") {
        yield api.auth.postRefreshToken()
        response = yield api.vehicle.getMyVehicles()
      }
      if (response.kind === "ok") {
        store.setProp("vehicle", response.data)
      } else {
        alert(JSON.stringify(response))
      }
    }),
  }))
  .actions((store) => ({
    deleteVehicle: flow(function* (vehicleId: number) {
      let response = yield api.vehicle.deleteVehicle(vehicleId)
      if (response.kind === "unauthorized") {
        yield api.auth.postRefreshToken()
        response = yield api.vehicle.deleteVehicle(vehicleId)
      }
      if (response.kind === "ok") {
        const data = store.vehicle.filter((item) => item.id !== vehicleId)
        store.setProp("vehicle", data)
      } else {
        alert(JSON.stringify(response))
      }
    }),
  }))
  .actions((store) => ({
    getVehicleType: flow(function* () {
      let response = yield api.vehicleType.getVehicleType()
      if (response.kind === "unauthorized") {
        yield api.auth.postRefreshToken()
        response = yield api.vehicleType.getVehicleType()
      }
      if (response.kind === "ok") {
        store.setProp("vehicleType", response.data)
      } else {
        alert(JSON.stringify(response))
      }
    }),
  }))
  .views((store) => ({
    get isLoggedIn() {
      return store.userId !== null
    },
    get slotOffset() {
      let minX = store.slotInfo[0].x_start
      store.slotInfo.forEach((slot) => {
        if (slot.x_start < minX) minX = slot.x_start
      })
      return minX - 24
    },
  }))

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
