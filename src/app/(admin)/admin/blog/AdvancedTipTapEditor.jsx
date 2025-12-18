'use client';

import { useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';

import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Color from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import Placeholder from '@tiptap/extension-placeholder';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import CharacterCount from '@tiptap/extension-character-count';
import Dropcursor from '@tiptap/extension-dropcursor';

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Highlighter,
  Link2,
  Image as ImageIcon,
  Table as TableIcon,
  CheckSquare,
  Undo,
  Redo,
  Upload,
  Sparkles,
  Plus,
  Minus,
  Type,
} from 'lucide-react';

export default function AdvancedTipTapEditor({ value, onChange }) {
  const [isUploading, setIsUploading] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [floatingMenuPosition, setFloatingMenuPosition] = useState({ x: 0, y: 0 });
  const [showBubbleMenu, setShowBubbleMenu] = useState(false);
  const [bubbleMenuPosition, setBubbleMenuPosition] = useState({ x: 0, y: 0 });
  
  const fileInputRef = useRef(null);
  const editorRef = useRef(null);
  const bubbleMenuRef = useRef(null);
  const floatingMenuRef = useRef(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      Color.configure({ types: [TextStyle.name, 'textStyle'] }),
      TextStyle,
      StarterKit.configure({
        table: false,
        horizontalRule: true,
      }),
      Underline,
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: true,
        linkOnPaste: true,
        HTMLAttributes: { class: 'editor-link' },
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: { 
          class: 'editor-image',
          style: 'border-radius: 12px; margin: 1.5em auto; display: block; max-width: 100%; height: auto;'
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: 'Start writing your amazing content... Use the toolbar for formatting, images, tables, and more.',
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: { 
          class: 'editor-table',
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
      TaskList.configure({
        HTMLAttributes: { class: 'editor-task-list' },
      }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: { class: 'editor-task-item' },
      }),
      CharacterCount.configure({ mode: 'textSize' }),
      Dropcursor.configure({
        width: 2,
        color: '#0ea5e9',
      }),
    ],
    content: safeParseDoc(value),
    autofocus: false,
    onUpdate({ editor }) {
      const json = editor.getJSON();
      onChange(JSON.stringify(json, null, 2));

      const text = editor.getText();
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      setWordCount(words);
    },
    onCreate({ editor }) {
      const text = editor.getText();
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      setWordCount(words);
    },
  });

  // Manual Bubble Menu Implementation
  useEffect(() => {
    if (!editor || !editorRef.current) return;

    const updateBubbleMenu = () => {
      const { state } = editor;
      const { selection } = state;
      const { empty, from, to } = selection;

      // Show bubble menu when text is selected
      if (!empty && from !== to) {
        try {
          const { view } = editor;
          const start = view.coordsAtPos(from);
          const end = view.coordsAtPos(to);
          
          const left = (start.left + end.left) / 2;
          const top = start.top - 50; // Position above selection
          
          setBubbleMenuPosition({ x: left, y: top });
          setShowBubbleMenu(true);
        } catch {
          setShowBubbleMenu(false);
        }
      } else {
        setShowBubbleMenu(false);
      }
    };

    const updateFloatingMenu = () => {
      const { state } = editor;
      const { selection } = state;
      const { empty } = selection;

      // Show floating menu when cursor is in empty paragraph
      if (empty) {
        const { view } = editor;
        const { from } = selection;
        const coords = view.coordsAtPos(from);
        
        setFloatingMenuPosition({ x: coords.left, y: coords.top - 50 });
        setShowFloatingMenu(true);
      } else {
        setShowFloatingMenu(false);
      }
    };

    const handleClickOutside = (event) => {
      if (bubbleMenuRef.current && !bubbleMenuRef.current.contains(event.target)) {
        setShowBubbleMenu(false);
      }
      if (floatingMenuRef.current && !floatingMenuRef.current.contains(event.target)) {
        setShowFloatingMenu(false);
      }
    };

    editor.on('selectionUpdate', updateBubbleMenu);
    editor.on('selectionUpdate', updateFloatingMenu);
    editor.on('focus', updateFloatingMenu);
    editor.on('blur', () => {
      setShowBubbleMenu(false);
      setShowFloatingMenu(false);
    });

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      editor.off('selectionUpdate', updateBubbleMenu);
      editor.off('selectionUpdate', updateFloatingMenu);
      editor.off('focus', updateFloatingMenu);
      editor.off('blur');
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editor]);

  const handleImageUpload = async (file) => {
    setIsUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);

      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: fd,
      });

      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      return data.url || data.filePath;
    } catch (error) {
      console.error('Image upload failed:', error);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !editor) return;

    const url = await handleImageUpload(file);
    if (url) {
      editor
        .chain()
        .focus()
        .setImage({
          src: url,
          alt: file.name,
          title: file.name,
        })
        .run();
    }

    event.target.value = '';
  };

  useEffect(() => {
    if (!editor) return;
    if (!value) return;
    try {
      const parsed = JSON.parse(value);
      editor.commands.setContent(parsed);
    } catch {
      // ignore invalid json
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div className="editor-loading">
        <div className="loading-spinner" />
        <p>Loading editor...</p>
      </div>
    );
  }

  return (
    <div className="advanced-editor" ref={editorRef}>
      {/* Top toolbar */}
      <EditorToolbar
        editor={editor}
        onImageUpload={() => fileInputRef.current?.click()}
        isUploading={isUploading}
      />

      {/* Hidden file input for image upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />

      {/* Manual Bubble Menu */}
      {showBubbleMenu && (
        <div 
          ref={bubbleMenuRef}
          className="bubble-menu"
          style={{
            position: 'fixed',
            left: bubbleMenuPosition.x,
            top: bubbleMenuPosition.y,
            transform: 'translateX(-50%)',
            zIndex: 9999,
          }}
        >
          <BubbleToolbar editor={editor} />
        </div>
      )}

      {/* Manual Floating Menu */}
      {showFloatingMenu && (
        <div 
          ref={floatingMenuRef}
          className="floating-menu"
          style={{
            position: 'fixed',
            left: floatingMenuPosition.x,
            top: floatingMenuPosition.y,
            zIndex: 9998,
          }}
        >
          <FloatingToolbar editor={editor} />
        </div>
      )}

      {/* Content */}
      <div className="editor-container">
        <div className="editor-scroll">
          <EditorContent editor={editor} className="editor-content" />
        </div>
      </div>

      {/* Status bar */}
      <EditorStatusBar
        editor={editor}
        wordCount={wordCount}
        isUploading={isUploading}
      />
    </div>
  );
}

