"use client";

import React, { useRef, ElementRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface PostToolbarProps {
  title: string;
  icon?: string;
  coverImage?: string;
  onTitleChange: (title: string) => void;
  onIconChange: (icon: string) => void;
  onCoverImageChange: (coverImage: string) => void;
  editable?: boolean;
}

const styles = {
  container: {
    position: "relative" as const,
    width: "100%",
  },
  coverImageWrapper: {
    position: "relative" as const,
    width: "100%",
    height: "200px",
    backgroundColor: "#f1f1f0",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  coverImagePlaceholder: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color: "#9b9a97",
    fontSize: "14px",
  },
  removeCoverButton: {
    position: "absolute" as const,
    top: "8px",
    right: "8px",
    padding: "4px 8px",
    fontSize: "12px",
    backgroundColor: "rgba(255,255,255,0.9)",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  content: {
    paddingLeft: "54px",
    paddingRight: "54px",
  },
  iconWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    paddingTop: "24px",
  },
  icon: {
    fontSize: "4rem",
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
  removeIconButton: {
    padding: "4px 8px",
    fontSize: "12px",
    backgroundColor: "transparent",
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
    cursor: "pointer",
    opacity: 0,
    transition: "opacity 0.2s",
  },
  removeIconButtonVisible: {
    opacity: 1,
  },
  actionsWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    paddingTop: "16px",
    paddingBottom: "16px",
    opacity: 0,
    transition: "opacity 0.2s",
  },
  actionsWrapperVisible: {
    opacity: 1,
  },
  actionButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 12px",
    fontSize: "12px",
    color: "#9b9a97",
    backgroundColor: "transparent",
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  titleInput: {
    width: "100%",
    fontSize: "3rem",
    fontWeight: 700,
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    resize: "none" as const,
    color: "#3F3F3F",
    lineHeight: 1.2,
  },
  titleDisplay: {
    fontSize: "3rem",
    fontWeight: 700,
    color: "#3F3F3F",
    paddingBottom: "11.5px",
    cursor: "text",
    wordBreak: "break-word" as const,
  },
};

export const PostToolbar = ({
  title,
  icon,
  coverImage,
  onTitleChange,
  onIconChange,
  onCoverImageChange,
  editable = true,
}: PostToolbarProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isIconHovered, setIsIconHovered] = useState(false);

  const enableInput = () => {
    if (!editable) return;
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTitleChange(e.target.value);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  const handleAddIcon = () => {
    const emojis = ["📝", "📚", "💡", "🚀", "⭐", "🎯", "📌", "🔥", "💻", "🎨"];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    onIconChange(randomEmoji);
  };

  const handleRemoveIcon = () => {
    onIconChange("");
  };

  const handleAddCover = () => {
    onCoverImageChange("placeholder");
  };

  const handleRemoveCover = () => {
    onCoverImageChange("");
  };

  return (
    <div
      style={styles.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {coverImage && (
        <div
          style={{
            ...styles.coverImageWrapper,
            backgroundImage: coverImage !== "placeholder" ? `url(${coverImage})` : undefined,
          }}
        >
          {coverImage === "placeholder" && (
            <div style={styles.coverImagePlaceholder}>Cover image placeholder</div>
          )}
          {editable && (
            <button
              style={styles.removeCoverButton}
              onClick={handleRemoveCover}
            >
              ✕ Remove
            </button>
          )}
        </div>
      )}

      <div style={styles.content}>
        {icon && (
          <div
            style={styles.iconWrapper}
            onMouseEnter={() => setIsIconHovered(true)}
            onMouseLeave={() => setIsIconHovered(false)}
          >
            <span
              style={{
                ...styles.icon,
                opacity: isIconHovered && editable ? 0.75 : 1,
              }}
              onClick={editable ? handleAddIcon : undefined}
              title={editable ? "Click to change icon" : undefined}
            >
              {icon}
            </span>
            {editable && (
              <button
                style={{
                  ...styles.removeIconButton,
                  ...(isIconHovered ? styles.removeIconButtonVisible : {}),
                }}
                onClick={handleRemoveIcon}
              >
                ✕
              </button>
            )}
          </div>
        )}

        {editable && (
          <div
            style={{
              ...styles.actionsWrapper,
              ...(isHovered && (!icon || !coverImage) ? styles.actionsWrapperVisible : {}),
            }}
          >
            {!icon && (
              <button style={styles.actionButton} onClick={handleAddIcon}>
                😀 Add icon
              </button>
            )}
            {!coverImage && (
              <button style={styles.actionButton} onClick={handleAddCover}>
                🖼️ Add cover
              </button>
            )}
          </div>
        )}

        {isEditing && editable ? (
          <TextareaAutosize
            ref={inputRef}
            onBlur={disableInput}
            onKeyDown={onKeyDown}
            value={title}
            onChange={handleTitleChange}
            style={styles.titleInput}
            placeholder="Untitled"
          />
        ) : (
          <div onClick={enableInput} style={styles.titleDisplay}>
            {title || "Untitled"}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostToolbar;
