'use client';

/**
 * @file: AmchartMap.tsx
 * @author: chad
 * @since: 2026.04.22 ~
 * @description: AmchartMap 컴포넌트
 */

import { SetStateAction, useEffect, useRef, useState, Dispatch } from 'react';
import { cn } from '@/shared/lib/utils';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5geodata_lang_ko from '@amcharts/amcharts5-geodata/lang/KO';
import { useDialogStore } from '@/shared/stores/useDialogStore';
import { ILabelValue } from '@/shared/interfaces';
import { MAP_TRAVEL_TYPE_LIST } from '@/shared/constants';

interface IAmchartMap {
  isWheel?: boolean;
  isDomestic?: boolean;
  readonly?: boolean;
  setSelectedMap?: Dispatch<SetStateAction<ILabelValue>>;
  setSelectedMapId: Dispatch<SetStateAction<string | undefined>>
  isOpenFillModal?: boolean;
  setIsOpenFillModal?: () => void;
}

export default function AmchartMap({
  isWheel = true,
  isDomestic = false,
  readonly = false,
  setSelectedMap,
  setSelectedMapId,
  isOpenFillModal,
  setIsOpenFillModal,
}: IAmchartMap) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<am5map.MapChart | null>(null);
  const activePolygonRef = useRef<am5map.MapPolygon | null>(null);

  const { openDialog } = useDialogStore();

  useEffect(() => {
    if (!mapRef.current) return;

    const root = am5.Root.new(mapRef.current);
    root.setThemes([am5themes_Animated.new(root)]);

    // = = = = = = = = = = = = = = = = = = 지도 생성  = = =  //
    const _mapChart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'translateX',
        panY: 'translateY',
        wheelY: isWheel ? 'zoom' : 'none',
        projection: am5map.geoEquirectangular(),
      }),
    );

    // = = = = = = = = = = = = = = = = = = 세계 지도 폴리곤  = = =  //
    const polygonSeries = _mapChart.series.push(
      am5map.MapPolygonSeries.new(
        root,
        isDomestic
          ? {}
          : {
              geoJSON: am5geodata_worldLow,
              geodataNames: am5geodata_lang_ko,
              exclude: ['AQ'],
            },
      ),
    );

    // 국내 지도일 경우 국내 geojson 가져오기
    if (isDomestic) {
      fetch('/data/kr_simple.geojson')
        .then((response) => response.json())
        .then((data) => {
          polygonSeries.set('geoJSON', data);
        });
    }

    // 폴리곤 기본 색상
    polygonSeries.mapPolygons.template.setAll({
      tooltipText: isDomestic ? '{korName}' : '{name}',
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

    // // = = = = = = = = = = = = = = = = = = 지역명 넣기 = = = //
    // const labelSeries = _mapChart.series.push(
    //   am5map.MapPointSeries.new(root, {}),
    // );

    // labelSeries.bullets.push(function () {
    //   return am5.Bullet.new(root, {
    //     sprite: am5.Label.new(root, {
    //       text: isDomestic ? '{korName}' : '{name}',
    //       centerX: am5.p50,
    //       centerY: am5.p50,
    //       fontSize: 12,
    //       fontWeight: '500',
    //       fill: am5.color(0x333333),
    //       populateText: true,
    //     }),
    //   });
    // });

    // = = = = = = = = = = = = = = = = = = 폴리곤(지역) 클릭 활성화 = = = //
    polygonSeries.mapPolygons.template.events.on('click', (event) => {
      const target = event.target;
      const dataItem = target.dataItem;

      // 해당 폴리곤의 데이터가 있을 경우
      if (dataItem) {
        // 선택한 폴리곤 정보
        const dataContext = dataItem.dataContext as {
          korName?: string;
          name?: string;
          id?: string;
        };

        if (dataContext?.id === 'KR') {
          setSelectedMap?.(MAP_TRAVEL_TYPE_LIST[1]);
          return;
        }

        // 이전 활성 폴리곤 해제
        if (activePolygonRef.current && activePolygonRef.current !== target) {
          activePolygonRef.current.set('active', false);
        }

        // 현재 폴리곤 활성화
        target.set('active', true);
        activePolygonRef.current = target;

        polygonSeries.zoomToDataItem(
          dataItem as am5.DataItem<am5map.IMapPolygonSeriesDataItem>,
        );

        if (readonly) return;

        openDialog({
          type: 'confirm',
          message: (
            <div>
              <span className="font-bold">
                {isDomestic ? dataContext.korName : dataContext.name}
              </span>
              에 추억을 남길까요?
            </div>
          ),
          okLabel: '남기기',
          onCancel: () => {
            mapInstanceRef.current?.goHome();
            target?.set('active', false);
          },
          onOk: () => {
            setIsOpenFillModal?.();
            setSelectedMapId(dataContext?.id);
          },
        });
      }
    });

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

    // 홈 버튼 클릭 시 활성화된 폴리곤 비활성화
    homeButton.events.on('click', () =>
      activePolygonRef.current?.set('active', false),
    );

    mapInstanceRef.current = _mapChart;

    return () => {
      root.dispose();
    };
  }, []);

  useEffect(() => {
    if (!isOpenFillModal) {
      if (activePolygonRef.current) {
        activePolygonRef.current.set('active', false);
        activePolygonRef.current = null;
      }
    }
  }, [isOpenFillModal]);

  return <div ref={mapRef} className="h-full w-full rounded-lg!" />;
}
