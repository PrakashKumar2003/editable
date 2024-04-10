import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Toolbar, { ToolbarItem } from '../Toolbar';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document/build/ckeditor';

interface EditorProps {
    content: string;
    index: number;
    onAdd: (tag: string, index: number) => void;
    onUpdate: (data: string, index: number) => void;
    dragHandleProps: any
}
export default function Editor({
    content,
    index,
    onAdd,
    onUpdate,
    dragHandleProps
}: EditorProps) {
    const [editor, setEditor] = useState<DecoupledEditor | null>(null);
    const [showToolbar, setShowToolbar] = useState(false);

    function handleAddEditor(detail: string) {

        onAdd(detail, index);
        setShowToolbar(false);
    }

    function handleToolbarClick(detail: ToolbarItem) {
        const { commandName, commandValue } = detail;
        if (commandValue) {
            editor?.execute(commandName, { value: commandValue });
        } else {
            editor?.execute(commandName);
        }
    }
    return (
        <div
            style={{ display: 'flex' }}
            onMouseOver={() => setShowToolbar(true)}
            onMouseOut={() => setShowToolbar(false)}
        >
            {
                showToolbar &&
                <Toolbar
                    dragHandleProps={dragHandleProps}
                    onAdd={handleAddEditor}
                    onClick={handleToolbarClick}
                />
            }
            <CKEditor
                onChange={(e, editor) => onUpdate(editor.getData(), index)}
                editor={DecoupledEditor}
                data={content}
                onReady={(editor) => {
                    setEditor(editor);
                    // window.editor = editor;
                }}
            />
        </div>
    )
}
