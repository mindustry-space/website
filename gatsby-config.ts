import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Mindustry Space",
    description: "The free and open database for the Mindustry universe.",
  },
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-mdx",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "@chakra-ui/gatsby-plugin",
      options: {
        resetCSS: true,
      },
    },
    {
      resolve: `gatsby-transformer-json`,
      options: {
        typeName: "block",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: "./src/data/",
      },
    },
  ],
};

export default config;
