import React, { useState, forwardRef, type ImgHTMLAttributes, type ReactElement, type Ref } from "react";
import { classNames } from "../../core/classNames";
import { Skeleton } from "../feedback/Skeleton";
import {
  parseImageShorthand,
  createImageFromShorthand,
  type ImageShorthandConfig,
} from "../../core/shorthand";

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  aspectRatio?: string;
  ref?: Ref<HTMLImageElement>;
}

export const BaseImage = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt = "",
      fallbackSrc,
      rounded = "md",
      aspectRatio,
      className = "",
      style,
      ...props
    },
    ref
  ) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    return (
      <div
        className={classNames(
          "cr-image-wrapper",
          `cr-image--rounded-${rounded}`,
          className
        )}
        style={{ aspectRatio, ...style }}
      >
        {isLoading && <Skeleton className="cr-image__skeleton" />}
        <img
          ref={ref}
          src={hasError && fallbackSrc ? fallbackSrc : src}
          alt={alt}
          className={classNames(
            "cr-image",
            isLoading && "is-loading",
            hasError && "has-error"
          )}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          {...props}
        />
      </div>
    );
  }
);

BaseImage.displayName = "BaseImage";

/**
 * Universal Image:
 * 1. 1-Line Shorthand (all slots optional):
 *    Image("https://picsum.photos/300/200", "300px 200px", "img_1", "Sample image", "lg")
 * 2. JSX Component:
 *    <Image src="https://picsum.photos/300/200" alt="Sample" />
 */
export function Image(props: ImageProps): ReactElement;
export function Image(
  src?: string,
  boxSize?: string,
  id?: string,
  alt?: string,
  rounded?: string,
  position?: string
): ReactElement;
export function Image(strings: TemplateStringsArray, ...values: any[]): ReactElement;
export function Image(...args: any[]): ReactElement {
  if (
    typeof args[0] === "string" ||
    (Array.isArray(args[0]) && (args[0] as any).raw) ||
    args.length === 0
  ) {
    const config = parseImageShorthand(args);
    return createImageFromShorthand(config);
  }

  const { ref, ...props } = (args[0] || {}) as ImageProps;
  return <BaseImage ref={ref} {...props} />;
}

Image.displayName = "Image";
Image.create = (config: ImageShorthandConfig) => createImageFromShorthand(config);

