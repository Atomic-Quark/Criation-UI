import React, { forwardRef, type HTMLAttributes, type ReactElement } from "react";
import { classNames } from "../core/classNames";
import { BaseResult } from "./Result";
import { BaseButton } from "../components/buttons/Button";
import { navigation } from "../routing/navigation";

export interface NotFoundPageProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  message?: string;
  homePath?: string;
  homeText?: string;
}

export const NotFoundPage = forwardRef<HTMLDivElement, NotFoundPageProps>(
  (
    {
      title = "404 - Page Not Found",
      message = "Sorry, the page you visited does not exist or has been moved.",
      homePath = "/",
      homeText = "Back to Home",
      className = "",
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={classNames("cr-not-found-page", className)}
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...style,
        }}
        {...props}
      >
        <BaseResult
          status="404"
          title={title}
          subTitle={message}
          extra={
            <BaseButton
              variant="primary"
              size="lg"
              onClick={() => navigation.navigate(homePath)}
            >
              {homeText}
            </BaseButton>
          }
        />
      </div>
    );
  }
);

NotFoundPage.displayName = "NotFoundPage";
