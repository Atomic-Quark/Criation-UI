import React, { forwardRef, useState, useRef, type InputHTMLAttributes } from "react";
import { classNames } from "../../core/classNames";
import { UploadCloud, File, CheckCircle2 } from "lucide-react";

export interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  title?: string;
  subtitle?: string;
  maxSizeMb?: number;
  onFilesSelected?: (files: FileList | null) => void;
}

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      title = "Click or drag files here to upload",
      subtitle = "SVG, PNG, JPG, or PDF (up to 10MB)",
      maxSizeMb = 10,
      onFilesSelected,
      disabled,
      className = "",
      ...props
    },
    ref
  ) => {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
    const internalInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        setSelectedFileName(e.dataTransfer.files[0].name);
        onFilesSelected?.(e.dataTransfer.files);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setSelectedFileName(e.target.files[0].name);
        onFilesSelected?.(e.target.files);
      }
      props.onChange?.(e);
    };

    return (
      <div
        className={classNames(
          "cr-file-upload",
          isDragging && "is-dragging",
          disabled && "is-disabled",
          selectedFileName && "has-file",
          className
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => internalInputRef.current?.click()}
      >
        <input
          ref={(node) => {
            (internalInputRef as any).current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as any).current = node;
          }}
          type="file"
          disabled={disabled}
          onChange={handleChange}
          className="cr-file-upload__input"
          {...props}
        />
        <div className="cr-file-upload__icon-wrapper">
          {selectedFileName ? (
            <CheckCircle2 size={32} className="cr-text-success" />
          ) : (
            <UploadCloud size={32} />
          )}
        </div>
        <div className="cr-file-upload__text">
          <p className="cr-file-upload__title">
            {selectedFileName ? selectedFileName : title}
          </p>
          <p className="cr-file-upload__subtitle">{subtitle}</p>
        </div>
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";
