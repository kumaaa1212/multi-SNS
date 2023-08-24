import { followType } from "../global"

export interface AccountType {
  email: string
  name: string
  password: string
  team: string
  icon: string
  bgIcon: string
  bio: string
  follow: followType[]
  follower: followType[]
  twitterURL: string
  teamURL: string
}