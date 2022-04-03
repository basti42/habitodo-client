export interface Profile{
    registered_at: string,
    bio: string,
    position: string,
    boards: Array<Object>,
    personal_notes: Array<Object>,
    team_ids: Array<string>
}