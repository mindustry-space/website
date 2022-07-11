import pluralize from 'pluralize';
import { get } from 'axios';
import type { CreateSchemaCustomizationArgs, SourceNodesArgs } from "gatsby";

function capitalize(v: string) {
  return v.charAt(0).toUpperCase() + v.slice(1);
}

export async function createSchemaCustomization({
  actions,
}: CreateSchemaCustomizationArgs) {
  actions.createTypes(`
  type Consumers {
    items: [ItemAmount!]
  }

  type Color {
    r: Float!
    b: Float!
    g: Float!
    a: Float!
  }

  type ItemAmount {
    amount: Int!
    item: Item! @link(from: "item", by: "gameId")
  }

  type ItemLink {
    # can't figure out how to link int inside array to item
    item: Item! @link(from: "item", by: "gameId")
  }
  
  interface Content implements Node {
    contentType: ContentType! @link(from: "contentType", by: "name")
    id: ID!
    gameId: Int!
  }

  interface MappableContent implements Content & Node {
    contentType: ContentType! @link(from: "contentType", by: "name")
    id: ID!
    gameId: Int!
    # ---
    name: String!
  }

  interface UnlockableContent implements MappableContent & Content & Node {
    contentType: ContentType! @link(from: "contentType", by: "name")
    id: ID!
    gameId: Int!
    name: String!
    # ---
    description: String
    details: String
    localizedName: String!
    uiIcon: String!
  }

  type Block implements UnlockableContent & MappableContent & Content & Node {
    contentType: ContentType! @link(from: "contentType", by: "name")
    id: ID!
    gameId: Int!
    name: String!
    description: String
    details: String
    localizedName: String!
    uiIcon: String!
    # ---
    blockedItem: Item
    buildCost: Float!
    category: String!
    consumers: [Consumers!]!
    flags: [String!]!
    group: String!
    health: Int!
    itemDrop: Item @link(from: "itemDrop", by: "gameId")
    itemFilter: [ItemLink!]!
    # liquidFilter: [ItemLink!]!
    # priority: String!
    mapColor: Color!
    outlineColor: Color!
    outputItems: [ItemAmount!]
    requirements: [ItemAmount!]!
    researchCost: [ItemAmount!]
    size: Int!
  }

  type Bullet implements Content & Node {
    contentType: ContentType! @link(from: "contentType", by: "name")
    id: ID!
    gameId: Int!
    # ---
  }

  type Item implements UnlockableContent & MappableContent & Content & Node {
    contentType: ContentType! @link(from: "contentType", by: "name")
    id: ID!
    gameId: Int!
    name: String!
    description: String
    details: String
    localizedName: String!
    uiIcon: String!
    # ---
    color: Color!

  }

  type Liquid implements UnlockableContent & MappableContent & Content & Node {
    contentType: ContentType! @link(from: "contentType", by: "name")
    id: ID!
    gameId: Int!
    name: String!
    description: String
    details: String
    localizedName: String!
    uiIcon: String!
    # ---
  }

  type Status implements UnlockableContent & MappableContent & Content & Node {
    contentType: ContentType! @link(from: "contentType", by: "name")
    id: ID!
    gameId: Int!
    name: String!
    description: String
    details: String
    localizedName: String!
    uiIcon: String!
    # ---
  }

  type Team implements UnlockableContent & MappableContent & Content & Node {
    contentType: ContentType! @link(from: "contentType", by: "name")
    id: ID!
    gameId: Int!
    name: String!
    description: String
    details: String
    localizedName: String!
    uiIcon: String!
    # ---
  }

  type Unit implements UnlockableContent & MappableContent & Content & Node {
    contentType: ContentType! @link(from: "contentType", by: "name")
    id: ID!
    gameId: Int!
    name: String!
    description: String
    details: String
    localizedName: String!
    uiIcon: String!
    # ---
  }

  type Weather implements UnlockableContent & MappableContent & Content & Node {
    contentType: ContentType! @link(from: "contentType", by: "name")
    id: ID!
    gameId: Int!
    name: String!
    description: String
    details: String
    localizedName: String!
    uiIcon: String!
    # ---
  }

  type ContentType implements Node {
    name: String!
    localizedName: String!
    pluralizedName: String!
  }
  `);
}

function filterToItemLink(arr: boolean[]) {
  return arr
    .map((v, i) => ({ item: v ? i : null }))
    .filter((v) => v.item !== null);
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

  contentTypes.map((name) => {
    actions.createNode({
      id: createNodeId(name),
      name,
      localizedName: capitalize(name),
      pluralizedName: pluralize(name),
      internal: {
        contentDigest: createContentDigest(name),
        type: "ContentType",
      },
    });
  });

  contentTypes.map((k) => {
    data.content[k].map((v: any) => {
      let node = {
        ...v,
        internal: {
          contentDigest: createContentDigest(v),
          type: capitalize(k),
        },
      };

      if (k === "block") {
        node.itemFilter = filterToItemLink(node.itemFilter);
      }

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
