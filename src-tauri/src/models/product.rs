use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Product {
    pub id: String,
    pub name: String,
    pub price: f64,
    pub stock: i64,
}

#[derive(Debug, Deserialize)]
pub struct ProductPayload {
    pub name: String,
    pub price: f64,
    pub stock: i64,
}
