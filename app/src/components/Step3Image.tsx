import React, { useRef, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { uploadToCloudinary } from '../utils/cloudinary';
import { ShopType } from '../types';

interface SortableImageItemProps {
  id: string;
  url: string;
  index: number;
  shop: ShopType;
  onUrlChange: (id: string, url: string) => void;
  onRemove: (id: string) => void;
  onError: (msg: string) => void;
}

function SortableImageItem({ id, url, index, shop, onUrlChange, onRemove, onError }: SortableImageItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!shop) {
      onError('先に店舗を選択してください');
      return;
    }

    try {
      setProgress(10); // Start progress indication
      // Since fetch doesn't give precise upload progress easily, we just show a fake progress or 50%
      const secureUrl = await uploadToCloudinary(file, shop);
      onUrlChange(id, secureUrl);
      setProgress(100);
      setTimeout(() => setProgress(null), 1000);
    } catch (err) {
      onError('アップロードに失敗しました');
      setProgress(null);
    }
  };

  return (
    <div ref={setNodeRef} style={style} className="image-item">
      <span className="drag-handle" {...attributes} {...listeners} title="ドラッグで並び替え">⠿</span>
      <div className="image-item-content">
        <div className="image-num">画像 {index + 1} 枚目</div>
        <div className="image-url-row">
          <input
            type="text"
            className="image-url-input"
            placeholder="https://example.com/image.jpg"
            value={url}
            onChange={(e) => onUrlChange(id, e.target.value)}
          />
          <button className="upload-btn" onClick={() => fileInputRef.current?.click()}>
            📤 アップロード
          </button>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
        {progress !== null && (
          <div className="progress-bar-wrap" style={{ display: 'block' }}>
            <div className="progress-bar-fill" style={{ width: `${progress}%`, transition: 'width 0.3s ease' }} />
          </div>
        )}
      </div>
      <img className="img-thumb" src={url} alt="" style={{ display: url ? 'block' : 'none' }} />
      <button className="remove-img-btn" onClick={() => onRemove(id)} title="削除">✕</button>
    </div>
  );
}

import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';

interface ImageObj {
  id: string;
  url: string;
}

interface Step3ImageProps {
  images: ImageObj[];
  setImages: React.Dispatch<React.SetStateAction<ImageObj[]>>;
  shop: ShopType;
  onNext: () => void;
  onPrev: () => void;
  onError: (msg: string) => void;
}

export const Step3Image: React.FC<Step3ImageProps> = ({ images, setImages, shop, onNext, onPrev, onError }) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addImage = () => {
    if (images.length >= 30) {
      onError('画像は最大30枚までです');
      return;
    }
    setImages([...images, { id: `img-${Date.now()}`, url: '' }]);
  };

  const updateImageUrl = (id: string, url: string) => {
    setImages((items) => items.map(img => img.id === id ? { ...img, url } : img));
  };

  const removeImage = (id: string) => {
    setImages((items) => items.filter(img => img.id !== id));
  };

  const canProceed = images.some(img => img.url.trim() !== '');

  return (
    <div className="step-panel active">
      <div className="card">
        <div className="card-title"><span className="icon">🖼️</span>ブログ画像を追加</div>
        <div className="card-desc">
          「アップロード」ボタンでお手元の画像を直接アップロードするか、画像URLを入力してください。<br/>
          ドラッグ＆ドロップで並び替えもできます。
        </div>
        <div className="image-list">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
          >
            <SortableContext items={images.map(i => i.id)} strategy={verticalListSortingStrategy}>
              {images.map((img, index) => (
                <SortableImageItem
                  key={img.id}
                  id={img.id}
                  url={img.url}
                  index={index}
                  shop={shop}
                  onUrlChange={updateImageUrl}
                  onRemove={removeImage}
                  onError={onError}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
        <button className="add-image-btn" onClick={addImage} style={{ marginTop: images.length > 0 ? 12 : 0 }}>
          ＋ 画像を追加する
        </button>
      </div>
      <div className="step-actions">
        <button className="btn-prev" onClick={onPrev}>← 戻る</button>
        <button className="btn-next" onClick={onNext} disabled={!canProceed}>
          次へ　→
        </button>
      </div>
    </div>
  );
};
