import styled from "styled-components";

export const ellipsis = ({
  component = null,
  clamp = 1,
}: {
  component: any;
  clamp: number;
}) => {
  if (clamp > 1) {
    return styled(component)`
      overflow: hidden;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: ${clamp};
    `;
  } else {
    return styled(component)`
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    `;
  }
};
