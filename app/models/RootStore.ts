// mobx-state-tree
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { flow } from "mobx"

// modules
import { Alert } from "react-native"

// helpers
import { withSetPropAction } from "./helpers/withSetPropAction"

// services
import { api } from "app/services/api"
import database from "@react-native-firebase/database"

// interfaces
import { LoginInfo } from "app/services/authentication/auth.types"
import { RegisterInfo, UpdateInfo, BankAccount } from "app/services/user/user.types"
import { VehicleInfo } from "app/services/vehicle/vehicle.types"
import { CommentInfo } from "app/services/comment/comment.types"
import { SlotBookingInfo } from "app/services/booking/booking.types"

// async storage
import { remove } from "app/utils/storage/storage"

// i18n
import { translate } from "app/i18n"
import { navigationRef } from "app/navigators"

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

// const SlotType = types.model("SlotType").props({
//   name: types.maybeNull(types.string),
// })

const SlotInfo = types
  .model("SlotInfo")
  .props({
    id: types.maybeNull(types.string),
    x_start: types.maybeNull(types.number),
    x_end: types.maybeNull(types.number),
    y_start: types.maybeNull(types.number),
    y_end: types.maybeNull(types.number),
    typeId: types.maybeNull(types.string),
    type: types.maybeNull(types.string),
    isBusy: types.maybeNull(types.boolean),
  })
  .actions(withSetPropAction)

const ServicePrice = types
  .model("ServicePrice")
  .props({
    unitPrice: types.maybeNull(types.number),
    type: types.optional(VehicleTypeProps, {}),
  })
  .actions(withSetPropAction)

const Service = types
  .model("Service")
  .props({
    id: types.maybeNull(types.string),
    name: types.maybeNull(types.string),
    prices: types.array(types.optional(ServicePrice, {})),
  })
  .actions(withSetPropAction)

const ParkingTicket = types
  .model("ParkingTicket")
  .props({
    id: types.maybeNull(types.string),
    userId: types.maybeNull(types.string),
    slotId: types.maybeNull(types.string),
    plateNo: types.maybeNull(types.string),
    checkOutTime: types.maybeNull(types.Date),
    parkingCost: types.maybeNull(types.number),
    isPaid: types.maybeNull(types.boolean),
  })
  .actions(withSetPropAction)

