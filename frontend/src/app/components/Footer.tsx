export default function Footer() {
    return (
        <footer className="bg-[var(--foreground)] text-[var(--background)] p-2 text-center">
            <p className="text-sm italic">
                Made with ❤️ by 
                <a 
                href="https://github.com/alimomennasab" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline">
                    {' '}Ali Momennasab
                </a>
            </p>
        </footer>
    )
}