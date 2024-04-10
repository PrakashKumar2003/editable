import React from 'react'
import { IconButton, Menu, SvgIconTypeMap} from '@mui/material'
import { TagName, ToolbarItem } from '../EditableData/components/Toolbar';
import { OverridableComponent } from '@mui/material/OverridableComponent';
export type BasicMenuItemType = TagName|ToolbarItem

  

export interface BasicMenuProp{
    items:BasicMenuItemType[];
    onClick(item:BasicMenuItemType):void;
    Icon:OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; }
}
export default function BasicMenu({ items, onClick, Icon }:BasicMenuProp) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const showDropdown = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    function handleItemClick(item:BasicMenuItemType) {
        onClick(item)
        handleClose()
    }
    return (
        <div>
            <IconButton
                onClick={showDropdown}
            >
                <Icon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {items.map((item,index) => {
                    return (
                        <div key={index}
                        style={{cursor:'pointer',paddingBlock:'5px',paddingInline:"10px"}}
                            onClick={() => handleItemClick(item)}
                        >
                            {item.label}
                        </div>
                    )
                })}
            </Menu>
        </div>
    )
}
