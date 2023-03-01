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
    slideButton?: StyleItem;
    activeClass?: string;
    styledRightButton?: StyleItem;
    styledLeftButton?: StyleItem;
}

export interface SliderConfig {
    rightIcon: ReactNode;
    leftIcon: ReactNode;
}
export interface OverflowConfig {
    scrollable?: boolean;
    swipeable?: boolean;
    sliderable?: boolean | SliderConfig;
}
export interface TabsProps {
    tabs: TabsConfig[];
    onSelectedTab?: (label: string) => void;
    defaultTab?: string;
    defaultFocusTab?: string;
    ariaLabel?: string;
    styles?: TabsStyles;
    overflowBehavior?: OverflowConfig;
    icons?: { rightIcon: ReactNode; leftIcon: ReactNode };
}

export interface TabsConfig extends TabConfig {
    panelContent: ReactNode;
}

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    config: TabConfig;
    setSelectedTab: (label: string) => void;
    selectedTab: boolean;
    focusedTab: boolean;
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
