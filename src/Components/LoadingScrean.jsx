import React from "react";

export default function LoadingScrean() {
  return  <div className="max-w-2xl mx-auto animate-pulse">
      <div
        className="
          bg-card
          border border-border/70
          rounded-3xl
          p-4
          space-y-4
          shadow-lg
        "
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex gap-2.5">
            {/* Avatar */}
            <div className="w-11 h-11 rounded-full bg-muted" />

            {/* User Info */}
            <div className="space-y-2">
              <div className="w-28 h-3 rounded-full bg-muted" />
              <div className="w-20 h-2.5 rounded-full bg-muted" />
              <div className="w-16 h-2 rounded-full bg-muted/80" />
            </div>
          </div>

          {/* More */}
          <div className="w-8 h-8 rounded-xl bg-muted" />
        </div>

        {/* Body */}
        <div className="space-y-2">
          <div className="w-full h-3 rounded-full bg-muted" />
          <div className="w-[92%] h-3 rounded-full bg-muted" />
          <div className="w-[70%] h-3 rounded-full bg-muted" />
        </div>

        {/* Image */}
        <div className="w-full h-80 rounded-2xl bg-muted" />

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border/60">
          <div className="w-16 h-8 rounded-xl bg-muted" />
          <div className="w-16 h-8 rounded-xl bg-muted" />
          <div className="w-16 h-8 rounded-xl bg-muted" />
          <div className="w-9 h-9 rounded-xl bg-muted" />
        </div>
      </div>
    </div>;
}
