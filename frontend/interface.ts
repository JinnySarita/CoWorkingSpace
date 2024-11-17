export interface UserProfile {
    name: string
    email: string
    tel: string
    role: string
}

export interface User {
    email: string;
    name: string;
    role: string;
    token: string;
}

export interface SessionInterface {
    user: User
}