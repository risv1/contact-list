import { Edit, Trash } from "lucide-react";
import React from "react";

type ListCardProps = {
    name: string;
    type: "Personal" | "Work";
    mobile: string;
    email: string;
    onEdit: () => void;
    onDelete: () => void;
}

const ListCard: React.FC<ListCardProps> = ({ name, type, mobile, email, onEdit, onDelete }) => {
    return (
        <div className="flex justify-between items-center p-4 border border-green-900 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-200">
            <div className="space-y-1">
                <h3 className="text-lg font-semibold text-green-400">{name}</h3>
                <p className="text-sm text-green-600">{type}</p>
                <p className="text-sm text-green-500">{mobile}</p>
                <p className="text-sm text-green-500">{email}</p>
            </div>
            <button 
                onClick={onEdit} 
                className="px-3 py-1 text-green-400 ml-auto hover:text-green-300 hover:bg-green-900/50 rounded transition-all duration-200"
            >
                <Edit size={24} />
            </button>
            <button 
                onClick={onDelete} 
                className="px-3 py-1 text-red-400 hover:text-red-300 hover:bg-red-900/50 rounded transition-all duration-200"
            >
                <Trash size={24} />
            </button>
        </div>
    );
}

export default ListCard;