import type { CreateSchemaCustomizationArgs, SourceNodesArgs } from "gatsby";
import { get } from "axios";

export async function createSchemaCustomization({
  actions,
}: CreateSchemaCustomizationArgs) {
  actions.createTypes(`
  type Requirements {
    amount: Int!
    item: Item! @link(from: "item", by: "gameId")
  }
  
  type Block implements Node {
    buildCost: Int!
    category: String!
    contentType: String!
    description: String
    gameId: Int!
    flags: [String!]!
    group: String!
    health: Int!
    localizedName: String!
    name: String!
    # priority: String!
    requirements: [Requirements!]!
    size: Int!
    uiIcon: String!
  }
  
  type Item implements Node {
    contentType: String!
    localizedName: String!
    name: String!
    gameId: Int!
    uiIcon: String!
  }
  `);
}

export async function sourceNodes({
  actions,
  cache,
  createContentDigest,
  createNodeId,
}: SourceNodesArgs) {
  const cacheKey = "pulverizer";
  const contentTypes = [
    "block",
    "bullet",
    "item",
    "liquid",
    "status",
    "team",
    "unit",
    // "version",
    "weather",
  ];
  const day = 24 * 60 * 60 * 1000;

  let data = await cache.get(cacheKey);
  if (!data || Date.now() > data.lastChecked + day) {
    const content = await Promise.all(
      contentTypes.map((v) =>
        get(
          `https://raw.githubusercontent.com/mindustry-space/sand/main/${v}.json`
        )
      )
    );
    data = { content: {}, lastChecked: Date.now() };
    for (let i = 0; i < contentTypes.length; i++) {
      data.content[contentTypes[i]] = content[i].data;
    }
  }

  contentTypes.map((k) => {
    data.content[k].map((v: any) => {
      let node = {
        ...v,
        internal: {
          contentDigest: createContentDigest(v),
          type: k.charAt(0).toUpperCase() + k.slice(1),
        },
      };

      if (node.id !== undefined) node.gameId = node.id;
      node.id = createNodeId(`${k}-${node.gameId}-${node.internalName}`);

      if (node.parent) {
        node.gameParent = node.parent;
        delete node.parent;
      }

      actions.createNode(node);
    });
  });
}
