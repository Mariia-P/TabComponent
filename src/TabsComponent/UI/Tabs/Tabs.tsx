import { useState, memo } from 'react';
import Tab from '../Tab/Tab';
import TabPanel from '../TabPanel/TabPanel';

import type { TabsProps } from '../../types/tabsTypes';
import { classNames } from '../../lib/classNames/classNames';

import './Tabs.css';

const Tabs = memo((props: TabsProps) => {
    //use only for testing
    console.log('[render]');
    const { tabs, onSelectedTab, defaultTab, ariaLabel } = props;

    const { activeClass, tabsWrapper, tabList, tabPanel, tab, tabWrapper } =
        props?.styles ?? {};

    const [selectedTab, setSelectedTab] = useState<string>(
        defaultTab || tabs[0].label
    );

    const onClickTab = (label: string) => {
        setSelectedTab(label);
        onSelectedTab && onSelectedTab(label);
    };

    return (
        <div
            className={classNames(
                `${tabsWrapper?.mainClass || 'tabs-conteiner'}`,
                tabsWrapper?.mods || {},
                tabsWrapper?.additionalClasses || []
            )}
            aria-label={ariaLabel || 'tabs component'}
        >
            <div
                className={classNames(
                    `${tabList?.mainClass || 'tabs'}`,
                    tabList?.mods || {},
                    tabList?.additionalClasses || []
                )}
                role="tablist"
            >
                {tabs.map((item, index) => (
                    <Tab
                        key={index}
                        config={{
                            label: item.label,
                            titleContent: item.titleContent,
                            disabled: item.disabled,
                        }}
                        setSelectedTab={onClickTab}
                        selectedTab={selectedTab === item.label}
                        activeClass={activeClass}
                        tabStyles={tab}
                        tabWrapperStyles={tabWrapper}
                    />
                ))}
            </div>

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
