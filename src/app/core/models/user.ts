export interface User {
    username: string,
    email: string,
    email_validated: boolean,
    token: string,
    icon_path: string,
    registered_at: Date,
    bio: string, 
    position: string, 
    boards: Array<object>,
    personal_notes: Array<object>,
    team_ids: Array<string>
}