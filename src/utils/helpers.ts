import { User } from "../types/UserTypes";

export function getUserFromLocalStorage() : User | null {
    try {
        const userString = localStorage.getItem('user')
        const user: User = userString ? JSON.parse(userString) : null
        return user

    } catch (error) {
        console.error('Error retrieving user data from localStorage', error)
        return null
    }
}

export function saveUserToLocalStorage(userUUID: string, organizationId: string) {
    const user: User = {
        uuid: userUUID,
        organizationId
    }
    try {
        const userString = JSON.stringify(user)
        localStorage.setItem('user', userString)
    } catch (error) {
        console.error('Error saving user data to local storage', error)
    }
}
