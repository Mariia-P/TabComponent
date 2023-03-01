import { useEffect, useRef, ReactNode, useState } from 'react';
import { OverflowConfig, StyleItem } from '../../types/tabsTypes';
import { classNames } from '../../lib/classNames/classNames';
import LeftIcon from '../Icons/LeftIcon';
import RightIcon from '../Icons/RightIcon';
import './Scrollable.css';

interface ScrollableProps {
    children?: ReactNode;
    overflowBehavior?: OverflowConfig;
    tabList?: StyleItem;
    styledLeftButton?: StyleItem;
    styledRightButton?: StyleItem;
    rightIcon?: ReactNode;
    leftIcon?: ReactNode;
}

const Scrollable = (props: ScrollableProps) => {
    const {
        children,
        tabList,
        styledLeftButton,
        styledRightButton,
        overflowBehavior,
        rightIcon,
        leftIcon,
    } = props;

    const { scrollable, swipeable, sliderable } = overflowBehavior ?? {};

    const [isDragging, setIsDragging] = useState(false);
    const [tabWidth, setTabWidth] = useState<number>(0);

    const tabListRef = useRef<HTMLDivElement>(null);
    const btnLeftRef = useRef<HTMLButtonElement>(null);
    const btnRightRef = useRef<HTMLButtonElement>(null);

    const {
        mainClass: tabListMainClass,
        mods: tabListMods,
        additionalClasses: tabListAdditionalClasses,
    } = tabList ?? {};

    const {
        mainClass: leftButtonMainClass,
        mods: leftButtonMods,
        additionalClasses: leftButtonAdditionalClasses,
    } = styledLeftButton ?? {};

    const {
        mainClass: rightButtonMainClass,
        mods: rightButtonMods,
        additionalClasses: rightButtonAdditionalClasses,
    } = styledRightButton ?? {};

    const modsWithDragClass: Record<string, boolean> = {
        ...tabListMods,
        dragging: isDragging,
    };

    useEffect(() => {
        if (scrollable) {
            const tabList = tabListRef.current;
            const tab = tabList?.children[0] as HTMLElement;
            const tabWidth = tab.offsetWidth * 1.5;
            setTabWidth(tabWidth);

            if (tabList) {
                const onWheel = (event: WheelEvent) => {
                    event.preventDefault();
                    tabList.scrollTo({
                        left: tabList.scrollLeft + event.deltaY * 4,
                        behavior: 'smooth',
                    });
                    handleIcons();
                };
                tabList.addEventListener('wheel', onWheel);

                return () => tabList.removeEventListener('wheel', onWheel);
            }
        }
    }, []);

    const onMouseDownHandler = () => {
        setIsDragging(true);
    };

    const onMouseUpHandler = () => {
        setIsDragging(false);
    };

    const onMouseMoveHandler = (event: React.MouseEvent) => {
        if (!isDragging) return;

        if (tabListRef.current) {
            tabListRef.current.scrollLeft -= event.movementX;
        }
        handleIcons();
    };

    const onMouseLeaveHandler = () => {
        if(isDragging) setIsDragging(false);
    }

    const handleIcons = () => {
        if (tabListRef.current) {
            const scrollValue = Math.round(tabListRef.current?.scrollLeft || 0);
            const maxScrollableWidth =
                tabListRef.current.scrollWidth - tabListRef.current.clientWidth;

            if (btnLeftRef.current) {
                btnLeftRef.current.style.display =
                    scrollValue > 0 ? 'flex' : 'none';
            }
            if (btnRightRef.current) {
                btnRightRef.current.style.display =
                    maxScrollableWidth > scrollValue ? 'flex' : 'none';
            }
        }
    };

    const iconClickHandler = (side: 'left' | 'right') => {
        if (tabListRef.current) {
            side === 'left'
                ? (tabListRef.current.scrollLeft += -tabWidth || -350)
                : (tabListRef.current.scrollLeft += tabWidth || 350);

                setTimeout(() => {
                    handleIcons();
                }, 50);
        }
    };

    return (
        <div
            className="scroll-list-wrapper"
            {...(swipeable && {
                onMouseMove: onMouseMoveHandler,
                onMouseDown: onMouseDownHandler,
                onMouseUp: onMouseUpHandler,
                onMouseLeave: onMouseLeaveHandler,
            })}
        >
            {sliderable && (
                <button
                aria-label="Scroll"
                    ref={btnLeftRef}
                    className={classNames(
                        `${leftButtonMainClass || 'icon icon-left'}`,
                        leftButtonMods || {},
                        leftButtonAdditionalClasses || []
                    )}
                    onClick={() => iconClickHandler('left')}
                >
                   {leftIcon || <LeftIcon />} 
                </button>
            )}
            <div
                ref={tabListRef}
                role="tablist"
                className={classNames(
                    `${tabListMainClass || 'scrollable'}`,
                    modsWithDragClass || {},
                    tabListAdditionalClasses || []
                )}
            >
                {children}
            </div>
            {sliderable && (
                <button
                    aria-label="Scroll"
                    ref={btnRightRef}
                    className={classNames(
                        `${rightButtonMainClass || 'icon icon-right'}`,
                        rightButtonMods || {},
                        rightButtonAdditionalClasses || []
                    )}
                    onClick={() => iconClickHandler('right')}
                >
                   {rightIcon ||  <RightIcon />}
                </button>
            )}
        </div>
    );
};

export default Scrollable;
