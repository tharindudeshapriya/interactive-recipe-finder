const Footer = () => {
    return (
        <footer className="bg-bg-surface border-t border-text-base/10 py-12 mt-20">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
                <span className="text-xl font-serif text-text-base tracking-tight mb-4">
                    The Culinary <span className="italic font-light">Archive</span>
                </span>
                <p className="text-xs font-sans text-neutral-dark uppercase tracking-widest mb-6 border-b border-text-base/10 pb-6 w-full max-w-md">
                    Curated globally, plated locally.
                </p>
                <div className="flex gap-4 text-xs font-sans text-neutral-dark">
                    <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
