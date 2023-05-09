import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { createContext, ReactElement, useState } from "react";

interface StateProps {
  target: HTMLElement | null;
  position?: "bottom-left" | "bottom-right";
  options: Array<{
    label: string;
    action?: () => void;
    icon?: ReactElement;
  }>;
}

type ContextProps = ((args: StateProps) => void) | null;

export const MenuPopoverContext = createContext<ContextProps>(null);

function MenuPopoverProvider({ children }: any) {
  const [state, setState] = useState<StateProps>({
    target: null,
    options: [],
    position: "bottom-left",
  });

  const handleClose = () => {
    setState({
      ...state,
      target: null,
    });
  };

  const value = (args: StateProps) => {
    const { target, options, position } = args;
    setState({
      target,
      options,
      position,
    });
  };

  return (
    <MenuPopoverContext.Provider value={value}>
      {children}
      <Menu
        PaperProps={{
          sx: {
            minWidth: 110,
          },
        }}
        id="menu-popover"
        anchorEl={state.target}
        open={Boolean(state.target)}
        onClick={handleClose}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {state.options.map((option, index) => (
          <MenuItem
            onClick={() => {
              option.action && option.action();
              handleClose();
            }}
            key={index}
          >
            {option.icon && <ListItemIcon>{option.icon}</ListItemIcon>}
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </MenuPopoverContext.Provider>
  );
}

export default MenuPopoverProvider;
