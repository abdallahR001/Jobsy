"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CompanyLogoUpload() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/companies/onBoarding",
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          router.push("/join");
          return;
        }

        if (data.hasSeenOnboarding === true) {
          router.push("/profile");
        }
      } catch (error) {
        console.error(error);
      }
    };

    setCompanyName(localStorage.getItem("companyName") || "");
    fetchData();
  }, [router]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const sendData = async () => {
    setLoading(true);

    const data = new FormData();
    data.append("description", localStorage.getItem("description"));
    data.append("website", localStorage.getItem("website"));
    data.append("employees_count", localStorage.getItem("employeesCount"));

    if (image) {
      data.append("image", image);
    }

    try {
      const response = await fetch("http://localhost:4000/api/companies", {
        method: "PUT",
        body: data,
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Something went wrong");
        setLoading(false);
        return;
      }

      localStorage.clear();
      router.push("/dashboard");
    } catch (error) {
      setError("Something went wrong, try again later");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    localStorage.clear();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-4">
      <h1 className="text-3xl font-bold text-center text-indigo-500 mb-6">
        {companyName
          ? `Last step for ${companyName}!`
          : "Last step: Upload your logo"}
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Upload a professional company logo (optional)
      </p>

      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md flex flex-col items-center space-y-4">
        {/* Image Preview */}
        {preview ? (
          <Image
            src={preview}
            alt="Logo Preview"
            className="w-32 h-32 rounded-full object-cover border border-gray-300"
            width={128}
            height={128}
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}

        {/* Upload Button */}
        <label className="w-full">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <div className="w-full py-3 text-center rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-100 transition">
            {image ? "Change Logo" : "Upload Logo"}
          </div>
        </label>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 w-full">
          <button
            onClick={sendData}
            disabled={!image || loading}
            className="flex-1 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition cursor-pointer"
          >
            {loading ? "Uploading..." : "Continue"}
          </button>
          <button
            onClick={handleSkip}
            disabled={loading}
            className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition cursor-pointer"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
