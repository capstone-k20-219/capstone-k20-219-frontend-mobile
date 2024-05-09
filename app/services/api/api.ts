/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import { ApisauceInstance, create } from "apisauce"
import Config from "../../config"
import type { ApiConfig } from "./api.types"

// services
import { AuthApi } from "../authentication/auth"
import { UserApi } from "../user/user"
import { VehicleApi } from "../vehicle/vehicle"
import { VehicleTypeApi } from "../vehicleType/vehicleType"
import { CommentApi } from "../comment/comment"
import { ParkingSlotApi } from "../parkingSlot/parkingSlot"
import { ServiceApi } from "../service/service"
import { ParkingTicketApi } from "../parkingTicket/parkingTicket"
import { BookingApi } from "../booking/booking"

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  // API instances
  auth: AuthApi
  user: UserApi
  vehicle: VehicleApi
  vehicleType: VehicleTypeApi
  comment: CommentApi
  parkingSlot: ParkingSlotApi
  service: ServiceApi
  parkingTicket: ParkingTicketApi
  booking: BookingApi

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        "Content-type": "application/json",
      },
    })
    this.initialize()
  }

  // initialize API instances
  initialize() {
    this.auth = new AuthApi(this.apisauce)
    this.user = new UserApi(this.apisauce)
    this.vehicle = new VehicleApi(this.apisauce)
    this.vehicleType = new VehicleTypeApi(this.apisauce)
    this.comment = new CommentApi(this.apisauce)
    this.parkingSlot = new ParkingSlotApi(this.apisauce)
    this.service = new ServiceApi(this.apisauce)
    this.parkingTicket = new ParkingTicketApi(this.apisauce)
    this.booking = new BookingApi(this.apisauce)
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
