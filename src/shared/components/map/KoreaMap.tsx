'use client';

/**
 * @file: KoreaMap.tsx
 * @author: chad
 * @since: 2026.04.22 ~
 * @description: KoreaMap 컴포넌트
 */

import { cn } from '@/shared/lib/utils';
import { useEffect, useRef, useState } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

interface IKoreaMap {
  isWheel?: boolean;
}

export default function KoreaMap({ isWheel = true }: IKoreaMap) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<am5map.MapChart | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const root = am5.Root.new(mapRef.current);
    root.setThemes([am5themes_Animated.new(root)]);

    // = = = = = = = = = = = = = = = = = = 지도 생성  = = =  //
    const _mapChart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'translateX',
        panY: 'translateY',
        // TODO: 나중에 스크롤 금지 옵션도 만들면 좋을듯
        wheelY: isWheel ? 'zoom' : 'none',
        projection: am5map.geoEquirectangular(),
      }),
    );

    // = = = = = = = = = = = = = = = = = = 국내 지도 폴리곤  = = =  //
    const polygonSeries = _mapChart.series.push(
      am5map.MapPolygonSeries.new(root, {
        // geoJSON: korGeoJson,
        // geodataNames: am5geodata_lang_ko,
        // exclude: ['AQ'],
      }),
    );

    // geojson 가져오기
    fetch('/data/kr_simple.geojson')
      .then((response) => response.json())
      .then((data) => {
        polygonSeries.set('geoJSON', data);
      });

    // 폴리곤 기본 색상
    polygonSeries.mapPolygons.template.setAll({
      tooltipText: '{korName}',
      interactive: true,
      fill: am5.color(0xd1d3dc),
      stroke: am5.color(0xffffff),
      strokeWidth: 0.5,
    });

    // 폴리곤 호버 시
    polygonSeries.mapPolygons.template.states.create('hover', {
      fill: am5.color(0xadb9c9),
    });

    // 폴리곤 선택 시
    polygonSeries.mapPolygons.template.states.create('active', {
      fill: am5.color(0x8193ae),
    });

    // // 각 지역별 이미지 패턴 매핑 (id: 이미지 경로)
    // const countryImages: Record<string, string> = {
    //   US: "/img/samm.jpg",
    //   CA: "/img/keroppi.png",
    // };

    // polygonSeries.events.once("datavalidated", () => {
    //   polygonSeries.mapPolygons.each((polygon) => {
    //     const id = (polygon.dataItem?.dataContext as { id?: string })?.id;
    //     if (id && countryImages[id]) {
    //       polygon.set(
    //         "fillPattern",
    //         am5.PicturePattern.new(root, {
    //           src: countryImages[id],
    //           width: 100,
    //           height: 100,
    //           repetition: "repeat",
    //         }),
    //       );
    //     }
    //   });
    // });

    // = = = = = = = = = = = = = = = = = = 줌 컨트롤 = = = //
    const zoomControl = _mapChart.set(
      'zoomControl',
      am5map.ZoomControl.new(root, { y: am5.p0, centerY: am5.p0 }),
    );
    // 홈 버튼
    const homeButton = zoomControl.homeButton;
    homeButton.set('visible', true);

    // 색상 변경
    const pbtn = zoomControl.plusButton.get('background');
    const mbtn = zoomControl.minusButton.get('background');

    pbtn?.setAll({
      fill: am5.color(0x81d2e2),
    });
    pbtn?.states.create('hover', {
      fill: am5.color(0x81d2e2),
      fillOpacity: 0.5,
    });
    mbtn?.setAll({
      fill: am5.color(0x81d2e2),
    });
    mbtn?.states.create('hover', {
      fill: am5.color(0x81d2e2),
      fillOpacity: 0.5,
    });

    const homeBackground = homeButton.get('background');
    homeBackground?.setAll({
      fill: am5.color(0x6f9dd3),
    });
    homeBackground?.states.create('hover', {
      fill: am5.color(0x6f9dd3),
      fillOpacity: 0.5,
    });

    mapInstanceRef.current = _mapChart;

    /** 메모리 누수방지 */
    return () => {
      root.dispose();
    };
  }, []);
  return <div ref={mapRef} className="h-full w-full" />;
}
