import { formatMs, formatNumber } from "./formatting";

describe('formatting',()=>{
    it('should format numbers', ()=>{
        expect(formatNumber(1000)).toBe('1k')
        expect(formatNumber(1200)).toBe('1.2k')
        expect(formatNumber(10000)).toBe('10k')
        expect(formatNumber(16600)).toBe('16.6k')
        expect(formatNumber(100000)).toBe('100k')
        expect(formatNumber(160000)).toBe('160k')
        expect(formatNumber(166000)).toBe('166k')
        expect(formatNumber(1000000)).toBe('1m')
        expect(formatNumber(1640000)).toBe('1.6m')
        expect(formatNumber(1660000)).toBe('1.7m')
        expect(formatNumber(1640000000)).toBe('1.6b')
        expect(formatNumber(1000000000)).toBe('1b')
    })
});

describe('converting number',()=>{
    it('should format time', ()=>{
        expect(formatMs(1000)).toBe('1s')
        expect(formatMs(120000)).toBe('2min')
        expect(formatMs(1200)).toBe('1s')
        expect(formatMs(59000)).toBe('59s')
        expect(formatMs(60000)).toBe('1min')
        expect(formatMs(300000)).toBe('5min')
        expect(formatMs(752)).toBe('752ms')
    })
});

