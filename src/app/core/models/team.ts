export interface Team {
    team_name: string,
    team_id: string,
    team_logo: string,
    created_at: Date,
    members_emails: Array<string>,
    boards: Array<object>;
    team_admins: Array<string>,
    metrics: Array<object>
}
