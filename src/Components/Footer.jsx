import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-border py-3 z-150">
      
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-center text-xs text-muted-foreground">

        <p className="flex items-center gap-2 text-center">

          <span className="flex items-center gap-1">
            © {new Date().getFullYear()}
          </span>

          <span className="flex items-center gap-1">
            <div
              className="
                w-5 h-5 rounded-md
                flex items-center justify-center
                bg-linear-to-br from-[#8B5CF6] to-[#FC5CA8]
                shadow-[0_0_10px_rgba(139,92,246,0.35)]
              "
            >
              <Zap className="w-3 h-3 text-white" />
            </div>

            <span className="text-foreground font-medium">NEXUS</span>.
          </span>

          <span>All rights reserved.</span>

        </p>

      </div>
    </footer>
  );
}