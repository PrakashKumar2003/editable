import React from 'react';
import BasicMenu from '../../../BasicMenu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';

export interface ToolbarItem {
    label: string;
    commandName: string;
    commandValue?: string;
}

export interface TagName {
    tag: string;
    label: string;
}
const toolbarItems: ToolbarItem[] = [
    { label: "Paragraph", commandName: "paragraph" },
    { label: "Heading1", commandName: "heading", commandValue: "heading1" },
    { label: "Heading2", commandName: "heading", commandValue: "heading2" },
    { label: "Heading3", commandName: "heading", commandValue: "heading3" },
    { label: "Bold", commandName: "bold", },
    { label: "Italic", commandName: "italic", },

]
let tagNames:TagName[] = [
    { tag: "h2", label: "heading1" },
    { tag: "h3", label: "heading2" },
    { tag: "h4", label: "heading3" },
    { tag: "p", label: "paragraph" }
]

export interface ToolbarProp {
    onClick: (item:ToolbarItem) => void;
    onAdd: (tag:string) => void;
    dragHandleProps: any
}
export default function Toolbar({ onClick, onAdd, dragHandleProps }: ToolbarProp) {

    function handleAddEditor(detail:TagName) {
        onAdd(detail.tag)
    }
    function handleToolbarClick(item:ToolbarItem) {
        onClick(item)
    }
    return (
        <div style={{ marginTop: '10px' }}>
            <div {...dragHandleProps} >
                <BasicMenu
                    items={toolbarItems}
                    Icon={MoreVertIcon}
                    onClick={handleToolbarClick}
                />
            </div>
            <BasicMenu
                items={tagNames}
                Icon={AddIcon}
                onClick={handleAddEditor}
            />
        </div>
    )
}
