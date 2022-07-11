import * as React from 'react';
import pluralize from 'pluralize';

export type Content =
  | Queries.Block
  | Queries.Item
  | Queries.Liquid
  | Queries.Status
  | Queries.Unit
  | Queries.Weather;

export function camelToWords(str: string) {
  let result = str.replace(/([A-Z])/g, " $1");
  return up(result.toLowerCase());
}

export function round(num: number, to: number = 2) {
  return Number(num.toFixed(to));
}

export interface Path {
  contentType: {
    name: string;
  };
  name: String;
}

export function path({ contentType, name }: Path) {
  return `/${pluralize(contentType.name)}/${name}`;
}

export function percentage(num: any) {
  if (typeof num !== "number") throw "num is not number"; // typing for content table overrides
  return round(num * 100).toString() + "%";
}

export function percentageDiff(num: any) {
  if (typeof num !== "number") throw "num is not number"; // typing for content table overrides
  if (num === 0) return "None";
  return (num > 0 ? "+" : "-") + percentage(num);
}

export interface UI {
  contentType: {
    name: string;
  };
  uiIcon: string;
}

export function ui(
  { contentType, uiIcon }: UI,
  size: string,
  style: React.CSSProperties | undefined = undefined
) {
  // ui icon
  // TODO: component
  return (
    <svg height={size} width={size} style={style}>
      <use
        xlinkHref={`/images/svgs/aa310bd20/${contentType.name}.svg#${uiIcon}`}
      />
    </svg>
  );
}

export function up(str: string | null | undefined) {
  // uppercase
  if (typeof str === "string") {
    return str.charAt(0).toUpperCase() + str.slice(1);
  } else {
    return "None";
  }
}
