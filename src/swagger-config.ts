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
        name: "Notes Management",
        description: "Notes related operations",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./dist/routes/*.js"], // Ensure these paths are correct
};

const specs = swaggerJsdoc(options);

export default specs;
