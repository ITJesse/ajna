import React, { useMemo, useContext, FC } from "react";
import { Button, Flex, ButtonProps } from "@chakra-ui/react";

// lib
import { SEPARATORS } from "../lib/constants";
import { PaginationContext } from "../lib/providers/PaginationProvider";

// components
import FiChevronLeft from "./FiChevronLeft";
import FiChevronRight from "./FiChevronRight";
import { Separator } from "./Separator";

export type PageProps = {
  page: number;
};

export const Page: FC<PageProps & ButtonProps> = ({ page, ...buttonProps }) => {
  // react hooks
  const { actions, state } = useContext(PaginationContext);

  // constants
  const { changePage } = actions;
  const {
    currentPage,
    isDisabled,
    activeStyles,
    hoverIconLeft,
    hoverIconRight,
    separatorStyles,
    normalStyles,
    separatorIcon,
  } = state;
  const isCurrent = currentPage === page;
  const isLeftSeparator = page === SEPARATORS.left;
  const isRightSeparator = page === SEPARATORS.right;
  const pageLabel = isCurrent
    ? `Current page, page ${page}`
    : `Go to page ${page}`;

  const baseButtonProps: ButtonProps = useMemo(
    () => ({
      minW: "auto",
      px: 1,
      pointerEvents: isDisabled ? "none" : "auto",
      cursor: "pointer",
      onClick: () => changePage(page),
    }),
    [changePage, isDisabled, page]
  );

  if (isLeftSeparator)
    return (
      <Separator
        hoverIcon={hoverIconLeft ?? FiChevronLeft}
        isDisabled={isDisabled}
        separatorIcon={separatorIcon}
        separatorPosition="left"
        separatorStyles={separatorStyles}
      />
    );

  if (isRightSeparator)
    return (
      <Separator
        hoverIcon={hoverIconRight ?? FiChevronRight}
        isDisabled={isDisabled}
        separatorIcon={separatorIcon}
        separatorPosition="right"
        separatorStyles={separatorStyles}
      />
    );

  return (
    <Flex as="li">
      <Button
        aria-label={pageLabel}
        {...(isDisabled ? { "aria-disabled": true } : {})}
        {...(isCurrent ? { "aria-current": true } : {})}
        {...baseButtonProps}
        {...buttonProps}
        {...(isCurrent ? activeStyles : normalStyles)}
      >
        {page}
      </Button>
    </Flex>
  );
};
