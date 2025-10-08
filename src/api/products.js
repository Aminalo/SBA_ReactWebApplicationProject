const API = "https://fakestoreapi.com/products";

export async function fetchAll(){
  const res = await fetch(API);
  if(!res.ok) throw new Error("Failed to load products");
  return res.json();
}