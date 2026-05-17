/**
 * @file: CreateNewTravelStep3.tsx
 * @author: chad
 * @since: 2026.04.26 ~
 * @description: CreateNewTravelStep3 컴포넌트, 여행 정보 입력
 */

import { Dispatch, SetStateAction, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/components/ui/Input';
import FileUpload from '@/shared/components/ui/FileUpload';
import { Chip } from '@/shared/components/ui/Chip';
import {
  TRAVEL_PARTNER_LIST,
  TRAVEL_STYLE_LIST,
} from '@/features/myTravel/constants';
import RequireDot from '@/shared/components/ui/RequireDot';
import { CategoryIcon } from '@/shared/components/ui/CategoryIcon';
import { User, CircleX } from 'lucide-react';
import { IMemberList } from '@/shared/interfaces';
import { nanoid } from 'nanoid';
import { TRAVEL_PARTNER, TRAVEL_STYLE } from '@/shared/types/Enum';
import { useSession } from 'next-auth/react';

interface ICreateNewTravelStep3 {
  title: string;
  setTravelTitle: Dispatch<SetStateAction<string>>;
  selectedImage: File[];
  setSelectedImage: Dispatch<SetStateAction<File[]>>;
  travelPartner: TRAVEL_PARTNER;
  setTravelPartner: Dispatch<SetStateAction<TRAVEL_PARTNER>>;
  travelStyles: TRAVEL_STYLE[];
  setTravelStyles: Dispatch<SetStateAction<TRAVEL_STYLE[]>>;
  travelMember: IMemberList[];
  setTravelMember: Dispatch<SetStateAction<IMemberList[]>>;
}

export default function CreateNewTravelStep3({
  title,
  setTravelTitle,
  selectedImage,
  setSelectedImage,
  travelPartner,
  setTravelPartner,
  travelStyles,
  setTravelStyles,
  travelMember,
  setTravelMember,
}: ICreateNewTravelStep3) {
  const [isAciveAddTravelMember, setIsActiveAddTravelMember] = useState(false);
  const [addMemberName, setAddMemberName] = useState('');

  const { data: userInfo } = useSession();

  /** 여행 스타일 핸들링 */
  const handleTravelStyles = (value: TRAVEL_STYLE) => {
    const isChecked = travelStyles.some((_value) => _value === value);

    if (isChecked) {
      setTravelStyles(travelStyles.filter((_value) => _value !== value));
    } else {
      setTravelStyles([...travelStyles, value]);
    }
  };

  /** 여행 멤버 추가 */
  const handleAddMember = () => {
    setTravelMember([...travelMember, { id: nanoid(), name: addMemberName }]);
    setAddMemberName('');
    setIsActiveAddTravelMember(false);
  };

  /** 여행 멤버 삭제 */
  const handelDeleteMember = (id: string) => {
    const filteredMember = travelMember.filter((member) => member.id !== id);
    setTravelMember(filteredMember);
  };

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="scrollbar-hide flex flex-1 flex-col gap-2 overflow-auto">
        <Input
          label="제목 입력"
          placeholder="여행 제목을 입력해주세요"
          description="필수는 아니에요. 최대 20자까지 입력가능해요."
          maxLength={20}
          value={title}
          onChange={(e) => setTravelTitle(e.target.value)}
        />

        <FileUpload
          label="대표 이미지"
          description="필수는 아니에요."
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />

        <div className="flex flex-col gap-1 p-1">
          <span>여행 멤버</span>
          {travelMember.map((member, index) => {
            const isMe = member.id === userInfo?.user?.id;

            return (
              <div
                key={`${member}-${index}`}
                className="flex items-center gap-1"
              >
                <div className="flex items-center gap-1">
                  {isMe ? (
                    <div
                      className={cn('h-6 w-6 rounded-full')}
                      style={{ backgroundColor: `#${userInfo?.user?.hexCode}` }}
                    />
                  ) : (
                    <User size="22" className="text-primary fill-current" />
                  )}
                  <span className="font-bold">
                    {member.name}&nbsp;
                    {isMe ? '(나)' : ''}
                  </span>
                </div>
                {!isMe && (
                  <CircleX
                    className="text-text-secondary cursor-pointer"
                    size={20}
                    onClick={() => handelDeleteMember(member.id)}
                  />
                )}
              </div>
            );
          })}
          <div className="flex items-center gap-1">
            <CategoryIcon
              variant="plus"
              size="sm"
              circled={isAciveAddTravelMember ? 'none' : 'outline'}
              className={isAciveAddTravelMember ? 'none' : 'cursor-pointer'}
              onClick={() => setIsActiveAddTravelMember(true)}
            />
            {isAciveAddTravelMember && (
              <div className="flex items-center justify-between gap-2">
                <Input
                  size="sm"
                  value={addMemberName}
                  onChange={(e) => setAddMemberName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.nativeEvent.isComposing) return;
                    if (e.key === 'Enter') handleAddMember();
                  }}
                  maxLength={10}
                />
                <div className="flex shrink-0 gap-3">
                  <div
                    className="text-primary cursor-pointer text-sm font-bold"
                    onClick={handleAddMember}
                  >
                    추가
                  </div>
                  <div
                    className="text-text-secondary cursor-pointer text-sm font-bold"
                    onClick={() => setIsActiveAddTravelMember(false)}
                  >
                    취소
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex min-w-25 items-center gap-1">
            <span>누구와 여행인가요?</span>
            <RequireDot />
          </div>
          <div className="flex flex-wrap gap-1 p-1">
            {TRAVEL_PARTNER_LIST.map((list) => (
              <Chip
                key={list.value}
                variant={
                  list.value == travelPartner ? 'primary' : 'primaryOutline'
                }
                onClick={() => setTravelPartner(list.value)}
              >
                {list.label}
              </Chip>
            ))}
          </div>
          <span className="text-text-secondary text-sm">
            1개만 선택 가능해요.
          </span>
        </div>

        <div className="flex flex-col gap-1 p-1">
          <span>어떤 여행인가요?</span>
          <div className="flex flex-wrap gap-1">
            {TRAVEL_STYLE_LIST.map((list) => (
              <Chip
                key={list.value}
                variant={
                  travelStyles.find((style) => style === list.value)
                    ? 'primary'
                    : 'primaryOutline'
                }
                onClick={() => handleTravelStyles(list.value)}
              >
                {list.label}
              </Chip>
            ))}
          </div>
          <span className="text-text-secondary text-sm">
            여러개 선택 가능해요.
          </span>
        </div>
      </div>
    </div>
  );
}
