"use client";

interface StepProgressProps {
  currentStep: number;
}

const stappen = [
  "Vestiging",
  "Upload",
  "Controle",
  "Bestelling",
];

export default function StepProgress({
  currentStep,
}: StepProgressProps) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        {stappen.map((stap, index) => {
          const nummer = index + 1;

          const afgerond = nummer < currentStep;
          const actief = nummer === currentStep;

          return (
            <div
              key={stap}
              className="flex-1 flex items-center"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    font-bold border-2
                    ${
                      afgerond
                        ? "bg-green-600 border-green-600 text-white"
                        : actief
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-white border-gray-300 text-gray-400"
                    }
                  `}
                >
                  {afgerond ? "✓" : nummer}
                </div>

                <span
                  className={`mt-2 text-sm ${
                    actief
                      ? "font-semibold text-blue-700"
                      : afgerond
                      ? "text-green-700"
                      : "text-gray-400"
                  }`}
                >
                  {stap}
                </span>
              </div>

              {nummer < stappen.length && (
                <div
                  className={`flex-1 h-1 mx-4 ${
                    afgerond
                      ? "bg-green-600"
                      : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}