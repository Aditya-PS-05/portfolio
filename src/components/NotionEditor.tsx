"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";

import "@blocknote/mantine/style.css";

interface NotionEditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

export default function NotionEditor({
  onChange,
  initialContent,
  editable = true,
}: NotionEditorProps) {
  const parsedContent = (() => {
    if (!initialContent) return undefined;
    try {
      const parsed = JSON.parse(initialContent);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed as PartialBlock[];
      }
      return undefined;
    } catch {
      return undefined;
    }
  })();

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: parsedContent,
  });

  return (
    <BlockNoteView
      editor={editor}
      editable={editable}
      onChange={() => {
        onChange(JSON.stringify(editor.document, null, 2));
      }}
      theme="light"
    />
  );
}
