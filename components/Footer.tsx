import { Github, Linkedin, Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800/50 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()}{" "}
          <span className="text-zinc-300 font-medium">Harigovind P</span>
          {" "}— Built with Next.js & Tailwind CSS
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/harigovindmelath"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-zinc-500 hover:text-zinc-200 transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/harigovind-melath"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-zinc-500 hover:text-zinc-200 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://leetcode.com/u/harigovindmelath/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LeetCode"
            className="text-zinc-500 hover:text-zinc-200 transition-colors"
          >
            <Code2 className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
