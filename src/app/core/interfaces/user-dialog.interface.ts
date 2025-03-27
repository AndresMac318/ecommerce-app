import { User } from "./user.model";

export interface UserDialogResult {
    user: User;
    updated: boolean;
}

export interface UserDialogData {
    user: User;
    title: string;
  }