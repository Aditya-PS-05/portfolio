"use client";

import { useState, useCallback, KeyboardEvent, useRef, useEffect } from "react";

interface OutlineItem {
  id: string;
  content: string;
  children: OutlineItem[];
  collapsed: boolean;
}

interface OutlinerEditorProps {
  initialData?: OutlineItem[];
  onChange?: (data: OutlineItem[]) => void;
  title?: string;
  onTitleChange?: (title: string) => void;
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

function parseMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.+?)__/g, '<em>$1</em>')
    .replace(/--(.+?)--/g, '<del>$1</del>')
    .replace(/==(.+?)==/g, '<mark>$1</mark>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

function OutlineNode({
  item,
  depth,
  onUpdate,
  onDelete,
  onIndent,
  onUnindent,
  onNewItem,
  onToggleCollapse,
  focusedId,
  setFocusedId,
}: {
  item: OutlineItem;
  depth: number;
  onUpdate: (id: string, content: string) => void;
  onDelete: (id: string) => void;
  onIndent: (id: string) => void;
  onUnindent: (id: string) => void;
  onNewItem: (afterId: string) => string;
  onToggleCollapse: (id: string) => void;
  focusedId: string | null;
  setFocusedId: (id: string | null) => void;
}) {
  const inputRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (focusedId === item.id && inputRef.current) {
      inputRef.current.focus();
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(inputRef.current);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [focusedId, item.id]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const newId = onNewItem(item.id);
      setFocusedId(newId);
    } else if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      onIndent(item.id);
    } else if (e.key === "Tab" && e.shiftKey) {
      e.preventDefault();
      onUnindent(item.id);
    } else if (e.key === "Backspace" && item.content === "") {
      e.preventDefault();
      onDelete(item.id);
    }
  };

  const handleInput = () => {
    if (inputRef.current) {
      onUpdate(item.id, inputRef.current.innerText);
    }
  };

  return (
    <div className="outline-node" style={{ marginLeft: depth * 24 }}>
      <div className="outline-item">
        {item.children.length > 0 && (
          <button
            className="collapse-btn"
            onClick={() => onToggleCollapse(item.id)}
          >
            {item.collapsed ? "▶" : "▼"}
          </button>
        )}
        <span className="bullet">•</span>
        <div
          ref={inputRef}
          className={`outline-content ${isEditing ? "editing" : ""}`}
          contentEditable
          suppressContentEditableWarning
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          onFocus={() => {
            setIsEditing(true);
            setFocusedId(item.id);
          }}
          onBlur={() => setIsEditing(false)}
          dangerouslySetInnerHTML={{
            __html: isEditing ? item.content : parseMarkdown(item.content),
          }}
        />
      </div>
      {!item.collapsed &&
        item.children.map((child) => (
          <OutlineNode
            key={child.id}
            item={child}
            depth={depth + 1}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onIndent={onIndent}
            onUnindent={onUnindent}
            onNewItem={onNewItem}
            onToggleCollapse={onToggleCollapse}
            focusedId={focusedId}
            setFocusedId={setFocusedId}
          />
        ))}
    </div>
  );
}

