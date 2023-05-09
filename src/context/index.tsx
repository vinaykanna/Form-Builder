import { useContext } from "react";
import { ConfirmDialogContext } from "./ConfirmDialog";
import { MenuPopoverContext } from "./MenuPopover";

export const useConfirm = () => useContext(ConfirmDialogContext);
export const useMenu = () => useContext(MenuPopoverContext);
