import type { Meta, StoryObj } from '@storybook/react';

import { Tabs } from '../index';
import { tabs, firstStyles, secondStyles } from './mockData';
import LeftMockIcon from './LeftMockIcon';
import RightMockIcon from './RightMockIcon';

import './tabs.css';

const meta: Meta<typeof Tabs> = {
    title: 'Example/Tabs',
    component: Tabs,
    tags: ['autodocs'],
    argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
    args: {
        tabs,
        defaultTab: 'Tab 2',
    },
};

export const ScrollableTab: Story = {
    args: {
        tabs,
        defaultTab: 'Tab 1',
        overflowBehavior: { scrollable: true },
        styles: { tabsWrapper: { additionalClasses: ['tab-wrapper-width'] } },
    },
};

export const SwiperTabWithCustomStyles: Story = {
    args: {
        tabs,
        defaultTab: 'Tab 1',
        overflowBehavior: { swipeable: true },
        styles: firstStyles,
    },
};

export const SliderDefaultTab: Story = {
    args: {
        tabs,
        defaultTab: 'Tab 1',
        overflowBehavior: { sliderable: true },
        styles: {
            tabsWrapper: {
                additionalClasses: ['tab-wrapper-width tab-wrapper-bg'],
            },
        },
    },
};

export const SliderTabWithCustomStyles: Story = {
    args: {
        tabs,
        defaultTab: 'Tab 1',
        overflowBehavior: { sliderable: true },
        styles: secondStyles,
        icons: { leftIcon: <LeftMockIcon/> , rightIcon: <RightMockIcon/>},
    },
};

export const TabWithFocus: Story = {
    args: {
        tabs,
        defaultTab: 'Tab 1',
        defaultFocusTab: 'Tab 3',
        styles: { tabsWrapper: { additionalClasses: ['tab-wrapper-width'] } },
    },
};

export const VerticalTab: Story = {
    args: {
        tabs,
        defaultTab: 'Tab 1',
        styles: {
            tabsWrapper: { additionalClasses: ['tab-wrapper-row'] },
            tabList: { additionalClasses: ['tab-list-column'] },
        },
    },
};
