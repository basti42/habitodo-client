export interface Team {
    team_name: string,
    team_id: string,
    team_logo: string,
    created_at: Date,
    emails: Array<String>,
    boards: Array<object>;
    members: Array<String>,
    admins: Array<String>
}
