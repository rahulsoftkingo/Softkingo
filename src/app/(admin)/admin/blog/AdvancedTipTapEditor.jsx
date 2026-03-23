// src/app/(admin)/AdvancedTipTapEditor.jsx
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

// NOTE: if this import errors, change to:
// import Table from '@tiptap/extension-table';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';

import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import CharacterCount from '@tiptap/extension-character-count';
import Dropcursor from '@tiptap/extension-dropcursor';
import FontFamily from '@tiptap/extension-font-family';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Typography from '@tiptap/extension-typography';
import { Node, mergeAttributes } from '@tiptap/core';

// Custom Summary Block
const SummaryBlock = Node.create({
  name: 'summaryBlock',
  group: 'block',
  content: 'inline*',
  parseHTML() {
    return [{ tag: 'div.blog-summary-block' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { class: 'blog-summary-block' }), 0];
  },
  addCommands() {
    return {
      toggleSummary: () => ({ commands }) => {
        return commands.toggleNode('summaryBlock', 'paragraph');
      },
    };
  },
});

// Custom Blog CTA Block
const BlogCTA = Node.create({
  name: 'blogCTA',
  group: 'block',
  atom: true,
  addAttributes() {
    return {
      title: { default: 'Ready to Transform Your Business?' },
      description: { default: 'Partner with Softkingo for premium software solutions tailored to your success.' },
      buttonText: { default: 'Get Started' },
      buttonLink: { default: 'https://softkingo.com/contact' },
      image: { default: '/images/logo.png' },
      variant: { default: 'standard' },
    };
  },
  parseHTML() {
    return [{ tag: 'div[data-type="blog-cta"]' }];
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'blog-cta',
        'data-variant': node.attrs.variant || 'standard',
        class: 'blog-cta-editor-preview'
      }),
      ['div', { class: 'cta-preview-image' },
        ['img', { src: node.attrs.image || '/images/logo.png', alt: 'CTA Preview' }]
      ],
      ['div', { class: 'cta-preview-info' },
        ['h4', {}, node.attrs.title],
        ['p', {}, node.attrs.description],
        ['div', { class: 'cta-preview-btn' }, node.attrs.buttonText]
      ],
    ];
  },
  addCommands() {
    return {
      insertCTA: (attrs) => ({ commands }) => {
        return commands.insertContent({ type: this.name, attrs });
      },
    };
  },
});

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Highlighter,
  Link2,
  Image as ImageIcon,
  Table as TableIcon,
  CheckSquare,
  Undo,
  Redo,
  Upload,
  Plus,
  Minus,
  Type,
  Palette,
  Save,
  Subscript as SubIcon,
  Superscript as SupIcon,
  Text as TextIcon,
  Quote,
  Zap,
  Loader2,
  Trash2,
  Layout,
  Columns,
  Rows,
} from 'lucide-react';

