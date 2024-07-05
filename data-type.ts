export interface signup {
    Name: string;
    Password: string;
    Email: string

}

export interface login {
    Email: string;
    Password: string
}

export interface product {
    name: string,
    colour: string,
    image: string,
    description: string,
    price: string,
    category: string
    id: string,
    quantity: number | undefined,
    productId: string | undefined,


}
export interface cart {
    name: string,
    colour: string,
    image: string,
    description: string,
    price: string,
    category: string
    id: string,
    quantity: number | undefined,
    userId: string,
    productId: string | undefined,

}
export interface priceSummary {
    tax: number,
    price: number,
    discount: number,
    total: number,
    delivery: number
}
export interface order {
    email: string,
    contact: string,
    Address: string,
    totalPrice: number,
    userId: string,
    id: string | undefined,


}
