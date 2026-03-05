const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center py-20 min-h-[50vh]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
        </div>
    );
};

export default LoadingSpinner;
