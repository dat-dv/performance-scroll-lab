import { ReactNode, CSSProperties } from "react";

export interface IVirtualGridFixedProps<T> {
  data: T[][];
  columnWidth: number;
  rowHeight: number;
  overscan?: number;
  className?: string;
  style?: CSSProperties;
  children: (props: { item: T; rowIndex: number; columnIndex: number }) => ReactNode;
  height: number | string;
}
