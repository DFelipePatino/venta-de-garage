import { useState, useRef, useEffect } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

function Message() {
    const [isOpen, setIsOpen] = useState(false);
    const [showDot, setShowDot] = useState(true);
    const dropdownRef = useRef(null);
    useClickOutside(dropdownRef, () => setIsOpen(false));

    useEffect(() => {
        // Check if the button has been clicked before
        const hasClicked = localStorage.getItem('messageButtonClicked');
        if (!hasClicked) {
            setShowDot(true);
        }
    }, []);

    const handleClick = () => {
        setIsOpen(!isOpen);
        if (showDot) {
            setShowDot(false);
            localStorage.setItem('messageButtonClicked', 'true');
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Button */}
            <button
                onClick={handleClick}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition relative"
            >
                Acerca de esta pagina
                {showDot && (
                    <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full animate-[pulse_1s_infinite_ease-in-out]"></span>
                )}
            </button>

            {/* Dropdown Content */}
            <div
                className={`absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg p-3 transition-all duration-300 transform ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}
            >
                👋 ¡Hola, soy Daniel! Estoy por viajar y estoy haciendo una venta de garaje para reunir algo de dinero. Todos los artículos están en muy buen estado, así que si ves algo que te guste, ábrelo para conocer más detalles. Encontrarás todas sus características y, si te interesa, dentro verás un botón de WhatsApp para que hablemos. ¡No dudes en escribirme! 🚀
            </div>
        </div>
    );
}

export default Message;
