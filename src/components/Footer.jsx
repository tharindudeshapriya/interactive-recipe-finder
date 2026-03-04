const Footer = () => {
    return (
        <footer className="bg-brand-gray text-white py-6 mt-auto">
            <div className="container mx-auto px-4 text-center">
                <p className="font-medium">&copy; {new Date().getFullYear()} RecipeFinder. All rights reserved.</p>
                <p className="text-sm text-brand-light-gray mt-2">
                    Delicious recipes at your fingertips.
                </p>
            </div>
        </footer>
    )
}

export default Footer