const SlotBooking = types
  .model("SlotBooking")
  .props({
    slotId: types.maybeNull(types.string),
    vehicleId: types.maybeNull(types.number),
    arrivalTime: types.maybeNull(types.Date),
    id: types.maybeNull(types.number),
    createdAt: types.maybeNull(types.Date),
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
    service: types.array(types.optional(Service, {})),
    parkingTicket: types.array(types.optional(ParkingTicket, {})),
    slotBooking: types.optional(SlotBooking, {}),
    checkInStatus: types.maybeNull(types.boolean),
    checkOutStatus: types.maybeNull(types.boolean),
    postVehicleStatus: types.maybeNull(types.enumeration(["loading", "done", "error"])),
    deleteVehicleStatus: types.maybeNull(types.enumeration(["loading", "done", "error"])),
    getSlotBookingStatus: types.maybeNull(types.enumeration(["loading", "done", "error"])),
    postSlotBookingStatus: types.maybeNull(types.enumeration(["loading", "done", "error"])),
    postServiceBookingStatus: types.maybeNull(types.enumeration(["loading", "done", "error"])),
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
      store.setProp("postVehicleStatus", "loading")
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
        store.setProp("postVehicleStatus", "done")
      } else {
        alert(JSON.stringify(response))
        store.setProp("postVehicleStatus", "error")
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
        console.log(JSON.stringify(response))
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
          new Date(response.data.dob).setHours(new Date(response.data.dob).getHours()),
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
        store.setProp("service", [{}])
        store.setProp("parkingTicket", [{}])
        store.setProp("slotBooking", {})
        store.setProp("checkInStatus", null)
        store.setProp("checkOutStatus", null)
        store.setProp("postVehicleStatus", null)
        store.setProp("deleteVehicleStatus", null)
        store.setProp("getSlotBookingStatus", null)
        store.setProp("postSlotBookingStatus", null)
        store.setProp("postServiceBookingStatus", null)
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
      store.setProp("deleteVehicleStatus", "loading")
      let response = yield api.vehicle.deleteVehicle(vehicleId)
      if (response.kind === "unauthorized") {
        yield api.auth.postRefreshToken()
        response = yield api.vehicle.deleteVehicle(vehicleId)
      }
      if (response.kind === "ok") {
        store.setProp(
          "vehicle",
          store.vehicle.filter((item) => item.id !== vehicleId),
        )
        store.setProp("deleteVehicleStatus", "done")
      } else {
        alert(JSON.stringify(response))
        store.setProp("deleteVehicleStatus", "error")
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
  .actions((store) => ({
    getServices: flow(function* (typeId: string) {
      let response = yield api.service.getServices(typeId)
      if (response.kind === "unauthorized") {
        yield api.auth.postRefreshToken()
        response = yield api.service.getServices(typeId)
      }
      if (response.kind === "ok") {
        store.setProp("service", response.data)
      } else {
        alert(JSON.stringify(response))
      }
    }),
  }))
  .actions(() => ({
    postServiceBooking: flow(function* (payload: any) {
      let response = yield api.booking.postServiceBooking(payload)
      if (response.kind === "unauthorized") {
        yield api.auth.postRefreshToken()
        response = yield api.booking.postServiceBooking(payload)
      }
      if (response.kind === "ok") {
        console.log(JSON.stringify(response))
      } else {
        alert(JSON.stringify(response))
      }
    }),
  }))
  .actions(() => ({
    postComment: flow(function* (payload: CommentInfo) {
      let response = yield api.comment.postComment(payload)
      if (response.kind === "unauthorized") {
        yield api.auth.postRefreshToken()
        response = yield api.comment.postComment(payload)
      }
      if (response.kind === "ok") {
        navigationRef.navigate("Service")
      } else {
        alert(JSON.stringify(response))
      }
    }),
  }))
  .actions((store) => ({
    getParkingTicket: flow(function* () {
      let response = yield api.parkingTicket.getMyParkingTicket()
      if (response.kind === "unauthorized") {
        yield api.auth.postRefreshToken()
        response = yield api.parkingTicket.getMyParkingTicket()
      }
      if (response.kind === "ok") {
        store.setProp("parkingTicket", response.data)
      } else {
        alert(JSON.stringify(response))
      }
    }),
  }))
  .actions((store) => ({
    postSlotBooking: flow(function* (payload: SlotBookingInfo) {
      store.setProp("postSlotBookingStatus", "loading")
      let response = yield api.booking.postSlotBooking(payload)
      if (response.kind === "unauthorized") {
        yield api.auth.postRefreshToken()
        response = yield api.booking.postSlotBooking(payload)
      }
      if (response.kind === "ok") {
        store.slotBooking.setProp("id", response.data.id)
        store.slotBooking.setProp("slotId", response.data.slotId)
        store.slotBooking.setProp("vehicleId", response.data.vehicleId)
        store.slotBooking.setProp(
          "arrivalTime",
          new Date(response.data.arrivalTime).setHours(
            new Date(response.data.arrivalTime).getHours(),
          ),
        )
        store.slotBooking.setProp(
          "createdAt",
          new Date(response.data.createdAt).setHours(new Date(response.data.createdAt).getHours()),
        )
        Alert.alert(translate("bookingSuccessTitle"), translate("bookingSuccess"))
        store.setProp("postSlotBookingStatus", "done")
      } else {
        store.setProp("postSlotBookingStatus", "error")
        alert(JSON.stringify(response))
      }
      store.setProp("postSlotBookingStatus", null)
    }),
  }))
  .actions((store) => ({
    getSlotBooking: flow(function* () {
      store.setProp("getSlotBookingStatus", "loading")
      let response = yield api.booking.getSlotBooking()
      if (response.kind === "unauthorized") {
        yield api.auth.postRefreshToken()
        response = yield api.booking.getSlotBooking()
      }
      if (response.kind === "ok") {
        if (response.data.length === 0) {
          store.setProp("getSlotBookingStatus", null)
          store.setProp("slotBooking", {})
        } else {
          store.slotBooking.setProp("id", response.data[0].id)
          store.slotBooking.setProp("slotId", response.data[0].slotId)
          store.slotBooking.setProp("vehicleId", response.data[0].vehicleId)
          store.slotBooking.setProp(
            "arrivalTime",
            new Date(response.data[0].arrivalTime).setHours(
              new Date(response.data[0].arrivalTime).getHours(),
            ),
          )
          store.slotBooking.setProp(
            "createdAt",
            new Date(response.data[0].createdAt).setHours(
              new Date(response.data[0].createdAt).getHours(),
            ),
          )
          store.setProp("getSlotBookingStatus", "done")
        }
      } else {
        store.setProp("getSlotBookingStatus", "error")
        alert(JSON.stringify(response))
      }
      store.setProp("getSlotBookingStatus", null)
    }),
  }))
  .actions((store) => ({
    checkin: flow(function* () {
      if (store.checkInStatus) {
        store.getSlotInfo()
        store.getParkingTicket()
        store.getSlotBooking()
        store.setProp("checkInStatus", false)
        database().ref("/checkInStatus").set(false)
      }
    }),
  }))
  .actions((store) => ({
    checkout: flow(function* () {
      if (store.checkOutStatus) {
        store.getSlotInfo()
        store.getParkingTicket()
        store.getSlotBooking()
        store.setProp("checkOutStatus", false)
        database().ref("/checkOutStatus").set(false)
      }
    }),
  }))
  .actions((store) => ({
    getParkingSlotFee: function (slotId: string) {
      const slotVehicleTypeId = store.slotInfo.find((slot) => slot.id === slotId)?.typeId
      const vehicleTypeInfo = store.vehicleType.find((type) => type.id === slotVehicleTypeId)
      return {
        parkingFee: vehicleTypeInfo?.parkingFee,
        slotBookingFee: vehicleTypeInfo?.slotBookingFee,
      }
    },
  }))
  .actions((store) => ({
    getSuitableBookingVehicle: flow(function* (slotId: string) {
      const slotVehicleTypeId = store.slotInfo.find((slot) => slot.id === slotId)?.typeId
      const parkingPlateNo = store.parkingTicket.map(({ plateNo }) => plateNo)
      const parkingVehicle = store.vehicle.filter(
        (vehicle) =>
          parkingPlateNo.includes(vehicle.plateNo) && vehicle.type.id === slotVehicleTypeId,
      )
      const suitableVehicle = store.vehicle.filter(
        (vehicle) =>
          vehicle.type.id === slotVehicleTypeId && !parkingPlateNo.includes(vehicle.plateNo),
      )
      return { vehicleList: suitableVehicle, isParking: parkingVehicle.length > 0 }
    }),
  }))
  .actions((store) => ({
    getSuitableParkingTicketId: flow(function* (vehicleId: number) {
      const plateNo = store.vehicle.find((vehicle) => vehicle.id === vehicleId)?.plateNo
      const suitableParkingTicket = store.parkingTicket.find((ticket) => ticket.plateNo === plateNo)
      return suitableParkingTicket.id
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
    get myParkingSlotId() {
      if (store.parkingTicket.length && store.parkingTicket[0].id !== null) {
        return store.parkingTicket.map(({ slotId }) => slotId)
      } else {
        return []
      }
    },
    get firstParkingSlotCoordinate() {
      if (store.parkingTicket.length && store.parkingTicket[0].id !== null) {
        return store.slotInfo.find((slot) => slot.id === store.parkingTicket[0].slotId)
      } else {
        return null
      }
    },
    get myParkingVehicle() {
      if (store.parkingTicket.length && store.parkingTicket[0].id !== null) {
        return store.parkingTicket.map(({ plateNo, id }) => ({ plateNo, id }))
      } else {
        return []
      }
    },
    get myParkingPlateNo() {
      if (store.parkingTicket.length && store.parkingTicket[0].id !== null) {
        return store.parkingTicket.map(({ plateNo }) => plateNo)
      } else {
        return []
      }
    },
    get myBookingPlateNo() {
      if (store.slotBooking.id) {
        return store.vehicle.find((vehicle) => vehicle.id === store.slotBooking.vehicleId)?.plateNo
      } else {
        return ""
      }
    },
    get myParkingVehicleInfo() {
      if (store.parkingTicket.length && store.parkingTicket[0].id !== null) {
        const parkingPlateNo = store.parkingTicket.map(({ plateNo }) => plateNo)
        return store.vehicle.filter((vehicle) => parkingPlateNo.includes(vehicle.plateNo))
      } else {
        return []
      }
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
