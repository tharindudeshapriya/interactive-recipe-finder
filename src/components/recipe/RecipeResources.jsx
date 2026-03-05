import React from 'react';

/**
 * YouTube video link + original source link cards.
 *
 * Props:
 *   youtubeUrl - string | null
 *   sourceUrl  - string | null
 *   mealName   - string (for display text)
 */
const RecipeResources = ({ youtubeUrl, sourceUrl, mealName }) => {
    if (!youtubeUrl && !sourceUrl) return null;

    return (
        <div className="mt-20 pt-12 border-t border-text-base/10 grid sm:grid-cols-2 gap-8">
            {youtubeUrl && (
                <div className="bg-bg-surface border border-neutral-light/30 rounded-xl p-8 shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-serif text-text-base mb-3">Visual Guide</h3>
                        <p className="text-neutral-dark font-light text-sm mb-8 leading-relaxed">
                            Prefer learning by watching? View the official preparation video for {mealName}.
                        </p>
                    </div>
                    <a
                        href={youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-fit items-center gap-3 text-xs font-bold uppercase tracking-widest text-text-base bg-secondary/30 hover:bg-secondary/60 px-6 py-3 rounded-full transition-colors"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        Watch Video
                    </a>
                </div>
            )}

            {sourceUrl && (
                <div className="bg-bg-surface border border-neutral-light/30 rounded-xl p-8 shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-serif text-text-base mb-3">Original Source</h3>
                        <p className="text-neutral-dark font-light text-sm mb-8 leading-relaxed">
                            View the original publication or blog post where this recipe was first documented.
                        </p>
                    </div>
                    <a
                        href={sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-fit items-center gap-3 text-xs font-bold uppercase tracking-widest text-text-base border border-text-base/20 hover:border-text-base focus:ring-2 focus:ring-primary px-6 py-3 rounded-full transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Visit Website
                    </a>
                </div>
            )}
        </div>
    );
};

export default RecipeResources;