/** Manual Bubble Toolbar */
function BubbleToolbar({ editor }) {
  if (!editor) return null;

  const isActive = (name, attrs) => editor.isActive(name, attrs);

  return (
    <div className="bubble-toolbar">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`bubble-btn ${isActive('bold') ? 'bubble-btn-active' : ''}`}
        title="Bold"
      >
        <Bold size={14} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`bubble-btn ${isActive('italic') ? 'bubble-btn-active' : ''}`}
        title="Italic"
      >
        <Italic size={14} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`bubble-btn ${isActive('underline') ? 'bubble-btn-active' : ''}`}
        title="Underline"
      >
        <UnderlineIcon size={14} />
      </button>
      <button
        type="button"
        onClick={() => {
          const prevUrl = editor.getAttributes('link').href || '';
          const url = window.prompt('Link URL', prevUrl);
          if (url === null) return;
          if (url === '') {
            editor.chain().focus().unsetLink().run();
            return;
          }
          editor.chain().focus().setLink({ href: url, target: '_blank' }).run();
        }}
        className={`bubble-btn ${isActive('link') ? 'bubble-btn-active' : ''}`}
        title="Link"
      >
        <Link2 size={14} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={`bubble-btn ${isActive('highlight') ? 'bubble-btn-active' : ''}`}
        title="Highlight"
      >
        <Highlighter size={14} />
      </button>
    </div>
  );
}

/** Manual Floating Toolbar */
function FloatingToolbar({ editor }) {
  if (!editor) return null;

  return (
    <div className="floating-toolbar">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className="floating-btn"
        title="Heading 1"
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className="floating-btn"
        title="Heading 2"
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className="floating-btn"
        title="Heading 3"
      >
        H3
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className="floating-btn"
        title="Bullet List"
      >
        <List size={14} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className="floating-btn"
        title="Numbered List"
      >
        <ListOrdered size={14} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        className="floating-btn"
        title="Task List"
      >
        <CheckSquare size={14} />
      </button>
      <button
        type="button"
        onClick={() => {
          editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
        }}
        className="floating-btn"
        title="Insert Table"
      >
        <TableIcon size={14} />
      </button>
    </div>
  );
}

