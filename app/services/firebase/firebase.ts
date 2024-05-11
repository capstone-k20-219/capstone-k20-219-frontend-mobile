// firebase storage
import storage, { FirebaseStorageTypes } from "@react-native-firebase/storage"

export class FirebaseApi {
  private storage: FirebaseStorageTypes.Module

  constructor() {
    this.storage = storage()
  }

  async getDefaultAvatar(): Promise<string> {
    const defaultAvatarList = (await this.storage.ref("avatar_images/default_avatar").listAll())
      .items
    const defaultAvatarListLength = defaultAvatarList.length
    const randomIndex = Math.floor(Math.random() * defaultAvatarListLength)
    return await this.storage.ref(defaultAvatarList[randomIndex].fullPath).getDownloadURL()
  }
}
