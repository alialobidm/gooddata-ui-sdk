// (C) 2025 GoodData Corporation

import React from "react";
import { e } from "../menuBem.js";
import { ShortenedText } from "../../../ShortenedText/index.js";
import { IUiMenuItemData, UiMenuGroupItemProps } from "../types.js";
import { typedUiMenuContextStore } from "../context.js";

/**
 * @internal
 */
export function DefaultUiMenuGroupItemComponent<T extends IUiMenuItemData = object>({
    item,
}: UiMenuGroupItemProps<T>): React.ReactNode {
    const { createSelector, useContextStore } = typedUiMenuContextStore<T>();
    const selector = createSelector((ctx) => ({
        makeItemId: ctx.makeItemId,
        ItemComponent: ctx.ItemComponent,
    }));

    const { makeItemId, ItemComponent } = useContextStore(selector);

    return (
        <ul className={e("group")} role={"group"} aria-labelledby={makeItemId(item)}>
            <li className={e("group-title-container")} role={"presentation"} id={makeItemId(item)}>
                <ShortenedText className={e("group-title")} ellipsisPosition={"end"}>
                    {item.stringTitle}
                </ShortenedText>
            </li>

            {item.subItems.map((groupItem, index) => (
                <ItemComponent key={"id" in groupItem ? groupItem.id : index} item={groupItem} />
            ))}
        </ul>
    );
}