function EditorToolbar({ editor, onImageUpload, isUploading }) {
  const [currentColor, setCurrentColor] = useState('#000000');

  if (!editor) return null;

  const ToolbarButton = ({
    active,
    onClick,
    icon: Icon,
    title,
    disabled = false,
    variant = 'default',
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={`
        toolbar-btn
        ${active ? 'toolbar-btn-active' : ''}
        ${disabled ? 'toolbar-btn-disabled' : ''}
        ${variant === 'danger' ? 'toolbar-btn-danger' : ''}
      `}
    >
      <Icon size={16} />
    </button>
  );

  const ToolbarSeparator = () => <div className="toolbar-separator" />;

  const ToolbarGroup = ({ children }) => (
    <div className="toolbar-group">{children}</div>
  );

  const isActive = (name, attrs = {}) => editor.isActive(name, attrs);

  const insertCtaBlock = () => {
    editor
      .chain()
      .focus()
      .insertContent({
        type: 'div',
        attrs: { class: 'cta-block' },
        content: [
          {
            type: 'paragraph',
            attrs: { class: 'cta-title' },
            content: [{ type: 'text', text: '🚀 Ready to get started?' }],
          },
          {
            type: 'paragraph',
            attrs: { class: 'cta-description' },
            content: [
              {
                type: 'text',
                text: 'Join thousands of satisfied customers today.',
              },
            ],
          },
        ],
      })
      .run();
  };

  const insertTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  const addColumn = () => {
    editor.chain().focus().addColumnAfter().run();
  };

  const addRow = () => {
    editor.chain().focus().addRowAfter().run();
  };

  const deleteColumn = () => {
    editor.chain().focus().deleteColumn().run();
  };

  const deleteRow = () => {
    editor.chain().focus().deleteRow().run();
  };

  const deleteTable = () => {
    editor.chain().focus().deleteTable().run();
  };

  return (
    <div className="editor-toolbar">
      <div className="toolbar-section">
        {/* Text formatting */}
        <ToolbarGroup>
          <ToolbarButton
            active={isActive('bold')}
            onClick={() => editor.chain().focus().toggleBold().run()}
            icon={Bold}
            title="Bold"
          />
          <ToolbarButton
            active={isActive('italic')}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            icon={Italic}
            title="Italic"
          />
          <ToolbarButton
            active={isActive('underline')}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            icon={UnderlineIcon}
            title="Underline"
          />
          <ToolbarButton
            active={isActive('strike')}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            icon={Strikethrough}
            title="Strikethrough"
          />
          <ToolbarButton
            active={isActive('highlight')}
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            icon={Highlighter}
            title="Highlight"
          />
          <ToolbarButton
            active={isActive('code')}
            onClick={() => editor.chain().focus().toggleCode().run()}
            icon={Code}
            title="Code"
          />
        </ToolbarGroup>

        <ToolbarSeparator />

        {/* Headings */}
        <ToolbarGroup>
          <ToolbarButton
            active={isActive('heading', { level: 1 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            icon={Heading1}
            title="Heading 1"
          />
          <ToolbarButton
            active={isActive('heading', { level: 2 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            icon={Heading2}
            title="Heading 2"
          />
          <ToolbarButton
            active={isActive('heading', { level: 3 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            icon={Heading3}
            title="Heading 3"
          />
        </ToolbarGroup>

        <ToolbarSeparator />

        {/* Lists */}
        <ToolbarGroup>
          <ToolbarButton
            active={isActive('bulletList')}
            onClick={() =>
              editor.chain().focus().toggleBulletList().run()
            }
            icon={List}
            title="Bullet List"
          />
          <ToolbarButton
            active={isActive('orderedList')}
            onClick={() =>
              editor.chain().focus().toggleOrderedList().run()
            }
            icon={ListOrdered}
            title="Numbered List"
          />
          <ToolbarButton
            active={isActive('taskList')}
            onClick={() =>
              editor.chain().focus().toggleTaskList().run()
            }
            icon={CheckSquare}
            title="Task List"
          />
        </ToolbarGroup>

        <ToolbarSeparator />

        {/* Align */}
        <ToolbarGroup>
          <ToolbarButton
            active={isActive({ textAlign: 'left' })}
            onClick={() =>
              editor.chain().focus().setTextAlign('left').run()
            }
            icon={AlignLeft}
            title="Align Left"
          />
          <ToolbarButton
            active={isActive({ textAlign: 'center' })}
            onClick={() =>
              editor.chain().focus().setTextAlign('center').run()
            }
            icon={AlignCenter}
            title="Align Center"
          />
          <ToolbarButton
            active={isActive({ textAlign: 'right' })}
            onClick={() =>
              editor.chain().focus().setTextAlign('right').run()
            }
            icon={AlignRight}
            title="Align Right"
          />
        </ToolbarGroup>

        <ToolbarSeparator />

        {/* Insert */}
        <ToolbarGroup>
          <ToolbarButton
            active={isActive('link')}
            onClick={() => {
              const prevUrl = editor.getAttributes('link').href || '';
              const url = window.prompt('URL', prevUrl);
              if (url === null) return;
              if (url === '') {
                editor.chain().focus().unsetLink().run();
                return;
              }
              editor.chain().focus().setLink({ href: url }).run();
            }}
            icon={Link2}
            title="Insert Link"
          />
          <ToolbarButton
            onClick={onImageUpload}
            icon={isUploading ? Upload : ImageIcon}
            title={isUploading ? 'Uploading...' : 'Upload Image'}
            disabled={isUploading}
          />
          <ToolbarButton
            active={isActive('table')}
            onClick={insertTable}
            icon={TableIcon}
            title="Insert Table"
          />
          <ToolbarButton
            onClick={insertCtaBlock}
            icon={Sparkles}
            title="Insert CTA Block"
          />
        </ToolbarGroup>

        <ToolbarSeparator />

        {/* Table Controls */}
        {isActive('table') && (
          <>
            <ToolbarGroup>
              <ToolbarButton
                onClick={addColumn}
                icon={Plus}
                title="Add Column"
              />
              <ToolbarButton
                onClick={addRow}
                icon={Plus}
                title="Add Row"
              />
              <ToolbarButton
                onClick={deleteColumn}
                icon={Minus}
                title="Delete Column"
                variant="danger"
              />
              <ToolbarButton
                onClick={deleteRow}
                icon={Minus}
                title="Delete Row"
                variant="danger"
              />
              <ToolbarButton
                onClick={deleteTable}
                icon={TableIcon}
                title="Delete Table"
                variant="danger"
              />
            </ToolbarGroup>
            <ToolbarSeparator />
          </>
        )}

        {/* Color */}
        <ToolbarGroup>
          <div className="color-picker-wrapper">
            <input
              type="color"
              value={currentColor}
              onChange={(e) => {
                setCurrentColor(e.target.value);
                editor.chain().focus().setColor(e.target.value).run();
              }}
              className="color-picker"
              title="Text Color"
            />
          </div>
        </ToolbarGroup>

        <ToolbarSeparator />

        {/* History */}
        <ToolbarGroup>
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            icon={Undo}
            title="Undo"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            icon={Redo}
            title="Redo"
          />
        </ToolbarGroup>
      </div>
    </div>
  );
}

function EditorStatusBar({ editor, wordCount, isUploading }) {
  if (!editor) return null;

  const characters = editor.storage.characterCount?.characters() || 0;

  return (
    <div className="editor-status-bar">
      <div className="status-left">
        <div className="status-item">
          <span className="status-label">Words:</span>
          <span className="status-value">{wordCount}</span>
        </div>
        <div className="status-item">
          <span className="status-label">Characters:</span>
          <span className="status-value">{characters}</span>
        </div>
        {isUploading && (
          <div className="status-item">
            <span className="uploading-indicator">Uploading image...</span>
          </div>
        )}
      </div>
      <div className="status-right">
        <div className="status-item">
          <span className="status-label">Mode:</span>
          <span className="status-value">Rich Text</span>
        </div>
      </div>
    </div>
  );
}

function safeParseDoc(str) {
  if (!str) {
    return {
      type: 'doc',
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: '' }] },
      ],
    };
  }
  try {
    return JSON.parse(str);
  } catch {
    return {
      type: 'doc',
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: '' }] },
      ],
    };
  }
}

/* ---------- ENHANCED GLOBAL STYLES ---------- */

// const styles = `
// /* Advanced Editor Global Styles */
// .advanced-editor {
//   border: 1px solid #e2e8f0;
//   border-radius: 12px;
//   background: white;
//   overflow: hidden;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//   font-family: 'Inter', system-ui, -apple-system, sans-serif;
// }

// /* Toolbar */
// .editor-toolbar {
//   background: linear-gradient(to bottom, #f8fafc, #f1f5f9);
//   border-bottom: 1px solid #e2e8f0;
//   padding: 12px 16px;
// }

// .toolbar-section {
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   flex-wrap: wrap;
// }

// .toolbar-group {
//   display: flex;
//   align-items: center;
//   gap: 2px;
//   background: white;
//   border: 1px solid #e2e8f0;
//   border-radius: 8px;
//   padding: 4px;
// }

// .toolbar-btn {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 32px;
//   height: 32px;
//   border: none;
//   border-radius: 6px;
//   background: transparent;
//   color: #64748b;
//   cursor: pointer;
//   transition: all 0.2s ease;
// }

// .toolbar-btn:hover {
//   background: #f1f5f9;
//   color: #334155;
// }

// .toolbar-btn-active {
//   background: #0ea5e9;
//   color: white;
// }

// .toolbar-btn-disabled {
//   opacity: 0.5;
//   cursor: not-allowed;
// }

// .toolbar-btn-danger:hover {
//   background: #ef4444;
//   color: white;
// }

// .toolbar-separator {
//   width: 1px;
//   height: 24px;
//   background: #e2e8f0;
//   margin: 0 4px;
// }

// /* Manual Bubble Menu */
// .bubble-menu {
//   background: #1e293b;
//   border: none;
//   border-radius: 8px;
//   padding: 6px;
//   box-shadow: 0 10px 25px rgba(15, 23, 42, 0.45);
//   backdrop-filter: blur(8px);
// }

// .bubble-toolbar {
//   display: flex;
//   gap: 2px;
//   align-items: center;
// }

// .bubble-btn {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 28px;
//   height: 28px;
//   border: none;
//   border-radius: 6px;
//   background: transparent;
//   color: #cbd5e1;
//   cursor: pointer;
//   transition: all 0.2s ease;
// }

// .bubble-btn:hover {
//   background: #334155;
//   color: white;
// }

// .bubble-btn-active {
//   background: #0ea5e9;
//   color: white;
// }

// /* Manual Floating Menu */
// .floating-menu {
//   background: #1e293b;
//   border: none;
//   border-radius: 8px;
//   padding: 6px;
//   box-shadow: 0 10px 25px rgba(15, 23, 42, 0.45);
//   backdrop-filter: blur(8px);
// }

// .floating-toolbar {
//   display: flex;
//   gap: 2px;
//   align-items: center;
// }

// .floating-btn {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 32px;
//   height: 28px;
//   border: none;
//   border-radius: 6px;
//   background: transparent;
//   color: #cbd5e1;
//   cursor: pointer;
//   font-size: 12px;
//   font-weight: 600;
//   transition: all 0.2s ease;
// }

// .floating-btn:hover {
//   background: #334155;
//   color: white;
// }

// /* Color picker */
// .color-picker-wrapper {
//   padding: 2px;
// }

// .color-picker {
//   width: 28px;
//   height: 28px;
//   border: 1px solid #e2e8f0;
//   border-radius: 6px;
//   cursor: pointer;
//   background: transparent;
// }

// .color-picker::-webkit-color-swatch-wrapper {
//   padding: 0;
// }

// .color-picker::-webkit-color-swatch {
//   border: none;
//   border-radius: 4px;
// }

// /* Editor container */
// .editor-container {
//   position: relative;
//   background: white;
// }

// .editor-scroll {
//   min-height: 400px;
//   max-height: 600px;
//   overflow-y: auto;
//   padding: 20px;
// }

// .editor-content {
//   max-width: 800px;
//   margin: 0 auto;
//   font-family: 'Inter', system-ui, -apple-system, sans-serif;
//   font-size: 16px;
//   line-height: 1.7;
//   color: #1e293b;
// }

// .editor-content .ProseMirror {
//   outline: none;
//   min-height: 300px;
//   padding: 0;
// }

// /* Enhanced Typography matching blog styling */
// .editor-content .ProseMirror h1 {
//   font-size: 2.25em;
//   font-weight: 700;
//   line-height: 1.2;
//   margin: 1.5em 0 0.5em;
//   color: #0f172a;
//   border-bottom: 2px solid #0ea5e9;
//   padding-bottom: 0.5em;
// }

// .editor-content .ProseMirror h2 {
//   font-size: 1.875em;
//   font-weight: 600;
//   line-height: 1.3;
//   margin: 1.5em 0 0.5em;
//   color: #0f172a;
//   border-left: 4px solid #0ea5e9;
//   padding-left: 0.75em;
// }

// .editor-content .ProseMirror h3 {
//   font-size: 1.5em;
//   font-weight: 600;
//   line-height: 1.4;
//   margin: 1.5em 0 0.5em;
//   color: #0f172a;
//   background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
//   padding: 0.75em 1em;
//   border-radius: 8px;
// }

// .editor-content .ProseMirror h4 {
//   font-size: 1.25em;
//   font-weight: 600;
//   margin: 1.25em 0 0.5em;
//   color: #334155;
// }

// .editor-content .ProseMirror h5 {
//   font-size: 1.1em;
//   font-weight: 600;
//   margin: 1em 0 0.5em;
//   color: #475569;
//   text-transform: uppercase;
//   letter-spacing: 0.05em;
// }

// .editor-content .ProseMirror h6 {
//   font-size: 1em;
//   font-weight: 600;
//   margin: 1em 0 0.5em;
//   color: #64748b;
//   font-style: italic;
// }

// .editor-content .ProseMirror p {
//   margin-bottom: 1.25em;
//   color: #374151;
//   line-height: 1.7;
// }

// .editor-content .ProseMirror strong {
//   color: #0f172a;
//   font-weight: 700;
// }

// .editor-content .ProseMirror em {
//   color: #475569;
//   font-style: italic;
// }

// /* Lists with enhanced styling */
// .editor-content .ProseMirror ul,
// .editor-content .ProseMirror ol {
//   margin: 1.25em 0;
//   padding-left: 1.75em;
// }

// .editor-content .ProseMirror li {
//   margin: 0.5em 0;
//   color: #374151;
// }

// .editor-content .ProseMirror ul {
//   list-style-type: none;
// }

// .editor-content .ProseMirror ul li::before {
//   content: "•";
//   color: #0ea5e9;
//   font-weight: bold;
//   display: inline-block;
//   width: 1em;
//   margin-left: -1em;
// }

// .editor-content .ProseMirror ol {
//   list-style-type: decimal;
// }

// .editor-content .ProseMirror ol li::marker {
//   color: #0ea5e9;
//   font-weight: 600;
// }

// /* Blockquote with gradient */
// .editor-content .ProseMirror blockquote {
//   border-left: 4px solid #0ea5e9;
//   background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
//   padding: 1.5em 2em;
//   margin: 2em 0;
//   border-radius: 0 12px 12px 0;
//   font-style: italic;
//   color: #334155;
//   position: relative;
// }

// .editor-content .ProseMirror blockquote::before {
//   content: """;
//   font-size: 3em;
//   color: #0ea5e9;
//   position: absolute;
//   left: 10px;
//   top: -10px;
//   opacity: 0.3;
//   font-family: serif;
// }

// /* Code blocks with syntax highlighting style */
// .editor-content .ProseMirror code {
//   background: #f1f5f9;
//   color: #dc2626;
//   padding: 0.2em 0.4em;
//   border-radius: 4px;
//   font-size: 0.85em;
//   font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
//   border: 1px solid #e2e8f0;
// }

// .editor-content .ProseMirror pre {
//   background: #1e293b;
//   color: #e2e8f0;
//   padding: 1.5em;
//   border-radius: 12px;
//   overflow-x: auto;
//   margin: 1.5em 0;
//   font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
//   border: 1px solid #334155;
//   position: relative;
// }

// .editor-content .ProseMirror pre::before {
//   content: "";
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   height: 2px;
//   background: linear-gradient(90deg, #0ea5e9, #6366f1);
//   border-radius: 12px 12px 0 0;
// }

// .editor-content .ProseMirror pre code {
//   background: none;
//   color: inherit;
//   padding: 0;
//   border: none;
//   font-size: 0.9em;
// }

// /* Links with modern styling */
// .editor-link {
//   color: #0ea5e9;
//   text-decoration: none;
//   border-bottom: 1px solid #0ea5e9;
//   transition: all 0.2s ease;
//   font-weight: 500;
// }

// .editor-link:hover {
//   color: #0369a1;
//   border-bottom-color: #0369a1;
//   background: #f0f9ff;
// }

// /* Images with caption style */
// .editor-image {
//   max-width: 100%;
//   height: auto;
//   border-radius: 12px;
//   margin: 2em auto;
//   display: block;
//   box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
//   border: 1px solid #e2e8f0;
// }

// /* Enhanced Tables */
// .editor-table {
//   width: 100%;
//   border-collapse: collapse;
//   margin: 2em 0;
//   border-radius: 12px;
//   overflow: hidden;
//   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
//   background: white;
// }

// .editor-table th,
// .editor-table td {
//   border: 1px solid #e2e8f0;
//   padding: 12px 16px;
//   text-align: left;
// }

// .editor-table th {
//   background: linear-gradient(135deg, #0ea5e9, #0369a1);
//   color: white;
//   font-weight: 600;
//   text-transform: uppercase;
//   font-size: 0.85em;
//   letter-spacing: 0.05em;
// }

// .editor-table tr:nth-child(even) {
//   background: #f8fafc;
// }

// .editor-table tr:hover {
//   background: #f0f9ff;
// }

// /* Task Lists */
// .editor-task-list {
//   list-style: none;
//   padding: 0;
//   margin: 1.5em 0;
// }

// .editor-task-item {
//   display: flex;
//   align-items: flex-start;
//   gap: 12px;
//   margin: 0.75em 0;
//   padding: 0.5em;
//   border-radius: 8px;
//   transition: background 0.2s ease;
// }

// .editor-task-item:hover {
//   background: #f8fafc;
// }

// .editor-task-item label {
//   display: flex;
//   align-items: center;
//   margin: 0;
//   cursor: pointer;
// }

// .editor-task-item input[type="checkbox"] {
//   margin: 0;
//   cursor: pointer;
//   width: 18px;
//   height: 18px;
//   border: 2px solid #cbd5e1;
//   border-radius: 4px;
// }

// .editor-task-item input[type="checkbox"]:checked {
//   background: #0ea5e9;
//   border-color: #0ea5e9;
// }

// /* CTA Block */
// .cta-block {
//   background: linear-gradient(135deg, #0ea5e9, #0369a1);
//   border-radius: 16px;
//   padding: 2.5em;
//   margin: 2.5em 0;
//   text-align: center;
//   color: white;
//   position: relative;
//   overflow: hidden;
// }

// .cta-block::before {
//   content: "";
//   position: absolute;
//   top: -50%;
//   left: -50%;
//   width: 200%;
//   height: 200%;
//   background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
//   background-size: 20px 20px;
//   animation: float 6s ease-in-out infinite;
// }

// @keyframes float {
//   0%, 100% { transform: translateY(0px) rotate(0deg); }
//   50% { transform: translateY(-10px) rotate(1deg); }
// }

// .cta-title {
//   font-size: 1.5em;
//   font-weight: 700;
//   margin-bottom: 0.75em !important;
//   color: white !important;
//   position: relative;
//   z-index: 2;
// }

// .cta-description {
//   font-size: 1.1em;
//   opacity: 0.95;
//   margin-bottom: 0 !important;
//   color: white !important;
//   position: relative;
//   z-index: 2;
// }

// /* Status bar */
// .editor-status-bar {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 12px 16px;
//   background: #f8fafc;
//   border-top: 1px solid #e2e8f0;
//   font-size: 12px;
//   color: #64748b;
// }

// .status-left,
// .status-right {
//   display: flex;
//   gap: 16px;
// }

// .status-item {
//   display: flex;
//   align-items: center;
//   gap: 4px;
// }

// .status-label {
//   font-weight: 500;
// }

// .status-value {
//   font-weight: 600;
//   color: #334155;
// }

// .uploading-indicator {
//   color: #0ea5e9;
//   font-weight: 500;
//   display: flex;
//   align-items: center;
//   gap: 4px;
// }

// .uploading-indicator::before {
//   content: "";
//   width: 8px;
//   height: 8px;
//   border-radius: 50%;
//   background: #0ea5e9;
//   animation: pulse 1.5s ease-in-out infinite;
// }

// @keyframes pulse {
//   0%, 100% { opacity: 1; }
//   50% { opacity: 0.5; }
// }

// /* Loading */
// .editor-loading {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   padding: 3em;
//   color: #64748b;
//   background: #f8fafc;
//   border-radius: 12px;
// }

// .loading-spinner {
//   width: 32px;
//   height: 32px;
//   border: 3px solid #e2e8f0;
//   border-top: 3px solid #0ea5e9;
//   border-radius: 50%;
//   animation: spin 1s linear infinite;
//   margin-bottom: 1em;
// }

// @keyframes spin {
//   0% { transform: rotate(0deg); }
//   100% { transform: rotate(360deg); }
// }

// /* Placeholder */
// .editor-content .ProseMirror p.is-editor-empty:first-child::before {
//   content: attr(data-placeholder);
//   float: left;
//   color: #94a3b8;
//   pointer-events: none;
//   height: 0;
//   font-style: italic;
// }

// /* Selected node */
// .editor-content .ProseMirror .ProseMirror-selectednode {
//   outline: 2px solid #0ea5e9;
//   border-radius: 6px;
//   transition: outline 0.2s ease;
// }

// /* Horizontal Rule */
// .editor-content .ProseMirror hr {
//   border: none;
//   border-top: 2px solid #e2e8f0;
//   margin: 2em 0;
//   position: relative;
// }

// .editor-content .ProseMirror hr::after {
//   content: "§";
//   position: absolute;
//   top: -12px;
//   left: 50%;
//   transform: translateX(-50%);
//   background: white;
//   padding: 0 1em;
//   color: #94a3b8;
//   font-size: 0.8em;
// }

// /* Responsive */
// @media (max-width: 768px) {
//   .editor-toolbar {
//     padding: 8px 12px;
//   }
//   .toolbar-section {
//     gap: 4px;
//   }
//   .toolbar-group {
//     padding: 2px;
//   }
//   .toolbar-btn {
//     width: 28px;
//     height: 28px;
//   }
//   .editor-scroll {
//     padding: 16px;
//     max-height: 500px;
//   }
//   .editor-content {
//     font-size: 14px;
//   }
//   .editor-status-bar {
//     flex-direction: column;
//     gap: 8px;
//     align-items: flex-start;
//   }
//   .bubble-menu, .floating-menu {
//     transform: scale(0.9);
//   }
// }

// /* Focus styles */
// .editor-content .ProseMirror:focus {
//   outline: none;
// }

// .editor-content .ProseMirror > * + * {
//   margin-top: 0.75em;
// }

// /* Task list specific styles */
// .editor-content .ProseMirror ul[data-type="taskList"] {
//   list-style: none;
//   padding: 0;
// }

// .editor-content .ProseMirror ul[data-type="taskList"] li {
//   display: flex;
//   align-items: flex-start;
// }

// .editor-content .ProseMirror ul[data-type="taskList"] li > label {
//   flex: 0 0 auto;
//   margin-right: 0.5rem;
//   user-select: none;
// }

// .editor-content .ProseMirror ul[data-type="taskList"] li > div {
//   flex: 1 1 auto;
// }

// /* Text alignment classes */
// .editor-content .ProseMirror .text-align-left {
//   text-align: left;
// }

// .editor-content .ProseMirror .text-align-center {
//   text-align: center;
// }

// .editor-content .ProseMirror .text-align-right {
//   text-align: right;
// }

// /* Highlight styles */
// .editor-content .ProseMirror mark {
//   background: #fef3c7;
//   padding: 0.1em 0.2em;
//   border-radius: 0.25em;
// }

// .editor-content .ProseMirror mark[data-color="red"] {
//   background: #fecaca;
// }

// .editor-content .ProseMirror mark[data-color="green"] {
//   background: #bbf7d0;
// }

// .editor-content .ProseMirror mark[data-color="blue"] {
//   background: #bfdbfe;
// }

// .editor-content .ProseMirror mark[data-color="yellow"] {
//   background: #fef3c7;
// }
// `;

// Inject styles globally
// if (typeof document !== 'undefined') {
//   if (!document.getElementById('advanced-tiptap-styles')) {
//     const styleSheet = document.createElement('style');
//     styleSheet.id = 'advanced-tiptap-styles';
//     styleSheet.textContent = styles;
//     document.head.appendChild(styleSheet);
//   }
// }