export default function OutlinerEditor({
  initialData,
  onChange,
  title = "Untitled",
  onTitleChange,
}: OutlinerEditorProps) {
  const [items, setItems] = useState<OutlineItem[]>(
    initialData || [{ id: generateId(), content: "", children: [], collapsed: false }]
  );
  const [docTitle, setDocTitle] = useState(title);
  const [focusedId, setFocusedId] = useState<string | null>(null);

  const updateItems = useCallback(
    (newItems: OutlineItem[]) => {
      setItems(newItems);
      onChange?.(newItems);
    },
    [onChange]
  );

  const findAndUpdate = (
    items: OutlineItem[],
    id: string,
    updater: (item: OutlineItem) => OutlineItem | null
  ): OutlineItem[] => {
    const result: OutlineItem[] = [];
    for (const item of items) {
      if (item.id === id) {
        const updated = updater(item);
        if (updated) result.push(updated);
      } else {
        result.push({
          ...item,
          children: findAndUpdate(item.children, id, updater),
        });
      }
    }
    return result;
  };

  const findParentAndIndex = (
    items: OutlineItem[],
    id: string,
    parent: OutlineItem[] | null = null,
    parentItem: OutlineItem | null = null
  ): { parent: OutlineItem[] | null; parentItem: OutlineItem | null; index: number } | null => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        return { parent: items, parentItem, index: i };
      }
      const found = findParentAndIndex(items[i].children, id, items[i].children, items[i]);
      if (found) return found;
    }
    return null;
  };

  const handleUpdate = (id: string, content: string) => {
    updateItems(findAndUpdate(items, id, (item) => ({ ...item, content })));
  };

  const handleDelete = (id: string) => {
    const location = findParentAndIndex(items, id);
    if (!location) return;
    
    const newItems = findAndUpdate(items, id, () => null);
    if (newItems.length === 0) {
      updateItems([{ id: generateId(), content: "", children: [], collapsed: false }]);
    } else {
      updateItems(newItems);
    }
  };

  const handleNewItem = (afterId: string): string => {
    const newId = generateId();
    const location = findParentAndIndex(items, afterId);
    if (!location) return newId;

    const newItem: OutlineItem = { id: newId, content: "", children: [], collapsed: false };
    
    const insertAfter = (items: OutlineItem[], id: string): OutlineItem[] => {
      const result: OutlineItem[] = [];
      for (const item of items) {
        result.push({
          ...item,
          children: insertAfter(item.children, id),
        });
        if (item.id === id) {
          result.push(newItem);
        }
      }
      return result;
    };

    updateItems(insertAfter(items, afterId));
    return newId;
  };

  const handleIndent = (id: string) => {
    const location = findParentAndIndex(items, id);
    if (!location || location.index === 0) return;

    const { parent, index } = location;
    if (!parent) return;

    const itemToMove = parent[index];
    const prevSibling = parent[index - 1];

    const newItems = findAndUpdate(items, prevSibling.id, (item) => ({
      ...item,
      children: [...item.children, itemToMove],
      collapsed: false,
    }));

    updateItems(findAndUpdate(newItems, id, () => null));
  };

  const handleUnindent = (id: string) => {
    const location = findParentAndIndex(items, id);
    if (!location || !location.parentItem) return;

    const { parentItem, index, parent } = location;
    if (!parent) return;

    const itemToMove = parent[index];
    const grandparentLocation = findParentAndIndex(items, parentItem.id);
    if (!grandparentLocation) return;

    let newItems = findAndUpdate(items, id, () => null);
    
    const insertAfterParent = (items: OutlineItem[], parentId: string): OutlineItem[] => {
      const result: OutlineItem[] = [];
      for (const item of items) {
        result.push({
          ...item,
          children: insertAfterParent(item.children, parentId),
        });
        if (item.id === parentId) {
          result.push(itemToMove);
        }
      }
      return result;
    };

    updateItems(insertAfterParent(newItems, parentItem.id));
  };

  const handleToggleCollapse = (id: string) => {
    updateItems(
      findAndUpdate(items, id, (item) => ({ ...item, collapsed: !item.collapsed }))
    );
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocTitle(e.target.value);
    onTitleChange?.(e.target.value);
  };

  return (
    <div className="outliner-editor">
      <input
        type="text"
        className="outliner-title"
        value={docTitle}
        onChange={handleTitleChange}
        placeholder="Untitled"
      />
      <div className="outliner-content">
        {items.map((item) => (
          <OutlineNode
            key={item.id}
            item={item}
            depth={0}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onIndent={handleIndent}
            onUnindent={handleUnindent}
            onNewItem={handleNewItem}
            onToggleCollapse={handleToggleCollapse}
            focusedId={focusedId}
            setFocusedId={setFocusedId}
          />
        ))}
      </div>
      <div className="outliner-help">
        <p><kbd>Enter</kbd> New item • <kbd>Tab</kbd> Indent • <kbd>Shift+Tab</kbd> Unindent • <kbd>Backspace</kbd> Delete empty</p>
        <p><code>**bold**</code> <code>__italic__</code> <code>--strike--</code> <code>==highlight==</code> <code>`code`</code></p>
      </div>
    </div>
  );
}
