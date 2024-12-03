import { XIcon } from "lucide-react";
import React from "react";

type ModalProps = {
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
    return (
        <div className="fixed inset-0 bg-black/80 bg-opacity-20 flex items-center justify-center">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-green-800 relative max-w-md w-full">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-green-500 hover:text-green-400 hover:bg-green-900/50 p-1 rounded transition-all duration-200"
                >
                    <XIcon size={24} />
                </button>
                {children}
            </div>
        </div>
    );
}

export default Modal;