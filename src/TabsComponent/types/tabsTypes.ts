import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface StyleItem {
    mainClass?: string;
    mods?: Record<string, boolean>;
    additionalClasses?: string[];
}

export interface TabsStyles {
    tabsWrapper?: StyleItem;
    tabList?: StyleItem;
    tabWrapper?: StyleItem;
    tab?: StyleItem;
    tabPanel?: StyleItem;
    activeClass?: string;
}

export interface TabsProps {
    tabs: TabsConfig[];
    onSelectedTab?: (label: string) => void;
    defaultTab?: string;
    ariaLabel?: string;
    styles?: TabsStyles;
}

export interface TabsConfig extends TabConfig {
    panelContent: ReactNode;
}

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    config: TabConfig;
    setSelectedTab: (label: string) => void;
    selectedTab: boolean;
    activeClass?: string;
    tabStyles?: StyleItem;
    tabWrapperStyles?: StyleItem;
}

export interface TabConfig {
    label: string;
    titleContent: ReactNode;
    disabled?: boolean;
}

export interface TabsPanelProps {
    isActive: boolean;
    panelContent: ReactNode;
    label: string;
    styles?: StyleItem;
}
