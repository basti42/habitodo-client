export interface Team {
    team_name: string,
    team_id: string,
    team_logo: string,
    created_at: Date,
    emails: Array<String>,
    boards: Array<object>;
    members: Array<String>,
    admins: Array<String>,
    feedback_interval: String,
    effective_day: String,
    reminder: Boolean, 
    feedback_time_range: Number
}
