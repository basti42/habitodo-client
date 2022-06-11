export interface User {
    username: string,
    user_id: string,
    email: string,
    email_validated: boolean,
    token: string,
    icon_path: string,
    registered_at: Date,
    last_login: Date,
    bio: string, 
    position: string, 
    personal_notes: Array<object>
};

export interface UserPublic {
    username: string,
    email: string, 
    position: string, 
    bio: string
}