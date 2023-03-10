import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Item
  type Item {
    id: String
    name: String
    price: Int
  }

  # Discount 
  type Discount {
    id: String
    name: String
    discountRate: Int
  }

  # Categories 
  type Category {
    categoryId: String
    categoryName: String
    items: [Item]
  }

  # MerchantInfo
  #type MerchantInfo {
  #  minimumOrderPrice: Int
  #  merchantName: String
  #  categories: [Categories]
  #  discounts: [Discount]
  #}

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    minimumOrderPrice: Int
    merchantName: String
    categories: [Category]
    discounts: [Discount]
  }
`;
const categories = [
    {
        categoryId: "ddeokbboki",
        categoryName: "떡볶이",
        items: [
            { id: "item6", name: "마라떡볶이", price: 10000 },
            { id: "item7", name: "떡복이", price: 4000 },
            { id: "item8", name: "돈까스 떡볶이", price: 5500 },
        ],
    },
    {
        categoryId: "bob",
        categoryName: "밥류",
        items: [
            { id: "item2", name: "꼬마 김밥", price: 3500 },
            { id: "item3", name: "에그마요미니덮밥", price: 4500 },
            { id: "item4", name: "돈까스마요덮밥", price: 6500 },
            { id: "item5", name: "치킨마요덮밥", price: 7500 },
        ],
    },
    {
        categoryId: "chicken",
        categoryName: "치킨",
        items: [{ id: "item1", name: "순살치킨 6조각", price: 5000 }],
    },
    {
        categoryId: "fries",
        categoryName: "튀김",
        items: [
            {
                id: "item9",
                name: "튀김 세트(오징어, 김말이, 만두, 고구마, 오뎅 튀김, 고추 튀김, 새우 튀김, 감자 튀김)",
                price: 12000,
            },
            { id: "item10", name: "새우 튀김 2개", price: 1800 },
            { id: "item11", name: "김말이 튀김 2개", price: 1800 },
            { id: "item12", name: "오징어 튀김 2개", price: 1800 },
            { id: "item13", name: "만두 튀김 2개", price: 1800 },
        ],
    },
];
const discounts = [
    { id: "chutjumun", name: "첫 주문 할인 🐷", discountRate: 3 },
    { id: "discount_1", name: "단골 할인 ☺️", discountRate: 30 },
    { id: "discount_2", name: "집에가고싶다..🥲", discountRate: 80 },
    { id: "discount_3", name: "🦆 리뷰 이벤트!", discountRate: 10 },
];
const merchantInfo = {
    minimumOrderPrice: 15000,
    merchantName: "오모가리 김치찌개",
    categories: categories,
    discounts: discounts,
};
const merchantName = "오모가리 김치찌개";
const minimumOrderPrice = 15000;
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        // merchantInfo: () => merchantInfo,
        merchantName: () => merchantName,
        minimumOrderPrice: () => minimumOrderPrice,
        categories: () => categories,
        discounts: () => discounts,
    },
};
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
