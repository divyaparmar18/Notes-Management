import swaggerJsdoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    info: {
      title: "Notes Taking API",
      version: "1.0.0",
      description: "Documentation for Notes API",
    },
    tags: [
      {
        name: "User Management",
        description: "User related operations",
      },
      {
        name: "Notes Management",
        description: "Notes related operations",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./dist/routes/*.js"], // Specify the path to your API routes files
};

const specs = swaggerJsdoc(options);

export default specs;
