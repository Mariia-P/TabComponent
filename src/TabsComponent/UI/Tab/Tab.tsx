import type { TabProps } from '../../types/tabsTypes';
import { classNames } from '../../lib/classNames/classNames';
import './Tab.css';

const Tab = (props: TabProps) => {
    const {
        config: { label, titleContent, disabled },
        setSelectedTab,
        selectedTab,
        activeClass,
        tabStyles,
        tabWrapperStyles,
        ...otherProps
    } = props;

    const onClickHandler = () => {
        setSelectedTab(label);
    };

    const {
        mainClass: tabMainClass,
        mods: tabMods,
        additionalClasses: tabAdditionalClasses,
    } = props?.tabStyles ?? {};

    const {
        mainClass: wrapperMainClass,
        mods: wrappeMods,
        additionalClasses: wrappeAdditionalClasses,
    } = props?.tabWrapperStyles ?? {};

    const tabModsWithActiveClass: Record<string, boolean> = {
        ...tabMods,
        [activeClass || 'is-active']: selectedTab,
    };

    return (
        <div
            className={classNames(
                `${wrapperMainClass || 'tab-wrapper'}`,
                wrappeMods || {},
                wrappeAdditionalClasses || []
            )}
        >
            <button
                className={classNames(
                    `${tabMainClass || 'tab'}`,
                    tabModsWithActiveClass || {},
                    tabAdditionalClasses || []
                )}
                onClick={onClickHandler}
                role="tab"
                aria-selected={selectedTab}
                type="button"
                disabled={disabled}
                {...otherProps}
            >
                {titleContent}
            </button>
        </div>
    );
};

export default Tab;
