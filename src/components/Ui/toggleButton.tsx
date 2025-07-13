import { FaBars, FaTimes } from 'react-icons/fa';
import '@/styles/navbar.css';

export default function ToggleBtn({ navbarOpen, handleToggle, className }: { navbarOpen: boolean, handleToggle: () => void, className: string }) {
    return (
        <button
            className={`icon d-lg-none text-black ${navbarOpen ? 'rotate' : ''} ${className}`}
            onClick={(event) => {
                event.preventDefault();
                handleToggle();
            }}
        >
            {navbarOpen ? <FaTimes /> : <FaBars />}
        </button>
    );
}