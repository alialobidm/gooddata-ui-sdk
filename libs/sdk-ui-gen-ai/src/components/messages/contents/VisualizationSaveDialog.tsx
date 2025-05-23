// (C) 2024-2025 GoodData Corporation
import * as React from "react";
import { connect } from "react-redux";
import { ConfirmDialog, Input, Typography } from "@gooddata/sdk-ui-kit";
import { IGenAIVisualization } from "@gooddata/sdk-model";
import { injectIntl, WrappedComponentProps } from "react-intl";

import { saveVisualizationAction } from "../../../store/index.js";

import { useVisualisationSaving } from "./hooks/useVisualisationSaving.js";

export type VisualizationSaveDialogProps = {
    onClose: () => void;
    visualization: IGenAIVisualization;
    messageId: string;
};

export type VisualizationSaveDialogDispatchProps = {
    saveVisualizationAction: typeof saveVisualizationAction;
};

const VisualizationSaveDialogCore: React.FC<
    VisualizationSaveDialogProps & VisualizationSaveDialogDispatchProps & WrappedComponentProps
> = ({ onClose, visualization, messageId, saveVisualizationAction, intl }) => {
    const [value, setValue] = React.useState<string>(visualization.title);
    const { setSavingStarted } = useVisualisationSaving(visualization, onClose);

    return (
        <ConfirmDialog
            onClose={onClose}
            onCancel={onClose}
            onSubmit={() => {
                setSavingStarted(true);
                saveVisualizationAction({
                    visualizationId: visualization.id,
                    visualizationTitle: value || visualization.title,
                    assistantMessageId: messageId,
                });
            }}
            isPositive
            headline={intl.formatMessage({ id: "gd.gen-ai.save-dialog.title" })}
            cancelButtonText={intl.formatMessage({ id: "gd.gen-ai.button.cancel" })}
            submitButtonText={intl.formatMessage({ id: "gd.gen-ai.button.save" })}
            showProgressIndicator={visualization.saving}
            isSubmitDisabled={visualization.saving}
            isCancelDisabled={visualization.saving}
            className="gd-gen-ai-chat__visualization__save-dialog"
        >
            <Typography tagName="p">
                {intl.formatMessage({ id: "gd.gen-ai.save-dialog.description" })}
            </Typography>
            <Input
                label={intl.formatMessage({ id: "gd.gen-ai.save-dialog.label" })}
                labelPositionTop
                placeholder={visualization.title}
                value={value}
                disabled={visualization.saving}
                onChange={(newValue) => setValue(String(newValue))}
            />
        </ConfirmDialog>
    );
};

const mapDispatchToProps = {
    saveVisualizationAction,
};

export const VisualizationSaveDialog = connect(
    null,
    mapDispatchToProps,
)(injectIntl(VisualizationSaveDialogCore));
