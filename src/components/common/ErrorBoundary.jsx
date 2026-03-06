import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-bg-base px-6">
                    <div className="max-w-md w-full text-center">
                        <div className="mb-8 relative inline-block">
                            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
                                <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                        </div>

                        <h1 className="text-3xl font-serif text-text-base mb-4">Something went wrong</h1>
                        <p className="text-neutral-dark mb-8 font-light italic">
                            We've encountered an unexpected archive error. Our team has been notified.
                        </p>

                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full py-4 bg-primary text-white font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20"
                            >
                                Try Refreshing
                            </button>
                            <button
                                onClick={handleReset}
                                className="w-full py-4 bg-neutral-light/10 text-text-base font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-neutral-light/20 transition-all"
                            >
                                Return to Gallery
                            </button>
                        </div>

                        {process.env.NODE_ENV === 'development' && (
                            <div className="mt-12 p-4 bg-red-500/5 rounded-xl border border-red-500/10 text-left">
                                <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-2">Developer Info</p>
                                <p className="text-xs font-mono text-red-400/80 break-words">
                                    {this.state.error?.toString()}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
