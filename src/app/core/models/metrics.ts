export interface Metrics {
    _id: String,
    date: String,
    template: String,
    team: String,
    user: String, 
    metrics: Array<Object>,
    mean: Number
};