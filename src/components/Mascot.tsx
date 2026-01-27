'use client';

import Image from 'next/image';

export default function Mascot() {
  return (
    <div className="absolute bottom-8 left-0 z-[10] pointer-events-none animate-run overflow-hidden">
      <div className="animate-jump">
        <Image
          src="/walnut-mascot.png"
          alt="Muscular Walnut Mascot"
          width={120}
          height={120}
          className="drop-shadow-2xl"
          priority
        />
      </div>
      <style jsx global>{`
        @keyframes run {
          0% {
            transform: translateX(-150px);
          }
          100% {
            transform: translateX(100vw);
          }
        }
        @keyframes jump {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-25px);
          }
        }
        .animate-run {
          animation: run 10s linear infinite;
          width: 200vw;
          left: -100px;
        }
        .animate-jump {
          animation: jump 0.6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
