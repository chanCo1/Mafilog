'use client';

/**
 * @file: AmchartMap.tsx
 * @author: chad
 * @since: 2026.04.22 ~
 * @description: AmchartMap 컴포넌트
 */

import { SetStateAction, useEffect, useRef, Dispatch } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5geodata_lang_ko from '@amcharts/amcharts5-geodata/lang/KO';
import { useDialogStore } from '@/shared/stores/useDialogStore';
import { ILabelValue } from '@/shared/interfaces';
import { MAP_TRAVEL_TYPE_LIST } from '@/shared/constants';
import { IMemoryListResponse } from '@/features/myMap/interfaces/memory.interface';

interface IAmchartMap {
  isWheel?: boolean;
  isDomestic?: boolean;
  readonly?: boolean;
  setSelectedMapType?: Dispatch<SetStateAction<ILabelValue>>;
  setSelectedMapId?: Dispatch<SetStateAction<string | undefined>>;
  isOpenFillModal?: boolean;
  setIsOpenFillModal?: () => void;
  isOpenDetailModal?: boolean;
  setIsOpenDetailModal?: () => void;
  memoryList?: IMemoryListResponse[] | undefined;
  setSelectedMemoryId?: Dispatch<SetStateAction<number>>;
}

export default function AmchartMap({
  isWheel = true,
  isDomestic = false,
  readonly = false,
  setSelectedMapType,
  setSelectedMapId,
  isOpenFillModal,
  setIsOpenFillModal,
  isOpenDetailModal,
  setIsOpenDetailModal,
  setSelectedMemoryId,
  memoryList,
}: IAmchartMap) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<am5map.MapChart | null>(null);
  const activePolygonRef = useRef<am5map.MapPolygon | null>(null);
  const polygonSeriesRef = useRef<am5map.MapPolygonSeries | null>(null);
  const memoryListRef = useRef<IMemoryListResponse[] | undefined>(memoryList);

  const { openDialog } = useDialogStore();

  useEffect(() => {
    memoryListRef.current = memoryList;
  }, [memoryList]);

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
      am5map.MapPolygonSeries.new(root, {
        geoJSON: isDomestic ? undefined : am5geodata_worldLow,
        geodataNames: isDomestic ? undefined : am5geodata_lang_ko,
        exclude: ['AQ'],
      }),
    );
    polygonSeriesRef.current = polygonSeries;

    // 국내 지도일 경우 국내 geojson 가져오기
    if (isDomestic) {
      fetch('/data/kr_simple.geojson')
        .then((response) => response.json())
        .then((data) => {
          polygonSeries.set('geoJSON', data);
        });
    }

    // 툴팁 생성
    const tooltip = am5.Tooltip.new(root, {
      getFillFromSprite: false,
      autoTextColor: false,
    });

    tooltip.get('background')?.setAll({
      fill: am5.color(0xfafbff),
      stroke: am5.color(0x6f9dd3),
      strokeWidth: 1,
    });

    polygonSeries.set('tooltip', tooltip);

    // 폴리곤 기본 색상
    polygonSeries.mapPolygons.template.setAll({
      interactive: true,
      fill: am5.color(0xd1d3dc),
      stroke: am5.color(0xffffff),
      strokeWidth: 0.6,
    });

    // 폴리곤 선택 시
    polygonSeries.mapPolygons.template.states.create('active', {
      fill: am5.color(0x6f9dd3),
    });

    // = = = = = = = = = = = = = = = = = = 폴리곤(지역) 클릭 활성화 = = = //
    let isPolygonClicked = false;
    polygonSeries.mapPolygons.template.events.on('click', (event) => {
      isPolygonClicked = true;

      setTimeout(() => {
        isPolygonClicked = false;
      }, 100);

      const target = event.target;
      const dataItem = target.dataItem;

      const isTouchDevice =
        'ontouchstart' in window || navigator.maxTouchPoints > 0;

      // 해당 폴리곤의 데이터가 있을 경우
      if (dataItem) {
        // 선택한 폴리곤 정보
        const dataContext = dataItem.dataContext as {
          korName?: string;
          name?: string;
          id?: string;
        };

        if (dataContext?.id === 'KR') {
          setSelectedMapType?.(MAP_TRAVEL_TYPE_LIST[1]);
          return;
        }

        if (readonly || !memoryListRef.current) return;

        if (isTouchDevice) {
          if (activePolygonRef.current !== target) {
            if (activePolygonRef.current) {
              activePolygonRef.current.set('active', false);
              activePolygonRef.current.hideTooltip();
            }

            target.set('active', true);
            activePolygonRef.current = target;
            return;
          }
        } else {
          if (activePolygonRef.current && activePolygonRef.current !== target) {
            activePolygonRef.current.set('active', false);
          }
          target.set('active', true);
          activePolygonRef.current = target;
        }

        const memory = memoryListRef.current?.find(
          (_memory) => _memory.mapId === dataContext?.id,
        );
        if (memory) {
          setIsOpenDetailModal?.();
          // 상세 조회를 위한 추억 id 전달
          setSelectedMemoryId?.(memory?.id);
        } else {
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
              target?.set('active', false);
            },
            onOk: () => {
              setIsOpenFillModal?.();
              // 지도 채우기 위해 지도 아이디 전달
              setSelectedMapId?.(dataContext?.id);
            },
          });
        }
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
    const plusbtn = zoomControl.plusButton.get('background');
    const minusbtn = zoomControl.minusButton.get('background');

    plusbtn?.setAll({
      fill: am5.color(0x81d2e2),
    });
    plusbtn?.states.create('hover', {
      fill: am5.color(0x81d2e2),
      fillOpacity: 0.5,
    });
    minusbtn?.setAll({
      fill: am5.color(0x81d2e2),
    });
    minusbtn?.states.create('hover', {
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

    // 외부 클릭시 해제
    _mapChart.chartContainer.events.on('click', () => {
      if (isPolygonClicked) return;

      if (activePolygonRef.current) {
        activePolygonRef.current.set('active', false);
        activePolygonRef.current.hideTooltip();
        activePolygonRef.current = null;
      }
    });

    mapInstanceRef.current = _mapChart;

    return () => {
      root.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const polygonSeries = polygonSeriesRef.current;

    if (!polygonSeries) return;

    polygonSeries.events.once('datavalidated', () => {
      polygonSeries.mapPolygons.each((polygon) => {
        const dataContext = polygon.dataItem?.dataContext as any;
        const id = dataContext?.id;

        // 국내/해외 지역명
        const regionName = isDomestic
          ? dataContext?.korName
          : dataContext?.name;

        const memory = memoryList?.find((_memory) => _memory.mapId === id);

        if (memory) {
          const fillColor = memory.hexCode
            ? am5.color(memory.hexCode)
            : am5.color(0x6f9dd3);

          polygon.setAll({
            fill: fillColor,
            fillOpacity: 1,
          });

          polygon.states.create('default', {
            fill: fillColor,
            fillOpacity: 1,
          });

          polygon.states.create('hover', {
            fill: fillColor,
            fillOpacity: 1,
          });

          // 사진이 있는 경우
          if (memory.imageUrl.length) {
            polygon.set(
              'tooltipHTML',
              tooltipBox(regionName, memory.imageUrl[0]),
            );
          } else {
            polygon.set('tooltipHTML', tooltipBox(regionName));
          }
          // 사진이 없는 경우
        } else {
          polygon.setAll({
            fill: am5.color(0xd1d3dc),
            fillOpacity: 1,
          });

          polygon.states.create('default', {
            fill: am5.color(0xd1d3dc),
            fillOpacity: 1,
          });

          polygon.states.create('hover', {
            fill: am5.color(0xadb9c9),
          });

          polygon.set('tooltipHTML', tooltipBox(regionName));
        }

        polygon.set('tooltipText', undefined);
      });
    });

    if (polygonSeries.dataItems.length > 0) {
      polygonSeries.events.dispatch('datavalidated' as any, {
        type: 'datavalidated',
        target: polygonSeries,
      });
    }
  }, [memoryList, isDomestic]);

  useEffect(() => {
    if (!isOpenFillModal) {
      if (activePolygonRef.current) {
        activePolygonRef.current.set('active', false);
        activePolygonRef.current = null;
      }
    }
  }, [isOpenFillModal]);

  useEffect(() => {
    if (!isOpenDetailModal) {
      if (activePolygonRef.current) {
        activePolygonRef.current.set('active', false);
        activePolygonRef.current = null;
      }
    }
  }, [isOpenDetailModal]);

  return (
    <div ref={mapRef} className="h-full w-full overflow-hidden rounded-lg!" />
  );
}

export const tooltipBox = (regionName: string, imageUrl?: string) => {
  if (imageUrl) {
    return `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 4px;">
        <img src="${imageUrl}" style="width: 150px; height: 100px; object-fit: fill; border-radius: 8px;" />
        <span style="font-weight: 700; font-size: 14px; color: #676767;">${regionName}</span>
      </div>
    `;
  }

  return `
    <div style="padding: 4px;">
      <span style="font-weight: 700; font-size: 14px; color: #676767;">${regionName}</span>
    </div>
  `;
};
