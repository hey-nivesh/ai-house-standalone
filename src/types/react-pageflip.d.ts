declare module 'react-pageflip' {
  export interface PageFlipProps {
    width: number;
    height: number;
    size?: 'fixed' | 'stretch';
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    drawShadow?: boolean;
    flippingTime?: number;
    usePortrait?: boolean;
    startPage?: number;
    startZIndex?: number;
    autoSize?: boolean;
    maxShadowOpacity?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    onFlip?: (e: any) => void;
    onInit?: (e: any) => void;
    onUpdateOrientation?: (e: any) => void;
    onChangeState?: (e: any) => void;
    onChangeOrientation?: (e: any) => void;
    onStateChange?: (e: any) => void;
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
    useMouseEvents?: boolean;
    swipeDistance?: number;
    showPageCorners?: boolean;
    disableFlipByClick?: boolean;
    clickEventForward?: boolean;
  }

  const HTMLFlipBook: React.ForwardRefExoticComponent<
    PageFlipProps & React.RefAttributes<any>
  >;

  export default HTMLFlipBook;
}
