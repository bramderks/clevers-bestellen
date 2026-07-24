"use client";

interface UploadFormProps {
  image: File | null;
  loading: boolean;
  onImageChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onAnalyse: () => void;
}

export default function UploadForm({
  image,
  loading,
  onImageChange,
  onAnalyse,
}: UploadFormProps) {
  return (
    <>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={onImageChange}
        className="hidden"
      />

      <label
        htmlFor="file-upload"
        className="inline-block cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
      >
        Kies formulier
      </label>

      {image && (
        <p className="mt-3 text-gray-600">
          Geselecteerd: <strong>{image.name}</strong>
        </p>
      )}

      <div>
        <button
          type="button"
          onClick={onAnalyse}
          disabled={loading}
          className="mt-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          {loading
            ? "Analyseren..."
            : "Analyseer formulier"}
        </button>
      </div>
    </>
  );
}