export default function AdvancedTipTapEditor({ value, onChange }) {
  const [mounted, setMounted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontPicker, setShowFontPicker] = useState(false);
  const [showFontSizePicker, setShowFontSizePicker] = useState(false);

  const [currentColor, setCurrentColor] = useState('#000000');
  const [currentFont, setCurrentFont] = useState('Inter');
  const [currentFontSize, setCurrentFontSize] = useState('16px');

  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef(null);
  const editorRef = useRef(null);
  const colorPickerRef = useRef(null);
  const fontPickerRef = useRef(null);
  const fontSizePickerRef = useRef(null);
  const headingPickerRef = useRef(null);

  const [showHeadingPicker, setShowHeadingPicker] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      Color.configure({ types: [TextStyle.name, 'textStyle'] }),
      TextStyle,
      FontFamily.configure({ types: ['textStyle'] }),

      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
        history: false, // Using our own or keeping it simple
        dropcursor: false, // Already in StarterKit or we configure below
      }),

      Underline,
      Subscript,
      Superscript,
      Typography,

      Highlight.configure({ multicolor: true }),

      Link.configure({
        openOnClick: false,
        linkOnPaste: true,
        autolink: true,
        HTMLAttributes: {
          class: 'editor-link',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),

      Image.configure({
        inline: true,
        allowBase64: false,
        HTMLAttributes: { class: 'editor-image' },
      }),

      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),

      Placeholder.configure({
        placeholder: ({ node }) => {
          // ✅ since H1 removed, title can be H2
          if (node.type.name === 'heading') return "What's the title?";
          return 'Start writing your amazing content...';
        },
      }),

      Table.configure({
        resizable: true,
        handleWidth: 5,
        cellMinWidth: 60,
        HTMLAttributes: { class: 'editor-table' },
      }),
      TableRow,
      TableHeader,
      TableCell,

      TaskList.configure({ HTMLAttributes: { class: 'editor-task-list' } }),
      TaskItem.configure({ nested: true, HTMLAttributes: { class: 'editor-task-item' } }),

      SummaryBlock,
      BlogCTA,

      CharacterCount.configure({ mode: 'textSize' }),
      Dropcursor.configure({ width: 3, color: '#0ea5e9' }),
    ],
    content: safeParseDoc(value),
    autofocus: 'end',
    editorProps: {
      attributes: {
        // NOTE: keep simple class; styling should be in global css
        class: 'prose max-w-none focus:outline-none',
        spellcheck: 'true',
      },
      transformPastedHTML(html) {
        return html
          .replace(/<meta[^>]*>/g, '')
          .replace(/<style[^>]*>.*?<\/style>/gs, '')
          .replace(/class="[^"]*"/g, '')
          .replace(/style="[^"]*"/g, '');
      },
    },
    onUpdate({ editor }) {
      const json = editor.getJSON();
      onChange?.(JSON.stringify(json));
      updateWordCount(editor);

      setIsSaving(true);
      setTimeout(() => setIsSaving(false), 800);
    },
    onCreate({ editor }) {
      updateWordCount(editor);
    },
  });

  const updateWordCount = (ed) => {
    const text = ed.getText();
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    setWordCount(words);
  };

  // Keyboard shortcuts
  useEffect(() => {
    if (!editor) return;

    const handleKeyDown = (e) => {
      // Ctrl/Cmd + K => link
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setLinkPrompt();
      }

      // Ctrl/Cmd + Shift + 7 => ordered list
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === '7') {
        e.preventDefault();
        editor.chain().focus().toggleOrderedList().run();
      }

      // Ctrl/Cmd + Shift + 8 => bullet list
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === '8') {
        e.preventDefault();
        editor.chain().focus().toggleBulletList().run();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [editor]);

  // Click outside popovers
  useEffect(() => {
    const onDown = (e) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target)) setShowColorPicker(false);
      if (fontPickerRef.current && !fontPickerRef.current.contains(e.target)) setShowFontPicker(false);
      if (fontSizePickerRef.current && !fontSizePickerRef.current.contains(e.target)) setShowFontSizePicker(false);
      if (headingPickerRef.current && !headingPickerRef.current.contains(e.target)) setShowHeadingPicker(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleImageUpload = async (file) => {
    setIsUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'blog');

      const res = await fetch('/api/admin/media/upload', { method: 'POST', body: fd });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      return data.url;
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Image upload failed. Please try again.');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !editor) return;

    const url = await handleImageUpload(file);
    if (url) editor.chain().focus().setImage({ src: url, alt: file.name }).run();

    event.target.value = '';
  };

  const setLinkPrompt = () => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href || '';
    const url = window.prompt('Enter URL:', previousUrl);
    if (url === null) return;

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url, target: '_blank' }).run();
  };

  // Font size helper using TextStyle mark
  const applyFontSize = (size) => {
    if (!editor) return;
    editor.chain().focus().setMark('textStyle', { fontSize: size }).run();
    setCurrentFontSize(size);
    setShowFontSizePicker(false);
  };

  if (!editor) {
    return (
      <div className="editor-loading">
        <div className="loading-spinner" />
        <p>Loading editor...</p>
      </div>
    );
  }

  if (!mounted) return <div className="min-h-[200px] bg-slate-50 rounded-xl" />;

  return (
    <div className="advanced-editor group" ref={editorRef}>
      <EditorToolbar
        editor={editor}
        onImageUpload={() => fileInputRef.current?.click()}
        isUploading={isUploading}
        currentColor={currentColor}
        setCurrentColor={setCurrentColor}
        currentFont={currentFont}
        setCurrentFont={setCurrentFont}
        currentFontSize={currentFontSize}
        applyFontSize={applyFontSize}
        showColorPicker={showColorPicker}
        setShowColorPicker={setShowColorPicker}
        showFontPicker={showFontPicker}
        setShowFontPicker={setShowFontPicker}
        showFontSizePicker={showFontSizePicker}
        setShowFontSizePicker={setShowFontSizePicker}
        colorPickerRef={colorPickerRef}
        fontPickerRef={fontPickerRef}
        fontSizePickerRef={fontSizePickerRef}
        setLinkPrompt={setLinkPrompt}
        isSaving={isSaving}
        showHeadingPicker={showHeadingPicker}
        setShowHeadingPicker={setShowHeadingPicker}
        headingPickerRef={headingPickerRef}
      />

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />

      <div className="editor-container">
        <div className="editor-scroll">
          <div className="editor-content">
            <EditorContent editor={editor} />
          </div>
        </div>

        <EditorStatusBar editor={editor} wordCount={wordCount} isUploading={isUploading} isSaving={isSaving} />
      </div>
    </div>
  );
}

