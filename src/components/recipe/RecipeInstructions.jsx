import React from 'react';

/**
 * Numbered preparation steps renderer.
 * Parses raw instruction text from the API and renders it as numbered paragraphs.
 *
 * Props:
 *   instructions - raw string from recipe.strInstructions
 */

const parseInstructions = (text) => {
    if (!text) return [];

    const lines = text.split(/(?:\r?\n)+/);
    const steps = [];

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (!line) continue;

        // Remove leading step markers e.g. "Step 1:", "1.", "2)", "STEP 3-"
        let cleanLine = line.replace(/^(?:step|STEP)?\s*\d+[:\.\-\)]?\s*/i, '').trim();

        if (cleanLine.length > 3) {
            steps.push(cleanLine);
        }
    }

    return steps;
};

const RecipeInstructions = ({ instructions }) => {
    const steps = parseInstructions(instructions);

    return (
        <section className="lg:col-span-8">
            <h2 className="text-3xl font-serif text-text-base mb-10 pb-4 border-b border-text-base/10">
                Preparation Method
            </h2>

            <div className="space-y-8 font-sans">
                {steps.map((paragraph, index) => {
                    if (!paragraph) return null;
                    return (
                        <div key={index} className="flex gap-4 md:gap-8 items-start group">
                            <span className="shrink-0 text-text-base/20 font-serif text-3xl md:text-5xl font-bold leading-none select-none transition-colors group-hover:text-primary/30 pt-1">
                                {(index + 1).toString().padStart(2, '0')}
                            </span>
                            <p className="text-base md:text-lg leading-relaxed text-text-base font-light mt-0 md:mt-3 whitespace-pre-wrap">
                                {paragraph}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default RecipeInstructions;
