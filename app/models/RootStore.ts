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
import { RegisterInfo } from "app/services/user/user.types"

// async storage
import { remove } from "app/utils/storage/storage"
import { translate } from "app/i18n"

/**
 * A RootStore model.
 */

const BankAccountInfo = types
  .model("BankAccountInfo")
  .props({
    accountNo: types.maybeNull(types.string),
    bank: types.maybeNull(types.string),
  })
  .actions(withSetPropAction)

const VehicleInfo = types
  .model("VehicleInfo")
  .props({
    plateNo: types.maybeNull(types.string),
    typeId: types.maybeNull(types.string),
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

export const RootStoreModel = types
  .model("RootStore")
  .props({
    userId: types.maybeNull(types.string),
    userInfo: types.optional(UserInfo, {}),
    vehicle: types.array(types.optional(VehicleInfo, {})),
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
    postRegister: flow(function* () {
      const imageURL = yield api.firebase.getDefaultAvatar()
      store.userInfo.setProp("image", imageURL)
      const response = yield api.user.postRegister(store.userInfo as RegisterInfo)
      if (response.kind === "ok") {
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
        api.apisauce.setHeader("Authorization", "")
        yield remove("refresh_token")
      } else {
        alert(JSON.stringify(response))
      }
    }),
  }))
  .views((store) => ({
    get isLoggedIn() {
      return store.userId !== null
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
