import React, { useState, useMemo, useCallback } from 'react';
import './App.css';
import { Tabs } from './TabsComponent';
// import Swiper from './TabsComponent/UI/Swiper/Swiper';

function App() {
    const [activeTab, setActiveTab] = useState('');
    const [counter, setCounter] = useState(0);

    const onConterClick = () => {
        setCounter((prev) => prev + 1);
    };
    const onSelectTab = useCallback((label: string) => {
        console.log('[label]', label);
        setActiveTab(label);
    }, []);

    const tabs = useMemo(
        () => [
            {
                label: 'Tab 1',
                panelContent: <p>Tab 1 content goes here.</p>,
                titleContent: <p>Tab 1 title.</p>,
            },
            {
                label: 'Tab 2',
                panelContent: <p>Tab 2 content goes here.</p>,
                titleContent: <p>Tab 2 title.</p>,
            },
            {
                label: 'Tab 3',
                panelContent: <p>Tab 3 content goes here.</p>,
                titleContent: <p>Tab 3 title.</p>,
            },
            {
                label: 'Tab 4',
                panelContent: <p>Tab 4 content goes here.</p>,
                titleContent: <p>Tab 4 title.</p>,
                disabled: true,
            },
            {
                label: 'Tab 5',
                panelContent: <p>Tab 5 content goes here.</p>,
                titleContent: <p>Tab 5 title.</p>,
            },
            {
                label: 'Tab 6',
                panelContent: <p>Tab 6 content goes here.</p>,
                titleContent: <p>Tab 6 title.</p>,
            },
            {
                label: 'Tab 7',
                panelContent: <p>Tab 7 content goes here.</p>,
                titleContent: <p>Tab 7 title.</p>,
            },
            {
                label: 'Tab 8',
                panelContent: <p>Tab 8 content goes here.</p>,
                titleContent: <p>Tab 8 title.</p>,
            },
            {
                label: 'Tab 9',
                panelContent: <p>Tab 9 content goes here.</p>,
                titleContent: <p>Tab 9 title.</p>,
            },
            {
                label: 'Tab 10',
                panelContent: <p>Tab 10 content goes here.</p>,
                titleContent: <p>Tab 10 title.</p>,
            },
        ],
        []
    );

    const styles = useMemo(
        () => ({
            tasbWrapper: { mainClass: 'test-container' },
            tab: { additionalClasses: ['custom-tab'] },
            tabWrapper: { additionalClasses: ['custom-list'] },
            activeClass: 'red',
        }),
        []
    );

    const overflowConfig = useMemo(
        () => ({
            scrollable: true,
            swipeable: true,
            sliderable: true,
        }),
        []
    );
    return (
        <div className="App">
            <div className="tabs-wrapper">
                <Tabs
                    tabs={tabs}
                    onSelectedTab={onSelectTab}
                    defaultTab="Tab 2"
                    defaultFocusTab="Tab 3"
                    overflowBehavior={overflowConfig}
                    styles={styles}
                />
                <button onClick={onConterClick}>Click!</button>
                <div>{counter}</div>
            </div>
        </div>
    );
}

export default App;
