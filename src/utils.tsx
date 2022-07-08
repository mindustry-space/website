import * as React from "react";
import pluralize from "pluralize";

export type Content =
  | Queries.Block
  | Queries.Item
  | Queries.Liquid
  | Queries.Status
  | Queries.Unit
  | Queries.Weather;

const error = "missing needed properties";

export function path({ contentType, name }: Content) {
  if (!contentType || !name) throw error;
  return `/${pluralize(contentType)}/${name}`;
}

export function ui(
  { contentType, uiIcon }: Content,
  size: string,
  style: React.CSSProperties | undefined
) {
  // TODO: component
  if (!contentType || !uiIcon) throw error;
  return (
    <svg height={size} width={size} style={style}>
      <use xlinkHref={`/images/svgs/aa310bd20/${contentType}.svg#${uiIcon}`} />
    </svg>
  );
}

export function up(str: string | null | undefined) {
  if (typeof str === "string") {
    return str.charAt(0).toUpperCase() + str.slice(1);
  } else {
    return "None";
  }
}
