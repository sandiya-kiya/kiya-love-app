import React, { useMemo, useState } from 'react';

// These paths assume your images live in public/images/
// e.g. public/images/memory1.png, memory2.png, ...
const basePhotos = [
  '/images/memory1.png',
  '/images/memory2.png',
  '/images/memory3.png',
  '/images/memory4.png',
  '/images/memory5.png',
  '/images/memory6.png',
];

const positions = [
  { top: '20%', left: '15%' },
  { top: '50%', left: '10%' },
  { top: '30%', left: '45%' },
  { top: '70%', left: '55%' },
  { top: '25%', left: '75%' },
  { top: '60%', left: '85%' },
];

export default function MemoriesGallery({ onClose }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const floatingPhotos = useMemo(
    () =>
      basePhotos.map((src, index) => ({
        id: index,
        src,
        top: positions[index % positions.length].top,
        left: positions[index % positions.length].left,
        delay: `${index * 1.2}s`,
      })),
    []
  );

  return (
    <div className="memories-overlay">
      <div className="memories-container">
        <div className="memories-header">
          <h2>Our Memories 💕</h2>
          <button className="memories-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="memories-photos-layer">
          {floatingPhotos.map((photo) => (
            <img
              key={photo.id}
              src={photo.src}
              className="memory-photo"
              style={{
                top: photo.top,
                left: photo.left,
                animationDelay: photo.delay,
              }}
              onClick={() => setSelectedPhoto(photo.src)}
            />
          ))}
        </div>
      </div>

      {selectedPhoto && (
        <div
          className="photo-modal"
          onClick={() => setSelectedPhoto(null)}
        >
          <img src={selectedPhoto} className="modal-photo" />
          <div className="heart-burst" />
        </div>
      )}
    </div>
  );
}

