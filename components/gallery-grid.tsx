"use client";

import { useState, useMemo } from "react";
import type { GalleryShortcut, GalleryCategory } from "@/lib/data/gallery-shortcuts";
import { GALLERY_SHORTCUTS, getAllCategories, getFeaturedShortcuts } from "@/lib/data/gallery-shortcuts";
import GalleryShortcutCard from "./gallery-shortcut-card";

interface GalleryGridProps {
  onRemix: (shortcut: GalleryShortcut) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  Morning: "border-orange-500 text-orange-400",
  Productivity: "border-blue-500 text-blue-400",
  Health: "border-green-500 text-green-400",
  Device: "border-purple-500 text-purple-400",
  Social: "border-pink-500 text-pink-400",
  Finance: "border-emerald-500 text-emerald-400",
  Utilities: "border-gray-500 text-gray-400",
};

export default function GalleryGrid({ onRemix }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | "All">("All");
  const categories = getAllCategories();

  const filteredShortcuts = useMemo(() => {
    if (activeCategory === "All") {
      return [...GALLERY_SHORTCUTS].sort((a, b) => b.popularity - a.popularity);
    }
    return GALLERY_SHORTCUTS.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  const featuredShortcuts = getFeaturedShortcuts();

  return (
    <div className="w-full">
      {/* Featured Section */}
      {activeCategory === "All" && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-yellow-400">★</span>
            Featured Shortcuts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredShortcuts.map((shortcut) => (
              <GalleryShortcutCard
                key={shortcut.id}
                shortcut={shortcut}
                onRemix={onRemix}
              />
            ))}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-4">
          {activeCategory === "All" ? "All Shortcuts" : activeCategory}
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("All")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeCategory === "All"
                ? "bg-white text-gray-900"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? `bg-white ${CATEGORY_COLORS[cat].split(" ")[1].replace("text-", "text-")}`
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
              style={activeCategory === cat ? { backgroundColor: "white", color: CATEGORY_COLORS[cat].split("text-")[1] } : {}}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Shortcuts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredShortcuts.map((shortcut) => (
          <GalleryShortcutCard
            key={shortcut.id}
            shortcut={shortcut}
            onRemix={onRemix}
          />
        ))}
      </div>

      {filteredShortcuts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No shortcuts in this category yet.</p>
        </div>
      )}
    </div>
  );
}
