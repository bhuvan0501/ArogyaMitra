import { FiExternalLink, FiPlay, FiYoutube } from "react-icons/fi";

/**
 * VideoCard – YouTube video tile with thumbnail, title, and watch CTA.
 *
 * Props:
 *   title      {string}   video title
 *   thumbnail  {string}   thumbnail URL
 *   url        {string}   full YouTube URL
 *   channel    {string}   optional channel name
 *   duration   {string}   optional e.g. "12:34"
 */
export function VideoCard({ title, thumbnail, url, channel, duration }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      {/* Thumbnail */}
      <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-800" style={{ aspectRatio: "16/9" }}>
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <FiYoutube className="h-12 w-12 text-slate-300 dark:text-slate-600" />
          </div>
        )}
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/30">
          <span className="flex h-11 w-11 scale-75 items-center justify-center rounded-full bg-white/90 text-slate-900 opacity-0 shadow-lg transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
            <FiPlay className="h-5 w-5 translate-x-0.5" />
          </span>
        </div>
        {/* Duration badge */}
        {duration && (
          <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-white">
            {duration}
          </span>
        )}
        {/* YouTube badge */}
        <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm">
          <FiYoutube className="h-3 w-3" />
          YouTube
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-3">
        <h4 className="line-clamp-2 text-sm font-semibold leading-snug text-slate-900 dark:text-white">{title}</h4>
        {channel && (
          <p className="text-xs text-slate-500 dark:text-slate-400">{channel}</p>
        )}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-red-700 hover:shadow-md active:scale-95"
        >
          <FiExternalLink className="h-3.5 w-3.5" />
          Watch on YouTube
        </a>
      </div>
    </article>
  );
}
