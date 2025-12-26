declare module 'dotted-map' {
    interface DottedMapOptions {
        height?: number;
        grid?: 'diagonal' | 'vertical';
    }

    interface SVGOptions {
        radius?: number;
        color?: string;
        shape?: 'circle' | 'hexagon';
        backgroundColor?: string;
    }

    class DottedMap {
        constructor(options?: DottedMapOptions);
        getSVG(options?: SVGOptions): string;
    }

    export default DottedMap;
}
