export interface Template {
    _id: String,
    type: String,
    creator: String,
    creation_date: String,
    owner: String,
    team: String,
    title: String,
    description: String,
    max_possible_value: number,
    metrics: Array<Object>
}