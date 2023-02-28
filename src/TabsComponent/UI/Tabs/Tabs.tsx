import { useState, memo } from 'react';
import Tab from '../Tab/Tab';
import TabPanel from '../TabPanel/TabPanel';
import Scrollable from '../Scrollable/Scrollable';

import type { TabsProps } from '../../types/tabsTypes';
import { classNames } from '../../lib/classNames/classNames';

import './Tabs.css';

const Tabs = memo((props: TabsProps) => {
    const {
        tabs,
        onSelectedTab,
        defaultTab,
        defaultFocusTab,
        ariaLabel,
        overflowBehavior,
    } = props;

    const {
        activeClass,
        tabsWrapper,
        tabList,
        tabPanel,
        tab,
        tabWrapper,
        styledRightButton,
        styledLeftButton,
    } = props?.styles ?? {};

    const [selectedTab, setSelectedTab] = useState<string>(
        defaultTab || tabs[0].label
    );

    const onClickTab = (label: string) => {
        setSelectedTab(label);
        onSelectedTab && onSelectedTab(label);
    };

    const tabItems = tabs.map((item) => (
        <Tab
            key={item.label}
            config={{
                label: item.label,
                titleContent: item.titleContent,
                disabled: item.disabled,
            }}
            setSelectedTab={onClickTab}
            selectedTab={selectedTab === item.label}
            focusedTab={defaultFocusTab === item.label}
            activeClass={activeClass}
            tabStyles={tab}
            tabWrapperStyles={tabWrapper}
        />
    ));
    return (
        <div
            className={classNames(
                `${tabsWrapper?.mainClass || 'tabs-conteiner'}`,
                tabsWrapper?.mods || {},
                tabsWrapper?.additionalClasses || []
            )}
            aria-label={ariaLabel || 'tabs component'}
        >
            {overflowBehavior ? (
                <Scrollable
                    styledRightButton={styledRightButton}
                    styledLeftButton={styledLeftButton}
                    styledWrapper={tabsWrapper}
                    overflowBehavior={overflowBehavior}
                >
                    {tabItems}
                </Scrollable>
            ) : (
                <div
                    className={classNames(
                        `${tabList?.mainClass || 'tabs'}`,
                        tabList?.mods || {},
                        tabList?.additionalClasses || []
                    )}
                    role="tablist"
                >
                    {tabItems}
                </div>
            )}

            {tabs.map((tab) => (
                <TabPanel
                    isActive={selectedTab === tab.label}
                    key={tab.label}
                    label={tab.label}
                    panelContent={tab.panelContent}
                    styles={tabPanel}
                />
            ))}
        </div>
    );
});

export default Tabs;
