import { Timestamp } from 'firebase/firestore'

export interface IConfig {
  uid: string
  user_id: string
  startDate: Timestamp
  endDate: Timestamp
}
