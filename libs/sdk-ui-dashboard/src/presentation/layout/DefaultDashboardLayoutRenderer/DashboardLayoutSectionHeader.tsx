// (C) 2019-2025 GoodData Corporation
import React from "react";
import { Typography } from "@gooddata/sdk-ui-kit";
import { OnError, OnLoadingChanged } from "@gooddata/sdk-ui";

import { HeaderExportData } from "../../export/index.js";
import { useDashboardComponentsContext } from "../../dashboardContexts/index.js";

import { DashboardLayoutSectionHeaderDescription } from "./DashboardLayoutSectionHeaderDescription.js";

/**
 * @alpha
 */
export interface IDashboardLayoutSectionHeaderProps {
    title?: string;
    description?: string;
    exportData?: HeaderExportData;

    /**
     * This prop is here to allow rendering row hotspots in gdc-dashboards edit mode
     * in the same DOM location as before without duplicating css classes / DOM structure,
     * because we want to have all the logic and styling of the dashboard layout in one place,
     * to keep the look of Dashboard component in sync with gdc-dashboards.
     */
    renderBeforeHeader?: React.ReactNode;

    /**
     * This prop is here to allow rendering editable row header in gdc-dashboards edit mode
     * in the same DOM location as before without duplicating css classes / DOM structure,
     * because we want to have all the logic and styling of the dashboard layout in one place,
     * to keep the look of Dashboard component in sync with gdc-dashboards.
     */
    renderHeader?: React.ReactNode;
    onLoadingChanged?: OnLoadingChanged;
    onError?: OnError;
}

export const DashboardLayoutSectionHeader: React.FC<IDashboardLayoutSectionHeaderProps> = (props) => {
    const { title, description, renderBeforeHeader, renderHeader, exportData, onLoadingChanged, onError } =
        props;
    const { LoadingComponent } = useDashboardComponentsContext();

    return (
        <div className="gd-fluid-layout-row-header s-fluid-layout-row-header" {...exportData?.info}>
            {renderBeforeHeader}
            <div className="gd-fluid-layout-row-header-container">
                {renderHeader ?? (
                    <div className="gd-row-header-view">
                        {title ? (
                            <div className="gd-row-header-title-wrapper" {...exportData?.title}>
                                <span className="title">
                                    <Typography tagName="h2" className="s-fluid-layout-row-title">
                                        {title}
                                    </Typography>
                                </span>
                            </div>
                        ) : null}
                        {description ? (
                            <DashboardLayoutSectionHeaderDescription
                                description={description}
                                exportData={exportData?.description}
                                LoadingComponent={LoadingComponent}
                                onLoadingChanged={onLoadingChanged}
                                onError={onError}
                            />
                        ) : null}
                    </div>
                )}
            </div>
        </div>
    );
};
