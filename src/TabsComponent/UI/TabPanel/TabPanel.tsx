import { TabsPanelProps } from '../../types/tabsTypes';
import { classNames } from '../../lib/classNames/classNames';

import './TabPanel.css';

const TabPanel = (props: TabsPanelProps) => {
    const { isActive, panelContent, label, styles } = props;

    if (!isActive) {
        return null;
    }

    return (
        <div
            className={classNames(
                `${styles?.mainClass || 'tabs-panel'}`,
                styles?.mods || {},
                styles?.additionalClasses || []
            )}
            role="tabpanel"
            aria-labelledby={label}
        >
            {panelContent}
        </div>
    );
};

export default TabPanel;