function EditorToolbar({
  editor,
  onImageUpload,
  isUploading,

  currentColor,
  setCurrentColor,

  currentFont,
  setCurrentFont,

  currentFontSize,
  applyFontSize,

  showColorPicker,
  setShowColorPicker,

  showFontPicker,
  setShowFontPicker,

  showFontSizePicker,
  setShowFontSizePicker,

  colorPickerRef,
  fontPickerRef,
  fontSizePickerRef,

  setLinkPrompt,
  isSaving,
  showHeadingPicker,
  setShowHeadingPicker,
  headingPickerRef,
}) {
  if (!editor) return null;

  const fonts = [
    { value: 'Inter', label: 'Inter' },
    { value: 'Arial', label: 'Arial' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Courier New', label: 'Courier New' },
    { value: 'Verdana', label: 'Verdana' },
  ];

  const fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px'];

  const colorPalette = ['#000000', '#374151', '#dc2626', '#ea580c', '#ca8a04', '#16a34a', '#0284c7', '#4f46e5', '#9333ea', '#db2777'];

  const isActive = (name, attrs = {}) => editor.isActive(name, attrs);

  const ToolbarButton = ({ active, onClick, icon: Icon, title, disabled = false, variant = 'default' }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={[
        'toolbar-btn',
        active ? 'toolbar-btn-active' : '',
        disabled ? 'toolbar-btn-disabled' : '',
        variant === 'danger' ? 'toolbar-btn-danger' : '',
      ].join(' ')}
    >
      <Icon size={16} />
    </button>
  );

  const ToolbarSeparator = () => <div className="toolbar-separator" />;
  const ToolbarGroup = ({ children }) => <div className="toolbar-group">{children}</div>;

  const getCurrentHeading = () => {
    if (editor.isActive('heading', { level: 2 })) return 'Heading 2';
    if (editor.isActive('heading', { level: 3 })) return 'Heading 3';
    if (editor.isActive('heading', { level: 4 })) return 'Heading 4';
    if (editor.isActive('heading', { level: 5 })) return 'Heading 5';
    if (editor.isActive('heading', { level: 6 })) return 'Heading 6';
    return 'Normal Text';
  };

  return (
    <div className="editor-toolbar">
      <div className="toolbar-section">
        {/* Island 1: History */}
        <ToolbarGroup>
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            icon={Undo}
            title="Undo (Ctrl+Z)"
            disabled={!editor.can().undo()}
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            icon={Redo}
            title="Redo (Ctrl+Y)"
            disabled={!editor.can().redo()}
          />
        </ToolbarGroup>

        <ToolbarSeparator />

        {/* Island 2: Typography Style */}
        <ToolbarGroup>
          <div className="editor-dropdown-container" ref={headingPickerRef}>
            <button
              type="button"
              onClick={() => setShowHeadingPicker(!showHeadingPicker)}
              className="toolbar-btn-select min-w-[130px]"
              title="Heading style"
            >
              <Heading2 size={14} />
              <span className="toolbar-select-text text-left">{getCurrentHeading()}</span>
            </button>

            {showHeadingPicker && (
              <div className="font-picker-dropdown w-48">
                <button type="button" onClick={() => { editor.chain().focus().setParagraph().run(); setShowHeadingPicker(false); }} className="font-picker-item">Normal Text</button>
                <div className="font-picker-divider" />
                {[2, 3, 4, 5, 6].map(level => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => { editor.chain().focus().toggleHeading({ level }).run(); setShowHeadingPicker(false); }}
                    className={`font-picker-item h${level}-preview`}
                  >
                    Heading {level}
                  </button>
                ))}
              </div>
            )}
          </div>

          <ToolbarSeparator />

          <div className="editor-dropdown-container" ref={fontPickerRef}>
            <button
              type="button"
              onClick={() => setShowFontPicker(!showFontPicker)}
              className="toolbar-btn-select"
              title="Font family"
            >
              <Type size={14} />
              <span className="toolbar-select-text">{currentFont}</span>
            </button>

            {showFontPicker && (
              <div className="font-picker-dropdown">
                {fonts.map((font) => (
                  <button
                    key={font.value}
                    type="button"
                    onClick={() => {
                      editor.chain().focus().setFontFamily(font.value).run();
                      setCurrentFont(font.label);
                      setShowFontPicker(false);
                    }}
                    className="font-picker-item"
                    style={{ fontFamily: font.value }}
                  >
                    {font.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="editor-dropdown-container" ref={fontSizePickerRef}>
            <button
              type="button"
              onClick={() => setShowFontSizePicker(!showFontSizePicker)}
              className="toolbar-btn-select"
              title="Font size"
            >
              <TextIcon size={14} />
              <span className="toolbar-select-text">{currentFontSize}</span>
            </button>

            {showFontSizePicker && (
              <div className="font-picker-dropdown">
                {fontSizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => applyFontSize(s)}
                    className="font-picker-item"
                  >
                    {s}
                  </button>
                ))}
                <div className="font-picker-divider" />
                <button
                  type="button"
                  className="font-picker-item"
                  onClick={() => {
                    editor.chain().focus().unsetMark('textStyle').run();
                    setCurrentFontSize('16px');
                    setShowFontSizePicker(false);
                  }}
                >
                  Reset size
                </button>
              </div>
            )}
          </div>
        </ToolbarGroup>

        <ToolbarSeparator />

        {/* Island 3: Emphasis */}
        <ToolbarGroup>
          <ToolbarButton active={isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} icon={Bold} title="Bold (Ctrl+B)" />
          <ToolbarButton active={isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} icon={Italic} title="Italic (Ctrl+I)" />
          <ToolbarButton active={isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} icon={UnderlineIcon} title="Underline (Ctrl+U)" />
          <ToolbarButton active={isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} icon={Strikethrough} title="Strikethrough" />

          <div className="editor-dropdown-container" ref={colorPickerRef}>
            <button
              type="button"
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="toolbar-btn"
              style={{ color: currentColor !== '#000000' ? currentColor : 'inherit' }}
              title="Text Color"
            >
              <Palette size={16} />
            </button>

            {showColorPicker && (
              <div className="color-picker-dropdown">
                <div className="color-grid">
                  {colorPalette.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => {
                        editor.chain().focus().setColor(color).run();
                        setCurrentColor(color);
                        setShowColorPicker(false);
                      }}
                      className="color-swatch"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
                <div className="color-picker-divider" />
                <button
                  type="button"
                  className="color-reset"
                  onClick={() => {
                    editor.chain().focus().unsetColor().run();
                    setCurrentColor('#000000');
                    setShowColorPicker(false);
                  }}
                >
                  Reset color
                </button>
              </div>
            )}
          </div>
          <ToolbarButton active={isActive('highlight')} onClick={() => editor.chain().focus().toggleHighlight().run()} icon={Highlighter} title="Highlight" />
        </ToolbarGroup>

        <ToolbarSeparator />

        {/* Island 4: Structure */}
        <ToolbarGroup>
          <ToolbarButton active={isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} icon={List} title="Bullet List" />
          <ToolbarButton active={isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} icon={ListOrdered} title="Numbered List" />
          <ToolbarSeparator />
          <ToolbarButton active={isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()} icon={AlignLeft} title="Align Left" />
          <ToolbarButton active={isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()} icon={AlignCenter} title="Align Center" />
          <ToolbarButton active={isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()} icon={AlignRight} title="Align Right" />
        </ToolbarGroup>

        <ToolbarSeparator />

        {/* Island 5: Insert & Media */}
        <ToolbarGroup>
          <ToolbarButton onClick={setLinkPrompt} icon={Link2} title="Insert Link (Ctrl+K)" active={isActive('link')} />
          <ToolbarButton onClick={onImageUpload} icon={isUploading ? Loader2 : ImageIcon} title={isUploading ? 'Uploading...' : 'Upload Image'} disabled={isUploading} />
          <ToolbarButton
            active={isActive('table')}
            onClick={() => {
              const rows = window.prompt('Approx rows counts:', '3');
              const cols = window.prompt('Approx columns counts:', '3');
              if (rows && cols) {
                editor.chain().focus().insertTable({ rows: parseInt(rows) || 3, cols: parseInt(cols) || 3, withHeaderRow: true }).run();
              }
            }}
            icon={TableIcon}
            title="Insert Perfect Table"
          />
        </ToolbarGroup>

        <ToolbarSeparator />

        {/* Island 6: Advanced Blocks */}
        <ToolbarGroup>
          <ToolbarButton
            active={isActive('summaryBlock')}
            onClick={() => editor.chain().focus().toggleSummary().run()}
            icon={Quote}
            title="Summary Block"
          />
          <ToolbarButton
            onClick={() => {
              const title = window.prompt('CTA Title:', 'Ready to Transform Your Business?');
              const link = window.prompt('CTA Button Link:', 'https://softkingo.com/contact');
              const variants = ['standard', 'vertical', 'reversed', 'floating', 'minimalist', 'compact', 'full-bg'];
              const variant = window.prompt(`Select Layout (${variants.join(', ')}):`, 'standard');

              if (title && link) {
                editor.chain().focus().insertCTA({
                  title,
                  buttonLink: link,
                  variant: variants.includes(variant) ? variant : 'standard'
                }).run();
              }
            }}
            icon={Zap}
            title="Insert Multi-Variant CTA"
          />
        </ToolbarGroup>

        {/* Table Controls */}
        {isActive('table') && (
          <>
            <ToolbarSeparator />
            <ToolbarGroup>
              <ToolbarButton onClick={() => editor.chain().focus().addColumnBefore().run()} icon={Columns} title="Add Column Before" />
              <ToolbarButton onClick={() => editor.chain().focus().addColumnAfter().run()} icon={Columns} title="Add Column After" />
              <ToolbarButton onClick={() => editor.chain().focus().addRowBefore().run()} icon={Rows} title="Add Row Before" />
              <ToolbarButton onClick={() => editor.chain().focus().addRowAfter().run()} icon={Rows} title="Add Row After" />
            </ToolbarGroup>
            <ToolbarSeparator />
            <ToolbarGroup>
              <ToolbarButton onClick={() => editor.chain().focus().deleteColumn().run()} icon={Columns} title="Delete Column" variant="danger" />
              <ToolbarButton onClick={() => editor.chain().focus().deleteRow().run()} icon={Rows} title="Delete Row" variant="danger" />
              <ToolbarButton onClick={() => editor.chain().focus().deleteTable().run()} icon={Trash2} title="Delete Entire Table" variant="danger" />
            </ToolbarGroup>
            <ToolbarSeparator />
            <ToolbarGroup>
              <ToolbarButton onClick={() => editor.chain().focus().mergeCells().run()} icon={Plus} title="Merge Cells" />
              <ToolbarButton onClick={() => editor.chain().focus().splitCell().run()} icon={Minus} title="Split Cell" />
              <ToolbarButton onClick={() => editor.chain().focus().toggleHeaderRow().run()} icon={Layout} title="Toggle Header Row" />
            </ToolbarGroup>
          </>
        )}

        {isSaving && (
          <div className="toolbar-saving ml-auto flex items-center gap-1 text-[10px] text-slate-400 font-medium whitespace-nowrap">
            <Save size={10} className="animate-pulse" />
            <span>Saved</span>
          </div>
        )}
      </div>
    </div>
  );
}

function EditorStatusBar({ editor, wordCount, isUploading, isSaving }) {
  if (!editor) return null;

  const characters = editor.storage.characterCount?.characters() || 0;

  return (
    <div className="editor-status-bar">
      <div className="status-left">
        <div className="status-item">
          <span className="status-label">Words:</span>
          <span className="status-value">{wordCount.toLocaleString()}</span>
        </div>

        <div className="status-item">
          <span className="status-label">Characters:</span>
          <span className="status-value">{characters.toLocaleString()}</span>
        </div>

        {isUploading && (
          <div className="status-item">
            <span className="uploading-indicator">Uploading image...</span>
          </div>
        )}

        {isSaving && (
          <div className="status-item">
            <span className="status-saved">✓ Autosaved</span>
          </div>
        )}
      </div>

      <div className="status-right">
        <div className="status-item">
          <kbd className="kbd">Ctrl</kbd>+<kbd className="kbd">B</kbd> Bold
          <kbd className="kbd">Ctrl</kbd>+<kbd className="kbd">K</kbd> Link
          <kbd className="kbd">Ctrl</kbd>+<kbd className="kbd">Z</kbd> Undo
        </div>
      </div>
    </div>
  );
}

function safeParseDoc(str) {
  if (!str) {
    return { type: 'doc', content: [{ type: 'paragraph' }] };
  }
  try {
    return JSON.parse(str);
  } catch {
    return { type: 'doc', content: [{ type: 'paragraph' }] };
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